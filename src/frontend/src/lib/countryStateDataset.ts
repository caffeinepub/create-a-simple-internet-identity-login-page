// Built-in country and state dataset with representative coordinates
// Provides location data for common countries and US states

export interface CountryStateData {
  id: string;
  name: string;
  displayName: string;
  lat: number;
  lng: number;
  type: 'country' | 'state';
}

export const countryStateDataset: CountryStateData[] = [
  // Major Countries
  {
    id: 'india',
    name: 'india',
    displayName: 'India',
    lat: 20.5937,
    lng: 78.9629,
    type: 'country',
  },
  {
    id: 'united-states',
    name: 'united states',
    displayName: 'United States',
    lat: 37.0902,
    lng: -95.7129,
    type: 'country',
  },
  {
    id: 'usa',
    name: 'usa',
    displayName: 'United States',
    lat: 37.0902,
    lng: -95.7129,
    type: 'country',
  },
  {
    id: 'china',
    name: 'china',
    displayName: 'China',
    lat: 35.8617,
    lng: 104.1954,
    type: 'country',
  },
  {
    id: 'brazil',
    name: 'brazil',
    displayName: 'Brazil',
    lat: -14.2350,
    lng: -51.9253,
    type: 'country',
  },
  {
    id: 'russia',
    name: 'russia',
    displayName: 'Russia',
    lat: 61.5240,
    lng: 105.3188,
    type: 'country',
  },
  {
    id: 'canada',
    name: 'canada',
    displayName: 'Canada',
    lat: 56.1304,
    lng: -106.3468,
    type: 'country',
  },
  {
    id: 'australia',
    name: 'australia',
    displayName: 'Australia',
    lat: -25.2744,
    lng: 133.7751,
    type: 'country',
  },
  {
    id: 'japan',
    name: 'japan',
    displayName: 'Japan',
    lat: 36.2048,
    lng: 138.2529,
    type: 'country',
  },
  {
    id: 'germany',
    name: 'germany',
    displayName: 'Germany',
    lat: 51.1657,
    lng: 10.4515,
    type: 'country',
  },
  {
    id: 'france',
    name: 'france',
    displayName: 'France',
    lat: 46.2276,
    lng: 2.2137,
    type: 'country',
  },
  {
    id: 'united-kingdom',
    name: 'united kingdom',
    displayName: 'United Kingdom',
    lat: 55.3781,
    lng: -3.4360,
    type: 'country',
  },
  {
    id: 'uk',
    name: 'uk',
    displayName: 'United Kingdom',
    lat: 55.3781,
    lng: -3.4360,
    type: 'country',
  },
  {
    id: 'italy',
    name: 'italy',
    displayName: 'Italy',
    lat: 41.8719,
    lng: 12.5674,
    type: 'country',
  },
  {
    id: 'spain',
    name: 'spain',
    displayName: 'Spain',
    lat: 40.4637,
    lng: -3.7492,
    type: 'country',
  },
  {
    id: 'mexico',
    name: 'mexico',
    displayName: 'Mexico',
    lat: 23.6345,
    lng: -102.5528,
    type: 'country',
  },
  {
    id: 'south-africa',
    name: 'south africa',
    displayName: 'South Africa',
    lat: -30.5595,
    lng: 22.9375,
    type: 'country',
  },
  {
    id: 'egypt',
    name: 'egypt',
    displayName: 'Egypt',
    lat: 26.8206,
    lng: 30.8025,
    type: 'country',
  },
  {
    id: 'nigeria',
    name: 'nigeria',
    displayName: 'Nigeria',
    lat: 9.0820,
    lng: 8.6753,
    type: 'country',
  },
  {
    id: 'argentina',
    name: 'argentina',
    displayName: 'Argentina',
    lat: -38.4161,
    lng: -63.6167,
    type: 'country',
  },
  {
    id: 'indonesia',
    name: 'indonesia',
    displayName: 'Indonesia',
    lat: -0.7893,
    lng: 113.9213,
    type: 'country',
  },
  {
    id: 'thailand',
    name: 'thailand',
    displayName: 'Thailand',
    lat: 15.8700,
    lng: 100.9925,
    type: 'country',
  },
  {
    id: 'turkey',
    name: 'turkey',
    displayName: 'Turkey',
    lat: 38.9637,
    lng: 35.2433,
    type: 'country',
  },
  {
    id: 'saudi-arabia',
    name: 'saudi arabia',
    displayName: 'Saudi Arabia',
    lat: 23.8859,
    lng: 45.0792,
    type: 'country',
  },
  {
    id: 'south-korea',
    name: 'south korea',
    displayName: 'South Korea',
    lat: 35.9078,
    lng: 127.7669,
    type: 'country',
  },
  {
    id: 'new-zealand',
    name: 'new zealand',
    displayName: 'New Zealand',
    lat: -40.9006,
    lng: 174.8860,
    type: 'country',
  },
  // US States
  {
    id: 'california',
    name: 'california',
    displayName: 'California',
    lat: 36.7783,
    lng: -119.4179,
    type: 'state',
  },
  {
    id: 'texas',
    name: 'texas',
    displayName: 'Texas',
    lat: 31.9686,
    lng: -99.9018,
    type: 'state',
  },
  {
    id: 'florida',
    name: 'florida',
    displayName: 'Florida',
    lat: 27.6648,
    lng: -81.5158,
    type: 'state',
  },
  {
    id: 'new-york',
    name: 'new york',
    displayName: 'New York',
    lat: 42.1657,
    lng: -74.9481,
    type: 'state',
  },
  {
    id: 'alaska',
    name: 'alaska',
    displayName: 'Alaska',
    lat: 64.2008,
    lng: -149.4937,
    type: 'state',
  },
  {
    id: 'hawaii',
    name: 'hawaii',
    displayName: 'Hawaii',
    lat: 19.8968,
    lng: -155.5828,
    type: 'state',
  },
  {
    id: 'washington',
    name: 'washington',
    displayName: 'Washington',
    lat: 47.7511,
    lng: -120.7401,
    type: 'state',
  },
  {
    id: 'oregon',
    name: 'oregon',
    displayName: 'Oregon',
    lat: 43.8041,
    lng: -120.5542,
    type: 'state',
  },
  {
    id: 'arizona',
    name: 'arizona',
    displayName: 'Arizona',
    lat: 34.0489,
    lng: -111.0937,
    type: 'state',
  },
  {
    id: 'nevada',
    name: 'nevada',
    displayName: 'Nevada',
    lat: 38.8026,
    lng: -116.4194,
    type: 'state',
  },
  {
    id: 'colorado',
    name: 'colorado',
    displayName: 'Colorado',
    lat: 39.5501,
    lng: -105.7821,
    type: 'state',
  },
  {
    id: 'massachusetts',
    name: 'massachusetts',
    displayName: 'Massachusetts',
    lat: 42.4072,
    lng: -71.3824,
    type: 'state',
  },
  {
    id: 'illinois',
    name: 'illinois',
    displayName: 'Illinois',
    lat: 40.6331,
    lng: -89.3985,
    type: 'state',
  },
  {
    id: 'pennsylvania',
    name: 'pennsylvania',
    displayName: 'Pennsylvania',
    lat: 41.2033,
    lng: -77.1945,
    type: 'state',
  },
  {
    id: 'georgia',
    name: 'georgia',
    displayName: 'Georgia',
    lat: 32.1656,
    lng: -82.9001,
    type: 'state',
  },
  {
    id: 'north-carolina',
    name: 'north carolina',
    displayName: 'North Carolina',
    lat: 35.7596,
    lng: -79.0193,
    type: 'state',
  },
  {
    id: 'virginia',
    name: 'virginia',
    displayName: 'Virginia',
    lat: 37.4316,
    lng: -78.6569,
    type: 'state',
  },
  {
    id: 'michigan',
    name: 'michigan',
    displayName: 'Michigan',
    lat: 44.3148,
    lng: -85.6024,
    type: 'state',
  },
  {
    id: 'ohio',
    name: 'ohio',
    displayName: 'Ohio',
    lat: 40.4173,
    lng: -82.9071,
    type: 'state',
  },
  {
    id: 'louisiana',
    name: 'louisiana',
    displayName: 'Louisiana',
    lat: 30.9843,
    lng: -91.9623,
    type: 'state',
  },
];

/**
 * Find a country or state by name with case-insensitive, trimmed, and partial matching
 */
export function findCountryStateByName(searchTerm: string): CountryStateData | null {
  // Normalize: trim, collapse whitespace, lowercase
  const normalized = searchTerm.toLowerCase().trim().replace(/\s+/g, ' ');
  
  // Direct match
  for (const location of countryStateDataset) {
    if (location.name === normalized || location.displayName.toLowerCase() === normalized) {
      return location;
    }
  }
  
  // Partial match - check if search term is contained in name or vice versa
  for (const location of countryStateDataset) {
    if (location.name.includes(normalized) || normalized.includes(location.name)) {
      return location;
    }
  }
  
  // Check display name partial match
  for (const location of countryStateDataset) {
    const displayLower = location.displayName.toLowerCase();
    if (displayLower.includes(normalized) || normalized.includes(displayLower)) {
      return location;
    }
  }
  
  return null;
}
