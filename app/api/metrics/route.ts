import { NextResponse } from "next/server";
import { withApiHandling } from "@/lib/api-handler";
import { getMetrics } from "@/lib/metrics";

export const runtime = "nodejs";

export const GET = withApiHandling(async () => NextResponse.json(getMetrics()));
