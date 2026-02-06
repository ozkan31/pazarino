import { copyFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { withApiHandling } from "@/lib/api-handler";
import { AppError } from "@/lib/errors";

export const runtime = "nodejs";

export const POST = withApiHandling(async (request: NextRequest) => {
  const body = (await request.json()) as { backupFileName?: string };

  if (!body.backupFileName) {
    throw new AppError("backupFileName zorunludur", "VALIDATION_ERROR", 400);
  }

  const backupPath = path.join(process.cwd(), "backups", body.backupFileName);
  const targetPath = path.join(process.cwd(), "data", "system-db.json");

  await copyFile(backupPath, targetPath);
  return NextResponse.json({ success: true, restoredFrom: backupPath });
});
