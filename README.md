# Setly — Antrenman Takibi

GitHub Pages için gözden geçirilmiş Setly paketi. Dosyaları GitHub'daki **setly deposunun köküne** yükleyin; `index.html` doğrudan `https://davinci0003.github.io/setly/` adresinden erişilebilir olmalıdır. `antrenman_takip` gibi ek bir klasörün içine koymayın.

## İçerik
- `index.html`, `styles.css`, `app.js`: uygulama arayüzü ve davranışları.
- `manifest.webmanifest`: `/setly/` altında açık ve ayrı PWA kimliği, başlangıç adresi ve kapsam.
- `sw.js`: yalnızca `/setly/` kapsamına müdahale eder; yalnızca `setly-cache-*` önbelleklerini temizler. Aynı alan adındaki LEVEL UP önbelleklerini silmez ve diğer uygulamaların önbellek yanıtlarını aramaz.
- `assets/icon-192.png`, `assets/icon-512.png`, `assets/icon.svg`: uygulama simgeleri.

## Özellikler
- Hareket arama ve kategori filtreleri: vücut ağırlığı, dumbbell, barbell, kardiyo ve makineler.
- Düzenli set/tekrar veya serbest set modu. Serbest modda her `+` kaydı girilen seti kaydeder ve hedefe ulaşılmadıysa yeni boş set açar.
- Kardiyo hedefleri, sabit hareketler, tarih seçimi, günlük ilerleme, toplam tekrar, son 7 gün ve son 30 günlük dağılım.
- Özel hareket ekleme, düzenleme ve silme.
- Antrenman tamamlanınca ilgili gün kilitlenir; o güne yeni hareket eklenemez ve mevcut girişler değiştirilemez.
- Veriler tarayıcının bu siteye ait yerel depolamasında tutulur; otomatik cihazlar arası eşitleme yoktur.

## GitHub Pages'e yükleme
1. ZIP içindeki dosyaları çıkarın.
2. İçindeki dosya ve `assets` klasörünü doğrudan `setly` deposunun köküne yükleyin.
3. GitHub Pages yayınını tamamladıktan sonra şu adresleri kontrol edin:
   - `https://davinci0003.github.io/setly/`
   - `https://davinci0003.github.io/setly/manifest.webmanifest`
   - `https://davinci0003.github.io/setly/sw.js`
4. Telefonda önce siteyi normal Chrome sekmesinde açın. Güncel dosyalar yayınlandıktan sonra Chrome'u tamamen kapatıp yeniden açın ve yüklemeyi yeniden deneyin.

## Önemli not
Bu paket, manifest kimliğini ve servis çalışanı kapsamını açıkça ayırır ve aynı origin'deki diğer uygulamaların önbelleklerini silmez. Ancak Android/Chrome'un daha önce oluşturduğu bozuk bir kurulum kaydını uzaktan kesin olarak silemez. Böyle bir kayıt sürerse Chrome/Android tarafında ayrıca kaldırılması gerekebilir.
