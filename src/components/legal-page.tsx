export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <article className="paper-panel rounded-lg p-6 leading-7 text-vellum/72">
        <h1 className="mb-5 text-3xl font-semibold text-vellum">{title}</h1>
        <div className="grid gap-4">{children}</div>
      </article>
    </main>
  );
}
