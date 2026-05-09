import Link from "next/link";
import { AppShell } from "@/components/shell";
import { Field, inputClass } from "@/components/ui";
import { loginAction } from "@/lib/actions";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const query = await searchParams;
  return (
    <AppShell>
      <main className="mx-auto grid min-h-[calc(100vh-65px)] max-w-md content-center px-4 py-12">
        <form action={loginAction} className="paper-panel rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-vellum">Sign in</h1>
          <p className="mt-2 text-sm text-vellum/62">Use the local admin account or create a free user.</p>
          {query.error ? <p className="mt-4 rounded border border-ember/30 bg-ember/10 p-3 text-sm text-ember">Invalid email or password.</p> : null}
          <div className="mt-6 grid gap-4">
            <Field label="Email">
              <input className={inputClass} name="email" type="email" defaultValue="admin@propertychronicle.local" required />
            </Field>
            <Field label="Password">
              <input className={inputClass} name="password" type="password" defaultValue="admin" required />
            </Field>
            <button className="h-11 rounded bg-brass font-semibold text-ink">Sign in</button>
            <button disabled className="h-11 rounded border border-vellum/12 text-vellum/35">
              Continue with Google soon
            </button>
          </div>
          <p className="mt-5 text-sm text-vellum/62">
            No account?{" "}
            <Link className="text-brass" href="/signup">
              Sign up
            </Link>
          </p>
        </form>
      </main>
    </AppShell>
  );
}
