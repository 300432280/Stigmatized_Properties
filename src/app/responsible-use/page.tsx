import { AppShell } from "@/components/shell";
import { LegalPage } from "@/components/legal-page";

export default function ResponsibleUsePage() {
  return (
    <AppShell>
      <LegalPage title="Responsible Use">
        <p>Property Chronicle is built for careful property-history research, not harassment or sensationalism.</p>
        <p>Verify information through listed sources. Do not contact occupants, visit private property, or republish exact addresses because of a record.</p>
        <p>Sensitive and supernatural records require extra caution. Alleged records are not statements of fact beyond the existence of public reporting or local lore.</p>
      </LegalPage>
    </AppShell>
  );
}
