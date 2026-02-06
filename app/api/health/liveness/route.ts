import { NextResponse } from "next/server";
import { withApiHandling } from "@/lib/api-handler";

export const runtime = "nodejs";

export const GET = withApiHandling(async () =>
  NextResponse.json({ status: "alive", timestamp: new Date().toISOString() }),
);
