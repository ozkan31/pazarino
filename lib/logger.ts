import { generateId, readDb, writeDb } from "./db";
import { LogEntry, LogSeverity, TaxonomyCode } from "./types";

type LogInput = {
  severity: LogSeverity;
  message: string;
  correlationId: string;
  path?: string;
  taxonomyCode?: TaxonomyCode;
  metadata?: Record<string, unknown>;
};

export async function writeStructuredLog(input: LogInput): Promise<LogEntry> {
  const db = await readDb();
  const entry: LogEntry = {
    id: generateId("log"),
    timestamp: new Date().toISOString(),
    ...input,
  };

  db.logs = [entry, ...db.logs].slice(0, 500);
  await writeDb(db);
  return entry;
}
