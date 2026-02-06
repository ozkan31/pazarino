# Backup / Restore Prosedürü

## Amaç
Bu doküman, `system-db.json` tabanlı operasyonel verinin güvenli şekilde yedeklenmesi ve geri yüklenmesi için standart adımları tanımlar.

## Kapsam
- `feature_flags`
- `maintenance_mode`
- `system_settings`
- `consents`
- `logs`
- `backup_reports`

## Backup İş Akışı
1. Admin panelinden **Backup Job Çalıştır** butonuna basılır (`POST /api/admin/jobs/backup`).
2. Sistem `data/system-db.json` dosyasını `backups/<backup_id>.json` dosyasına kopyalar.
3. Sonuç, `backup_reports` tablosuna `status=success|failure` olarak yazılır.
4. Raporlar admin panelinde görüntülenir (`GET /api/admin/reports`).

## Restore İş Akışı
1. Restore edilecek backup dosya adı belirlenir (ör: `backup_xxxx.json`).
2. `POST /api/admin/jobs/restore` endpoint'ine `backupFileName` gönderilir.
3. Sistem ilgili backup dosyasını canlı `data/system-db.json` üzerine yazar.
4. İşlem sonrası health/readiness endpointleri kontrol edilir.

## Otomatik Raporlama
- Her backup denemesi `backup_reports` tablosuna yazılır.
- Rapor alanları:
  - `id`
  - `trigger` (manual/scheduled)
  - `status`
  - `filePath`
  - `correlationId`
  - `createdAt`
  - `details`

## Doğrulama Komutları
```bash
curl -X POST http://localhost:3000/api/admin/jobs/backup
curl http://localhost:3000/api/admin/reports
curl -X POST http://localhost:3000/api/admin/jobs/restore \
  -H 'Content-Type: application/json' \
  -d '{"backupFileName":"backup_xxxx.json"}'
```
