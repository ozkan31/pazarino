import Link from "next/link";
import { PropsWithChildren } from "react";

const storefrontLinks = [
  ["/", "Home"],
  ["/category/laptops", "Category"],
  ["/product/p1", "Product"],
  ["/cart", "Cart"],
  ["/checkout", "Checkout"],
  ["/profile", "Profile"],
  ["/orders", "Orders"],
] as const;

const adminLinks = [
  ["/admin/dashboard", "Dashboard"],
  ["/admin/products", "Products"],
  ["/admin/categories", "Categories"],
  ["/admin/import-monitor", "Import"],
  ["/admin/orders", "Orders"],
  ["/admin/moderation", "Moderation"],
  ["/admin/ads", "Ads"],
  ["/admin/settings", "Theme"],
] as const;

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      <header className="border-b border-slate-200 bg-[var(--color-surface)] px-6 py-4">
        <h1 className="text-xl font-bold">Pazarino</h1>
      </header>
      <main className="mx-auto grid max-w-7xl gap-6 p-6 lg:grid-cols-[220px_1fr]">
        <aside className="space-y-4">
          <div>
            <h2 className="mb-2 text-xs font-semibold uppercase text-[var(--color-muted)]">Storefront</h2>
            <div className="flex flex-col gap-1">
              {storefrontLinks.map(([href, label]) => (
                <Link key={href} href={href} className="rounded px-2 py-1 hover:bg-slate-100">
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-2 text-xs font-semibold uppercase text-[var(--color-muted)]">Admin</h2>
            <div className="flex flex-col gap-1">
              {adminLinks.map(([href, label]) => (
                <Link key={href} href={href} className="rounded px-2 py-1 hover:bg-slate-100">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </aside>
        <section className="space-y-4">{children}</section>
      </main>
    </div>
  );
}
