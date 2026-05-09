import { AppShell } from "@/components/shell";
import { Badge } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { readStore } from "@/lib/store";

export default async function SubmissionsPage() {
  const user = await requireUser();
  const store = await readStore();
  const submissions = store.submissions.filter((submission) => submission.submittedBy === user.id);
  return (
    <AppShell>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-3xl font-semibold text-vellum">My submissions</h1>
        <div className="mt-6 grid gap-3">
          {submissions.map((submission) => (
            <div key={submission.id} className="paper-panel rounded-lg p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-vellum">{submission.title}</p>
                <Badge>{submission.status}</Badge>
              </div>
              <p className="mt-2 text-sm text-vellum/62">{submission.address}</p>
            </div>
          ))}
        </div>
      </main>
    </AppShell>
  );
}
