import { SectionHeader } from "@/components/layout/section-header";
import { Card } from "@/components/ui/card";
import { readDb } from "@/lib/db";

export default function HomePage() {
  const db = readDb();
  return (
    <>
      <SectionHeader title="Storefront Home" description="Home containers ve kampanya alanları" />
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <h2 className="font-semibold">Featured Products</h2>
          <p className="text-sm text-[var(--color-muted)]">{db.products.length} ürün vitrinde.</p>
        </Card>
        <Card>
          <h2 className="font-semibold">Hero Banner</h2>
          <p className="text-sm text-[var(--color-muted)]">Banner view/click event pipeline bağlı.</p>
        </Card>
        <Card>
          <h2 className="font-semibold">Categories</h2>
          <p className="text-sm text-[var(--color-muted)]">{db.categories.length} kategori listeleniyor.</p>
        </Card>
      </div>
    </>
  );
}
