// Built-in sea and ocean dataset with representative coordinates
// Provides location data for major seas and oceans

export interface SeaOceanData {
  id: string;
  name: string;
  displayName: string;
  lat: number;
  lng: number;
  type: 'ocean' | 'sea';
}

export const seaOceanDataset: SeaOceanData[] = [
  // Major Oceans
  {
    id: 'pacific-ocean',
    name: 'pacific ocean',
    displayName: 'Pacific Ocean',
    lat: 0,
    lng: -160,
    type: 'ocean',
  },
  {
    id: 'atlantic-ocean',
    name: 'atlantic ocean',
    displayName: 'Atlantic Ocean',
    lat: 0,
    lng: -30,
    type: 'ocean',
  },
  {
    id: 'indian-ocean',
    name: 'indian ocean',
    displayName: 'Indian Ocean',
    lat: -20,
    lng: 80,
    type: 'ocean',
  },
  {
    id: 'arctic-ocean',
    name: 'arctic ocean',
    displayName: 'Arctic Ocean',
    lat: 75,
    lng: 0,
    type: 'ocean',
  },
  {
    id: 'southern-ocean',
    name: 'southern ocean',
    displayName: 'Southern Ocean',
    lat: -60,
    lng: 0,
    type: 'ocean',
  },
  // Major Seas
  {
    id: 'mediterranean-sea',
    name: 'mediterranean sea',
    displayName: 'Mediterranean Sea',
    lat: 35,
    lng: 18,
    type: 'sea',
  },
  {
    id: 'caribbean-sea',
    name: 'caribbean sea',
    displayName: 'Caribbean Sea',
    lat: 15,
    lng: -75,
    type: 'sea',
  },
  {
    id: 'red-sea',
    name: 'red sea',
    displayName: 'Red Sea',
    lat: 22,
    lng: 38,
    type: 'sea',
  },
  {
    id: 'black-sea',
    name: 'black sea',
    displayName: 'Black Sea',
    lat: 43,
    lng: 35,
    type: 'sea',
  },
  {
    id: 'north-sea',
    name: 'north sea',
    displayName: 'North Sea',
    lat: 56,
    lng: 3,
    type: 'sea',
  },
  {
    id: 'baltic-sea',
    name: 'baltic sea',
    displayName: 'Baltic Sea',
    lat: 58,
    lng: 20,
    type: 'sea',
  },
  {
    id: 'arabian-sea',
    name: 'arabian sea',
    displayName: 'Arabian Sea',
    lat: 15,
    lng: 65,
    type: 'sea',
  },
  {
    id: 'south-china-sea',
    name: 'south china sea',
    displayName: 'South China Sea',
    lat: 12,
    lng: 115,
    type: 'sea',
  },
  {
    id: 'bering-sea',
    name: 'bering sea',
    displayName: 'Bering Sea',
    lat: 58,
    lng: -175,
    type: 'sea',
  },
  {
    id: 'coral-sea',
    name: 'coral sea',
    displayName: 'Coral Sea',
    lat: -18,
    lng: 155,
    type: 'sea',
  },
  {
    id: 'tasman-sea',
    name: 'tasman sea',
    displayName: 'Tasman Sea',
    lat: -40,
    lng: 160,
    type: 'sea',
  },
  {
    id: 'java-sea',
    name: 'java sea',
    displayName: 'Java Sea',
    lat: -5,
    lng: 110,
    type: 'sea',
  },
  {
    id: 'andaman-sea',
    name: 'andaman sea',
    displayName: 'Andaman Sea',
    lat: 10,
    lng: 96,
    type: 'sea',
  },
  {
    id: 'gulf-of-mexico',
    name: 'gulf of mexico',
    displayName: 'Gulf of Mexico',
    lat: 25,
    lng: -90,
    type: 'sea',
  },
  {
    id: 'persian-gulf',
    name: 'persian gulf',
    displayName: 'Persian Gulf',
    lat: 27,
    lng: 51,
    type: 'sea',
  },
];

/**
 * Find a sea or ocean by name with case-insensitive, trimmed, and partial matching
 */
export function findSeaOceanByName(searchTerm: string): SeaOceanData | null {
  // Normalize: trim, collapse whitespace, lowercase
  const normalized = searchTerm.toLowerCase().trim().replace(/\s+/g, ' ');
  
  // Direct match
  for (const location of seaOceanDataset) {
    if (location.name === normalized || location.displayName.toLowerCase() === normalized) {
      return location;
    }
  }
  
  // Partial match - check if search term is contained in name or vice versa
  for (const location of seaOceanDataset) {
    if (location.name.includes(normalized) || normalized.includes(location.name)) {
      return location;
    }
  }
  
  // Check display name partial match
  for (const location of seaOceanDataset) {
    const displayLower = location.displayName.toLowerCase();
    if (displayLower.includes(normalized) || normalized.includes(displayLower)) {
      return location;
    }
  }
  
  return null;
}
