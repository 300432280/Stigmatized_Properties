"use client";

import { useEffect, useMemo, useState } from "react";
import { Filter, LocateFixed, Search } from "lucide-react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import type { Incident, PropertyRecord, User } from "@/lib/types";

type MarkerData = {
  property: PropertyRecord;
  incidents: Incident[];
};

const markerIcon = L.divIcon({
  className: "",
  html: `<span style="display:block;width:18px;height:18px;background:#9f281f;border:3px solid #e7dfcf;box-shadow:7px 7px 0 rgba(0,0,0,.34);transform:rotate(45deg)"></span>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9]
});

export function PropertyMap({ markers, user }: { markers: MarkerData[]; user: User }) {
  const [query, setQuery] = useState("");
  const [center, setCenter] = useState<[number, number]>([43.6532, -79.3832]);
  const [showSupernatural, setShowSupernatural] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const isFree = user.role === "free" || user.role === "paid";
  const maxZoom = isFree ? 14 : 18;

  const visibleMarkers = useMemo(() => {
    return markers
      .map((marker) => ({
        ...marker,
        incidents: marker.incidents.filter((incident) => showSupernatural || !incident.supernatural)
      }))
      .filter((marker) => marker.incidents.length > 0);
  }, [markers, showSupernatural]);

  function search() {
    const needle = query.toLowerCase();
    const hit = markers.find((marker) => `${marker.property.address} ${marker.property.city} ${marker.property.neighborhood}`.toLowerCase().includes(needle));
    if (hit) setCenter([hit.property.latitude, hit.property.longitude]);
    else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setCenter([position.coords.latitude, position.coords.longitude]),
        () => setCenter([43.6532, -79.3832])
      );
    }
  }

  return (
    <div className={fullScreen ? "fixed inset-0 z-[1000] grid grid-cols-1 bg-tar p-0" : "mx-auto grid max-w-7xl gap-5 px-4 py-6 lg:grid-cols-[360px_1fr]"}>
      <aside className={fullScreen ? "hidden" : "construct-frame hard-shadow grid content-start gap-5 p-5 pl-8"}>
        <div>
          <div className="red-rule" />
          <p className="mono mt-6 text-xs font-semibold uppercase tracking-[0.26em] text-brass">Record map</p>
          <h1 className="stencil mt-2 max-w-72 text-5xl font-black uppercase leading-[0.88] text-vellum">
            Check the surrounding archive
          </h1>
          <p className="mt-4 text-sm leading-6 text-vellum/58">
            Search moves the map. Approved records remain visible according to account access.
          </p>
        </div>
        <div className="border border-vellum/12 bg-tar/45 p-4">
          <p className="mono text-xs font-semibold uppercase tracking-[0.26em] text-brass">Address search</p>
          <div className="mt-4 flex gap-2">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-11 min-w-0 flex-1 rounded-none border border-vellum/14 bg-ink/70 px-3 text-vellum outline-none"
              placeholder="Search Canadian address"
            />
            <button onClick={search} className="grid h-11 w-11 place-items-center rounded-none bg-brass text-ink" title="Search">
              <Search className="h-5 w-5" />
            </button>
          </div>
          <button
            onClick={() => navigator.geolocation?.getCurrentPosition((position) => setCenter([position.coords.latitude, position.coords.longitude]))}
            className="mt-3 inline-flex items-center gap-2 text-sm text-vellum/65"
          >
            <LocateFixed className="h-4 w-4" />
            Use current location
          </button>
        </div>
        <details className="border border-vellum/12 bg-tar/35 p-4">
          <summary className="mono flex cursor-pointer list-none items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-vellum">
            <Filter className="h-4 w-4 text-brass" />
            Filters
          </summary>
          <label className="mt-4 flex items-center gap-3 text-sm text-vellum/70">
            <input type="checkbox" checked={showSupernatural} onChange={(event) => setShowSupernatural(event.target.checked)} />
            Show supernatural layer
          </label>
        </details>
        <div className="border border-ember/35 bg-ember/10 p-4 text-sm leading-6 text-vellum/62">
          Free accounts see markers only with limited zoom. Subscriber browsing reveals approved details and exact addresses.
        </div>
      </aside>
      <section className={fullScreen ? "relative overflow-hidden bg-charcoal lg:col-span-2" : "relative overflow-hidden border border-vellum/14 bg-charcoal hard-shadow"}>
        <div className="relative z-[402] flex flex-wrap items-center justify-between gap-3 border-b border-vellum/10 bg-tar/90 px-4 py-3">
          <div>
            <p className="mono text-xs font-semibold uppercase tracking-[0.26em] text-brass">Approved records</p>
            <p className="mt-1 text-xs text-vellum/55">Mouse wheel scrolls the page; use map controls to zoom.</p>
          </div>
          <button
            className="rounded-none border border-vellum/15 px-3 py-2 text-sm text-vellum/75 hover:border-brass/50"
            onClick={() => setFullScreen((value) => !value)}
          >
            {fullScreen ? "Exit full screen" : "Enlarge map"}
          </button>
        </div>
        <MapContainer
          key={fullScreen ? "map-fullscreen" : "map-standard"}
          center={center}
          zoom={11}
          maxZoom={maxZoom}
          className={fullScreen ? "h-[calc(100vh-61px)] w-full" : "h-[68vh] min-h-[520px] w-full"}
          scrollWheelZoom={false}
        >
          <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Recenter center={center} fullScreen={fullScreen} />
          {visibleMarkers.map(({ property, incidents }) => (
            <Marker key={property.id} icon={markerIcon} position={[property.latitude, property.longitude]}>
              <Popup>
                {isFree ? (
                  <div className="w-56 border-l-4 border-ember bg-tar p-4 text-vellum">
                    <p className="stencil text-2xl font-black uppercase leading-none">Record available</p>
                    <p className="mt-3 text-xs leading-5 text-vellum/65">Generate a report or subscribe to view approved details.</p>
                    <a className="mt-4 inline-flex bg-brass px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-tar" href={`/property/${property.id}`}>
                      View Details
                    </a>
                  </div>
                ) : (
                  <div className="w-72 border-l-4 border-ember bg-tar p-4 text-vellum">
                    <p className="stencil text-2xl font-black uppercase leading-none">{property.address}</p>
                    <p className="mono mt-2 text-[11px] uppercase tracking-[0.12em] text-fog">
                      {property.neighborhood}, {property.city}
                    </p>
                    <p className="mt-3 text-sm leading-5 text-vellum/72">{incidents[0]?.title}</p>
                    <a className="mt-4 inline-flex bg-brass px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-tar" href={`/property/${property.id}`}>
                      View Details
                    </a>
                  </div>
                )}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </section>
    </div>
  );
}

function Recenter({ center, fullScreen }: { center: [number, number]; fullScreen: boolean }) {
  const map = useMap();
  useEffect(() => {
    const redraw = () => {
      map.invalidateSize();
      map.setView(center, map.getZoom(), { animate: false });
    };
    const frame = window.requestAnimationFrame(redraw);
    const timers = [80, 220, 520].map((delay) => window.setTimeout(redraw, delay));
    const observer = new ResizeObserver(redraw);
    observer.observe(map.getContainer());

    return () => {
      window.cancelAnimationFrame(frame);
      timers.forEach((timer) => window.clearTimeout(timer));
      observer.disconnect();
    };
  }, [center, fullScreen, map]);
  return null;
}
