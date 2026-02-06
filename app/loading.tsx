import { ScreenState } from "@/components/ui/screen-state";

export default function Loading() {
  return <ScreenState type="loading" title="Yükleniyor" message="Ekran verileri hazırlanıyor." />;
}
