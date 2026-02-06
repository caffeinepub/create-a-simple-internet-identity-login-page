import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { X, Search, AlertCircle, Heart, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import ContinentalMap from '@/components/ContinentalMap';
import { continentDataset, findContinentByName } from '@/lib/continentDataset';
import { findSeaOceanByName } from '@/lib/seaOceanDataset';
import { findCountryStateByName } from '@/lib/countryStateDataset';
import { fetchEnvironmentData } from '@/lib/environmentData';

interface GoogleMapPageProps {
  onClose: () => void;
}

interface LocationData {
  name: string;
  temperature: number;
  pH: number;
  turbidity: number;
  oxygen: number;
  source: string;
}

export default function GoogleMapPage({ onClose }: GoogleMapPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [markerLocation, setMarkerLocation] = useState<{ lat: number; lng: number; label: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContinentSelect = (continentId: string) => {
    setSelectedContinent(continentId);
    setMarkerLocation(null); // Clear marker when continent is clicked
    setError(null);
    
    const continent = continentDataset[continentId];
    if (continent) {
      setLocationData({
        name: continent.displayName,
        temperature: continent.temperature,
        pH: continent.pH,
        turbidity: continent.turbidity,
        oxygen: continent.oxygen,
        source: continent.source,
      });
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a location name to search');
      return;
    }

    setLoading(true);
    setError(null);
    setLocationData(null);
    setMarkerLocation(null);

    // Simulate brief loading for UX
    await new Promise(resolve => setTimeout(resolve, 300));

    // First, try to find a continent
    const continent = findContinentByName(searchQuery);
    
    if (continent) {
      setSelectedContinent(continent.id);
      // Set marker for continent too
      setMarkerLocation({
        lat: continent.lat,
        lng: continent.lng,
        label: continent.displayName,
      });
      setLocationData({
        name: continent.displayName,
        temperature: continent.temperature,
        pH: continent.pH,
        turbidity: continent.turbidity,
        oxygen: continent.oxygen,
        source: continent.source,
      });
      setLoading(false);
      return;
    }

    // If not a continent, try to find a sea or ocean
    const seaOcean = findSeaOceanByName(searchQuery);
    
    if (seaOcean) {
      // Clear continent selection
      setSelectedContinent(null);
      
      // Set marker location
      setMarkerLocation({
        lat: seaOcean.lat,
        lng: seaOcean.lng,
        label: seaOcean.displayName,
      });

      // Fetch environmental data for this location
      try {
        const envData = await fetchEnvironmentData(seaOcean.lat, seaOcean.lng, seaOcean.displayName);
        
        setLocationData({
          name: seaOcean.displayName,
          temperature: envData.temperature ?? 20,
          pH: envData.pH ?? 8.1,
          turbidity: envData.turbidity ?? 3.0,
          oxygen: envData.oxygenLevel ?? 7.0,
          source: envData.temperatureEstimated ? 'Estimated from typical range' : envData.temperatureSource,
        });
      } catch (err) {
        console.error('Error fetching environment data:', err);
        // Provide fallback data
        setLocationData({
          name: seaOcean.displayName,
          temperature: 20,
          pH: 8.1,
          turbidity: 3.0,
          oxygen: 7.0,
          source: 'Estimated from typical range',
        });
      }
      
      setLoading(false);
      return;
    }

    // If not a sea/ocean, try to find a country or state
    const countryState = findCountryStateByName(searchQuery);
    
    if (countryState) {
      // Clear continent selection
      setSelectedContinent(null);
      
      // Set marker location
      setMarkerLocation({
        lat: countryState.lat,
        lng: countryState.lng,
        label: countryState.displayName,
      });

      // Fetch environmental data for this location
      try {
        const envData = await fetchEnvironmentData(countryState.lat, countryState.lng, countryState.displayName);
        
        setLocationData({
          name: countryState.displayName,
          temperature: envData.temperature ?? 20,
          pH: envData.pH ?? 8.1,
          turbidity: envData.turbidity ?? 3.0,
          oxygen: envData.oxygenLevel ?? 7.0,
          source: envData.temperatureEstimated ? 'Estimated from typical range' : envData.temperatureSource,
        });
      } catch (err) {
        console.error('Error fetching environment data:', err);
        // Provide fallback data
        setLocationData({
          name: countryState.displayName,
          temperature: 20,
          pH: 8.1,
          turbidity: 3.0,
          oxygen: 7.0,
          source: 'Estimated from typical range',
        });
      }
      
      setLoading(false);
      return;
    }

    // Location not found
    setError(
      `Location "${searchQuery}" not found. Please try searching for continents (e.g., Africa, Asia), seas/oceans (e.g., Pacific Ocean, Mediterranean Sea), countries (e.g., India, United States), or states (e.g., California, Texas).`
    );
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getCycloneRisk = () => {
    if (!locationData) {
      return { level: 'Unknown', description: 'Insufficient data for risk assessment' };
    }

    const temp = locationData.temperature;
    
    if (temp > 26) {
      return {
        level: 'High',
        description: 'Water temperatures above 26°C significantly increase cyclone formation potential in tropical regions.',
      };
    } else if (temp > 20) {
      return {
        level: 'Moderate',
        description: 'Moderate temperatures may support storm development under favorable atmospheric conditions.',
      };
    } else {
      return {
        level: 'Low',
        description: 'Cooler water temperatures generally inhibit tropical cyclone formation.',
      };
    }
  };

  const getFloodRisk = () => {
    if (!locationData) {
      return { level: 'Unknown', description: 'Insufficient data for flood risk assessment' };
    }

    const temp = locationData.temperature;
    
    if (temp > 25) {
      return {
        level: 'Elevated',
        description: 'Warm coastal waters increase storm surge and flooding potential.',
      };
    } else if (temp > 18) {
      return {
        level: 'Moderate',
        description: 'Coastal areas face moderate flood risk from storm events and sea level rise.',
      };
    } else {
      return {
        level: 'Low',
        description: 'Cooler regions have lower direct ocean flood risk.',
      };
    }
  };

  const renderMetricValue = (value: number, unit: string, source: string) => {
    return (
      <div>
        <p className="text-2xl font-bold">
          {value.toFixed(unit === 'NTU' || unit === 'mg/L' ? 1 : 2)}{unit}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Source: {source}
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Close Button */}
        <div className="flex justify-end mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Search Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Continental Ocean Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Search for a continent, sea, ocean, country, or state (e.g., India, California, Pacific Ocean)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="h-12"
              />
              <Button
                onClick={handleSearch}
                disabled={loading}
                className="h-12 px-6"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Continental Map */}
        <Card className="mb-6 overflow-hidden">
          <CardContent className="p-4">
            <div className="w-full h-[400px]">
              <ContinentalMap
                selectedContinent={selectedContinent}
                onSelect={handleContinentSelect}
                markerLocation={markerLocation}
              />
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {locationData && (
          <div className="space-y-6">
            {/* Data Values Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Environmental Data
                </CardTitle>
                <p className="text-sm text-muted-foreground">{locationData.name}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-muted/50 border">
                    <p className="text-sm font-semibold text-primary mb-1">Temperature</p>
                    {renderMetricValue(locationData.temperature, '°C', locationData.source)}
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50 border">
                    <p className="text-sm font-semibold text-primary mb-1">pH Value</p>
                    {renderMetricValue(locationData.pH, '', locationData.source)}
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50 border">
                    <p className="text-sm font-semibold text-primary mb-1">Turbidity</p>
                    {renderMetricValue(locationData.turbidity, ' NTU', locationData.source)}
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50 border">
                    <p className="text-sm font-semibold text-primary mb-1">Oxygen Level</p>
                    {renderMetricValue(locationData.oxygen, ' mg/L', locationData.source)}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Assessment Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  Cyclone & Flood Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-600/30">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5" />
                      <div>
                        <p className="font-semibold text-amber-200 mb-1">
                          Cyclone Risk: {getCycloneRisk().level}
                        </p>
                        <p className="text-sm text-amber-300/80">
                          {getCycloneRisk().description}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-muted/50 border">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-semibold text-foreground mb-1">
                          Flood Risk: {getFloodRisk().level}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {getFloodRisk().description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Alert>
                  <AlertDescription className="text-sm">
                    <strong>Note:</strong> Risk assessments are based on current environmental conditions and historical patterns. 
                    For official warnings and forecasts, please consult local meteorological services.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-muted-foreground">
          <p>
            © 2026. Built with <Heart className="inline h-4 w-4 text-red-500" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline-offset-4 hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
