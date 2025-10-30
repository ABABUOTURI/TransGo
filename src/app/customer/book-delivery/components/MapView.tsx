"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

type LatLng = [number, number];

interface RouteInfo {
  distanceKm?: number;
  durationMin?: number;
  geometry?: any;
  coordinates?: LatLng[];
}

interface MapViewProps {
  pickupCoord: LatLng | null;
  destinationCoord: LatLng | null;
  onPickupSet: (coord: LatLng, label?: string) => void;
  onDestinationSet: (coord: LatLng, label?: string) => void;
  onRoute: (route: RouteInfo) => void;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""; // Put your Mapbox token in .env.local

export default function MapView({
  pickupCoord,
  destinationCoord,
  onPickupSet,
  onDestinationSet,
  onRoute,
}: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [clickStage, setClickStage] = useState<"pickup" | "destination">("pickup");
  const [pickupMarker, setPickupMarker] = useState<mapboxgl.Marker | null>(null);
  const [destinationMarker, setDestinationMarker] = useState<mapboxgl.Marker | null>(null);
  const [routeLine, setRouteLine] = useState<string | null>(null);
  const [vehicleMarker, setVehicleMarker] = useState<mapboxgl.Marker | null>(null);

  /* === Initialize Map === */
  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [36.8219, -1.2921], // Default center: Nairobi
      zoom: 10,
    });

    mapRef.current = map;

    // Handle map clicks to set pickup/destination
    map.on("click", (e) => {
      const lngLat: LatLng = [e.lngLat.lng, e.lngLat.lat];

      if (clickStage === "pickup") {
        onPickupSet(lngLat);
        addOrUpdateMarker("pickup", lngLat);
        setClickStage("destination");
      } else {
        onDestinationSet(lngLat);
        addOrUpdateMarker("destination", lngLat);
        setClickStage("pickup");
      }
    });

    return () => map.remove();
  }, []);

  /* === Add or update markers === */
  function addOrUpdateMarker(type: "pickup" | "destination", coord: LatLng) {
    const map = mapRef.current;
    if (!map) return;

    const color = type === "pickup" ? "#7B1E2D" : "#1E90FF";

    if (type === "pickup") {
      if (pickupMarker) pickupMarker.remove();
      const marker = new mapboxgl.Marker({ color }).setLngLat(coord).addTo(map);
      setPickupMarker(marker);
    } else {
      if (destinationMarker) destinationMarker.remove();
      const marker = new mapboxgl.Marker({ color }).setLngLat(coord).addTo(map);
      setDestinationMarker(marker);
    }
  }

  /* === When pickup/destination coords change, draw route === */
  useEffect(() => {
    if (pickupCoord && destinationCoord) {
      fetchRoute(pickupCoord, destinationCoord);
    }
  }, [pickupCoord, destinationCoord]);

  /* === Fetch Route from Mapbox Directions API === */
  async function fetchRoute(start: LatLng, end: LatLng) {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&overview=full&access_token=${MAPBOX_TOKEN}`;

    const res = await fetch(url);
    const data = await res.json();
    const route = data.routes?.[0];

    if (!route) return;

    const coords = route.geometry.coordinates as LatLng[];
    const distanceKm = route.distance / 1000;
    const durationMin = route.duration / 60;

    onRoute({
      distanceKm: Number(distanceKm.toFixed(2)),
      durationMin: Number(durationMin.toFixed(1)),
      geometry: route.geometry,
      coordinates: coords,
    });

    drawRoute(route.geometry);
  }

  /* === Draw route on map === */
  function drawRoute(geometry: any) {
    const map = mapRef.current;
    if (!map) return;

    const sourceId = "routeLine";

    // Remove previous route
    if (map.getLayer(sourceId)) {
      map.removeLayer(sourceId);
      map.removeSource(sourceId);
    }

    map.addSource(sourceId, {
      type: "geojson",
      data: {
        type: "Feature",
        geometry,
        properties: {},        // okay if no extra properties needed
      },
      
    });

    map.addLayer({
      id: sourceId,
      type: "line",
      source: sourceId,
      layout: { "line-join": "round", "line-cap": "round" },
      paint: { "line-color": "#7B1E2D", "line-width": 5 },
    });

    setRouteLine(sourceId);

    // Fit map to route bounds
    const bounds = new mapboxgl.LngLatBounds();
    geometry.coordinates.forEach((coord: LatLng) => bounds.extend(coord));
    map.fitBounds(bounds, { padding: 60 });
  }

  /* === Simulate vehicle movement === */
  function startSimulation(routeCoords: LatLng[]) {
    const map = mapRef.current;
    if (!map) return;
    if (vehicleMarker) vehicleMarker.remove();

    const marker = new mapboxgl.Marker({ color: "#000" }).setLngLat(routeCoords[0]).addTo(map);
    setVehicleMarker(marker);

    let i = 0;
    const interval = setInterval(() => {
      if (i >= routeCoords.length) {
        clearInterval(interval);
        return;
      }
      marker.setLngLat(routeCoords[i]);
      i += 1;
    }, 500); // move every 0.5 sec
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-b-2xl" />
      <div className="absolute bottom-3 right-3 bg-white rounded-xl shadow px-3 py-2 text-sm">
        <p className="text-gray-700">
          {pickupCoord && destinationCoord
            ? "Route loaded. Click 'Confirm' to start tracking."
            : clickStage === "pickup"
            ? "Click map to set pickup location."
            : "Click map to set destination."}
        </p>
      </div>
    </div>
  );
}
