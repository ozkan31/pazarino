import { readDb } from "./db";
import { ResolvedConfig } from "./types";

export async function resolveRuntimeConfig(): Promise<ResolvedConfig> {
  const db = await readDb();

  const featureFlags = Object.fromEntries(
    db.feature_flags.map((flag) => [flag.key, flag.enabled]),
  );

  const systemSettings = Object.fromEntries(
    db.system_settings.map((setting) => [setting.key, setting.value]),
  );

  return {
    maintenanceMode: db.maintenance_mode,
    featureFlags,
    systemSettings,
  };
}
