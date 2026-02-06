import fs from "node:fs";
import path from "node:path";

const dbPath = path.join(process.cwd(), "data", "db.json");

type ThemeTokens = {
  background: string;
  surface: string;
  text: string;
  muted: string;
  primary: string;
  danger: string;
};

type Theme = { id: string; name: string; tokens: ThemeTokens };

type DbShape = {
  runtimeConfig: { activeThemeId: string };
  themes: Theme[];
  categories: Array<{ id: string; name: string; slug: string; parentId: string | null }>;
  products: Array<{
    id: string;
    name: string;
    categorySlug: string;
    price: number;
    stock: number;
    images: string[];
    video: string;
    variants: string[];
  }>;
  orders: Array<{ id: string; status: string; total: number; createdAt: string }>;
  reviews: Array<{ id: string; type: string; content: string; status: string }>;
  ads: Array<{ id: string; title: string; slot: string; active: boolean }>;
  imports: Array<{ id: string; filename: string; status: string; progress: number }>;
  cart: Array<{ productId: string; quantity: number; variant: string }>;
  events: Array<Record<string, unknown>>;
};

export function readDb(): DbShape {
  return JSON.parse(fs.readFileSync(dbPath, "utf8"));
}

export function writeDb(nextDb: DbShape) {
  fs.writeFileSync(dbPath, JSON.stringify(nextDb, null, 2));
}

export function getActiveTheme() {
  const db = readDb();
  return db.themes.find((theme) => theme.id === db.runtimeConfig.activeThemeId) ?? db.themes[0];
}

export function setActiveTheme(themeId: string) {
  const db = readDb();
  db.runtimeConfig.activeThemeId = themeId;
  writeDb(db);
}
