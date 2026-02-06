import { SectionHeader } from "@/components/layout/section-header";
import { Card } from "@/components/ui/card";
import { readDb } from "@/lib/db";
import { formatTry } from "@/lib/format";

export default function OrdersPage() {
  const db = readDb();

  return (
    <>
      <SectionHeader title="Orders" description="Sipariş geçmişi" />
      {db.orders.map((order) => (
        <Card key={order.id}>
          <p className="font-semibold">{order.id}</p>
          <p>{order.status}</p>
          <p>{formatTry(order.total)}</p>
        </Card>
      ))}
    </>
  );
}
