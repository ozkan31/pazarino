import Image from "next/image";
import { SectionHeader } from "@/components/layout/section-header";
import { ScreenState } from "@/components/ui/screen-state";
import { Card } from "@/components/ui/card";
import { readDb } from "@/lib/db";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = readDb();
  const product = db.products.find((entry) => entry.id === id);

  if (!product) {
    return <ScreenState type="error" title="Ürün bulunamadı" message="Ürün detayı yüklenemedi." />;
  }

  return (
    <>
      <SectionHeader title={product.name} description="Gallery + video + variant seçimi" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="mb-2 font-semibold">Gallery</h3>
          <div className="flex gap-2">
            {product.images.map((image) => (
              <Image key={image} src={image} alt={product.name} width={80} height={80} className="rounded border border-slate-200" />
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="mb-2 font-semibold">Video</h3>
          <p className="text-sm">{product.video}</p>
          <h3 className="mt-4 mb-2 font-semibold">Variants</h3>
          <div className="flex gap-2">
            {product.variants.map((variant) => (
              <span key={variant} className="rounded bg-slate-100 px-2 py-1 text-sm">{variant}</span>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
