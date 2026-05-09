import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import { seedStore } from "./seed";
import { readDbStore, writeDbStore } from "./db-store";
import type {
  AuditLog,
  CorrectionRequest,
  ImportBatch,
  Incident,
  PropertyRecord,
  Report,
  SavedProperty,
  Store,
  Submission,
  User
} from "./types";
import { uid } from "./ids";

const dataDir = path.join(process.cwd(), "data");
const storePath = path.join(dataDir, "store.local.json");

function useDatabaseStore() {
  return Boolean(process.env.DATABASE_URL);
}

async function ensureStore() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(storePath);
  } catch {
    await fs.writeFile(storePath, JSON.stringify(seedStore, null, 2), "utf8");
  }
}

export async function readStore(): Promise<Store> {
  if (useDatabaseStore()) {
    return readDbStore();
  }

  await ensureStore();
  const raw = await fs.readFile(storePath, "utf8");
  return JSON.parse(raw) as Store;
}

export async function writeStore(store: Store) {
  if (useDatabaseStore()) {
    await writeDbStore(store);
    return;
  }

  await ensureStore();
  await fs.writeFile(storePath, JSON.stringify(store, null, 2), "utf8");
}

export async function mutateStore<T>(mutator: (store: Store) => T | Promise<T>): Promise<T> {
  const store = await readStore();
  const result = await mutator(store);
  await writeStore(store);
  return result;
}

export async function audit(action: string, entityType: string, entityId?: string, userId?: string, metadata?: AuditLog["metadata"]) {
  await mutateStore((store) => {
    store.auditLogs.unshift({
      id: uid("audit"),
      action,
      entityType,
      entityId,
      userId,
      createdAt: new Date().toISOString(),
      metadata
    });
  });
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const store = await readStore();
  return store.users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export async function findUserById(id?: string): Promise<User | undefined> {
  if (!id) return undefined;
  const store = await readStore();
  return store.users.find((user) => user.id === id);
}

export function approvedIncidents(store: Store) {
  return store.incidents.filter((incident) => incident.status === "Approved");
}

export function propertyFor(store: Store, propertyId: string): PropertyRecord | undefined {
  return store.properties.find((property) => property.id === propertyId);
}

export function incidentsFor(store: Store, propertyId: string, includeHidden = false): Incident[] {
  return store.incidents.filter((incident) => {
    if (incident.propertyId !== propertyId) return false;
    if (includeHidden) return true;
    return incident.status === "Approved";
  });
}

export function sourceForIncident(store: Store, incident: Incident) {
  const id = incident.sourceIds[0];
  return store.sources.find((source) => source.id === id);
}

export async function addSavedProperty(userId: string, propertyId: string): Promise<SavedProperty> {
  return mutateStore((store) => {
    const existing = store.savedProperties.find((saved) => saved.userId === userId && saved.propertyId === propertyId);
    if (existing) return existing;
    const saved = { id: uid("save"), userId, propertyId, createdAt: new Date().toISOString() };
    store.savedProperties.unshift(saved);
    return saved;
  });
}

export async function removeSavedProperty(userId: string, propertyId: string) {
  await mutateStore((store) => {
    store.savedProperties = store.savedProperties.filter((saved) => !(saved.userId === userId && saved.propertyId === propertyId));
  });
}

export async function createSubmission(submission: Omit<Submission, "id" | "status" | "createdAt" | "updatedAt">) {
  return mutateStore((store) => {
    const created: Submission = {
      ...submission,
      id: uid("sub"),
      status: "Needs Review",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    store.submissions.unshift(created);
    return created;
  });
}

export async function createReport(report: Report) {
  return mutateStore((store) => {
    store.reports.unshift(report);
    return report;
  });
}

export async function addCorrectionRequest(request: Omit<CorrectionRequest, "id" | "status" | "createdAt">) {
  return mutateStore((store) => {
    const created: CorrectionRequest = {
      ...request,
      id: uid("correction"),
      status: "Open",
      createdAt: new Date().toISOString()
    };
    store.correctionRequests.unshift(created);
    return created;
  });
}

export async function addImportBatch(batch: ImportBatch) {
  return mutateStore((store) => {
    store.importBatches.unshift(batch);
    return batch;
  });
}
