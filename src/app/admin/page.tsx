import Link from "next/link";
import { AppShell } from "@/components/shell";
import { requireRole } from "@/lib/auth";
import { readStore } from "@/lib/store";

export default async function AdminPage() {
  await requireRole(["admin", "researcher"]);
  const store = await readStore();
  const needsReview = store.incidents.filter((incident) => incident.status === "Needs Review" || incident.status === "Needs Location Review").length;
  const approved = store.incidents.filter((incident) => incident.status === "Approved").length;
  const reviewRequests = store.correctionRequests.filter((item) => item.status === "Open").length;
  const imports = store.importBatches.length;

  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="construct-frame max-w-4xl p-6 pl-10">
          <div className="red-rule" />
          <p className="monument-label mt-6 text-xs text-brass">Admin</p>
          <h1 className="mt-3 text-5xl font-black uppercase leading-none text-vellum">Operations</h1>
          <p className="mt-3 leading-7 text-vellum/62">
            Manage intake, review, and publication. Nothing becomes public until it is approved.
          </p>
        </div>

        <section className="mt-8 grid gap-5 lg:grid-cols-[320px_1fr]">
          <aside className="border border-vellum/12 bg-ink/55 p-5 hard-shadow">
            <h2 className="text-lg font-semibold text-vellum">Queue</h2>
            <div className="mt-5 grid gap-4">
              <QueueItem label="Needs review" value={needsReview} href="/admin/review" />
              <QueueItem label="Open review requests" value={reviewRequests} href="/admin/corrections" />
              <QueueItem label="Approved records" value={approved} href="/map" />
              <QueueItem label="Import batches" value={imports} href="/admin/imports" />
            </div>
          </aside>

          <section className="border border-vellum/12 bg-vellum/[0.03] p-5">
            <h2 className="text-lg font-semibold text-vellum">Actions</h2>
            <div className="mt-5 grid gap-3">
              <Action href="/admin/review" title="Review records" text="Approve, reject, hide, or mark records disputed." primary />
              <Action href="/admin/imports" title="Import CSV" text="Upload researched rows into the review queue." />
              <Action href="/admin/properties" title="Add manual record" text="Create a sourced record one at a time." />
              <Action href="/admin/corrections" title="Handle review requests" text="Owner reviews, corrections, removals, and precision changes." />
              <Action href="/admin/audit" title="Audit logs" text="Exact address views, PDF downloads, imports, and approvals." />
              <Action href="/admin/users" title="Users and credits" text="Grant demo credits and inspect roles." />
            </div>
          </section>
        </section>

        <section className="mt-6 border border-vellum/10 bg-ink/35 p-5">
          <h2 className="text-lg font-semibold text-vellum">Record lifecycle</h2>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-vellum/62">
            <State label="Intake" />
            <Arrow />
            <State label="Needs Review" />
            <Arrow />
            <State label="Approved" />
            <span className="mx-2 text-vellum/25">or</span>
            <State label="Rejected / Hidden" />
          </div>
          <p className="mt-4 text-sm leading-6 text-vellum/55">
            Review requests are separate. If a public record is challenged, admin can pause it as disputed, then correct,
            restore, hide, or archive it.
          </p>
        </section>
      </main>
    </AppShell>
  );
}

function QueueItem({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <Link className="flex items-center justify-between border border-vellum/10 px-4 py-3 hover:border-brass/40" href={href}>
      <span className="text-sm text-vellum/62">{label}</span>
      <span className="text-xl font-semibold text-vellum">{value}</span>
    </Link>
  );
}

function Action({ href, title, text, primary = false }: { href: string; title: string; text: string; primary?: boolean }) {
  return (
    <Link
      className={
        primary
          ? "block border border-brass/35 bg-brass/10 p-4 hover:border-brass"
          : "block border border-vellum/10 p-4 hover:border-brass/40"
      }
      href={href}
    >
      <p className="font-semibold text-vellum">{title}</p>
      <p className="mt-1 text-sm leading-6 text-vellum/58">{text}</p>
    </Link>
  );
}

function State({ label }: { label: string }) {
  return <span className="border border-vellum/12 px-3 py-2">{label}</span>;
}

function Arrow() {
  return <span className="text-brass/70">→</span>;
}
