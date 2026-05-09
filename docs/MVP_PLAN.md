# Property Chronicle MVP Plan

Last updated: 2026-05-05

## Product Position

Property Chronicle is a consumer map app and installable web app for Canadian property-history research. It organizes publicly sourced information about sensitive or stigmatized property incidents with neutral summaries, source links, role-based visibility, and report generation.

The app is not an official registry and does not determine legal disclosure obligations.

## Core Disclaimer

Use this phrase in reports, checkout/report generation screens, and legal pages:

> This report organizes publicly sourced information and does not determine legal disclosure obligations.

## MVP Geography

- Canada-only search for MVP.
- Seed focus: Toronto/GTA first.
- Expansion path: GTA, Southern Ontario, major Canadian cities, North America.

## Brand

- Working public name: Property Chronicle.
- Project folder: `D:\Projects\Stigmatized_Properties`.
- Visual direction is documented in `docs/DESIGN_DIRECTION.md`.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- PostgreSQL/Neon as drop-in `DATABASE_URL`
- Prisma schema added for Neon/Postgres foundation
- Local JSON store for first runnable MVP if no secrets are available
- Leaflet + OpenStreetMap
- Optional Upstash Redis for future rate limits, counters, cache, and abuse prevention
- Demo checkout now, real payments later
- PDF report generation
- PWA direction for website + app installability

## Roles

- `free`: logged-in user, limited zoom, markers only, no address/category/year/details.
- `paid`: one-time purchased property report access.
- `subscriber`: unlimited browsing, exact approved record details, 10 PDF property reports/month, subscriber-only area reports.
- `researcher`: can create/edit draft research records and prepare sources, but cannot publish or view sensitive account/payment/owner-proof data.
- `admin`: full control, approvals, imports, users, reports, audit logs, dispute handling.

## Seed Admin

Development-only account:

```txt
admin@propertychronicle.local
admin
role: admin
```

Change before deployment.

## Categories

Public Safety:
- Homicide
- Death
- Suicide
- Organized Crime

Property Condition:
- Grow-op / Drug Lab
- Fire
- Flood
- Hoarding

Supernatural:
- Paranormal / Alleged Haunting
- Urban Legend

Commercial / Civic:
- Major Commercial Incident

Notorious Association:
- Notorious Owner

Fraud/scam and foreclosure are excluded from MVP unless later redefined around direct property stigma.

## Core Data Rule

A property is the location. An incident is the sourced claim.

Each public incident should have at least one credible source. If multiple incidents happened at one property, each incident needs its own credible source.

## Summary Rules

- Summaries must be short, neutral, and factual.
- Avoid dramatic or editorial wording.
- Prefer phrasing like “Public reporting described...” or “A source reported...”
- Do not copy long article text.
- Store source title, source name, URL, publication date if available, and retrieval date.

## Record Statuses

- Draft
- Needs Review
- Needs Location Review
- Approved
- Rejected
- Disputed
- Hidden
- Archived

Only `Approved` records appear publicly.

`Disputed` means a challenge/review request is in progress and no admin decision has been made. While disputed, the record is hidden from public/paid views and excluded from reports. If the challenge is approved, the record is corrected, hidden, archived, or removed. If the challenge is rejected, admin may restore the record to approved.

## Sensitive Records

Sensitive is a risk/visibility flag, not a category.

Examples:
- Address precision is uncertain.
- Unit number is unclear or risky.
- Incident involves minors.
- Owner/resident filed a review request.
- Harassment or misuse risk is higher than normal.
- Source is old, ambiguous, or hard to verify.
- Supernatural/alleged record tied to a private residence.

Sensitive records:
- Still appear as markers.
- Are always noindex.
- Are excluded from reports by default unless the user/report option allows them and admin has permitted report visibility.
- Should show responsible-use language on detail/report surfaces.

## Public / Free Map

- Login required before map/search.
- Approved markers appear by default.
- Search relocates the map only; it does not unlock or trigger record visibility.
- Free users have limited zoom ability.
- Free users see markers only.
- No address, category, year, count, or incident detail.
- Marker click opens minimal locked prompt with `View Details`.
- Detail/paywall page shows the real layout behind blur.

## Paid and Subscriber Access

Pay-as-you-go:
- `$2.99` per single property report.
- One report unlocks one property/report only.
- Generated snapshot can be re-downloaded for 3 months.

Subscription:
- `$9.99/month`
- 10 PDF property reports/month, no rollover.
- Unlimited browsing with exact addresses for approved records.
- Subscriber-only Area Report within 500m.
- Admin can grant free report credits.

Payment processing is demo-only in MVP.

## Reports

Report name: Property Chronicle Report.

Report types:
- Single Property Report: one property, available to paid and subscriber users. This is useful when the searched property itself has a record, or when a user wants a timestamped negative result for that exact property, but it should not dominate the product experience.
- Area Report: subscriber-only, 500m radius from searched point/property.

Product emphasis after first review:
- Most buyers and agents come to check whether an interested property or its immediate surroundings have sensitive records.
- Map/search and Area Report should be treated as the primary product experience.
- Single Property Report remains available, but the UI should not imply that users must care about each stigmatized property as a standalone destination.

Area Report options:
- Include sensitive records: default off, user may turn on.
- Include supernatural records: default off, user may turn on.

Reports include:
- Report ID / verification code.
- Generated date.
- Map image.
- Searched property.
- Approved report-eligible incidents.
- Source title and clickable URL.
- Neutral summaries.
- Responsible-use notice.
- `Generated by Property Chronicle` footer.
- Core disclaimer.

Reports do not include user name or email.

Disputed records do not appear in reports.

If no record is found, use:

> No sourced incident found in Property Chronicle records at the time of report generation.

## Saved Properties

- One saved/liked list for MVP.
- No private notes.
- Sharing respects viewer role: public recipients see free-tier/locked version; paid/subscriber users see details according to their permissions.

## Property Detail Page

Show:
- Address according to user tier.
- City.
- Neighborhood.
- Province.
- Property type.
- Use type.
- Incident list.
- Source links on paid/subscriber/admin views.
- View on map button.
- Correction/review request entry point.

Do not include postal code in MVP.
Do not show source count.
Do not distinguish first/latest incident count; list incidents directly.

## Admin and Research Workflow

Unified review workflow:
1. CSV import, manual admin entry, or user submission enters `Needs Review`.
2. System geocodes automatically.
3. Failed geocode becomes `Needs Location Review`.
4. Duplicate check by exact address, lat/lng proximity, and source URL.
5. Admin/researcher reviews source, address, category, summary, and geocode.
6. Admin completes approval checklist.
7. Approved records go public.
8. Rejected records stay internal; submitter sees `Rejected`.
9. All actions are audit logged.

Researchers can see draft/research records, but cannot approve/publish, permanently delete, view owner proof documents, or access user billing/report history.

Admin can edit everything.

Admin can permanently delete only with confirmation; normal use should hide/archive.

## User Submissions

- Submit button only after login.
- Submissions can include source URL or no source.
- If no source, user must explain how they know in a private internal note.
- User can edit pending submissions.
- Submissions never appear publicly until approved.
- Rejected submissions remain visible in submitter history as `Rejected`; internal reason is optional.

## Correction / Owner Review

Use “Request review, correction, or removal,” not “take down.”

Accepted proof can include property tax bill, utility bill, deed/title, government ID with address, or similar documents. Verification is manual for MVP.

Correction/review requests go to a separate admin inbox.

## Audit Logs

Track:
- Exact address views.
- PDF downloads.
- Record approvals/edits/status changes.
- CSV imports.
- User submissions.
- Report generation.
- Admin grants of report credits.

Admin can export audit logs as CSV.

## SEO

Index:
- Landing page.
- Educational pages.
- Future city/neighborhood aggregate pages.

Noindex:
- Property detail pages.
- Report pages.
- Account pages.
- Admin pages.
- Sensitive record pages.

Legal pages should be visible from the footer/navigation so users and reviewers can find Terms, Privacy, and Responsible Use without hunting.

Educational pages for MVP:
- What is a stigmatized property in Ontario?
- Do sellers have to disclose a murder in a house in Ontario?
- How to research property history before buying in Toronto.
- What is a grow-op house?
- Fire and flood history in property research.
- Understanding alleged hauntings and property history.

## Legal / Safety Controls

- Terms accepted at signup.
- Terms accepted again before first paid report.
- Responsible-use notice on every report.
- Terms forbid harassment, trespassing, contacting occupants because of records, republishing exact addresses, unlawful discrimination, and treating reports as legal advice.
- No long source quotes.
- Neutral summaries only.
- Review/correction channel.
- Exact address access logs.
- Disputed records hidden from public and excluded from reports.

The app can be made safer, but publishing sensitive property history is not risk free.
