import { readDb, writeDb } from "@/lib/db";

export type AnalyticsEventType =
  | "banner_view"
  | "banner_click"
  | "product_click"
  | "cart_add"
  | "checkout_start"
  | "checkout_complete"
  | "coupon_apply";

export function trackEvent(event: {
  type: AnalyticsEventType;
  userId?: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
}) {
  const db = readDb();
  db.events.push({
    ...event,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  });
  writeDb(db);
}
