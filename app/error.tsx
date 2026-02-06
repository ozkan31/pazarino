"use client";

import { ScreenState } from "@/components/ui/screen-state";

export default function ErrorPage() {
  return <ScreenState type="error" title="Beklenmeyen hata" message="Bir şeyler ters gitti." />;
}
