import type { Metadata } from "next";
import Link from "next/link";
import { AppShell } from "@/components/shell";

const pages: Record<string, { title: string; body: string[] }> = {
  "stigmatized-property-ontario": {
    title: "What is a stigmatized property in Ontario?",
    body: [
      "A stigmatized property is commonly understood as a property affected by non-physical history, reputation, or public perception.",
      "Property Chronicle separates stigma from material condition history so users can review records with clearer context.",
      "Users should verify sources and seek professional advice for disclosure obligations."
    ]
  },
  "disclosure-murder-house-ontario": {
    title: "Do sellers have to disclose a murder in a house in Ontario?",
    body: [
      "Disclosure questions depend on facts, representation, and professional obligations.",
      "Property Chronicle does not determine legal disclosure duties. It organizes publicly sourced information so users can ask better questions.",
      "Real estate agents, buyers, and sellers should verify records and consult qualified professionals."
    ]
  },
  "research-property-history-toronto": {
    title: "How to research property history before buying in Toronto",
    body: [
      "A practical search can include public news, municipal records, court references, fire history, and careful neighborhood context.",
      "Property Chronicle keeps sourced records in a map-first workflow and preserves source links for verification.",
      "No database is complete, so absence of a record should not be treated as a guarantee."
    ]
  },
  "grow-op-house": {
    title: "What is a grow-op house?",
    body: [
      "A grow-op house is a property used for cannabis cultivation, sometimes involving electrical, moisture, mould, or safety concerns.",
      "A grow-op history can be relevant to property research when supported by credible sources or inspection records.",
      "Property Chronicle treats grow-op records as property condition history rather than ordinary crime gossip."
    ]
  },
  "fire-flood-property-history": {
    title: "Fire and flood history in property research",
    body: [
      "Fire and flood records can matter because they may affect repairs, insurance, inspections, and buyer comfort.",
      "Property Chronicle records sourced public history, but users should verify current physical condition through inspection and official documents.",
      "Historic incidents should be summarized neutrally and not overstated."
    ]
  },
  "alleged-hauntings-property-history": {
    title: "Understanding alleged hauntings and property history",
    body: [
      "Alleged hauntings and urban legends are handled separately from public safety and property condition records.",
      "Property Chronicle marks supernatural records carefully and treats them as reported history or lore, not verified paranormal fact.",
      "The supernatural layer is off by default."
    ]
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug];
  return {
    title: page?.title || "Learn",
    robots: {
      index: true,
      follow: true
    }
  };
}

export default async function LearnPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages[slug] || pages["stigmatized-property-ontario"];
  return (
    <AppShell>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <article className="paper-panel rounded-lg p-6">
          <p className="text-sm uppercase tracking-[0.18em] text-brass">Learn</p>
          <h1 className="mt-3 text-3xl font-semibold text-vellum">{page.title}</h1>
          <div className="mt-6 grid gap-4 leading-7 text-vellum/72">
            {page.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <Link className="mt-6 inline-flex rounded bg-brass px-4 py-3 font-semibold text-ink" href="/signup">
            Start researching
          </Link>
        </article>
      </main>
    </AppShell>
  );
}
