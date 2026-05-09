import Link from "next/link";

export function AdminBack() {
  return (
    <Link className="mono text-xs uppercase tracking-[0.18em] text-brass hover:text-vellum" href="/admin">
      ← Back to admin
    </Link>
  );
}
