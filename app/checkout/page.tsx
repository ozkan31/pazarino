import { SectionHeader } from "@/components/layout/section-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  return (
    <>
      <SectionHeader title="Checkout" description="Adres, ödeme ve kupon adımları" />
      <Card>
        <p className="mb-3 text-sm">Start/complete checkout ve coupon_apply event tipleri backend pipeline&apos;a yazılıyor.</p>
        <div className="flex gap-2">
          <Button>Ödemeyi Başlat</Button>
          <Button data-variant="ghost">Kupon Uygula</Button>
        </div>
      </Card>
    </>
  );
}
