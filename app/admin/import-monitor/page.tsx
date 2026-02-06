import { SectionHeader } from "@/components/layout/section-header";
import { Card } from "@/components/ui/card";
import { readDb } from "@/lib/db";

export default function ImportMonitorPage() {
  const db = readDb();
  return (
    <>
      <SectionHeader title="Import Monitor" description="Import süreçlerinin takibi" />
      {db.imports.map((entry) => (
        <Card key={entry.id}>
          <p>{entry.filename}</p>
          <p>{entry.status} - %{entry.progress}</p>
        </Card>
      ))}
    </>
  );
}
