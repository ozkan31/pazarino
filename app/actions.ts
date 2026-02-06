"use server";

import { trackEvent, type AnalyticsEventType } from "@/lib/analytics";
import { setActiveTheme } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function emitEvent(type: AnalyticsEventType, entityId?: string) {
  trackEvent({ type, entityId });
}

export async function updateTheme(formData: FormData) {
  const themeId = String(formData.get("themeId") ?? "classic");
  setActiveTheme(themeId);
  revalidatePath("/");
  revalidatePath("/admin/settings");
}
