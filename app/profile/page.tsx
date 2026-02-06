import { SectionHeader } from "@/components/layout/section-header";
import { Card } from "@/components/ui/card";
import { ScreenState } from "@/components/ui/screen-state";

export default async function ProfilePage({ searchParams }: { searchParams: Promise<{ denied?: string }> }) {
  const { denied } = await searchParams;
  if (denied === "1") {
    return <ScreenState type="access-denied" title="Erişim reddedildi" message="Bu alan için yetkiniz yok." />;
  }

  return (
    <>
      <SectionHeader title="Profile" description="Kullanıcı profil sayfası" />
      <Card>
        <p>Ad Soyad: Demo User</p>
        <p className="text-sm text-[var(--color-muted)]">Yetki: customer</p>
      </Card>
    </>
  );
}
