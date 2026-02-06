import { NextResponse } from "next/server";
import { withApiHandling } from "@/lib/api-handler";
import { readDb } from "@/lib/db";

export const runtime = "nodejs";

export const GET = withApiHandling(async () => {
  const db = await readDb();
  return NextResponse.json({ reports: db.backup_reports });
});
