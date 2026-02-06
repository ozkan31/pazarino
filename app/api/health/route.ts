import { NextResponse } from "next/server";
import { withApiHandling } from "@/lib/api-handler";
import { resolveRuntimeConfig } from "@/lib/config-resolver";
import { getMetrics } from "@/lib/metrics";

export const runtime = "nodejs";

export const GET = withApiHandling(async () => {
  const config = await resolveRuntimeConfig();
  return NextResponse.json({
    status: "ok",
    maintenanceMode: config.maintenanceMode.enabled,
    metrics: getMetrics(),
    timestamp: new Date().toISOString(),
  });
});
