import Link from "next/link";
import { ArrowLeft, Bookmark, FileText, MapPinned, ShieldAlert } from "lucide-react";
import { AppShell } from "@/components/shell";
import { Badge, Field, textareaClass } from "@/components/ui";
import { createCorrectionAction, demoBuyAction, generateReportAction, savePropertyAction, unsavePropertyAction } from "@/lib/actions";
import { canBrowseExact, requireUser } from "@/lib/auth";
import { audit, incidentsFor, readStore, sourceForIncident } from "@/lib/store";

export const metadata = {
  robots: {
    index: false,
    follow: false
  }
};

export default async function PropertyPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ review?: string; terms?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const user = await requireUser();
  const store = await readStore();
  const property = store.properties.find((candidate) => candidate.id === id);
  if (!property) return null;
  const exact = canBrowseExact(user);
  const incidents = incidentsFor(store, property.id);
  const saved = store.savedProperties.some((item) => item.userId === user.id && item.propertyId === property.id);
  if (exact) await audit("view_exact_address", "property", property.id, user.id);
  const locked = !exact;

  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/map" className="inline-flex items-center gap-2 text-sm text-vellum/65 hover:text-vellum">
          <ArrowLeft className="h-4 w-4" />
          Back to map
        </Link>
        <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_340px]">
          <div className="paper-panel relative overflow-hidden rounded-lg p-6">
            {locked ? <BlurOverlay propertyId={property.id} /> : null}
            <div className={locked ? "blur-sm" : ""}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-brass">Property record</p>
                  <h1 className="mt-3 text-3xl font-semibold text-vellum">
                    {exact ? property.address : "Address locked"}
                  </h1>
                  <p className="mt-2 text-vellum/68">
                    {property.neighborhood}, {property.city}, {property.province}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge>{property.propertyType}</Badge>
                  <Badge>{property.useType}</Badge>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link className="inline-flex h-10 items-center gap-2 rounded border border-brass/35 px-3 text-sm text-vellum" href={`/map?property=${property.id}`}>
                  <MapPinned className="h-4 w-4 text-brass" />
                  View on map
                </Link>
                <form action={saved ? unsavePropertyAction : savePropertyAction}>
                  <input type="hidden" name="propertyId" value={property.id} />
                  <button className="inline-flex h-10 items-center gap-2 rounded border border-vellum/15 px-3 text-sm text-vellum/78">
                    <Bookmark className="h-4 w-4" />
                    {saved ? "Saved" : "Save"}
                  </button>
                </form>
              </div>
              <div className="mt-8 grid gap-4">
                {incidents.length ? (
                  incidents.map((incident) => {
                    const source = sourceForIncident(store, incident);
                    return (
                      <article key={incident.id} className="rounded border border-vellum/10 bg-ink/45 p-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge tone={incident.sensitive ? "warn" : "neutral"}>{incident.category}</Badge>
                          <Badge>{incident.incidentYear}</Badge>
                          {incident.sensitive ? <Badge tone="warn">Sensitive</Badge> : null}
                        </div>
                        <h2 className="mt-3 text-xl font-semibold text-vellum">{incident.title}</h2>
                        <p className="mt-2 leading-7 text-vellum/70">{incident.publicSummary}</p>
                        {incident.sensitive ? (
                          <p className="mt-3 rounded border border-ember/25 bg-ember/10 p-3 text-sm text-vellum/70">
                            This record may involve sensitive personal or historical information. Use responsibly and verify through listed sources.
                          </p>
                        ) : null}
                        {source ? (
                          <p className="mt-3 text-sm text-vellum/62">
                            Source:{" "}
                            <a className="text-brass underline-offset-4 hover:underline" href={source.url} target="_blank" rel="noreferrer">
                              {source.title}
                            </a>
                          </p>
                        ) : null}
                      </article>
                    );
                  })
                ) : (
                  <p className="rounded border border-vellum/10 p-4 text-vellum/65">No approved records are currently visible for this property.</p>
                )}
              </div>
            </div>
          </div>
          <aside className="grid content-start gap-4">
            <ReportPanel propertyId={property.id} userRole={user.role} termsWarning={Boolean(query.terms)} />
            <CorrectionPanel propertyId={property.id} submitted={Boolean(query.review)} />
          </aside>
        </section>
      </main>
    </AppShell>
  );
}

function BlurOverlay({ propertyId }: { propertyId: string }) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-10 border-t border-brass/25 bg-ink/92 p-5 backdrop-blur">
      <p className="text-sm uppercase tracking-[0.18em] text-brass">Details locked</p>
      <p className="mt-2 text-vellum/70">View the report for this property or subscribe for full browsing access.</p>
      <form action={demoBuyAction} className="mt-4 grid gap-3 sm:grid-cols-2">
        <input type="hidden" name="propertyId" value={propertyId} />
        <button name="plan" value="single" className="h-11 rounded bg-brass font-semibold text-ink">
          $2.99 One-Time Report
        </button>
        <button name="plan" value="subscription" className="h-11 rounded border border-brass/40 text-vellum">
          $9.99 Monthly
        </button>
      </form>
    </div>
  );
}

function ReportPanel({ propertyId, userRole, termsWarning }: { propertyId: string; userRole: string; termsWarning: boolean }) {
  return (
    <div className="paper-panel rounded-lg p-5">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-brass" />
        <h2 className="font-semibold text-vellum">Generate report</h2>
      </div>
      {termsWarning ? <p className="mt-3 rounded border border-ember/30 bg-ember/10 p-3 text-sm text-ember">Accept the report terms before generating.</p> : null}
      <form action={generateReportAction} className="mt-4 grid gap-3">
        <input type="hidden" name="propertyId" value={propertyId} />
        <label className="flex items-start gap-3 text-sm text-vellum/70">
          <input className="mt-1" name="terms" type="checkbox" required />
          <span>This report organizes publicly sourced information and does not determine legal disclosure obligations.</span>
        </label>
        <p className="rounded border border-vellum/10 bg-ink/45 p-3 text-sm leading-6 text-vellum/62">
          Most users start by checking the surrounding map. A single-property report is a timestamped snapshot for this
          address. Subscribers can generate a 500m area report.
        </p>
        <button name="type" value="single_property" className="h-11 rounded bg-brass font-semibold text-ink">
          Property Report
        </button>
        {userRole === "subscriber" || userRole === "admin" ? (
          <div className="rounded border border-vellum/10 p-3">
            <p className="text-sm font-semibold text-vellum">Subscriber Area Report</p>
            <label className="mt-3 flex gap-2 text-sm text-vellum/65">
              <input type="checkbox" name="includeSensitive" />
              Include sensitive records
            </label>
            <label className="mt-2 flex gap-2 text-sm text-vellum/65">
              <input type="checkbox" name="includeSupernatural" />
              Include supernatural records
            </label>
            <button name="type" value="area" className="mt-3 h-10 w-full rounded border border-brass/40 text-vellum">
              Area Report
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
}

function CorrectionPanel({ propertyId, submitted }: { propertyId: string; submitted: boolean }) {
  return (
    <details className="paper-panel rounded-lg p-5">
      <summary className="flex cursor-pointer list-none items-center gap-2 font-semibold text-vellum">
        <ShieldAlert className="h-5 w-5 text-brass" />
        Request review
      </summary>
      {submitted ? <p className="mt-3 rounded border border-brass/30 bg-brass/10 p-3 text-sm text-brass">Request submitted.</p> : null}
      <form action={createCorrectionAction} className="mt-4 grid gap-3">
        <input type="hidden" name="propertyId" value={propertyId} />
        <select name="requestType" className="h-11 rounded border border-vellum/14 bg-ink/70 px-3 text-vellum">
          <option value="correction">Correction</option>
          <option value="owner_review">Owner review</option>
          <option value="removal">Removal review</option>
          <option value="precision_change">Precision change</option>
        </select>
        <Field label="Message">
          <textarea className={textareaClass} name="message" required />
        </Field>
        <Field label="Proof description, if relevant">
          <textarea className={textareaClass} name="proofDescription" />
        </Field>
        <button className="h-11 rounded bg-brass font-semibold text-ink">Submit request</button>
      </form>
    </details>
  );
}
