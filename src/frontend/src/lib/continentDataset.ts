// Built-in continent-level environmental data
// Provides sample values when API keys are not available

export interface ContinentData {
  id: string;
  name: string;
  displayName: string;
  temperature: number;
  pH: number;
  turbidity: number;
  oxygen: number;
  lat: number;
  lng: number;
  source: string;
}

export const continentDataset: Record<string, ContinentData> = {
  'africa': {
    id: 'africa',
    name: 'africa',
    displayName: 'African Coastal Waters',
    temperature: 24.5,
    pH: 8.1,
    turbidity: 4.2,
    oxygen: 6.8,
    lat: -5,
    lng: 20,
    source: 'Sample dataset',
  },
  'asia': {
    id: 'asia',
    name: 'asia',
    displayName: 'Asian Pacific Waters',
    temperature: 26.8,
    pH: 8.2,
    turbidity: 3.5,
    oxygen: 6.5,
    lat: 25,
    lng: 110,
    source: 'Sample dataset',
  },
  'europe': {
    id: 'europe',
    name: 'europe',
    displayName: 'European Atlantic Waters',
    temperature: 14.2,
    pH: 8.0,
    turbidity: 2.8,
    oxygen: 8.2,
    lat: 50,
    lng: 10,
    source: 'Sample dataset',
  },
  'north-america': {
    id: 'north-america',
    name: 'north america',
    displayName: 'North American Coastal Waters',
    temperature: 18.5,
    pH: 8.1,
    turbidity: 3.2,
    oxygen: 7.5,
    lat: 40,
    lng: -100,
    source: 'Sample dataset',
  },
  'south-america': {
    id: 'south-america',
    name: 'south america',
    displayName: 'South American Coastal Waters',
    temperature: 23.8,
    pH: 8.0,
    turbidity: 5.1,
    oxygen: 6.9,
    lat: -15,
    lng: -60,
    source: 'Sample dataset',
  },
  'oceania': {
    id: 'oceania',
    name: 'oceania',
    displayName: 'Oceania Pacific Waters',
    temperature: 25.2,
    pH: 8.2,
    turbidity: 2.5,
    oxygen: 7.1,
    lat: -25,
    lng: 140,
    source: 'Sample dataset',
  },
};

export function findContinentByName(searchTerm: string): ContinentData | null {
  const normalized = searchTerm.toLowerCase().trim();
  
  // Direct match
  for (const continent of Object.values(continentDataset)) {
    if (continent.name === normalized || continent.displayName.toLowerCase().includes(normalized)) {
      return continent;
    }
  }
  
  // Partial match
  for (const continent of Object.values(continentDataset)) {
    if (continent.name.includes(normalized) || normalized.includes(continent.name)) {
      return continent;
    }
  }
  
  return null;
}
