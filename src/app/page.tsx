import Link from "next/link";
import { FileText, LockKeyhole, MapPinned, Search } from "lucide-react";
import { AppShell } from "@/components/shell";
import { getCurrentUser } from "@/lib/auth";

export default async function HomePage() {
  const user = await getCurrentUser();
  return (
    <AppShell>
      <main>
        <section className="poster-hero">
          <div className="poster-wedge" />
          <div className="poster-halftone" />
          <BuildingElevation />
          <div className="relative z-10 mx-auto flex min-h-[calc(100vh-92px)] max-w-6xl flex-col items-center justify-center px-4 py-16 text-center">
            <div className="poster-kicker">
              <span className="h-1.5 w-1.5 bg-ember" />
              Chronicle Archive · Declared Property
            </div>
            <h1 className="poster-headline mt-9 text-vellum">
              <span className="block">Property</span>
              <span className="block">Chronicle</span>
            </h1>
            <div className="shoulders mt-7 flex items-center justify-center gap-4 text-sm font-black uppercase tracking-[0.38em] text-vellum">
              <span className="h-px w-16 bg-fog" />
              <span className="text-ember">Search</span>
              <span>Review</span>
              <span className="text-ember">Verify</span>
              <span className="h-px w-16 bg-fog" />
            </div>
            <form className="poster-search mt-8" action={user ? "/map" : "/signup"}>
              <span className="grid w-16 place-items-center border-r border-fog/60 bg-charcoal text-vellum">
                <Search className="h-5 w-5" />
              </span>
              <input placeholder="Enter a Canadian address after sign in" readOnly />
              <button>{user ? "Map" : "Enter"}</button>
            </form>
            <p className="mono mt-5 text-xs uppercase tracking-[0.22em] text-fog">
              <span className="text-ember">◆</span> A source · A date · A restrained summary
            </p>
            <div className="mono mt-8 flex flex-wrap justify-center gap-5 text-xs uppercase tracking-[0.22em] text-vellum/65">
              <Link href="/map">Go to map</Link>
              <span>—</span>
              <Link href={user ? "/account" : "/login"}>{user ? "Account" : "Sign in"}</Link>
              <span>—</span>
              <Link href="/learn/stigmatized-property-ontario">Learn</Link>
            </div>
            <p className="mt-8 max-w-xl border-t border-vellum/12 pt-5 text-sm leading-7 text-vellum/62">
              Check a property and its nearby history before you decide what to ask next. Every visible record is built
              around public-source context and controlled access.
            </p>
          </div>
        </section>
        <section className="procedure-grid">
          <Feature icon={<MapPinned />} kicker="Procedure I" title="Search" text="Move the map to the address or area being checked." />
          <Feature icon={<FileText />} kicker="Procedure II" title="Review" text="Open approved records according to your access level." />
          <Feature icon={<LockKeyhole />} kicker="Procedure III" title="Document" text="Generate a dated report when the result needs to be kept." />
        </section>
      </main>
    </AppShell>
  );
}

function Feature({ icon, kicker, title, text }: { icon: React.ReactNode; kicker: string; title: string; text: string }) {
  return (
    <article className="procedure-card">
      <div className="mb-4 grid h-10 w-10 place-items-center border border-brass/30 bg-brass/10 text-brass">{icon}</div>
      <p className="mono mb-2 text-[10px] uppercase tracking-[0.26em] text-fog">{kicker}</p>
      <h2 className="procedure-title text-vellum">{title}</h2>
      <p className="mt-3 max-w-sm text-sm leading-6 text-vellum/62">{text}</p>
    </article>
  );
}

function BuildingElevation() {
  return (
    <svg className="poster-elevation" viewBox="0 0 480 760" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g fill="none" stroke="currentColor">
        <line x1="240" y1="60" x2="240" y2="14" strokeWidth="1.2" />
        <polygon points="240,14 268,22 240,30" fill="currentColor" opacity="0.7" />
        <line x1="-12" y1="60" x2="492" y2="60" strokeWidth="2.4" />
        <rect x="20" y="60" width="440" height="22" strokeWidth="1.4" />
        <rect x="20" y="86" width="440" height="580" strokeWidth="1.6" />
        {[60, 180, 300, 420].map((x) => (
          <line key={x} x1={x} y1="86" x2={x} y2="666" strokeWidth="1.2" />
        ))}
        {[158, 230, 302, 374, 446, 518, 590].map((y) => (
          <line key={y} x1="20" y1={y} x2="460" y2={y} strokeWidth="0.7" />
        ))}
        {[100, 232, 364, 496].map((y) => (
          <g key={y}>
            <rect x="194" y={y} width="92" height="120" strokeWidth="0.8" />
            <line x1="240" y1={y} x2="240" y2={y + 120} strokeWidth="0.6" />
          </g>
        ))}
        <rect x="206" y="616" width="68" height="50" strokeWidth="1" />
        <line x1="-12" y1="666" x2="492" y2="666" strokeWidth="2" />
        <line x1="-30" y1="710" x2="510" y2="710" strokeWidth="0.8" />
        <line x1="-30" y1="722" x2="510" y2="722" strokeWidth="0.8" />
        <line x1="-30" y1="734" x2="510" y2="734" strokeWidth="0.8" />
      </g>
      <text x="0" y="752" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="currentColor" letterSpacing="2">
        ELEVATION · NORTH FACADE · 1:200
      </text>
    </svg>
  );
}
