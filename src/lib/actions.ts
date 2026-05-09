"use server";

import { redirect } from "next/navigation";
import Papa from "papaparse";
import { createUser, getCurrentUser, loginUser, logoutUser, requireRole, requireUser } from "./auth";
import {
  addCorrectionRequest,
  addImportBatch,
  addSavedProperty,
  audit,
  createReport,
  createSubmission,
  findUserByEmail,
  mutateStore,
  readStore,
  removeSavedProperty
} from "./store";
import { uid, verificationCode } from "./ids";
import { buildAreaSnapshot, buildSinglePropertySnapshot } from "./reporting";
import { mainCategoryFor } from "./category";
import type { IncidentCategory, PropertyType, UseType } from "./types";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const user = await findUserByEmail(email);
  if (!user || user.password !== password) redirect("/login?error=1");
  await loginUser(user);
  redirect(user.role === "admin" || user.role === "researcher" ? "/admin" : "/map");
}

export async function signupAction(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const accepted = formData.get("terms") === "on";
  if (!email || !password || !accepted) redirect("/signup?error=1");
  const user = await createUser(email, password);
  await loginUser(user);
  redirect("/map");
}

export async function logoutAction() {
  await logoutUser();
  redirect("/");
}

export async function savePropertyAction(formData: FormData) {
  const user = await requireUser();
  const propertyId = String(formData.get("propertyId") || "");
  await addSavedProperty(user.id, propertyId);
  await audit("save_property", "property", propertyId, user.id);
  redirect(`/property/${propertyId}`);
}

export async function unsavePropertyAction(formData: FormData) {
  const user = await requireUser();
  const propertyId = String(formData.get("propertyId") || "");
  await removeSavedProperty(user.id, propertyId);
  await audit("unsave_property", "property", propertyId, user.id);
  redirect(`/property/${propertyId}`);
}

export async function submitRecordAction(formData: FormData) {
  const user = await requireUser();
  await createSubmission({
    submittedBy: user.id,
    address: String(formData.get("address") || ""),
    city: String(formData.get("city") || "Toronto"),
    province: String(formData.get("province") || "ON"),
    category: String(formData.get("category") || "Homicide") as IncidentCategory,
    title: String(formData.get("title") || ""),
    summary: String(formData.get("summary") || ""),
    sourceName: String(formData.get("sourceName") || ""),
    sourceUrl: String(formData.get("sourceUrl") || ""),
    howKnown: String(formData.get("howKnown") || "")
  });
  await audit("submit_record", "submission", undefined, user.id);
  redirect("/account/submissions?submitted=1");
}

export async function createCorrectionAction(formData: FormData) {
  const user = await requireUser();
  const propertyId = String(formData.get("propertyId") || "");
  await addCorrectionRequest({
    propertyId,
    submittedBy: user.id,
    requestType: String(formData.get("requestType") || "correction") as "owner_review" | "correction" | "removal" | "precision_change",
    message: String(formData.get("message") || ""),
    proofDescription: String(formData.get("proofDescription") || "")
  });
  await audit("request_correction", "property", propertyId, user.id);
  redirect(`/property/${propertyId}?review=1`);
}

export async function generateReportAction(formData: FormData) {
  const user = await requireUser();
  const propertyId = String(formData.get("propertyId") || "");
  const type = String(formData.get("type") || "single_property") as "single_property" | "area";
  const includeSensitive = formData.get("includeSensitive") === "on";
  const includeSupernatural = formData.get("includeSupernatural") === "on";
  const terms = formData.get("terms") === "on";
  if (!terms) redirect(`/property/${propertyId}?terms=1`);

  const store = await readStore();
  const property = store.properties.find((candidate) => candidate.id === propertyId);
  if (!property) redirect("/map");
  if (type === "area" && user.role !== "subscriber" && user.role !== "admin") redirect(`/property/${propertyId}?upgrade=area`);

  const snapshot = type === "area" ? buildAreaSnapshot(store, property, { includeSensitive, includeSupernatural }) : buildSinglePropertySnapshot(store, property);
  const generatedAt = new Date();
  const expiresAt = new Date(generatedAt);
  expiresAt.setMonth(expiresAt.getMonth() + 3);
  const report = {
    id: uid("report"),
    userId: user.id,
    propertyId,
    type,
    verificationCode: verificationCode(),
    generatedAt: generatedAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
    snapshot
  };
  await createReport(report);
  await audit("generate_report", "report", report.id, user.id, { type });
  redirect(`/reports/${report.id}`);
}

export async function demoBuyAction(formData: FormData) {
  const user = await requireUser();
  const propertyId = String(formData.get("propertyId") || "");
  const plan = String(formData.get("plan") || "single");
  await mutateStore((store) => {
    const target = store.users.find((candidate) => candidate.id === user.id);
    if (!target) return;
    target.role = plan === "subscription" ? "subscriber" : "paid";
    if (plan === "subscription") target.reportCredits = 10;
  });
  await audit("demo_purchase", "property", propertyId, user.id, { plan });
  redirect(`/property/${propertyId}`);
}

export async function updateIncidentStatusAction(formData: FormData) {
  const user = await requireRole(["admin"]);
  const incidentId = String(formData.get("incidentId") || "");
  const status = String(formData.get("status") || "Needs Review");
  await mutateStore((store) => {
    const incident = store.incidents.find((candidate) => candidate.id === incidentId);
    if (incident) {
      incident.status = status as never;
      incident.updatedAt = new Date().toISOString();
    }
  });
  await audit("update_incident_status", "incident", incidentId, user.id, { status });
  redirect("/admin/review");
}

export async function createManualRecordAction(formData: FormData) {
  const user = await requireRole(["admin", "researcher"]);
  const category = String(formData.get("category") || "Homicide") as IncidentCategory;
  const now = new Date().toISOString();
  await mutateStore((store) => {
    const propertyId = uid("prop");
    const incidentId = uid("inc");
    const sourceId = uid("src");
    store.properties.unshift({
      id: propertyId,
      address: String(formData.get("address") || ""),
      city: String(formData.get("city") || "Toronto"),
      province: String(formData.get("province") || "ON"),
      neighborhood: String(formData.get("neighborhood") || "Unknown"),
      latitude: Number(formData.get("latitude") || 43.6532),
      longitude: Number(formData.get("longitude") || -79.3832),
      propertyType: String(formData.get("propertyType") || "Unknown") as PropertyType,
      useType: String(formData.get("useType") || "Unknown") as UseType,
      viewPrecision: "exact",
      createdAt: now,
      updatedAt: now
    });
    store.incidents.unshift({
      id: incidentId,
      propertyId,
      title: String(formData.get("title") || ""),
      mainCategory: mainCategoryFor(category),
      category,
      incidentYear: Number(formData.get("incidentYear") || new Date().getFullYear()),
      publicSummary: String(formData.get("summary") || ""),
      internalNotes: String(formData.get("internalNotes") || ""),
      status: user.role === "admin" ? "Needs Review" : "Draft",
      sensitive: formData.get("sensitive") === "on",
      reportAllowed: formData.get("reportAllowed") === "on",
      supernatural: mainCategoryFor(category) === "Supernatural",
      sourceIds: [sourceId],
      createdBy: user.id,
      updatedAt: now
    });
    store.sources.unshift({
      id: sourceId,
      incidentId,
      title: String(formData.get("sourceTitle") || ""),
      name: String(formData.get("sourceName") || ""),
      url: String(formData.get("sourceUrl") || ""),
      retrievedAt: new Date().toISOString().slice(0, 10)
    });
  });
  await audit("create_manual_record", "property", undefined, user.id);
  redirect("/admin/review");
}

export async function importCsvAction(formData: FormData) {
  const user = await requireRole(["admin", "researcher"]);
  const file = formData.get("file");
  if (!(file instanceof File)) redirect("/admin/imports?error=1");
  const text = await file.text();
  const parsed = Papa.parse<Record<string, string>>(text, { header: true, skipEmptyLines: true });
  const warnings: string[] = [];
  const now = new Date().toISOString();

  await mutateStore((store) => {
    for (const [index, row] of parsed.data.entries()) {
      if (!row.address || !row.category || !row.source_url) warnings.push(`Row ${index + 2}: missing address, category, or source_url.`);
      const category = (row.category || "Homicide") as IncidentCategory;
      const propertyId = uid("prop");
      const incidentId = uid("inc");
      const sourceId = uid("src");
      store.properties.unshift({
        id: propertyId,
        address: row.address || "",
        city: row.city || "Toronto",
        province: row.province || "ON",
        neighborhood: row.neighborhood || "Unknown",
        latitude: Number(row.latitude || 43.6532),
        longitude: Number(row.longitude || -79.3832),
        propertyType: (row.property_type || "Unknown") as PropertyType,
        useType: (row.use_type || "Unknown") as UseType,
        viewPrecision: "exact",
        createdAt: now,
        updatedAt: now
      });
      store.incidents.unshift({
        id: incidentId,
        propertyId,
        title: row.title || "Imported record",
        mainCategory: mainCategoryFor(category),
        category,
        incidentDate: row.incident_date,
        incidentYear: Number(row.incident_year || row.incident_date?.slice(0, 4) || new Date().getFullYear()),
        publicSummary: row.summary || "",
        internalNotes: "Imported from CSV. Review before approval.",
        status: row.latitude && row.longitude ? "Needs Review" : "Needs Location Review",
        sensitive: row.sensitive === "true",
        reportAllowed: row.report_allowed !== "false",
        supernatural: mainCategoryFor(category) === "Supernatural",
        sourceIds: [sourceId],
        createdBy: user.id,
        updatedAt: now
      });
      store.sources.unshift({
        id: sourceId,
        incidentId,
        title: row.source_title || row.source_name || "Source",
        name: row.source_name || "",
        url: row.source_url || "",
        publishedAt: row.source_date,
        retrievedAt: new Date().toISOString().slice(0, 10)
      });
    }
  });

  await addImportBatch({
    id: uid("import"),
    createdBy: user.id,
    filename: file.name,
    status: "Imported",
    createdAt: now,
    warnings
  });
  await audit("import_csv", "import_batch", undefined, user.id, { filename: file.name, warnings: warnings.length });
  redirect("/admin/imports?imported=1");
}

export async function grantCreditsAction(formData: FormData) {
  const user = await requireRole(["admin"]);
  const targetUserId = String(formData.get("userId") || "");
  const credits = Number(formData.get("credits") || 0);
  await mutateStore((store) => {
    const target = store.users.find((candidate) => candidate.id === targetUserId);
    if (target) target.reportCredits += credits;
  });
  await audit("grant_credits", "user", targetUserId, user.id, { credits });
  redirect("/admin/users");
}
