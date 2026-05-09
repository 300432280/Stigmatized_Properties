import Link from "next/link";
import { AppShell } from "@/components/shell";
import { requireUser } from "@/lib/auth";
import { readStore } from "@/lib/store";

export default async function SavedPage() {
  const user = await requireUser();
  const store = await readStore();
  const saved = store.savedProperties
    .filter((item) => item.userId === user.id)
    .map((item) => store.properties.find((property) => property.id === item.propertyId))
    .filter(Boolean);
  return (
    <AppShell>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-3xl font-semibold text-vellum">Saved properties</h1>
        <div className="mt-6 grid gap-3">
          {saved.map((property) =>
            property ? (
              <Link key={property.id} className="paper-panel rounded-lg p-4 hover:border-brass/50" href={`/property/${property.id}`}>
                <p className="font-semibold text-vellum">{property.address}</p>
                <p className="text-sm text-vellum/62">
                  {property.neighborhood}, {property.city}
                </p>
              </Link>
            ) : null
          )}
        </div>
      </main>
    </AppShell>
  );
}
