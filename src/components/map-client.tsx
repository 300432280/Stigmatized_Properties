"use client";

import dynamic from "next/dynamic";
import type { Incident, PropertyRecord, User } from "@/lib/types";

const PropertyMap = dynamic(() => import("./map-view").then((mod) => mod.PropertyMap), { ssr: false });

export function MapClient({ markers, user }: { markers: Array<{ property: PropertyRecord; incidents: Incident[] }>; user: User }) {
  return <PropertyMap markers={markers} user={user} />;
}
