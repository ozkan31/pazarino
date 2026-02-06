import { SectionHeader } from "@/components/layout/section-header";
import { Card } from "@/components/ui/card";
import { updateTheme } from "@/app/actions";
import { readDb } from "@/lib/db";

export default function SettingsPage() {
  const db = readDb();

  return (
    <>
      <SectionHeader title="Site Settings / Theme" description="DB-backed themes + runtime config" />
      <Card>
        <form action={updateTheme} className="space-y-3">
          <label className="text-sm font-semibold">Theme</label>
          <select name="themeId" defaultValue={db.runtimeConfig.activeThemeId} className="block rounded border border-slate-300 p-2">
            {db.themes.map((theme) => (
              <option key={theme.id} value={theme.id}>{theme.name}</option>
            ))}
          </select>
          <button className="rounded bg-[var(--color-primary)] px-3 py-2 text-sm font-semibold text-white">Apply Theme</button>
        </form>
      </Card>
    </>
  );
}
