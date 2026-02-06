import { SectionHeader } from "@/components/layout/section-header";
import { Card } from "@/components/ui/card";
import { readDb } from "@/lib/db";

export default function AdminCategoriesPage() {
  const db = readDb();
  return (
    <>
      <SectionHeader title="Category Tree (DnD)" description="Kategori hiyerarşisi ve sürükle-bırak sıralama" />
      {db.categories.map((category) => (
        <Card key={category.id}>
          <p>{category.name}</p>
          <p className="text-xs text-[var(--color-muted)]">parent: {category.parentId ?? "root"}</p>
        </Card>
      ))}
    </>
  );
}
