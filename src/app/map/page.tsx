import { AppShell } from "@/components/shell";
import { MapClient } from "@/components/map-client";
import { requireUser } from "@/lib/auth";
import { approvedIncidents, readStore } from "@/lib/store";

export default async function MapPage() {
  const user = await requireUser();
  const store = await readStore();
  const markers = store.properties
    .map((property) => ({
      property,
      incidents: approvedIncidents(store).filter((incident) => incident.propertyId === property.id)
    }))
    .filter((marker) => marker.incidents.length > 0);

  return (
    <AppShell>
      <MapClient markers={markers} user={user} />
    </AppShell>
  );
}
