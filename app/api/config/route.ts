import { NextResponse } from "next/server";
import { withApiHandling } from "@/lib/api-handler";
import { resolveRuntimeConfig } from "@/lib/config-resolver";

export const runtime = "nodejs";

export const GET = withApiHandling(async () => {
  const config = await resolveRuntimeConfig();
  return NextResponse.json(config);
});
