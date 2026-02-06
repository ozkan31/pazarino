import { SectionHeader } from "@/components/layout/section-header";
import { Card } from "@/components/ui/card";
import { readDb } from "@/lib/db";

export default function AdminOrdersPage() {
  const db = readDb();
  return (
    <>
      <SectionHeader title="Order Management" description="Sipariş yönetimi" />
      {db.orders.map((entry) => (
        <Card key={entry.id}>{entry.id} - {entry.status}</Card>
      ))}
    </>
  );
}
