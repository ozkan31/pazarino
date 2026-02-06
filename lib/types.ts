export type FeatureFlag = {
  key: string;
  enabled: boolean;
  description?: string;
};

export type MaintenanceMode = {
  enabled: boolean;
  message: string;
  updatedAt: string;
};

export type SystemSetting = {
  key: string;
  value: string;
};

export type ConsentRecord = {
  id: string;
  userId: string;
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  policyVersion: string;
  sourceIp?: string;
  createdAt: string;
};

export type LogSeverity = "INFO" | "WARN" | "ERROR";

export type TaxonomyCode =
  | "CONFIG_NOT_FOUND"
  | "VALIDATION_ERROR"
  | "CONSENT_WRITE_FAILED"
  | "BACKUP_FAILED"
  | "RESTORE_FAILED"
  | "INTERNAL_ERROR";

export type LogEntry = {
  id: string;
  timestamp: string;
  severity: LogSeverity;
  message: string;
  correlationId: string;
  path?: string;
  taxonomyCode?: TaxonomyCode;
  metadata?: Record<string, unknown>;
};

export type BackupReport = {
  id: string;
  trigger: "manual" | "scheduled";
  status: "success" | "failure";
  filePath?: string;
  correlationId: string;
  createdAt: string;
  details?: string;
};

export type DatabaseSchema = {
  feature_flags: FeatureFlag[];
  maintenance_mode: MaintenanceMode;
  system_settings: SystemSetting[];
  consents: ConsentRecord[];
  logs: LogEntry[];
  backup_reports: BackupReport[];
};

export type ResolvedConfig = {
  maintenanceMode: MaintenanceMode;
  featureFlags: Record<string, boolean>;
  systemSettings: Record<string, string>;
};
