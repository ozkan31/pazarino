import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { DatabaseSchema } from "./types";

const DB_PATH = path.join(process.cwd(), "data", "system-db.json");
const DB_TMP_PATH = `${DB_PATH}.tmp`;
let writeQueue: Promise<void> = Promise.resolve();

async function ensureDbFile() {
  await mkdir(path.dirname(DB_PATH), { recursive: true });
}

export async function readDb(): Promise<DatabaseSchema> {
  await writeQueue;
  await ensureDbFile();
  const raw = await readFile(DB_PATH, "utf-8");
  return JSON.parse(raw) as DatabaseSchema;
}

export async function writeDb(data: DatabaseSchema): Promise<void> {
  writeQueue = writeQueue.then(async () => {
    await ensureDbFile();
    await writeFile(DB_TMP_PATH, JSON.stringify(data, null, 2), "utf-8");
    await rename(DB_TMP_PATH, DB_PATH);
  });

  await writeQueue;
}

export function generateId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}
