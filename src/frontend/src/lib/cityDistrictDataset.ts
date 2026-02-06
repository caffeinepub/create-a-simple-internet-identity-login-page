// Built-in city and district dataset with representative coordinates
// Provides location data for major cities and districts worldwide

export interface CityDistrictData {
  id: string;
  name: string;
  displayName: string;
  lat: number;
  lng: number;
  type: 'city' | 'district';
}

export const cityDistrictDataset: CityDistrictData[] = [
  // Major Cities
  {
    id: 'new-york',
    name: 'new york',
    displayName: 'New York',
    lat: 40.7128,
    lng: -74.0060,
    type: 'city',
  },
  {
    id: 'london',
    name: 'london',
    displayName: 'London',
    lat: 51.5074,
    lng: -0.1278,
    type: 'city',
  },
  {
    id: 'tokyo',
    name: 'tokyo',
    displayName: 'Tokyo',
    lat: 35.6762,
    lng: 139.6503,
    type: 'city',
  },
  {
    id: 'paris',
    name: 'paris',
    displayName: 'Paris',
    lat: 48.8566,
    lng: 2.3522,
    type: 'city',
  },
  {
    id: 'sydney',
    name: 'sydney',
    displayName: 'Sydney',
    lat: -33.8688,
    lng: 151.2093,
    type: 'city',
  },
  {
    id: 'mumbai',
    name: 'mumbai',
    displayName: 'Mumbai',
    lat: 19.0760,
    lng: 72.8777,
    type: 'city',
  },
  {
    id: 'dubai',
    name: 'dubai',
    displayName: 'Dubai',
    lat: 25.2048,
    lng: 55.2708,
    type: 'city',
  },
  {
    id: 'singapore',
    name: 'singapore',
    displayName: 'Singapore',
    lat: 1.3521,
    lng: 103.8198,
    type: 'city',
  },
  {
    id: 'los-angeles',
    name: 'los angeles',
    displayName: 'Los Angeles',
    lat: 34.0522,
    lng: -118.2437,
    type: 'city',
  },
  {
    id: 'miami',
    name: 'miami',
    displayName: 'Miami',
    lat: 25.7617,
    lng: -80.1918,
    type: 'city',
  },
  {
    id: 'barcelona',
    name: 'barcelona',
    displayName: 'Barcelona',
    lat: 41.3851,
    lng: 2.1734,
    type: 'city',
  },
  {
    id: 'hong-kong',
    name: 'hong kong',
    displayName: 'Hong Kong',
    lat: 22.3193,
    lng: 114.1694,
    type: 'city',
  },
  {
    id: 'cape-town',
    name: 'cape town',
    displayName: 'Cape Town',
    lat: -33.9249,
    lng: 18.4241,
    type: 'city',
  },
  {
    id: 'rio-de-janeiro',
    name: 'rio de janeiro',
    displayName: 'Rio de Janeiro',
    lat: -22.9068,
    lng: -43.1729,
    type: 'city',
  },
  {
    id: 'istanbul',
    name: 'istanbul',
    displayName: 'Istanbul',
    lat: 41.0082,
    lng: 28.9784,
    type: 'city',
  },
  // Major Districts
  {
    id: 'manhattan',
    name: 'manhattan',
    displayName: 'Manhattan',
    lat: 40.7831,
    lng: -73.9712,
    type: 'district',
  },
  {
    id: 'brooklyn',
    name: 'brooklyn',
    displayName: 'Brooklyn',
    lat: 40.6782,
    lng: -73.9442,
    type: 'district',
  },
  {
    id: 'westminster',
    name: 'westminster',
    displayName: 'Westminster',
    lat: 51.4975,
    lng: -0.1357,
    type: 'district',
  },
  {
    id: 'shibuya',
    name: 'shibuya',
    displayName: 'Shibuya',
    lat: 35.6595,
    lng: 139.7004,
    type: 'district',
  },
  {
    id: 'montmartre',
    name: 'montmartre',
    displayName: 'Montmartre',
    lat: 48.8867,
    lng: 2.3431,
    type: 'district',
  },
  {
    id: 'bondi',
    name: 'bondi',
    displayName: 'Bondi',
    lat: -33.8915,
    lng: 151.2767,
    type: 'district',
  },
  {
    id: 'marina',
    name: 'marina',
    displayName: 'Marina',
    lat: 25.0805,
    lng: 55.1396,
    type: 'district',
  },
  {
    id: 'sentosa',
    name: 'sentosa',
    displayName: 'Sentosa',
    lat: 1.2494,
    lng: 103.8303,
    type: 'district',
  },
  {
    id: 'hollywood',
    name: 'hollywood',
    displayName: 'Hollywood',
    lat: 34.0928,
    lng: -118.3287,
    type: 'district',
  },
  {
    id: 'south-beach',
    name: 'south beach',
    displayName: 'South Beach',
    lat: 25.7907,
    lng: -80.1300,
    type: 'district',
  },
];

/**
 * Find a city or district by name with case-insensitive, trimmed, and partial matching
 */
export function findCityDistrictByName(searchTerm: string): CityDistrictData | null {
  // Normalize: trim, collapse whitespace, lowercase
  const normalized = searchTerm.toLowerCase().trim().replace(/\s+/g, ' ');
  
  // Direct match
  for (const location of cityDistrictDataset) {
    if (location.name === normalized || location.displayName.toLowerCase() === normalized) {
      return location;
    }
  }
  
  // Partial match - check if search term is contained in name or vice versa
  for (const location of cityDistrictDataset) {
    if (location.name.includes(normalized) || normalized.includes(location.name)) {
      return location;
    }
  }
  
  // Check display name partial match
  for (const location of cityDistrictDataset) {
    const displayLower = location.displayName.toLowerCase();
    if (displayLower.includes(normalized) || normalized.includes(displayLower)) {
      return location;
    }
  }
  
  return null;
}
