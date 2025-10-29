"use client";

import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Default marker icon
const DefaultIcon = L.icon({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapViewProps {
  origin: string;
  destination: string;
}

interface Location {
  name: string;
  lat: number;
  lng: number;
  description: string;
}

// Dummy coordinates for locations
const locationsMap: Record<string, { lat: number; lng: number }> = {
  Nairobi: { lat: -1.2921, lng: 36.8219 },
  Mombasa: { lat: -4.0435, lng: 39.6682 },
  Nakuru: { lat: -0.3031, lng: 36.0800 },
  Eldoret: { lat: 0.5143, lng: 35.2699 },
};

export default function MapView({ origin, destination }: MapViewProps) {
  const originCoord = locationsMap[origin] || locationsMap["Nairobi"];
  const destinationCoord = locationsMap[destination] || locationsMap["Mombasa"];

  const tripLocations: Location[] = [
    { name: origin, ...originCoord, description: "Trip Start" },
    { name: destination, ...destinationCoord, description: "Destination" },
  ];

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden">
      <MapContainer
        center={[originCoord.lat, originCoord.lng]}
        zoom={6}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {tripLocations.map((loc, idx) => (
          <Marker key={idx} position={[loc.lat, loc.lng]}>
            <Popup>
              <span className="font-semibold">{loc.name}</span>
              <br />
              {loc.description}
            </Popup>
          </Marker>
        ))}

        {/* Draw line between origin and destination */}
        <Polyline
          positions={tripLocations.map((loc) => [loc.lat, loc.lng])}
          pathOptions={{ color: "#7B1E2D", weight: 4, dashArray: "5,10" }}
        />
      </MapContainer>
    </div>
  );
}
