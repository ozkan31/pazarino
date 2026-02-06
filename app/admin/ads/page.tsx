import { SectionHeader } from "@/components/layout/section-header";
import { Card } from "@/components/ui/card";
import { readDb } from "@/lib/db";

export default function AdsPage() {
  const db = readDb();
  return (
    <>
      <SectionHeader title="Ads Management" description="Kampanya ve reklam yönetimi" />
      {db.ads.map((ad) => (
        <Card key={ad.id}>{ad.title} ({ad.slot})</Card>
      ))}
    </>
  );
}
