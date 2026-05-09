import Link from "next/link";
import { BookOpen, Landmark, LogOut, Map, Menu, ShieldCheck, UserRound } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { logoutAction } from "@/lib/actions";

export async function AppShell({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-vellum/12 bg-tar/94 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-none border border-brass/45 bg-ember/20">
              <Landmark className="h-5 w-5 text-brass" />
            </span>
            <span className="stencil text-xl font-black uppercase tracking-[0.08em] text-vellum">Property Chronicle</span>
          </Link>
          <nav className="hidden items-center gap-1 text-sm text-vellum/75 md:flex">
            <NavLink href="/map" icon={<Map className="h-4 w-4" />} label="Map" />
            <NavLink href="/learn/stigmatized-property-ontario" icon={<BookOpen className="h-4 w-4" />} label="Learn" />
            {user ? <NavLink href="/account" icon={<UserRound className="h-4 w-4" />} label="Account" /> : null}
            {user?.role === "admin" || user?.role === "researcher" ? (
              <NavLink href="/admin" icon={<ShieldCheck className="h-4 w-4" />} label="Admin" />
            ) : null}
          </nav>
          <div className="flex items-center gap-2">
            {user ? (
              <form action={logoutAction}>
                <button className="inline-flex h-10 items-center gap-2 rounded-none border border-vellum/15 px-3 text-sm text-vellum/80 hover:border-brass/50">
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign out</span>
                </button>
              </form>
            ) : (
              <Link className="rounded-none bg-brass px-4 py-2 text-sm font-black text-ink" href="/login">
                Sign in
              </Link>
            )}
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-none border border-vellum/15 md:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      <div className="archive-strip relative z-30 flex h-7 items-center gap-7 overflow-hidden px-8">
        <span className="text-ember">◆</span>
        <span>Dossier 04</span>
        <span>Status · rectified</span>
        <span className="ml-auto hidden sm:inline">Timestamp · Property Chronicle Archive</span>
      </div>
      {children}
      <footer className="border-t border-vellum/10 bg-tar/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5 text-sm text-vellum/55">
          <p>Property Chronicle organizes public-source research. It is not legal advice.</p>
          <div className="flex gap-4">
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/responsible-use">Responsible Use</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link className="inline-flex items-center gap-2 rounded-none px-3 py-2 hover:bg-vellum/8 hover:text-vellum" href={href}>
      {icon}
      {label}
    </Link>
  );
}
