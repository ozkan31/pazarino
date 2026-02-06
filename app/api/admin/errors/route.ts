import { NextResponse } from "next/server";
import { withApiHandling } from "@/lib/api-handler";
import { readDb } from "@/lib/db";

export const runtime = "nodejs";

export const GET = withApiHandling(async () => {
  const db = await readDb();
  const errors = db.logs.filter((log) => log.severity === "ERROR");
  return NextResponse.json({ errors });
});
