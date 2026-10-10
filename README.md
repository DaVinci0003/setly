# Setly — bağımsız adres sürümü

Bu paket, Setly'yi `davinci0003.github.io/setly/` yolundan bağımsız, kendi origin'inde yayınlamak içindir.

## Netlify ile yayınlama
1. Netlify hesabında `https://app.netlify.com/drop` sayfasını aç.
2. Bu ZIP'i önce bilgisayarında bir klasöre çıkar.
3. Çıkarılmış klasörün içeriğini (index.html, app.js, styles.css, manifest.webmanifest, sw.js ve assets klasörü) Netlify Drop alanına sürükle. ZIP'in kendisini değil, çıkarılmış klasörü yükle.
4. Netlify'nin verdiği yeni `*.netlify.app` adresini aç.
5. Önce manifest adresinin `/manifest.webmanifest` ile açıldığını, ardından ana sayfanın çalıştığını kontrol et.
6. Telefonda yalnızca yeni Netlify adresini Chrome'da açıp uygulamayı yükle.

Bu sürüm kök dizinde (`/`) çalışacak şekilde düzenlenmiştir. Eski GitHub Pages adresindeki Setly'yi değiştirmez; Level Up'a dokunmaz.

Not: Yeni origin eski Chrome uygulama kaydından ayrılmayı sağlar, fakat kurulumun kesin başarılı olacağı garanti edilemez. Yeni adresin kurulumu başarısız olursa hata mesajı üzerinden devam edilir.

## Yeni özellik: Kayıtlı antrenman grupları
- Günlük plana hareket ekledikten sonra **Grubu kaydet** ile isimli program oluşturabilirsin.
- Kayıtlı programlar günlük antrenmanın üst kısmında görünür.
- **Yükle** seçilen gruptaki hareketleri ve hedeflerini bugünkü plana ekler; o günün set ilerlemeleri sıfırdan başlar.
- **Düzenle** ile grup adını ve set/tekrar veya kardiyo hedeflerini değiştirebilirsin. **Sil** yalnızca kayıtlı şablonu kaldırır.
- Aynı hareket günlük planda zaten varsa ikinci kez eklenmez.
- Kayıtlı gruplar bu cihazın yerel verilerinde saklanır; eski antrenman verilerinin anahtarı korunmuştur.
