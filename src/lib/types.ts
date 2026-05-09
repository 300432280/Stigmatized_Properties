export type UserRole = "free" | "paid" | "subscriber" | "researcher" | "admin";

export type RecordStatus =
  | "Draft"
  | "Needs Review"
  | "Needs Location Review"
  | "Approved"
  | "Rejected"
  | "Disputed"
  | "Hidden"
  | "Archived";

export type MainCategory =
  | "Public Safety"
  | "Property Condition"
  | "Supernatural"
  | "Commercial / Civic"
  | "Notorious Association";

export type IncidentCategory =
  | "Homicide"
  | "Death"
  | "Suicide"
  | "Organized Crime"
  | "Grow-op / Drug Lab"
  | "Fire"
  | "Flood"
  | "Hoarding"
  | "Paranormal / Alleged Haunting"
  | "Urban Legend"
  | "Major Commercial Incident"
  | "Notorious Owner";

export type PropertyType =
  | "Detached"
  | "Semi-detached"
  | "Townhouse"
  | "Condo"
  | "Apartment"
  | "Commercial"
  | "Industrial"
  | "Institutional"
  | "Vacant Land"
  | "Public Space"
  | "Unknown";

export type UseType = "Residential" | "Commercial" | "Mixed-use" | "Public / Institutional" | "Vacant" | "Unknown";

export type Source = {
  id: string;
  incidentId: string;
  title: string;
  name: string;
  url: string;
  publishedAt?: string;
  retrievedAt: string;
};

export type Incident = {
  id: string;
  propertyId: string;
  title: string;
  mainCategory: MainCategory;
  category: IncidentCategory;
  incidentDate?: string;
  incidentYear: number;
  publicSummary: string;
  internalNotes?: string;
  status: RecordStatus;
  sensitive: boolean;
  reportAllowed: boolean;
  supernatural: boolean;
  sourceIds: string[];
  createdBy?: string;
  updatedAt: string;
};

export type PropertyRecord = {
  id: string;
  address: string;
  city: string;
  province: string;
  neighborhood: string;
  latitude: number;
  longitude: number;
  propertyType: PropertyType;
  useType: UseType;
  viewPrecision: "exact" | "building_only" | "street_block" | "area_only";
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  reportCredits: number;
  acceptedTermsAt?: string;
  createdAt: string;
};

export type Submission = {
  id: string;
  submittedBy: string;
  address: string;
  city: string;
  province: string;
  category: IncidentCategory;
  title: string;
  summary: string;
  sourceName?: string;
  sourceUrl?: string;
  howKnown?: string;
  status: RecordStatus;
  createdAt: string;
  updatedAt: string;
};

export type SavedProperty = {
  id: string;
  userId: string;
  propertyId: string;
  createdAt: string;
};

export type Report = {
  id: string;
  userId: string;
  propertyId: string;
  type: "single_property" | "area";
  verificationCode: string;
  generatedAt: string;
  expiresAt: string;
  snapshot: ReportSnapshot;
  downloadedAt?: string;
};

export type ReportSnapshot = {
  title: string;
  propertyAddress: string;
  generatedAt: string;
  mapCenter: [number, number];
  radiusMeters?: number;
  incidents: Array<{
    propertyAddress: string;
    city: string;
    neighborhood: string;
    title: string;
    category: IncidentCategory;
    incidentYear: number;
    publicSummary: string;
    sourceTitle: string;
    sourceUrl: string;
  }>;
};

export type AuditLog = {
  id: string;
  userId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  createdAt: string;
  metadata?: Record<string, string | number | boolean>;
};

export type ImportBatch = {
  id: string;
  createdBy: string;
  filename: string;
  status: "Preview" | "Imported" | "Rejected";
  createdAt: string;
  warnings: string[];
};

export type CorrectionRequest = {
  id: string;
  propertyId: string;
  submittedBy: string;
  requestType: "owner_review" | "correction" | "removal" | "precision_change";
  message: string;
  proofDescription?: string;
  status: "Open" | "Resolved" | "Rejected";
  createdAt: string;
};

export type Store = {
  users: User[];
  properties: PropertyRecord[];
  incidents: Incident[];
  sources: Source[];
  submissions: Submission[];
  savedProperties: SavedProperty[];
  reports: Report[];
  auditLogs: AuditLog[];
  importBatches: ImportBatch[];
  correctionRequests: CorrectionRequest[];
};
