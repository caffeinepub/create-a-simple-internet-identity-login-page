// Environment data fetching utilities for ocean/water locations

export interface EnvironmentMetrics {
  temperature: number | null;
  temperatureSource: string;
  temperatureEstimated: boolean;
  pH: number | null;
  pHSource: string;
  pHEstimated: boolean;
  turbidity: number | null;
  turbiditySource: string;
  turbidityEstimated: boolean;
  oxygenLevel: number | null;
  oxygenSource: string;
  oxygenEstimated: boolean;
}

/**
 * Fetch environmental data for a given location
 * Uses OpenWeather for temperature and attempts USGS for water quality metrics
 * Provides clearly labeled estimates when real data is unavailable
 */
export async function fetchEnvironmentData(
  lat: number,
  lng: number,
  locationName: string
): Promise<EnvironmentMetrics> {
  const result: EnvironmentMetrics = {
    temperature: null,
    temperatureSource: 'Unavailable',
    temperatureEstimated: false,
    pH: null,
    pHSource: 'Unavailable',
    pHEstimated: false,
    turbidity: null,
    turbiditySource: 'Unavailable',
    turbidityEstimated: false,
    oxygenLevel: null,
    oxygenSource: 'Unavailable',
    oxygenEstimated: false,
  };

  // Fetch temperature from OpenWeather
  const weatherApiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  if (weatherApiKey) {
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${weatherApiKey}&units=metric`
      );
      
      if (weatherResponse.ok) {
        const weatherData = await weatherResponse.json();
        if (weatherData.main?.temp !== undefined) {
          result.temperature = weatherData.main.temp;
          result.temperatureSource = 'OpenWeather';
          result.temperatureEstimated = false;
        }
      }
    } catch (err) {
      console.error('Error fetching weather data:', err);
    }
  }

  // Attempt to fetch water quality data from USGS (US locations only)
  // USGS provides real-time water quality data for monitoring stations
  try {
    // Search for nearby USGS monitoring stations
    // Parameter codes: 00010=Temperature, 00400=pH, 00300=Dissolved oxygen, 63680=Turbidity
    const usgsResponse = await fetch(
      `https://waterservices.usgs.gov/nwis/iv/?format=json&bBox=${lng - 0.5},${lat - 0.5},${lng + 0.5},${lat + 0.5}&parameterCd=00010,00400,00300,00301,63680&siteStatus=active`
    );

    if (usgsResponse.ok) {
      const usgsData = await usgsResponse.json();
      const timeSeries = usgsData?.value?.timeSeries;

      if (timeSeries && timeSeries.length > 0) {
        // Extract available parameters from the first station
        timeSeries.forEach((series: any) => {
          const paramCode = series.variable?.variableCode?.[0]?.value;
          const values = series.values?.[0]?.value;
          
          if (values && values.length > 0) {
            const latestValue = parseFloat(values[values.length - 1]?.value);
            
            if (!isNaN(latestValue)) {
              // Map USGS parameter codes to our metrics
              switch (paramCode) {
                case '00400': // pH
                  result.pH = latestValue;
                  result.pHSource = 'USGS';
                  result.pHEstimated = false;
                  break;
                case '00300': // Dissolved oxygen (mg/L)
                  result.oxygenLevel = latestValue;
                  result.oxygenSource = 'USGS';
                  result.oxygenEstimated = false;
                  break;
                case '00301': // Dissolved oxygen (percent saturation)
                  // Convert to mg/L approximation if needed
                  if (result.oxygenLevel === null) {
                    result.oxygenLevel = (latestValue / 100) * 10; // Rough approximation
                    result.oxygenSource = 'USGS';
                    result.oxygenEstimated = false;
                  }
                  break;
                case '63680': // Turbidity (NTU)
                  result.turbidity = latestValue;
                  result.turbiditySource = 'USGS';
                  result.turbidityEstimated = false;
                  break;
              }
            }
          }
        });
      }
    }
  } catch (err) {
    console.error('Error fetching USGS water quality data:', err);
  }

  // Provide estimated fallback values for missing data
  // These are clearly labeled as estimates and based on typical ocean/water conditions
  
  // Estimate pH if not available (typical ocean pH is 7.5-8.4)
  if (result.pH === null) {
    const isOcean = locationName.toLowerCase().includes('ocean') || 
                    locationName.toLowerCase().includes('sea');
    result.pH = isOcean ? 8.1 : 7.5; // Ocean average vs freshwater average
    result.pHSource = 'Typical range';
    result.pHEstimated = true;
  }

  // Estimate turbidity if not available (typical range 0-10 NTU for clear water)
  if (result.turbidity === null) {
    const isCoastal = Math.abs(lat) < 60;
    result.turbidity = isCoastal ? 5.0 : 2.0; // Coastal vs open ocean
    result.turbiditySource = 'Typical range';
    result.turbidityEstimated = true;
  }

  // Estimate oxygen level if not available (typical ocean DO is 6-8 mg/L)
  if (result.oxygenLevel === null) {
    const tempForEstimate = result.temperature ?? 15; // Use actual temp or default
    // Cooler water holds more oxygen
    result.oxygenLevel = tempForEstimate < 15 ? 8.0 : tempForEstimate < 25 ? 7.0 : 6.0;
    result.oxygenSource = 'Typical range';
    result.oxygenEstimated = true;
  }

  // If temperature is still null, provide estimate based on latitude
  if (result.temperature === null) {
    const absLat = Math.abs(lat);
    if (absLat < 23.5) {
      result.temperature = 26; // Tropical
    } else if (absLat < 40) {
      result.temperature = 18; // Temperate
    } else {
      result.temperature = 10; // Cold
    }
    result.temperatureSource = 'Typical range';
    result.temperatureEstimated = true;
  }

  return result;
}
