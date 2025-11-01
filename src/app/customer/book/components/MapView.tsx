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
  onPickupSet: (coord: LatLng) => void;
  onDestinationSet: (coord: LatLng) => void;
  onRoute: (route: RouteInfo) => void;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

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

  /* === Initialize Map === */
  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [36.8219, -1.2921], // Nairobi
      zoom: 10,
    });

    mapRef.current = map;

    // Handle map clicks to set pickup/destination
    map.on("click", (e) => {
      const lngLat: LatLng = [e.lngLat.lng, e.lngLat.lat];
      if (clickStage === "pickup") {
        onPickupSet(lngLat);
        addMarker("pickup", lngLat);
        setClickStage("destination");
      } else {
        onDestinationSet(lngLat);
        addMarker("destination", lngLat);
        setClickStage("pickup");
      }
    });

    return () => map.remove();
  }, []);

  /* === Add Marker === */
  function addMarker(type: "pickup" | "destination", coord: LatLng) {
    const map = mapRef.current;
    if (!map) return;
    const color = type === "pickup" ? "#7B1E2D" : "#1E90FF";

    const marker = new mapboxgl.Marker({ color }).setLngLat(coord).addTo(map);

    if (type === "pickup") {
      pickupMarker?.remove();
      setPickupMarker(marker);
    } else {
      destinationMarker?.remove();
      setDestinationMarker(marker);
    }
  }

  /* === Fetch Route === */
  useEffect(() => {
    if (pickupCoord && destinationCoord) fetchRoute(pickupCoord, destinationCoord);
  }, [pickupCoord, destinationCoord]);

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

  /* === Draw Route === */
  function drawRoute(geometry: any) {
    const map = mapRef.current;
    if (!map) return;

    const sourceId = "routeLine";
    if (map.getLayer(sourceId)) {
      map.removeLayer(sourceId);
      map.removeSource(sourceId);
    }

    map.addSource(sourceId, {
      type: "geojson",
      data: { type: "Feature", geometry, properties: {} },
    });

    map.addLayer({
      id: sourceId,
      type: "line",
      source: sourceId,
      layout: { "line-join": "round", "line-cap": "round" },
      paint: { "line-color": "#7B1E2D", "line-width": 5 },
    });

    const bounds = new mapboxgl.LngLatBounds();
    geometry.coordinates.forEach((coord: LatLng) => bounds.extend(coord));
    map.fitBounds(bounds, { padding: 60 });
  }

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-xl">
      <div ref={mapContainer} className="absolute inset-0 rounded-2xl" />

      {/* === Glass UI Overlay === */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-lg text-white px-4 py-2 rounded-xl border border-white/10 text-sm shadow-lg">
        {pickupCoord && destinationCoord ? (
          <p>
            🚛 Route ready! Click <span className="text-[#F5B8B8] font-medium">Confirm Booking</span> to proceed.
          </p>
        ) : clickStage === "pickup" ? (
          <p>📍 Click on the map to set your <span className="text-[#F5B8B8] font-medium">Pickup</span> location.</p>
        ) : (
          <p>🎯 Now click to set your <span className="text-[#F5B8B8] font-medium">Destination</span>.</p>
        )}
      </div>
    </div>
  );
}
