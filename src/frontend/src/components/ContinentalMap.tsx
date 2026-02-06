import { useState } from 'react';

interface ContinentalMapProps {
  selectedContinent: string | null;
  onSelect: (continent: string) => void;
  markerLocation?: {
    lat: number;
    lng: number;
    label: string;
  } | null;
}

export default function ContinentalMap({ selectedContinent, onSelect, markerLocation }: ContinentalMapProps) {
  const [hoveredContinent, setHoveredContinent] = useState<string | null>(null);

  const continents = [
    { id: 'africa', name: 'Africa', path: 'M520,280 L540,270 L560,275 L575,290 L580,310 L575,330 L560,350 L540,360 L520,355 L505,340 L500,320 L505,300 L520,280 Z' },
    { id: 'asia', name: 'Asia', path: 'M580,180 L650,170 L720,180 L750,200 L760,230 L750,260 L720,280 L680,290 L640,285 L600,270 L580,250 L570,220 L580,180 Z' },
    { id: 'europe', name: 'Europe', path: 'M480,160 L520,150 L560,155 L580,170 L575,190 L560,200 L530,205 L500,200 L480,185 L480,160 Z' },
    { id: 'north-america', name: 'North America', path: 'M180,140 L250,130 L300,140 L330,160 L340,190 L330,220 L300,240 L260,250 L220,245 L180,230 L160,200 L170,170 L180,140 Z' },
    { id: 'south-america', name: 'South America', path: 'M280,280 L320,270 L340,280 L350,310 L345,350 L330,390 L310,410 L290,405 L275,380 L270,340 L275,310 L280,280 Z' },
    { id: 'oceania', name: 'Oceania', path: 'M720,340 L760,335 L790,345 L800,365 L790,385 L760,390 L730,385 L715,370 L720,340 Z' },
  ];

  const getPathStyle = (continentId: string) => {
    const isSelected = selectedContinent === continentId;
    const isHovered = hoveredContinent === continentId;

    if (isSelected) {
      return {
        fill: 'transparent',
        stroke: 'hsl(var(--ocean-bright))',
        strokeWidth: 3,
        opacity: 0.8,
      };
    }

    if (isHovered) {
      return {
        fill: 'transparent',
        stroke: 'hsl(var(--ocean-accent))',
        strokeWidth: 2,
        opacity: 0.6,
      };
    }

    return {
      fill: 'transparent',
      stroke: 'transparent',
      strokeWidth: 0,
      opacity: 0,
    };
  };

  // Convert lat/lng to SVG coordinates
  // SVG viewBox: 960x540, representing roughly -180 to 180 lng, -90 to 90 lat
  const latLngToSvg = (lat: number, lng: number): { x: number; y: number } => {
    // Mercator-like projection
    const x = ((lng + 180) / 360) * 960;
    const y = ((90 - lat) / 180) * 540;
    return { x, y };
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ocean-deep to-ocean-mid rounded-lg overflow-hidden relative">
      {/* Professional world map image as base layer */}
      <img 
        src="/assets/generated/world-map-professional-labeled.dim_2400x1200.png" 
        alt="World Map"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectFit: 'cover' }}
      />
      
      {/* SVG overlay for interactions and markers */}
      <svg
        viewBox="0 0 960 540"
        className="absolute inset-0 w-full h-full"
      >
        {/* Invisible continent regions for click interaction */}
        {continents.map((continent) => (
          <g key={continent.id}>
            <path
              d={continent.path}
              {...getPathStyle(continent.id)}
              className="cursor-pointer transition-all duration-200"
              onMouseEnter={() => setHoveredContinent(continent.id)}
              onMouseLeave={() => setHoveredContinent(null)}
              onClick={() => onSelect(continent.id)}
            />
            {(hoveredContinent === continent.id || selectedContinent === continent.id) && (
              <text
                x={continent.id === 'africa' ? 540 : 
                   continent.id === 'asia' ? 670 :
                   continent.id === 'europe' ? 520 :
                   continent.id === 'north-america' ? 260 :
                   continent.id === 'south-america' ? 310 :
                   760}
                y={continent.id === 'africa' ? 320 :
                   continent.id === 'asia' ? 230 :
                   continent.id === 'europe' ? 180 :
                   continent.id === 'north-america' ? 190 :
                   continent.id === 'south-america' ? 340 :
                   365}
                textAnchor="middle"
                fill="hsl(var(--ocean-bright))"
                fontSize="14"
                fontWeight="bold"
                className="pointer-events-none"
                style={{ textShadow: '0 0 4px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.7)' }}
              >
                {continent.name}
              </text>
            )}
          </g>
        ))}

        {/* Red marker for searched location */}
        {markerLocation && (
          <g>
            {/* Outer red circle with glow */}
            <circle
              cx={latLngToSvg(markerLocation.lat, markerLocation.lng).x}
              cy={latLngToSvg(markerLocation.lat, markerLocation.lng).y}
              r="12"
              fill="#ff0000"
              stroke="#ffffff"
              strokeWidth="3"
              opacity="0.9"
              className="animate-pulse"
            />
            {/* Inner white center */}
            <circle
              cx={latLngToSvg(markerLocation.lat, markerLocation.lng).x}
              cy={latLngToSvg(markerLocation.lat, markerLocation.lng).y}
              r="5"
              fill="#ffffff"
              opacity="1"
            />
            {/* Label with strong shadow for visibility */}
            <text
              x={latLngToSvg(markerLocation.lat, markerLocation.lng).x}
              y={latLngToSvg(markerLocation.lat, markerLocation.lng).y - 20}
              textAnchor="middle"
              fill="#ff0000"
              fontSize="13"
              fontWeight="bold"
              className="pointer-events-none"
              style={{ 
                textShadow: '0 0 4px rgba(0,0,0,1), 0 0 8px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.8)',
                stroke: '#ffffff',
                strokeWidth: '0.5px',
                paintOrder: 'stroke fill'
              }}
            >
              {markerLocation.label}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
