export function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-sm text-[var(--color-muted)]">{description}</p>
    </div>
  );
}
