import { SectionHeader } from "@/components/layout/section-header";
import { ScreenState } from "@/components/ui/screen-state";
import { Card } from "@/components/ui/card";
import { formatTry } from "@/lib/format";
import { readDb } from "@/lib/db";

export default function CartPage() {
  const db = readDb();
  if (!db.cart.length) return <ScreenState type="empty" title="Sepet boş" message="Sepetinizde ürün bulunmuyor." />;

  return (
    <>
      <SectionHeader title="Cart" description="Sepet ve ürün kalemleri" />
      {db.cart.map((item) => {
        const product = db.products.find((entry) => entry.id === item.productId);
        if (!product) return null;
        return (
          <Card key={item.productId}>
            <p>{product.name}</p>
            <p>{item.variant} × {item.quantity}</p>
            <p>{formatTry(product.price * item.quantity)}</p>
          </Card>
        );
      })}
    </>
  );
}
