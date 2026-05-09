import { clsx } from "clsx";

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" }) {
  return (
    <button
      className={clsx(
        "inline-flex h-11 items-center justify-center rounded-none px-4 text-sm font-black uppercase tracking-[0.06em] transition",
        variant === "primary" && "bg-brass text-ink hover:bg-vellum",
        variant === "secondary" && "border border-brass/35 bg-brass/10 text-vellum hover:border-brass",
        variant === "ghost" && "text-vellum/75 hover:bg-vellum/8 hover:text-vellum",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "warn" | "good" }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-none border px-2 py-1 text-xs font-semibold uppercase tracking-[0.05em]",
        tone === "neutral" && "border-vellum/15 bg-vellum/8 text-vellum/80",
        tone === "warn" && "border-ember/40 bg-ember/10 text-ember",
        tone === "good" && "border-brass/40 bg-brass/10 text-brass"
      )}
    >
      {children}
    </span>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm text-vellum/78">
      <span>{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  "h-11 rounded-none border border-vellum/14 bg-ink/70 px-3 text-vellum outline-none placeholder:text-vellum/35 focus:border-brass/70";

export const textareaClass =
  "min-h-28 rounded-none border border-vellum/14 bg-ink/70 px-3 py-3 text-vellum outline-none placeholder:text-vellum/35 focus:border-brass/70";
