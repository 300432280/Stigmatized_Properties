import { AppShell } from "@/components/shell";
import { AdminBack } from "@/components/admin-back";
import { Badge } from "@/components/ui";
import { requireRole } from "@/lib/auth";
import { readStore } from "@/lib/store";

export default async function CorrectionsPage() {
  await requireRole(["admin"]);
  const store = await readStore();
  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <AdminBack />
        <h1 className="stencil mt-4 text-5xl font-black uppercase leading-none text-vellum">Review requests</h1>
        <div className="mt-6 grid gap-4">
          {store.correctionRequests.map((request) => {
            const property = store.properties.find((item) => item.id === request.propertyId);
            return (
              <article key={request.id} className="paper-panel rounded-lg p-5">
                <div className="flex flex-wrap justify-between gap-3">
                  <div>
                    <Badge>{request.status}</Badge>
                    <h2 className="mt-3 text-xl font-semibold capitalize text-vellum">{request.requestType.replace("_", " ")}</h2>
                    <p className="text-sm text-vellum/60">{property?.address}</p>
                  </div>
                  <p className="text-sm text-vellum/45">{request.createdAt}</p>
                </div>
                <p className="mt-4 text-vellum/72">{request.message}</p>
                {request.proofDescription ? <p className="mt-3 text-sm text-vellum/55">Proof: {request.proofDescription}</p> : null}
              </article>
            );
          })}
        </div>
      </main>
    </AppShell>
  );
}
