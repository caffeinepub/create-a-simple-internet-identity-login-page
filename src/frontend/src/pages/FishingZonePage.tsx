import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { X, Search, Fish, AlertTriangle, Waves, Activity, Droplets, Thermometer, MapPin } from 'lucide-react';
import { findSeaOceanByName } from '@/lib/seaOceanDataset';
import { findCityDistrictByName } from '@/lib/cityDistrictDataset';
import { fetchEnvironmentData } from '@/lib/environmentData';
import { computeCoralHealthIndex, getFishAvailability, getCyclonePossibility, getFloodPossibility } from '@/lib/fishingZoneHeuristics';
import ContinentalMap from '@/components/ContinentalMap';

interface FishingZonePageProps {
  onClose: () => void;
}

interface SearchResult {
  locationName: string;
  locationType: 'Sea' | 'Ocean' | 'City' | 'District';
  lat: number;
  lng: number;
  coralHealthIndex: number;
  condition: 'Good' | 'Normal' | 'Highly Polluted';
  fishAvailability: string;
  cyclonePossibility: string;
  floodPossibility: string;
  metrics: {
    temperature: number;
    temperatureEstimated: boolean;
    pH: number;
    pHEstimated: boolean;
    turbidity: number;
    turbidityEstimated: boolean;
    oxygenLevel: number;
    oxygenEstimated: boolean;
  };
  fishHotspot?: {
    lat: number;
    lng: number;
  };
}

export default function FishingZonePage({ onClose }: FishingZonePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a sea, ocean, city, or district name');
      setSearchResult(null);
      return;
    }

    setIsSearching(true);
    setError(null);
    setSearchResult(null);

    try {
      // Try to find in seas/oceans first
      const seaOcean = findSeaOceanByName(searchQuery);
      let locationName: string;
      let locationType: 'Sea' | 'Ocean' | 'City' | 'District';
      let lat: number;
      let lng: number;
      
      if (seaOcean) {
        locationName = seaOcean.displayName;
        locationType = seaOcean.type === 'ocean' ? 'Ocean' : 'Sea';
        lat = seaOcean.lat;
        lng = seaOcean.lng;
      } else {
        // Try to find in cities/districts
        const cityDistrict = findCityDistrictByName(searchQuery);
        if (cityDistrict) {
          locationName = cityDistrict.displayName;
          locationType = cityDistrict.type === 'city' ? 'City' : 'District';
          lat = cityDistrict.lat;
          lng = cityDistrict.lng;
        } else {
          setError(`"${searchQuery}" is not a recognized sea, ocean, city, or district. Please try another name.`);
          setIsSearching(false);
          return;
        }
      }

      // Fetch environmental data
      const envData = await fetchEnvironmentData(lat, lng, locationName);

      // Use fetched or fallback values
      const temperature = envData.temperature ?? 25;
      const pH = envData.pH ?? 8.1;
      const turbidity = envData.turbidity ?? 5;
      const oxygenLevel = envData.oxygenLevel ?? 7;

      // Compute coral health index and related metrics
      const { index, condition } = computeCoralHealthIndex(
        temperature,
        pH,
        turbidity,
        oxygenLevel
      );

      const fishAvailability = getFishAvailability(condition);
      const cyclonePossibility = getCyclonePossibility(temperature);
      const floodPossibility = getFloodPossibility(temperature);

      // Calculate fish hotspot for seas/oceans only
      let fishHotspot: { lat: number; lng: number } | undefined;
      if (locationType === 'Sea' || locationType === 'Ocean') {
        // Derive hotspot based on fish availability/condition
        // Use a deterministic offset based on condition
        const offset = condition === 'Good' ? 3 : condition === 'Normal' ? 2 : 1;
        fishHotspot = {
          lat: lat + offset,
          lng: lng + offset,
        };
      }

      setSearchResult({
        locationName,
        locationType,
        lat,
        lng,
        coralHealthIndex: index,
        condition,
        fishAvailability,
        cyclonePossibility,
        floodPossibility,
        metrics: {
          temperature,
          temperatureEstimated: envData.temperatureEstimated,
          pH,
          pHEstimated: envData.pHEstimated,
          turbidity,
          turbidityEstimated: envData.turbidityEstimated,
          oxygenLevel,
          oxygenEstimated: envData.oxygenEstimated,
        },
        fishHotspot,
      });
    } catch (err) {
      console.error('Error searching location:', err);
      setError('An error occurred while searching. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen baby-blue-fishing-zone-bg relative overflow-hidden">
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute top-4 right-4 z-50 text-baby-blue-text hover:text-baby-blue-accent hover:bg-baby-blue-surface/20"
      >
        <X className="h-6 w-6" />
      </Button>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-baby-blue-accent mb-2">
            Fishing Zone
          </h1>
          <p className="text-baby-blue-text text-lg">
            Search for seas, oceans, cities, and districts to check coral health and fishing conditions
          </p>
        </div>

        {/* Search Section */}
        <Card className="max-w-2xl mx-auto mb-8 bg-baby-blue-card/90 backdrop-blur-sm border-baby-blue-border">
          <CardHeader>
            <CardTitle className="text-baby-blue-text flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Locations
            </CardTitle>
            <CardDescription className="text-baby-blue-text/70">
              Enter the name of a sea, ocean, city, or district to view fishing zone information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="e.g., Pacific Ocean, Mediterranean Sea, Miami, Manhattan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-background/50"
              />
              <Button
                onClick={handleSearch}
                disabled={isSearching}
                className="bg-baby-blue-accent hover:bg-baby-blue-bright text-white"
              >
                {isSearching ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Alert variant="destructive" className="max-w-2xl mx-auto mb-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Search Results */}
        {searchResult && (
          <div className="max-w-4xl mx-auto space-y-6 mb-8">
            {/* Location Info */}
            <Card className="bg-baby-blue-card/90 backdrop-blur-sm border-baby-blue-border">
              <CardHeader>
                <CardTitle className="text-baby-blue-text flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-baby-blue-accent" />
                  {searchResult.locationName}
                  <Badge variant="outline" className="ml-2 text-baby-blue-accent border-baby-blue-accent">
                    {searchResult.locationType}
                  </Badge>
                </CardTitle>
              </CardHeader>
            </Card>

            {/* Environmental Metrics */}
            <Card className="bg-baby-blue-card/90 backdrop-blur-sm border-baby-blue-border">
              <CardHeader>
                <CardTitle className="text-baby-blue-text flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-baby-blue-accent" />
                  Environmental Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm text-baby-blue-text/70">
                      <Thermometer className="h-4 w-4" />
                      Temperature
                    </div>
                    <div className="text-2xl font-bold text-baby-blue-text">
                      {searchResult.metrics.temperature.toFixed(1)}°C
                    </div>
                    {searchResult.metrics.temperatureEstimated && (
                      <Badge variant="secondary" className="text-xs">Estimated</Badge>
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-baby-blue-text/70">pH Level</div>
                    <div className="text-2xl font-bold text-baby-blue-text">
                      {searchResult.metrics.pH.toFixed(1)}
                    </div>
                    {searchResult.metrics.pHEstimated && (
                      <Badge variant="secondary" className="text-xs">Estimated</Badge>
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-baby-blue-text/70">Turbidity</div>
                    <div className="text-2xl font-bold text-baby-blue-text">
                      {searchResult.metrics.turbidity.toFixed(1)} NTU
                    </div>
                    {searchResult.metrics.turbidityEstimated && (
                      <Badge variant="secondary" className="text-xs">Estimated</Badge>
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-baby-blue-text/70">Oxygen Level</div>
                    <div className="text-2xl font-bold text-baby-blue-text">
                      {searchResult.metrics.oxygenLevel.toFixed(1)} mg/L
                    </div>
                    {searchResult.metrics.oxygenEstimated && (
                      <Badge variant="secondary" className="text-xs">Estimated</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Coral Health Index */}
            <Card className="bg-baby-blue-card/90 backdrop-blur-sm border-baby-blue-border">
              <CardHeader>
                <CardTitle className="text-baby-blue-text flex items-center gap-2">
                  <Activity className="h-5 w-5 text-coral" />
                  Coral Health Index
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-baby-blue-text">Health Index:</span>
                    <span className="text-3xl font-bold text-baby-blue-accent">{searchResult.coralHealthIndex.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-baby-blue-text">Condition:</span>
                    <span
                      className={`text-xl font-bold px-4 py-2 rounded-lg ${
                        searchResult.condition === 'Good'
                          ? 'bg-green-500/20 text-green-600'
                          : searchResult.condition === 'Normal'
                          ? 'bg-yellow-500/20 text-yellow-600'
                          : 'bg-red-500/20 text-red-600'
                      }`}
                    >
                      {searchResult.condition}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fish Availability */}
            {(searchResult.locationType === 'Sea' || searchResult.locationType === 'Ocean') && (
              <Card className="bg-baby-blue-card/90 backdrop-blur-sm border-baby-blue-border">
                <CardHeader>
                  <CardTitle className="text-baby-blue-text flex items-center gap-2">
                    <Fish className="h-5 w-5 text-baby-blue-accent" />
                    Fish Availability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-baby-blue-text text-lg">{searchResult.fishAvailability}</p>
                </CardContent>
              </Card>
            )}

            {/* City/District Note */}
            {(searchResult.locationType === 'City' || searchResult.locationType === 'District') && (
              <Alert className="bg-baby-blue-card/90 border-baby-blue-border">
                <Fish className="h-4 w-4 text-baby-blue-accent" />
                <AlertTitle className="text-baby-blue-text">Fish Hotspot Information</AlertTitle>
                <AlertDescription className="text-baby-blue-text/70">
                  Fish hotspot highlighting applies to seas and oceans only. For cities and districts, environmental metrics are shown based on nearby water bodies.
                </AlertDescription>
              </Alert>
            )}

            {/* Cyclone and Flood Possibility */}
            <Card className="bg-baby-blue-card/90 backdrop-blur-sm border-baby-blue-border">
              <CardHeader>
                <CardTitle className="text-baby-blue-text flex items-center gap-2">
                  <Waves className="h-5 w-5 text-baby-blue-accent" />
                  Weather Hazards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-baby-blue-text">Cyclone Possibility:</span>
                    <span className="text-lg text-baby-blue-accent">{searchResult.cyclonePossibility}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-baby-blue-text">Flood Possibility:</span>
                    <span className="text-lg text-baby-blue-accent">{searchResult.floodPossibility}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* World Map with Markers */}
        <Card className="max-w-6xl mx-auto bg-baby-blue-card/90 backdrop-blur-sm border-baby-blue-border">
          <CardHeader>
            <CardTitle className="text-baby-blue-text">World Map</CardTitle>
            <CardDescription className="text-baby-blue-text/70">
              {searchResult 
                ? `Showing ${searchResult.locationName} with red marker${searchResult.fishHotspot ? ' and yellow fish hotspot marker' : ''}`
                : 'Reference map showing countries, seas, and oceans'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-hidden rounded-lg" style={{ height: '500px' }}>
              <ContinentalMap
                selectedContinent={null}
                onSelect={() => {}}
                markerLocation={searchResult ? {
                  lat: searchResult.lat,
                  lng: searchResult.lng,
                  label: searchResult.locationName,
                } : null}
                fishHotspot={searchResult?.fishHotspot}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
