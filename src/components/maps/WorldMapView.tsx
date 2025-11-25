import { useEffect, useRef, useState } from "react";
import { dummyProperties } from "@/data/dummyProperties";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

interface WindowWithInit extends Window {
  initMap?: () => void;
}

const WorldMapView = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [localApiKey, setLocalApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);
  const [mapError, setMapError] = useState(false);
  const clustererRef = useRef<MarkerClusterer | null>(null);

  const initializeMap = () => {
    if (!localApiKey) return;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${localApiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;

    (window as WindowWithInit).initMap = () => {
      createMap();
    };

    script.onerror = () => {
      setMapError(true);
    };

    if (!document.querySelector(`script[src*="maps.googleapis.com"]`)) {
      document.head.appendChild(script);
    } else {
      createMap();
    }
  };

  const createMap = () => {
    if (!mapRef.current || !window.google) return;

    try {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        zoom: 2,
        center: { lat: 20, lng: 0 },
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      });

      setMap(mapInstance);

      // Create markers for all properties
      const markers = dummyProperties.map((property) => {
        const marker = new window.google.maps.Marker({
          position: property.coordinates,
          map: mapInstance,
          title: property.title,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#4db5ff",
            fillOpacity: 0.9,
            strokeColor: "#fff",
            strokeWeight: 2,
          },
        });

        // Info window for each property
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; max-width: 200px;">
              <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #1f1f3b;">${property.title}</h3>
              <p style="margin: 4px 0; font-size: 12px; color: #666;">
                <strong>📍 ${property.city}, ${property.country}</strong>
              </p>
              <p style="margin: 4px 0; font-size: 12px; color: #666;">
                <strong>💰 ${property.price}</strong>
              </p>
              <p style="margin: 4px 0; font-size: 12px; color: #666;">
                🛏️ ${property.bedrooms} beds | 🚿 ${property.bathrooms} baths
              </p>
            </div>
          `,
        });

        marker.addListener("click", () => {
          infoWindow.open(mapInstance, marker);
        });

        return marker;
      });

      // Add marker clustering
      clustererRef.current = new MarkerClusterer({
        map: mapInstance,
        markers,
        algorithmOptions: {
          maxZoom: 15,
        },
      });

      setMapError(false);
    } catch (error) {
      console.error("Map creation error:", error);
      setMapError(true);
    }
  };

  useEffect(() => {
    if (localApiKey && !showApiKeyInput) {
      initializeMap();
    }
  }, [localApiKey, showApiKeyInput]);

  const handleZoomIn = () => {
    if (map) {
      map.setZoom(map.getZoom() + 1);
    }
  };

  const handleZoomOut = () => {
    if (map) {
      map.setZoom(map.getZoom() - 1);
    }
  };

  const handleResetView = () => {
    if (map) {
      map.setZoom(2);
      map.setCenter({ lat: 20, lng: 0 });
    }
  };

  if (showApiKeyInput) {
    return (
      <div className="w-full h-screen flex items-center justify-center p-4">
        <Alert className="max-w-md">
          <MapPin className="h-4 w-4" />
          <AlertDescription>
            <p className="mb-4">
              Please enter your Google Maps API key to view the world map.
            </p>
            <p className="mb-4 text-sm text-light">
              Get your API key from{" "}
              <a
                href="https://console.cloud.google.com/google/maps-apis"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Google Cloud Console
              </a>
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="text"
                placeholder="Enter API key"
                value={localApiKey}
                onChange={(e) => setLocalApiKey(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={() => localApiKey && setShowApiKeyInput(false)}
                disabled={!localApiKey}
              >
                Load Map
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (mapError) {
    return (
      <div className="w-full h-screen flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>
            <p className="mb-4">
              Failed to load Google Maps. Please check your API key and try
              again.
            </p>
            <Button onClick={() => setShowApiKeyInput(true)}>
              Re-enter API Key
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Custom Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <Button
          onClick={handleZoomIn}
          size="icon"
          className="bg-white hover:bg-white/90 text-primary shadow-lg"
          title="Zoom In"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          onClick={handleZoomOut}
          size="icon"
          className="bg-white hover:bg-white/90 text-primary shadow-lg"
          title="Zoom Out"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          onClick={handleResetView}
          size="icon"
          className="bg-white hover:bg-white/90 text-primary shadow-lg"
          title="Reset View"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Property Count */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 z-10">
        <p className="text-sm font-semibold text-primary">
          🌍 {dummyProperties.length} Properties Worldwide
        </p>
      </div>
    </div>
  );
};

export default WorldMapView;
