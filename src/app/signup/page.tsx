import Link from "next/link";
import { AppShell } from "@/components/shell";
import { Field, inputClass } from "@/components/ui";
import { signupAction } from "@/lib/actions";

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const query = await searchParams;
  return (
    <AppShell>
      <main className="mx-auto grid min-h-[calc(100vh-65px)] max-w-md content-center px-4 py-12">
        <form action={signupAction} className="paper-panel rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-vellum">Create account</h1>
          <p className="mt-2 text-sm text-vellum/62">Signup is required before searching the map.</p>
          {query.error ? <p className="mt-4 rounded border border-ember/30 bg-ember/10 p-3 text-sm text-ember">Complete every field and accept the terms.</p> : null}
          <div className="mt-6 grid gap-4">
            <Field label="Email">
              <input className={inputClass} name="email" type="email" required />
            </Field>
            <Field label="Password">
              <input className={inputClass} name="password" type="password" required />
            </Field>
            <label className="flex items-start gap-3 text-sm text-vellum/70">
              <input className="mt-1" name="terms" type="checkbox" required />
              <span>
                I agree to the{" "}
                <Link className="text-brass" href="/terms">
                  Terms
                </Link>{" "}
                and responsible-use requirements.
              </span>
            </label>
            <button className="h-11 rounded bg-brass font-semibold text-ink">Create account</button>
          </div>
        </form>
      </main>
    </AppShell>
  );
}
