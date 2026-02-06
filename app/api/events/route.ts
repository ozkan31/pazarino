import { NextRequest, NextResponse } from "next/server";
import { trackEvent, type AnalyticsEventType } from "@/lib/analytics";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  trackEvent({
    type: payload.type as AnalyticsEventType,
    entityId: payload.entityId,
    userId: payload.userId,
    metadata: payload.metadata,
  });

  return NextResponse.json({ ok: true });
}
