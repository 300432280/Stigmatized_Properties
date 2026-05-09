import { AppShell } from "@/components/shell";
import { AdminBack } from "@/components/admin-back";
import { Field, inputClass, textareaClass } from "@/components/ui";
import { createManualRecordAction } from "@/lib/actions";
import { requireRole } from "@/lib/auth";
import { CATEGORIES } from "@/lib/category";

export default async function ManualRecordPage() {
  await requireRole(["admin", "researcher"]);
  const categories = Object.values(CATEGORIES).flat();
  return (
    <AppShell>
      <main className="mx-auto max-w-4xl px-4 py-8">
        <AdminBack />
        <h1 className="stencil mt-4 text-5xl font-black uppercase leading-none text-vellum">Manual record</h1>
        <form action={createManualRecordAction} className="paper-panel mt-6 grid gap-4 rounded-lg p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Address"><input className={inputClass} name="address" required /></Field>
            <Field label="Neighborhood"><input className={inputClass} name="neighborhood" required /></Field>
            <Field label="City"><input className={inputClass} name="city" defaultValue="Toronto" required /></Field>
            <Field label="Province"><input className={inputClass} name="province" defaultValue="ON" required /></Field>
            <Field label="Latitude"><input className={inputClass} name="latitude" type="number" step="any" required /></Field>
            <Field label="Longitude"><input className={inputClass} name="longitude" type="number" step="any" required /></Field>
            <Field label="Property type"><input className={inputClass} name="propertyType" defaultValue="Unknown" /></Field>
            <Field label="Use type"><input className={inputClass} name="useType" defaultValue="Unknown" /></Field>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Category">
              <select className={inputClass} name="category">
                {categories.map((category) => <option key={category}>{category}</option>)}
              </select>
            </Field>
            <Field label="Incident year"><input className={inputClass} name="incidentYear" type="number" required /></Field>
          </div>
          <Field label="Incident title"><input className={inputClass} name="title" required /></Field>
          <Field label="Neutral public summary"><textarea className={textareaClass} name="summary" required /></Field>
          <Field label="Internal notes"><textarea className={textareaClass} name="internalNotes" /></Field>
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Source title"><input className={inputClass} name="sourceTitle" required /></Field>
            <Field label="Source name"><input className={inputClass} name="sourceName" required /></Field>
            <Field label="Source URL"><input className={inputClass} name="sourceUrl" type="url" required /></Field>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-vellum/70">
            <label className="flex gap-2"><input type="checkbox" name="sensitive" /> Sensitive</label>
            <label className="flex gap-2"><input type="checkbox" name="reportAllowed" defaultChecked /> Report allowed</label>
          </div>
          <div className="rounded border border-brass/25 bg-brass/10 p-4 text-sm text-vellum/72">
            Approval checklist: verified address, checked source, neutral summary, category selected, map pin checked.
          </div>
          <button className="h-11 rounded bg-brass font-semibold text-ink">Create in review queue</button>
        </form>
      </main>
    </AppShell>
  );
}
