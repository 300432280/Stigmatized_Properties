import type { Incident, PropertyRecord, ReportSnapshot, Store } from "./types";
import { distanceMeters } from "./geo";
import { sourceForIncident } from "./store";

export function buildSinglePropertySnapshot(store: Store, property: PropertyRecord): ReportSnapshot {
  const incidents = store.incidents
    .filter((incident) => incident.propertyId === property.id && incident.status === "Approved" && incident.reportAllowed)
    .map((incident) => incidentSnapshot(store, property, incident))
    .filter(Boolean) as ReportSnapshot["incidents"];

  return {
    title: "Property Chronicle Report",
    propertyAddress: `${property.address}, ${property.city}, ${property.province}`,
    generatedAt: new Date().toISOString(),
    mapCenter: [property.latitude, property.longitude],
    incidents
  };
}

export function buildAreaSnapshot(
  store: Store,
  property: PropertyRecord,
  options: { includeSensitive: boolean; includeSupernatural: boolean }
): ReportSnapshot {
  const center: [number, number] = [property.latitude, property.longitude];
  const incidents = store.incidents
    .filter((incident) => incident.status === "Approved" && incident.reportAllowed)
    .filter((incident) => options.includeSensitive || !incident.sensitive)
    .filter((incident) => options.includeSupernatural || !incident.supernatural)
    .filter((incident) => {
      const prop = store.properties.find((candidate) => candidate.id === incident.propertyId);
      if (!prop) return false;
      return distanceMeters(center, [prop.latitude, prop.longitude]) <= 500;
    })
    .map((incident) => {
      const prop = store.properties.find((candidate) => candidate.id === incident.propertyId);
      return prop ? incidentSnapshot(store, prop, incident) : undefined;
    })
    .filter(Boolean) as ReportSnapshot["incidents"];

  return {
    title: "Property Chronicle Area Report",
    propertyAddress: `${property.address}, ${property.city}, ${property.province}`,
    generatedAt: new Date().toISOString(),
    mapCenter: center,
    radiusMeters: 500,
    incidents
  };
}

function incidentSnapshot(store: Store, property: PropertyRecord, incident: Incident) {
  const source = sourceForIncident(store, incident);
  if (!source) return undefined;
  return {
    propertyAddress: `${property.address}, ${property.city}, ${property.province}`,
    city: property.city,
    neighborhood: property.neighborhood,
    title: incident.title,
    category: incident.category,
    incidentYear: incident.incidentYear,
    publicSummary: incident.publicSummary,
    sourceTitle: source.title,
    sourceUrl: source.url
  };
}
