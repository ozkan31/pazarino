import { SectionHeader } from "@/components/layout/section-header";
import { Card } from "@/components/ui/card";
import { readDb } from "@/lib/db";

export default function AdminDashboardPage() {
  const db = readDb();
  return (
    <>
      <SectionHeader title="Admin Dashboard" description="Analytics ve operasyon özetleri" />
      <div className="grid gap-3 md:grid-cols-3">
        <Card>Products: {db.products.length}</Card>
        <Card>Orders: {db.orders.length}</Card>
        <Card>Events: {db.events.length}</Card>
      </div>
    </>
  );
}
