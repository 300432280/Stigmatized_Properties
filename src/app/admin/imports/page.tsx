import { AppShell } from "@/components/shell";
import { AdminBack } from "@/components/admin-back";
import { importCsvAction } from "@/lib/actions";
import { requireRole } from "@/lib/auth";
import { readStore } from "@/lib/store";

export default async function ImportsPage() {
  await requireRole(["admin", "researcher"]);
  const store = await readStore();
  return (
    <AppShell>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <AdminBack />
        <h1 className="stencil mt-4 text-5xl font-black uppercase leading-none text-vellum">CSV imports</h1>
        <form action={importCsvAction} className="paper-panel mt-6 p-6">
          <p className="text-sm leading-6 text-vellum/65">
            Supported columns: address, city, province, neighborhood, latitude, longitude, category, incident_date,
            incident_year, title, summary, source_url, source_name, source_title, source_date, sensitive, report_allowed.
            Imported rows enter review and are not public until approved.
          </p>
          <input className="mt-5 block w-full rounded border border-vellum/14 bg-ink p-3 text-vellum" name="file" type="file" accept=".csv" required />
          <button className="mt-4 h-11 rounded bg-brass px-4 font-semibold text-ink">Upload CSV</button>
        </form>
        <div className="mt-6 grid gap-3">
          {store.importBatches.map((batch) => (
            <div key={batch.id} className="paper-panel rounded-lg p-4">
              <p className="font-semibold text-vellum">{batch.filename}</p>
              <p className="text-sm text-vellum/60">{batch.status} · {batch.createdAt}</p>
              {batch.warnings.length ? <p className="mt-2 text-sm text-ember">{batch.warnings.length} warnings</p> : null}
            </div>
          ))}
        </div>
      </main>
    </AppShell>
  );
}
