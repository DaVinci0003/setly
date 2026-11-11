# Setly — Günlük Challenge onay akışı

Bu sürüm mevcut `setly-workout-v1` antrenman verilerini ve `setly-daily-challenge-v1` Challenge geçmişini korur.

## Günlük Challenge
- Her gün yalnızca tek bir temel seviye hareket ve toplam tekrar hedefi sunulur.
- Challenge ilk açıldığında onay ekranı gösterilir; kullanıcı ekipman/ortam seçeneklerini belirleyebilir, başka görev isteyebilir veya o gün atlayabilir.
- Onaylanan görev günlük antrenman listesinin içinde altın efektli ayrı bir kart olarak görünür.
- Tekrarlar normal Setly akışındaki gibi sayı girilip `+` ile set set kaydedilir.
- Challenge ilerlemesi günlük ilerlemeye, toplam tekrara, aylık tekrar sıralamasına ve aylık hedeflere dahil edilir.
- Tamamlanınca günlük seri otomatik artar.

## Kurulum
Arşivdeki `index.html`, `app.js`, `styles.css`, `sw.js`, `manifest.webmanifest` ve `assets` klasörünü GitHub Pages deposunun ana dizinine yükleyip mevcut dosyaların üzerine yazın. `index.html` depo ana dizininde doğrudan görünmelidir. Tarayıcı/uygulama verilerini temizlemeyin; kayıtlar cihazdaki localStorage içinde tutulur.
