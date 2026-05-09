import { AppShell } from "@/components/shell";
import { AdminBack } from "@/components/admin-back";
import { requireRole } from "@/lib/auth";
import { readStore } from "@/lib/store";

export default async function AuditPage() {
  await requireRole(["admin"]);
  const store = await readStore();
  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <AdminBack />
            <h1 className="stencil mt-4 text-5xl font-black uppercase leading-none text-vellum">Audit logs</h1>
          </div>
          <a className="rounded bg-brass px-4 py-2 font-semibold text-ink" href="/admin/audit/export">
            Export CSV
          </a>
        </div>
        <div className="mt-6 overflow-hidden rounded-lg border border-vellum/10">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-vellum/8 text-vellum">
              <tr>
                <th className="p-3">Time</th>
                <th className="p-3">Action</th>
                <th className="p-3">Entity</th>
                <th className="p-3">User</th>
              </tr>
            </thead>
            <tbody>
              {store.auditLogs.map((log) => (
                <tr key={log.id} className="border-t border-vellum/8 text-vellum/66">
                  <td className="p-3">{log.createdAt}</td>
                  <td className="p-3">{log.action}</td>
                  <td className="p-3">{log.entityType} {log.entityId}</td>
                  <td className="p-3">{log.userId || "system"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </AppShell>
  );
}
