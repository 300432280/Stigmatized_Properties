import { AppShell } from "@/components/shell";
import { LegalPage } from "@/components/legal-page";

export default function TermsPage() {
  return (
    <AppShell>
      <LegalPage title="Terms of Use">
        <p>Property Chronicle organizes publicly sourced property history information for research purposes only.</p>
        <p>This report organizes publicly sourced information and does not determine legal disclosure obligations.</p>
        <p>
          Users must not use the service to harass occupants, trespass, contact residents because of a record,
          republish exact addresses, discriminate unlawfully, or treat records as legal advice.
        </p>
        <p>Records may be corrected, hidden, archived, or removed after review. Disputed records are not public while under review.</p>
      </LegalPage>
    </AppShell>
  );
}
