import { AppShell } from "@/components/shell";
import { Field, inputClass, textareaClass } from "@/components/ui";
import { submitRecordAction } from "@/lib/actions";
import { requireUser } from "@/lib/auth";
import { CATEGORIES } from "@/lib/category";

export default async function SubmitPage() {
  await requireUser();
  const categories = Object.values(CATEGORIES).flat();
  return (
    <AppShell>
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-3xl font-semibold text-vellum">Submit a record</h1>
        <p className="mt-3 text-vellum/65">Submissions enter review and are not public until approved by admin.</p>
        <form action={submitRecordAction} className="paper-panel mt-6 grid gap-4 rounded-lg p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Address">
              <input className={inputClass} name="address" required />
            </Field>
            <Field label="City">
              <input className={inputClass} name="city" defaultValue="Toronto" required />
            </Field>
          </div>
          <input type="hidden" name="province" value="ON" />
          <Field label="Category">
            <select className={inputClass} name="category">
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </Field>
          <Field label="Short title">
            <input className={inputClass} name="title" required />
          </Field>
          <Field label="Neutral summary">
            <textarea className={textareaClass} name="summary" required />
          </Field>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Source name, if available">
              <input className={inputClass} name="sourceName" />
            </Field>
            <Field label="Source URL, if available">
              <input className={inputClass} name="sourceUrl" type="url" />
            </Field>
          </div>
          <Field label="If no source is available, explain how you know. This stays internal.">
            <textarea className={textareaClass} name="howKnown" />
          </Field>
          <button className="h-11 rounded bg-brass font-semibold text-ink">Submit for review</button>
        </form>
      </main>
    </AppShell>
  );
}
