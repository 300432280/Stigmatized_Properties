import "server-only";

import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import type {
  AuditLog,
  Incident,
  IncidentCategory,
  MainCategory,
  PropertyType,
  RecordStatus,
  Store,
  UseType
} from "./types";

const statusToDb: Record<RecordStatus, string> = {
  Draft: "Draft",
  "Needs Review": "NeedsReview",
  "Needs Location Review": "NeedsLocationReview",
  Approved: "Approved",
  Rejected: "Rejected",
  Disputed: "Disputed",
  Hidden: "Hidden",
  Archived: "Archived"
};

const statusFromDb: Record<string, RecordStatus> = {
  Draft: "Draft",
  NeedsReview: "Needs Review",
  NeedsLocationReview: "Needs Location Review",
  Approved: "Approved",
  Rejected: "Rejected",
  Disputed: "Disputed",
  Hidden: "Hidden",
  Archived: "Archived"
};

const mainToDb: Record<MainCategory, string> = {
  "Public Safety": "PublicSafety",
  "Property Condition": "PropertyCondition",
  Supernatural: "Supernatural",
  "Commercial / Civic": "CommercialCivic",
  "Notorious Association": "NotoriousAssociation"
};

const mainFromDb: Record<string, MainCategory> = {
  PublicSafety: "Public Safety",
  PropertyCondition: "Property Condition",
  Supernatural: "Supernatural",
  CommercialCivic: "Commercial / Civic",
  NotoriousAssociation: "Notorious Association"
};

const categoryToDb: Record<IncidentCategory, string> = {
  Homicide: "Homicide",
  Death: "Death",
  Suicide: "Suicide",
  "Organized Crime": "OrganizedCrime",
  "Grow-op / Drug Lab": "GrowOpDrugLab",
  Fire: "Fire",
  Flood: "Flood",
  Hoarding: "Hoarding",
  "Paranormal / Alleged Haunting": "ParanormalAllegedHaunting",
  "Urban Legend": "UrbanLegend",
  "Major Commercial Incident": "MajorCommercialIncident",
  "Notorious Owner": "NotoriousOwner"
};

const categoryFromDb: Record<string, IncidentCategory> = Object.fromEntries(
  Object.entries(categoryToDb).map(([local, db]) => [db, local])
) as Record<string, IncidentCategory>;

const propertyTypeToDb: Record<PropertyType, string> = {
  Detached: "Detached",
  "Semi-detached": "SemiDetached",
  Townhouse: "Townhouse",
  Condo: "Condo",
  Apartment: "Apartment",
  Commercial: "Commercial",
  Industrial: "Industrial",
  Institutional: "Institutional",
  "Vacant Land": "VacantLand",
  "Public Space": "PublicSpace",
  Unknown: "Unknown"
};

const propertyTypeFromDb: Record<string, PropertyType> = Object.fromEntries(
  Object.entries(propertyTypeToDb).map(([local, db]) => [db, local])
) as Record<string, PropertyType>;

const useTypeToDb: Record<UseType, string> = {
  Residential: "Residential",
  Commercial: "Commercial",
  "Mixed-use": "MixedUse",
  "Public / Institutional": "PublicInstitutional",
  Vacant: "Vacant",
  Unknown: "Unknown"
};

const useTypeFromDb: Record<string, UseType> = Object.fromEntries(
  Object.entries(useTypeToDb).map(([local, db]) => [db, local])
) as Record<string, UseType>;

export async function readDbStore(): Promise<Store> {
  const [
    users,
    properties,
    incidents,
    sources,
    submissions,
    savedProperties,
    reports,
    auditLogs,
    importBatches,
    correctionRequests
  ] = await Promise.all([
    prisma.user.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.propertyRecord.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.incident.findMany({ include: { sources: true }, orderBy: { updatedAt: "desc" } }),
    prisma.source.findMany(),
    prisma.submission.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.savedProperty.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.report.findMany({ orderBy: { generatedAt: "desc" } }),
    prisma.auditLog.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.importBatch.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.correctionRequest.findMany({ orderBy: { createdAt: "desc" } })
  ]);

  return {
    users: users.map((user) => ({
      id: user.id,
      email: user.email,
      password: user.password,
      role: user.role,
      reportCredits: user.reportCredits,
      acceptedTermsAt: user.acceptedTermsAt?.toISOString(),
      createdAt: user.createdAt.toISOString()
    })),
    properties: properties.map((property) => ({
      id: property.id,
      address: property.address,
      city: property.city,
      province: property.province,
      neighborhood: property.neighborhood,
      latitude: property.latitude,
      longitude: property.longitude,
      propertyType: propertyTypeFromDb[property.propertyType] ?? "Unknown",
      useType: useTypeFromDb[property.useType] ?? "Unknown",
      viewPrecision: property.viewPrecision,
      createdAt: property.createdAt.toISOString(),
      updatedAt: property.updatedAt.toISOString()
    })),
    incidents: incidents.map((incident) => ({
      id: incident.id,
      propertyId: incident.propertyId,
      title: incident.title,
      mainCategory: mainFromDb[incident.mainCategory] ?? "Public Safety",
      category: categoryFromDb[incident.category] ?? "Homicide",
      incidentDate: incident.incidentDate?.toISOString(),
      incidentYear: incident.incidentYear,
      publicSummary: incident.publicSummary,
      internalNotes: incident.internalNotes ?? undefined,
      status: statusFromDb[incident.status] ?? "Needs Review",
      sensitive: incident.sensitive,
      reportAllowed: incident.reportAllowed,
      supernatural: incident.supernatural,
      sourceIds: incident.sources.map((source) => source.id),
      createdBy: incident.createdById ?? undefined,
      updatedAt: incident.updatedAt.toISOString()
    })),
    sources: sources.map((source) => ({
      id: source.id,
      incidentId: source.incidentId,
      title: source.title,
      name: source.name,
      url: source.url,
      publishedAt: source.publishedAt?.toISOString(),
      retrievedAt: source.retrievedAt.toISOString()
    })),
    submissions: submissions.map((submission) => ({
      id: submission.id,
      submittedBy: submission.submittedBy,
      address: submission.address,
      city: submission.city,
      province: submission.province,
      category: categoryFromDb[submission.category] ?? "Homicide",
      title: submission.title,
      summary: submission.summary,
      sourceName: submission.sourceName ?? undefined,
      sourceUrl: submission.sourceUrl ?? undefined,
      howKnown: submission.howKnown ?? undefined,
      status: statusFromDb[submission.status] ?? "Needs Review",
      createdAt: submission.createdAt.toISOString(),
      updatedAt: submission.updatedAt.toISOString()
    })),
    savedProperties: savedProperties.map((saved) => ({
      id: saved.id,
      userId: saved.userId,
      propertyId: saved.propertyId,
      createdAt: saved.createdAt.toISOString()
    })),
    reports: reports.map((report) => ({
      id: report.id,
      userId: report.userId,
      propertyId: report.propertyId,
      type: report.type,
      verificationCode: report.verificationCode,
      generatedAt: report.generatedAt.toISOString(),
      expiresAt: report.expiresAt.toISOString(),
      snapshot: report.snapshot as never,
      downloadedAt: report.downloadedAt?.toISOString()
    })),
    auditLogs: auditLogs.map((log) => ({
      id: log.id,
      userId: log.userId ?? undefined,
      action: log.action,
      entityType: log.entityType,
      entityId: log.entityId ?? undefined,
      createdAt: log.createdAt.toISOString(),
      metadata: log.metadata as AuditLog["metadata"]
    })),
    importBatches: importBatches.map((batch) => ({
      id: batch.id,
      createdBy: batch.createdBy,
      filename: batch.filename,
      status: batch.status,
      createdAt: batch.createdAt.toISOString(),
      warnings: Array.isArray(batch.warnings) ? (batch.warnings as string[]) : []
    })),
    correctionRequests: correctionRequests.map((request) => ({
      id: request.id,
      propertyId: request.propertyId,
      submittedBy: request.submittedBy,
      requestType: request.requestType,
      message: request.message,
      proofDescription: request.proofDescription ?? undefined,
      status: request.status,
      createdAt: request.createdAt.toISOString()
    }))
  };
}

export async function writeDbStore(store: Store) {
  await prisma.$transaction(async (tx) => {
    await tx.source.deleteMany();
    await tx.incident.deleteMany();
    await tx.savedProperty.deleteMany();
    await tx.report.deleteMany();
    await tx.submission.deleteMany();
    await tx.correctionRequest.deleteMany();
    await tx.importBatch.deleteMany();
    await tx.auditLog.deleteMany();
    await tx.propertyRecord.deleteMany();
    await tx.user.deleteMany();

    if (store.users.length) {
      await tx.user.createMany({
        data: store.users.map((user) => ({
          id: user.id,
          email: user.email,
          password: user.password,
          role: user.role,
          reportCredits: user.reportCredits,
          acceptedTermsAt: user.acceptedTermsAt ? new Date(user.acceptedTermsAt) : null,
          createdAt: new Date(user.createdAt)
        }))
      });
    }

    if (store.properties.length) {
      await tx.propertyRecord.createMany({
        data: store.properties.map((property) => ({
          id: property.id,
          address: property.address,
          city: property.city,
          province: property.province,
          neighborhood: property.neighborhood,
          latitude: property.latitude,
          longitude: property.longitude,
          propertyType: propertyTypeToDb[property.propertyType] as never,
          useType: useTypeToDb[property.useType] as never,
          viewPrecision: property.viewPrecision,
          createdAt: new Date(property.createdAt),
          updatedAt: new Date(property.updatedAt)
        }))
      });
    }

    if (store.incidents.length) {
      await tx.incident.createMany({
        data: store.incidents.map((incident) => ({
          id: incident.id,
          propertyId: incident.propertyId,
          title: incident.title,
          mainCategory: mainToDb[incident.mainCategory] as never,
          category: categoryToDb[incident.category] as never,
          incidentDate: incident.incidentDate ? new Date(incident.incidentDate) : null,
          incidentYear: incident.incidentYear,
          publicSummary: incident.publicSummary,
          internalNotes: incident.internalNotes ?? null,
          status: statusToDb[incident.status] as never,
          sensitive: incident.sensitive,
          reportAllowed: incident.reportAllowed,
          supernatural: incident.supernatural,
          createdById: incident.createdBy ?? null,
          updatedAt: new Date(incident.updatedAt)
        }))
      });
    }

    if (store.sources.length) {
      await tx.source.createMany({
        data: store.sources.map((source) => ({
          id: source.id,
          incidentId: source.incidentId,
          title: source.title,
          name: source.name,
          url: source.url,
          publishedAt: source.publishedAt ? new Date(source.publishedAt) : null,
          retrievedAt: new Date(source.retrievedAt)
        }))
      });
    }

    if (store.submissions.length) {
      await tx.submission.createMany({
        data: store.submissions.map((submission) => ({
          id: submission.id,
          submittedBy: submission.submittedBy,
          address: submission.address,
          city: submission.city,
          province: submission.province,
          category: categoryToDb[submission.category] as never,
          title: submission.title,
          summary: submission.summary,
          sourceName: submission.sourceName ?? null,
          sourceUrl: submission.sourceUrl ?? null,
          howKnown: submission.howKnown ?? null,
          status: statusToDb[submission.status] as never,
          createdAt: new Date(submission.createdAt),
          updatedAt: new Date(submission.updatedAt)
        }))
      });
    }

    if (store.savedProperties.length) {
      await tx.savedProperty.createMany({
        data: store.savedProperties.map((saved) => ({
          id: saved.id,
          userId: saved.userId,
          propertyId: saved.propertyId,
          createdAt: new Date(saved.createdAt)
        }))
      });
    }

    if (store.reports.length) {
      await tx.report.createMany({
        data: store.reports.map((report) => ({
          id: report.id,
          userId: report.userId,
          propertyId: report.propertyId,
          type: report.type,
          verificationCode: report.verificationCode,
          generatedAt: new Date(report.generatedAt),
          expiresAt: new Date(report.expiresAt),
          snapshot: report.snapshot as Prisma.InputJsonValue,
          downloadedAt: report.downloadedAt ? new Date(report.downloadedAt) : null
        }))
      });
    }

    if (store.importBatches.length) {
      await tx.importBatch.createMany({
        data: store.importBatches.map((batch) => ({
          id: batch.id,
          createdBy: batch.createdBy,
          filename: batch.filename,
          status: batch.status,
          createdAt: new Date(batch.createdAt),
          warnings: batch.warnings
        }))
      });
    }

    if (store.correctionRequests.length) {
      await tx.correctionRequest.createMany({
        data: store.correctionRequests.map((request) => ({
          id: request.id,
          propertyId: request.propertyId,
          submittedBy: request.submittedBy,
          requestType: request.requestType,
          message: request.message,
          proofDescription: request.proofDescription ?? null,
          status: request.status,
          createdAt: new Date(request.createdAt)
        }))
      });
    }

    if (store.auditLogs.length) {
      await tx.auditLog.createMany({
        data: store.auditLogs.map((log) => ({
          id: log.id,
          userId: log.userId ?? null,
          action: log.action,
          entityType: log.entityType,
          entityId: log.entityId ?? null,
          createdAt: new Date(log.createdAt),
          metadata: (log.metadata ?? Prisma.JsonNull) as Prisma.InputJsonValue
        }))
      });
    }
  });
}
