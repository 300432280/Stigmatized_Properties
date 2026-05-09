import { AppShell } from "@/components/shell";
import { AdminBack } from "@/components/admin-back";
import { Badge } from "@/components/ui";
import { updateIncidentStatusAction } from "@/lib/actions";
import { requireRole } from "@/lib/auth";
import { readStore, sourceForIncident } from "@/lib/store";

export default async function ReviewPage() {
  await requireRole(["admin", "researcher"]);
  const store = await readStore();
  const queue = store.incidents.filter((incident) => incident.status !== "Approved" && incident.status !== "Archived");
  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <AdminBack />
        <h1 className="stencil mt-4 text-5xl font-black uppercase leading-none text-vellum">Review queue</h1>
        <div className="mt-6 grid gap-4">
          {queue.map((incident) => {
            const property = store.properties.find((item) => item.id === incident.propertyId);
            const source = sourceForIncident(store, incident);
            return (
              <article key={incident.id} className="paper-panel rounded-lg p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex gap-2">
                      <Badge>{incident.status}</Badge>
                      <Badge>{incident.category}</Badge>
                    </div>
                    <h2 className="mt-3 text-xl font-semibold text-vellum">{incident.title}</h2>
                    <p className="mt-1 text-sm text-vellum/60">{property?.address}, {property?.city}</p>
                    <p className="mt-3 text-vellum/70">{incident.publicSummary}</p>
                    {source ? <p className="mt-2 text-sm text-brass">{source.title}</p> : null}
                  </div>
                  <form action={updateIncidentStatusAction} className="grid gap-2">
                    <input type="hidden" name="incidentId" value={incident.id} />
                    <select name="status" className="h-10 rounded border border-vellum/14 bg-ink px-3 text-vellum" defaultValue={incident.status}>
                      {["Draft", "Needs Review", "Needs Location Review", "Approved", "Rejected", "Disputed", "Hidden", "Archived"].map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                    <button className="h-10 rounded bg-brass px-4 font-semibold text-ink">Update</button>
                  </form>
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </AppShell>
  );
}
