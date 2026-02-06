import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { withApiHandling } from "@/lib/api-handler";
import { generateId, readDb, writeDb } from "@/lib/db";

export const runtime = "nodejs";

export const POST = withApiHandling(async (_request, correlationId) => {
  const reportId = generateId("backup");
  const sourcePath = path.join(process.cwd(), "data", "system-db.json");
  const backupDir = path.join(process.cwd(), "backups");
  await mkdir(backupDir, { recursive: true });
  const backupPath = path.join(backupDir, `${reportId}.json`);

  await copyFile(sourcePath, backupPath);

  const db = await readDb();
  db.backup_reports = [
    {
      id: reportId,
      trigger: "manual",
      status: "success",
      filePath: backupPath,
      correlationId,
      createdAt: new Date().toISOString(),
      details: "Admin endpoint üzerinden manuel backup alındı.",
    },
    ...db.backup_reports,
  ];
  await writeDb(db);

  return NextResponse.json({ success: true, reportId, backupPath }, { status: 201 });
});
