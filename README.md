# Setly — Antrenman Takibi

Kişisel günlük antrenman planı. Koyu lacivert/siyah zemin, turkuaz vurgular ve gönderdiğin ekran görüntüsüne yakın kart tasarımıyla hazırlanmıştır.

## Özellikler
- Hareket arama ve kategori filtreleri: vücut ağırlığı, dumbbell, barbell, kardiyo ve makineler.
- Düzenli set/tekrar hedefi belirleme veya serbest set modunda toplam tekrar hedefi koyma (ör. 100 barfiks). Serbest modda her `+` kaydı yeni boş set alanı açar ve toplam ilerleme görünür.
- Her set için tekrar sayısını girip `+` ile kaydetme; ayrıca set kutucuğunu tikleyerek tamamlama.
- Koşu/yürüyüş gibi kardiyo hareketlerinde kilometre veya dakika hedefi ve tamamlandı seçeneği.
- Hareketi sabitleme: sabitlenen hareketler diğer günlerin planına taşınır; sabitlenmeyen hareketler yalnızca eklendiği günde kalır.
- Tarih seçimi, günlük ilerleme yüzdesi, toplam tekrar, son 7 gün ve son 30 günlük hareket dağılımı.
- Özel hareket ekleme ve hareketleri düzenleme/silme.
- Veriler tarayıcının yerel depolamasında tutulur. Sunucuya gönderilmez.

## Bilgisayarda açma
En kolay yöntem `index.html` dosyasını tarayıcıda açmaktır. Uygulama temel özellikleriyle çalışır.

## Telefona uygulama olarak kurma (PWA)
Kurulum ve çevrimdışı çalışma için siteyi HTTPS üzerinden yayınlamak gerekir. ZIP'i bir statik site sunucusuna (ör. GitHub Pages veya Netlify) yükledikten sonra:
- Android/Chrome: siteyi aç → tarayıcı menüsü → **Uygulamayı yükle** veya **Ana ekrana ekle**.
- iPhone/Safari: siteyi aç → Paylaş → **Ana Ekrana Ekle**.
- Bilgisayarda Chrome/Edge: adres çubuğundaki yükleme simgesini veya menüdeki **Uygulamayı yükle** seçeneğini kullan.

## Not
Veriler aynı cihaz ve aynı tarayıcıda saklanır. Tarayıcı verilerini temizlemek verileri silebilir. Başka cihaza otomatik senkronizasyon bu sürümde yoktur.
