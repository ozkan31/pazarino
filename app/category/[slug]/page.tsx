import { SectionHeader } from "@/components/layout/section-header";
import { ScreenState } from "@/components/ui/screen-state";
import { Card } from "@/components/ui/card";
import { readDb } from "@/lib/db";
import { formatTry } from "@/lib/format";

export default async function CategoryPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ page?: string }> }) {
  const { slug } = await params;
  const { page = "1" } = await searchParams;
  const pageSize = 1;
  const pageNumber = Number(page) || 1;
  const db = readDb();
  const products = db.products.filter((product) => product.categorySlug === slug);

  if (!products.length) {
    return <ScreenState type="empty" title="Kategori boş" message="Bu kategoride henüz ürün bulunmuyor." />;
  }

  const start = (pageNumber - 1) * pageSize;
  const current = products.slice(start, start + pageSize);

  return (
    <>
      <SectionHeader title={`Kategori: ${slug}`} description="Pagination/lazy yükleme simülasyonu" />
      <div className="space-y-3">
        {current.map((product) => (
          <Card key={product.id}>
            <h2 className="font-semibold">{product.name}</h2>
            <p>{formatTry(product.price)}</p>
          </Card>
        ))}
      </div>
      <p className="text-sm text-[var(--color-muted)]">Sayfa {pageNumber} / {Math.ceil(products.length / pageSize)}</p>
    </>
  );
}
