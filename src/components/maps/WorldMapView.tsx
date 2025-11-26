import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { dummyProperties } from "@/data/dummyProperties";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import L from "leaflet";
import "leaflet.markercluster";

// Fix for default marker icons in Leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom marker icon with primary color
const customIcon = new L.Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(`
    <svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 11 16 26 16 26s16-15 16-26C32 7.163 24.837 0 16 0z" fill="#4db5ff"/>
      <circle cx="16" cy="16" r="6" fill="white"/>
    </svg>
  `)}`,
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -42],
});

// Component for map controls
const MapControls = () => {
  const map = useMap();

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  const handleResetView = () => {
    map.setView([20, 0], 2);
  };

  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
      <Button
        onClick={handleZoomIn}
        size="icon"
        className="bg-background hover:bg-background/90 text-primary shadow-lg border border-border"
        title="Zoom In"
      >
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button
        onClick={handleZoomOut}
        size="icon"
        className="bg-background hover:bg-background/90 text-primary shadow-lg border border-border"
        title="Zoom Out"
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
      <Button
        onClick={handleResetView}
        size="icon"
        className="bg-background hover:bg-background/90 text-primary shadow-lg border border-border"
        title="Reset View"
      >
        <Maximize2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

// Component to handle marker clustering
const MarkerClusterGroup = () => {
  const map = useMap();

  useEffect(() => {
    // Create marker cluster group
    const markers = L.markerClusterGroup({
      maxClusterRadius: 60,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
    });

    // Add markers to cluster group
    dummyProperties.forEach((property) => {
      const marker = L.marker([property.coordinates.lat, property.coordinates.lng], {
        icon: customIcon,
      });

      // Create popup content
      const popupContent = `
        <div style="padding: 8px; max-width: 200px;">
          <h3 style="margin-bottom: 8px; font-size: 14px; font-weight: 600;">
            ${property.title}
          </h3>
          <p style="margin: 4px 0; font-size: 12px;">
            <strong>📍 ${property.city}, ${property.country}</strong>
          </p>
          <p style="margin: 4px 0; font-size: 12px;">
            <strong>💰 ${property.price}</strong>
          </p>
          <p style="font-size: 12px;">
            🛏️ ${property.bedrooms} beds | 🚿 ${property.bathrooms} baths
          </p>
        </div>
      `;

      marker.bindPopup(popupContent);
      markers.addLayer(marker);
    });

    // Add cluster group to map
    map.addLayer(markers);

    // Cleanup on unmount
    return () => {
      map.removeLayer(markers);
    };
  }, [map]);

  return null;
};

const WorldMapView = () => {
  return (
    <div className="relative w-full h-screen">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="w-full h-full"
        zoomControl={false}
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup />
        <MapControls />
      </MapContainer>

      {/* Property Count */}
      <div className="absolute bottom-4 left-4 bg-background rounded-lg shadow-lg p-3 z-[1000] border border-border">
        <p className="text-sm font-semibold text-primary">
          🌍 {dummyProperties.length} Properties Worldwide
        </p>
      </div>
    </div>
  );
};

export default WorldMapView;
