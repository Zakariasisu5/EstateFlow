import { useEffect, useRef, useState } from 'react';
import { Property } from '@/data/dummyProperties';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, School, ShoppingBag, Bus, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

declare global {
  interface Window {
    google: typeof google;
  }
}

interface PropertyMapProps {
  property: Property;
  apiKey?: string;
}

const PropertyMap = ({ property, apiKey }: PropertyMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [localApiKey, setLocalApiKey] = useState(apiKey || '');
  const [showApiKeyInput, setShowApiKeyInput] = useState(!apiKey);
  const [mapError, setMapError] = useState(false);

  const initializeMap = () => {
    if (!mapRef.current || !localApiKey || mapError) return;

    try {
      // Load Google Maps script
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${localApiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onerror = () => {
          setMapError(true);
        };
        script.onload = () => {
          createMap();
        };
        document.head.appendChild(script);
      } else {
        createMap();
      }
    } catch (error) {
      setMapError(true);
    }
  };

  const createMap = () => {
    if (!mapRef.current || !window.google) return;

    const newMap = new google.maps.Map(mapRef.current, {
      center: property.coordinates,
      zoom: 14,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
    });

    setMap(newMap);

    // Add property marker
    new google.maps.Marker({
      position: property.coordinates,
      map: newMap,
      title: property.title,
      icon: {
        url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
        scaledSize: new google.maps.Size(40, 40),
      },
    });

    // Add nearby schools markers
    property.nearbyPlaces.schools.forEach((school, index) => {
      const schoolCoords = {
        lat: property.coordinates.lat + (Math.random() - 0.5) * 0.02,
        lng: property.coordinates.lng + (Math.random() - 0.5) * 0.02,
      };
      
      new google.maps.Marker({
        position: schoolCoords,
        map: newMap,
        title: school,
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          scaledSize: new google.maps.Size(32, 32),
        },
      });
    });

    // Add nearby malls markers
    property.nearbyPlaces.malls.forEach((mall, index) => {
      const mallCoords = {
        lat: property.coordinates.lat + (Math.random() - 0.5) * 0.02,
        lng: property.coordinates.lng + (Math.random() - 0.5) * 0.02,
      };
      
      new google.maps.Marker({
        position: mallCoords,
        map: newMap,
        title: mall,
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
          scaledSize: new google.maps.Size(32, 32),
        },
      });
    });

    // Add transport markers
    property.nearbyPlaces.transport.forEach((transport, index) => {
      const transportCoords = {
        lat: property.coordinates.lat + (Math.random() - 0.5) * 0.015,
        lng: property.coordinates.lng + (Math.random() - 0.5) * 0.015,
      };
      
      new google.maps.Marker({
        position: transportCoords,
        map: newMap,
        title: transport,
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
          scaledSize: new google.maps.Size(32, 32),
        },
      });
    });
  };

  useEffect(() => {
    if (localApiKey && !showApiKeyInput) {
      initializeMap();
    }
  }, [localApiKey, showApiKeyInput]);

  if (showApiKeyInput) {
    return (
      <div className="space-y-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            To display interactive maps, you'll need a Google Maps API key. Get one from{' '}
            <a
              href="https://console.cloud.google.com/google/maps-apis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Google Cloud Console
            </a>
            . For production use, we recommend connecting to Lovable Cloud to store API keys securely.
          </AlertDescription>
        </Alert>
        
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter your Google Maps API key"
            value={localApiKey}
            onChange={(e) => setLocalApiKey(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={() => {
              if (localApiKey) {
                setShowApiKeyInput(false);
                setMapError(false);
              }
            }}
            disabled={!localApiKey}
          >
            Load Map
          </Button>
        </div>

        <div className="bg-muted rounded-xl p-8 text-center space-y-4">
          <MapPin className="w-12 h-12 mx-auto text-muted-foreground" />
          <div>
            <h3 className="font-semibold mb-2">Location Preview</h3>
            <p className="text-sm text-muted-foreground">{property.location}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Coordinates: {property.coordinates.lat.toFixed(4)}, {property.coordinates.lng.toFixed(4)}
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="flex flex-col items-center gap-2">
              <School className="w-6 h-6 text-blue-500" />
              <span className="text-xs">🔵 Schools</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-green-500" />
              <span className="text-xs">🟢 Shopping</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Bus className="w-6 h-6 text-yellow-600" />
              <span className="text-xs">🟡 Transport</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mapError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load Google Maps. Please check your API key and try again.
          <Button
            variant="link"
            size="sm"
            onClick={() => {
              setShowApiKeyInput(true);
              setMapError(false);
            }}
            className="ml-2"
          >
            Re-enter API key
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div ref={mapRef} className="w-full h-96 rounded-xl overflow-hidden shadow-lg" />
      
      <div className="flex items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-red-500" />
          <span>🔴 Property</span>
        </div>
        <div className="flex items-center gap-2">
          <School className="w-4 h-4 text-blue-500" />
          <span>🔵 Schools</span>
        </div>
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-green-500" />
          <span>🟢 Shopping</span>
        </div>
        <div className="flex items-center gap-2">
          <Bus className="w-4 h-4 text-yellow-600" />
          <span>🟡 Transport</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;
