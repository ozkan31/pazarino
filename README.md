## Pazarino Prototype

Bu proje Next.js App Router ile hazırlanmış bir e-ticaret prototipidir.

### Kapsam
- Storefront sayfaları: home, category listing (pagination), product detail (gallery/video/variant), cart, checkout, profile, orders.
- Admin sayfaları: product CRUD+bulk, category tree DnD görünümü, import monitor, order management, moderation, ads, dashboard analytics, site settings/theme.
- Ortak UI kit: `Card`, `Button`, `ScreenState` ve design token temelli tema altyapısı.
- Tema yönetimi: `data/db.json` içindeki `themes` + `runtimeConfig.activeThemeId` ile DB-backed runtime tema seçimi.
- Analytics event pipeline: `banner_view`, `banner_click`, `product_click`, `cart_add`, `checkout_start`, `checkout_complete`, `coupon_apply` event tipleri ve DB persist.
- Standart ekran durumları: loading / empty / error / access-denied.

### Geliştirme
```bash
npm run dev
```

### API
- `POST /api/events`: Event payloadlarını DB'ye yazar.
- `GET /api/theme`: Aktif tema ve kullanılabilir tema listesini döner.
