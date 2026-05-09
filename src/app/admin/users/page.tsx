import { AppShell } from "@/components/shell";
import { AdminBack } from "@/components/admin-back";
import { grantCreditsAction } from "@/lib/actions";
import { requireRole } from "@/lib/auth";
import { readStore } from "@/lib/store";

export default async function UsersPage() {
  await requireRole(["admin"]);
  const store = await readStore();
  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <AdminBack />
        <h1 className="stencil mt-4 text-5xl font-black uppercase leading-none text-vellum">Users</h1>
        <div className="mt-6 grid gap-3">
          {store.users.map((user) => (
            <div key={user.id} className="paper-panel grid gap-4 rounded-lg p-4 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="font-semibold text-vellum">{user.email}</p>
                <p className="text-sm text-vellum/60">Role: {user.role} · Credits: {user.reportCredits}</p>
              </div>
              <form action={grantCreditsAction} className="flex gap-2">
                <input type="hidden" name="userId" value={user.id} />
                <input className="h-10 w-24 rounded border border-vellum/14 bg-ink px-3 text-vellum" name="credits" type="number" defaultValue="1" />
                <button className="h-10 rounded bg-brass px-3 font-semibold text-ink">Grant</button>
              </form>
            </div>
          ))}
        </div>
      </main>
    </AppShell>
  );
}
