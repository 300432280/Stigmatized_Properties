import Link from "next/link";
import { AppShell } from "@/components/shell";
import { requireUser } from "@/lib/auth";

export default async function AccountPage() {
  const user = await requireUser();
  return (
    <AppShell>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-3xl font-semibold text-vellum">Account</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card title="Role" value={user.role} />
          <Card title="Report credits" value={String(user.reportCredits)} />
          <Card title="Saved list" value="Ready" />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="rounded bg-brass px-4 py-3 font-semibold text-ink" href="/account/saved">
            Saved properties
          </Link>
          <Link className="rounded border border-vellum/15 px-4 py-3 text-vellum" href="/account/submissions">
            My submissions
          </Link>
          <Link className="rounded border border-vellum/15 px-4 py-3 text-vellum" href="/submit">
            Submit a record
          </Link>
        </div>
      </main>
    </AppShell>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="paper-panel rounded-lg p-5">
      <p className="text-sm text-vellum/55">{title}</p>
      <p className="mt-2 text-2xl font-semibold capitalize text-vellum">{value}</p>
    </div>
  );
}
