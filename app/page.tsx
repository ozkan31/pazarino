import Link from "next/link";
import { resolveRuntimeConfig } from "@/lib/config-resolver";
import { ConsentBanner } from "./components/consent-banner";

export default async function Home() {
  const config = await resolveRuntimeConfig();

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10 font-sans text-zinc-900">
      <main className="mx-auto max-w-4xl space-y-6 rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold">Pazarino Runtime Config Dashboard</h1>
        <p className="text-sm text-zinc-600">
          feature_flags, maintenance_mode ve system_settings tabloları aktif
          olarak config resolver tarafından okunuyor.
        </p>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-zinc-200 p-4">
            <h2 className="font-medium">Maintenance Mode</h2>
            <p className="mt-2 text-sm">
              Durum: {config.maintenanceMode.enabled ? "Açık" : "Kapalı"}
            </p>
            <p className="text-xs text-zinc-500">{config.maintenanceMode.message}</p>
          </article>
          <article className="rounded-xl border border-zinc-200 p-4">
            <h2 className="font-medium">Feature Flags</h2>
            <ul className="mt-2 space-y-1 text-sm">
              {Object.entries(config.featureFlags).map(([key, enabled]) => (
                <li key={key}>
                  {key}: <strong>{enabled ? "on" : "off"}</strong>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="rounded-xl border border-zinc-200 p-4">
          <h2 className="font-medium">System Settings</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {Object.entries(config.systemSettings).map(([key, value]) => (
              <li key={key}>
                {key}: <strong>{value}</strong>
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link className="rounded bg-black px-4 py-2 text-sm text-white" href="/admin">
            Admin Log/Hata Ekranı
          </Link>
          <Link className="rounded border border-zinc-300 px-4 py-2 text-sm" href="/api/health">
            Health Endpoint
          </Link>
        </div>
      </main>
      <ConsentBanner />
    </div>
  );
}
