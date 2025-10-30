"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { motion } from "framer-motion";
import { Edit, MapPin } from "lucide-react";

/**
 * TripsContent (monitoring-only)
 *
 * - Single file component for Trip monitoring (no add/edit)
 * - Uses NEXT_PUBLIC_MAPBOX_TOKEN from .env.local
 * - Simulates live tracking by advancing a progress index on each Ongoing trip
 * - Robust null checks around markers and map to avoid runtime errors
 *
 * Drop into:
 * src/app/fleet/dashboard/components/TripsContent.tsx
 */

/* ---------------------- Types ---------------------- */
type LatLng = [number, number];

type Driver = {
  id: string;
  name: string;
  phone: string;
};

type Vehicle = {
  id: string;
  name: string;
  plate: string;
};

type TripStatus = "Scheduled" | "Ongoing" | "Completed" | "Cancelled";

type Trip = {
  id: string;
  vehicleId: string;
  driverId: string;
  origin: string;
  destination: string;
  status: TripStatus;
  route: LatLng[];
  progressIndex?: number;
};

/* ---------------------- Mock data ---------------------- */
const MOCK_VEHICLES: Vehicle[] = [
  { id: "v1", name: "Truck A", plate: "KAA 123A" },
  { id: "v2", name: "Van B", plate: "KBB 456B" },
  { id: "v3", name: "Lorry C", plate: "KCC 789C" },
];

const MOCK_DRIVERS: Driver[] = [
  { id: "d1", name: "John Doe", phone: "0712345678" },
  { id: "d2", name: "Jane Smith", phone: "0723456789" },
];

/* ---------------------- Helpers ---------------------- */
function makeLineRoute(start: LatLng, end: LatLng, numPoints = 40): LatLng[] {
  const coords: LatLng[] = [];
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    coords.push([start[0] + (end[0] - start[0]) * t, start[1] + (end[1] - start[1]) * t]);
  }
  return coords;
}
function jitter([lng, lat]: LatLng, meters = 0.02): LatLng {
  const dx = (Math.random() - 0.5) * meters;
  const dy = (Math.random() - 0.5) * meters;
  return [lng + dx, lat + dy];
}

/* ---------------------- Component ---------------------- */
export default function TripsContent() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Record<string, mapboxgl.Marker>>({});

  const [vehicles] = useState<Vehicle[]>(MOCK_VEHICLES);
  const [drivers] = useState<Driver[]>(MOCK_DRIVERS);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  const [trips, setTrips] = useState<Trip[]>(() => {
    const t1Route = makeLineRoute([36.8, -1.28], [36.9, -1.30], 120);
    const t2Route = makeLineRoute([36.82, -1.29], [36.78, -1.32], 120);
    return [
      {
        id: `T-${Date.now() - 100000}`,
        vehicleId: "v1",
        driverId: "d1",
        origin: "Nairobi CBD",
        destination: "Embakasi",
        status: "Ongoing",
        route: t1Route,
        progressIndex: 0,
      },
      {
        id: `T-${Date.now() - 50000}`,
        vehicleId: "v2",
        driverId: "d2",
        origin: "Westlands",
        destination: "Kilimani",
        status: "Scheduled",
        route: t2Route,
        progressIndex: 0,
      },
    ];
  });

  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

  /* ---------------------- init map ---------------------- */
  useEffect(() => {
    if (!mapContainer.current) return;

    if (!MAPBOX_TOKEN) {
      setMapError("Mapbox token missing. Add NEXT_PUBLIC_MAPBOX_TOKEN to .env.local");
      console.warn("Mapbox token missing (NEXT_PUBLIC_MAPBOX_TOKEN).");
      return;
    }

    if (mapRef.current) {
      setMapReady(true);
      return;
    }

    try {
      mapboxgl.accessToken = MAPBOX_TOKEN;
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [36.8219, -1.2921],
        zoom: 11,
      });

      map.on("load", () => {
        setMapReady(true);
        setMapError(null);
      });

      map.on("error", (ev) => {
        // log and set friendly message
        console.warn("Mapbox error event:", ev);
        setMapError("Mapbox failed to load the map style — check token & network.");
      });

      map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), "top-right");
      mapRef.current = map;
    } catch (err) {
      console.error("Mapbox init error:", err);
      setMapError("Failed to initialize Mapbox. Check token and network.");
    }

    return () => {
      if (mapRef.current) {
        try {
          mapRef.current.remove();
        } catch (e) {
          // ignore
        }
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MAPBOX_TOKEN]);

  /* ---------------------- markers & simulation ---------------------- */
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove markers for trips that were removed
    const currentIds = trips.map((t) => t.id);
    Object.keys(markersRef.current).forEach((id) => {
      if (!currentIds.includes(id)) {
        try {
          markersRef.current[id].remove();
        } catch (e) {
          // ignore if marker already removed
        }
        delete markersRef.current[id];
      }
    });

    // Ensure marker exists for each trip
    trips.forEach((trip) => {
      try {
        const existing = markersRef.current[trip.id];
        const coord = trip.route?.[trip.progressIndex ?? 0] ?? trip.route?.[0];
        if (!coord) return;

        if (!existing) {
          const el = document.createElement("div");
          el.className = "transgo-marker";
          el.style.width = "16px";
          el.style.height = "16px";
          el.style.borderRadius = "50%";
          el.style.background = trip.status === "Ongoing" ? "#7B1E2D" : "#7B1E2D80";
          el.style.boxShadow = "0 1px 6px rgba(0,0,0,0.25)";
          el.style.border = "2px solid white";

          const marker = new mapboxgl.Marker({ element: el }).setLngLat(coord as [number, number]).addTo(map);

          const popup = new mapboxgl.Popup({ offset: 12 }).setHTML(
            `<strong>Trip</strong><br/>
             ${trip.id}<br/>
             Vehicle: ${vehicles.find((v) => v.id === trip.vehicleId)?.name || trip.vehicleId}<br/>
             Driver: ${drivers.find((d) => d.id === trip.driverId)?.name || trip.driverId}<br/>
             Status: ${trip.status}`
          );
          marker.setPopup(popup);

          markersRef.current[trip.id] = marker;
        } else {
          // update element color and position safely
          const el = existing.getElement ? (existing.getElement() as HTMLElement | null) : null;
          if (el) {
            el.style.background = trip.status === "Ongoing" ? "#7B1E2D" : "#7B1E2D80";
          }
          try {
            existing.setLngLat(coord as [number, number]);
          } catch (err) {
            // sometimes underlying marker is invalid — ignore
            console.warn("Failed setLngLat on existing marker:", err);
          }
        }
      } catch (err) {
        console.warn("Marker create/update error:", err);
      }
    });

    // Simulation interval: move Ongoing trips forward
    const interval = setInterval(() => {
      setTrips((prev) =>
        prev.map((t) => {
          if (t.status !== "Ongoing") return t;
          const maxIndex = (t.route?.length ?? 1) - 1;
          const nextIndex = Math.min((t.progressIndex ?? 0) + 1, maxIndex);
          const updated = { ...t, progressIndex: nextIndex };
          // update marker immediately (defensive)
          const m = markersRef.current[t.id];
          try {
            if (m && updated.route && updated.route[nextIndex]) {
              m.setLngLat(updated.route[nextIndex]);
            }
          } catch (err) {
            console.warn("Error while updating marker position:", err);
          }
          // if reached end, mark Completed
          if (nextIndex >= maxIndex) {
            return { ...updated, status: "Completed" as TripStatus };
          }
          return updated;
        })
      );
    }, 900);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trips, mapReady]);

  /* ---------------------- focus handler ---------------------- */
  function focusTripOnMap(trip: Trip) {
    const map = mapRef.current;
    if (!map) return;
    const idx = trip.progressIndex ?? 0;
    const coord = trip.route?.[idx] ?? trip.route?.[0];
    if (!coord) return;
    try {
      map.flyTo({ center: coord, zoom: 13, essential: true });
      const marker = markersRef.current[trip.id];
      if (marker) {
        // open popup (safely)
        try {
          marker.togglePopup();
        } catch {
          try {
            // fallback to openPopup if toggle not supported
            (marker as any).getPopup()?.addTo(map);
          } catch {
            // ignore
          }
        }
      }
    } catch (err) {
      console.warn("focusTripOnMap error:", err);
    }
  }

  /* ---------------------- Render ---------------------- */
  return (
    <div className="flex flex-col h-full pt-28"> {/* padding so TopNav doesn't overlap */}
      {/* Map area */}
      <section className="relative h-64 md:h-80 lg:h-96">
        {mapError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-center p-6">
            <div>
              <p className="text-lg font-semibold text-[#7B1E2D]">Map unavailable</p>
              <p className="text-sm text-gray-600 mt-2">{mapError}</p>
            </div>
          </div>
        ) : (
          <div ref={mapContainer} className="absolute inset-0 rounded-b-2xl" />
        )}

        <div className="absolute left-4 top-4 z-20 bg-[#7B1E2D] text-white rounded-xl px-4 py-2 shadow-lg">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <div>
              <div className="text-sm font-semibold">Trips Map</div>
              <div className="text-xs opacity-90">Ongoing trips track in real-time (simulated)</div>
            </div>
          </div>
        </div>
      </section>

      {/* List */}
      <section className="p-6 pt-8 flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-[#7B1E2D]">Trip Monitoring</h2>
            <p className="text-sm text-gray-600">
              View and monitor ongoing trips. Click <span className="font-medium">Focus</span> to center a selected vehicle on the map.
            </p>
          </div>

          {/* Table (desktop) */}
          <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
            <table className="min-w-full">
              <thead className="text-left bg-[#7B1E2D]/10 text-[#7B1E2D]">
                <tr>
                  <th className="px-4 py-3">Trip ID</th>
                  <th className="px-4 py-3">Vehicle</th>
                  <th className="px-4 py-3">Driver</th>
                  <th className="px-4 py-3">Origin</th>
                  <th className="px-4 py-3">Destination</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {trips.map((t) => (
                  <tr key={t.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{t.id}</td>
                    <td className="px-4 py-3">{vehicles.find((v) => v.id === t.vehicleId)?.name}</td>
                    <td className="px-4 py-3">{drivers.find((d) => d.id === t.driverId)?.name}</td>
                    <td className="px-4 py-3">{t.origin}</td>
                    <td className="px-4 py-3">{t.destination}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-medium ${
                          t.status === "Ongoing"
                            ? "bg-green-100 text-green-800"
                            : t.status === "Scheduled"
                            ? "bg-yellow-100 text-yellow-800"
                            : t.status === "Completed"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="px-2 py-1 rounded bg-[#7B1E2D] text-white hover:bg-[#9C2640]" title="Details (read-only)">
                          <Edit className="w-4 h-4" />
                        </button>

                        <button onClick={() => focusTripOnMap(t)} className="px-2 py-1 rounded border">
                          Focus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards (mobile) */}
          <div className="md:hidden grid grid-cols-1 gap-4">
            {trips.map((t) => (
              <motion.div key={t.id} className="bg-white rounded-xl shadow p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm text-gray-500">{t.id}</div>
                    <div className="font-semibold text-[#7B1E2D]">
                      {vehicles.find((v) => v.id === t.vehicleId)?.name} — {drivers.find((d) => d.id === t.driverId)?.name}
                    </div>
                    <div className="text-sm text-gray-600">{t.origin} → {t.destination}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs">{t.status}</div>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => focusTripOnMap(t)} className="px-2 py-1 border rounded">Focus</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
