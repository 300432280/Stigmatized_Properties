import { AppShell } from "@/components/shell";
import { LegalPage } from "@/components/legal-page";

export default function PrivacyPage() {
  return (
    <AppShell>
      <LegalPage title="Privacy Policy">
        <p>Property Chronicle collects account information, saved properties, submissions, correction requests, report history, and audit logs needed to operate the service.</p>
        <p>Exact address views and report downloads are logged for safety, abuse prevention, and compliance review.</p>
        <p>Report PDFs are available for re-download for three months. Structured report data may be retained for internal analysis and service improvement.</p>
        <p>Users may request review, correction, or removal of records through the review workflow.</p>
      </LegalPage>
    </AppShell>
  );
}
