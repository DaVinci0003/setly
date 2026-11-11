# Setly — Aylık tekrar sıralaması

Bu sürüm, mevcut Setly verilerini (`setly-workout-v1`) koruyarak ana ekrana “Bu Ay En Çok Yaptıklarım” sıralaması ekler.

- İçinde bulunulan ayın kayıtlarını toplar.
- Aynı isimdeki hareketlerin farklı günlerdeki set tekrarlarını birleştirir.
- Hareketleri toplam tekrar sayısına göre büyükten küçüğe sıralar.
- Sıralama her uygulama çiziminde güncellenir; yeni tekrar kaydedilince liste de güncellenir.
- Kardiyo süre/mesafeleri tekrar sayısı olmadığı için bu listede gösterilmez.
- Eski ayların kayıtları silinmez; yalnızca mevcut ayın toplamına katılmaz.

## Kurulum
ZIP içindeki dosyaları GitHub Pages deposunun ana dizinine yükleyip eskilerin üzerine yazın. Actions/Pages dağıtımı tamamlandıktan sonra telefonda Setly'yi kapatın, Chrome'da siteyi açıp yenileyin ve uygulamayı yeniden açın. Tarayıcı veya uygulama verilerini temizlemeyin.

## Günlük Challenge (v15)
- Uygulama açıldığında Günün Challenge'ı penceresi gösterilir.
- Günlük temel hareketler, tekrar hedefleri ve her harekette art arda set ekleme akışı bulunur.
- Ekipmanım yok / Bar veya uygun ortam yok seçenekleri challenge listesini yeniden oluşturur.
- Tamamlanma günlük seriyi otomatik artırır; ayrıca antrenmanı tamamla butonuna basmak gerekmez.
- Challenge tekrarları günlük toplam tekrar, aylık tekrar sıralaması ve aylık hareket hedeflerine dahil edilir.
- Challenge kayıtları `setly-daily-challenge-v1` anahtarında tutulur; mevcut `setly-workout-v1` antrenman kayıtları korunur.
