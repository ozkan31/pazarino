import { SectionHeader } from "@/components/layout/section-header";
import { Card } from "@/components/ui/card";
import { readDb } from "@/lib/db";

export default function AdminProductsPage() {
  const db = readDb();
  return (
    <>
      <SectionHeader title="Product CRUD + Bulk" description="Ürün oluşturma/güncelleme/silme ve toplu işlemler" />
      {db.products.map((product) => (
        <Card key={product.id}>
          <p className="font-semibold">{product.name}</p>
          <p className="text-sm">Stock: {product.stock}</p>
        </Card>
      ))}
    </>
  );
}
