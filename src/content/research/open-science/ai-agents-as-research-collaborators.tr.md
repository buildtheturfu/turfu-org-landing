# Araştırma İşbirlikçisi Olarak YZ Ajanları

> 2026'da YZ ajanlarıyla yürütülen transdisipliner akademik araştırma için desen kütüphanesi.

---

## Öncül

2024–2026 arasında yayımlanan üretken YZ ajanları (Claude, GPT, Gemini, Kimi vb.) şunları yapabilir:

- Uzun akademik metinleri okuma ve özetleme (1M+ token bağlam)
- Matematiksel ve kavramsal argümanları eleştirme
- Editoryal revizyondan sonra akademik yayına uygun metin üretme
- Atıfları arama ve doğrulama
- Hakem taleplerini öngören önceden hazırlanmış yanıt paketleri oluşturma

Şunları **yapamazlar** (2026 itibarıyla):

- Gerçekten özgün matematiksel kanıtlar üretme
- Hakem değerlendirmesinde alan uzmanlığının yerine geçme
- Bir çalışma bütününe karşı tutarlı entelektüel sorumluluk üstlenme

Burada belgelenen desen, YZ ajanlarını tek bir insan yazarın editoryal sorumluluğu altında **belirli rollerdeki bilişsel işbirlikçiler** olarak ele alır.

---

## Beş işbirlikçi rolü

### 1. Düşmanca Hakem (Peter G rolü)

**Amaç**: gerçek bir hakemin yapacağı en olası R&R taleplerini öngörmek.

**Persona talimatları**:
- Hedef dergi için eleştirel, geniş okurlu bir hakem personası benimseyin
- Makaleyi kalibre edilmiş bir olasılık ağacı üzerinde puanlayın (masa reddi / incelemeden sonra red / büyük revizyon / küçük / kabul)
- En olası revizyon taleplerini olasılık, maliyet ve tatmin edilme şansıyla sıralayın
- Kazanan yanıt üslubunu önerin (savunmacı değil, işbirlikçi, "evet ve bunu daha açık hale getirdik")

**Çıktı biçimi**: olasılık ağacını, sıralanmış olası revizyon listesini ve yanıt stratejisinin meta-ilkelerini içeren yapılandırılmış bir not. Örnek: `papers/02-relational-exit-srbs/strategic-documents/SRBS_R&R_SHADOW_PACKAGE_v3_1_2.md` ve `papers/01-categorical-sketch-biosystems/reviews/peter-memo.md`.

### 2. Biçimsel Doğrulayıcı (Claude Opus rolü)

**Amaç**: iç tutarlılığı, tip kontrolünü, tanımları ve kategori-teorik sağlamlığı doğrulamak.

**Persona talimatları**:
- Biçimsel bölümleri (tanımlar, önermeler, kanıtlar) bir matematikçi gibi okuyun
- Her tip hatasını, tanımsız sembolü, döngüsel tanımı veya tutarsızlığı işaretleyin
- Titizlikle gösterileni, yalnızca iddia edilenden ayırt edin

**Çıktı biçimi**: biçimsel içeriğin satır-satır açıklamalı yargısı (doğru / belirsiz / tutarsız / tanımsız). Örnek: `papers/01-categorical-sketch-biosystems/reviews/opus-review.md`.

### 3. Bağımsız İkincil Hakem (Gemini / Kimi rolü)

**Amaç**: Düşmanca Hakem ile Biçimsel Doğrulayıcı'nın yargılarını farklı verilerle eğitilmiş bağımsız bir modelle çapraz kontrol etmek.

**Persona talimatları**:
- Diğer hakem çıktılarına erişmeden makaleyi okuyun
- Önceki hakemlerin gözden kaçırmış olabileceklerini ve aşırı düzeltme yapmış olabilecekleri yerleri işaretleyin
- Özellikle anlatısal tutarsızlıkları ve ideolojik sinyalleri yakalamak için değerlidir

**Çıktı biçimi**: bağımsız inceleme belgesi. Örnekler: `papers/01-categorical-sketch-biosystems/reviews/gemini-review.md`, `papers/01-categorical-sketch-biosystems/reviews/kimi-review.md`.

### 4. Çapraz YZ Diyaloğu (GPT × Opus tartışmaları)

**Amaç**: tartışmalı noktalarda YZ ajanları arasındaki anlaşmazlıkları yüzeye çıkarmak.

**Persona talimatları**:
- İki YZ ajanının birbirinin incelemelerini okuyup yanıt vermesini sağlayın
- Bir modelin bir diğerini geçersiz kıldığı durumları arayın — bunlar, insan yazarın karar vermesi gereken noktaların işaretidir

**Çıktı biçimi**: diyalog dökümü. Örnek: `papers/01-categorical-sketch-biosystems/reviews/gpt-opus-discussion.md`.

### 5. Metin Editörü

**Amaç**: dili sıkılaştırmak, netleştirmek ve hedef dergi geleneklerine hizalamak.

**Persona talimatları**:
- Her paragrafı "yorgun bir hakem nereyi atlayarak geçer?" sorusuyla okuyun — yapısal argümanı atlanamaz hale getirmek için yeniden yazın
- Hedef derginin sözlüğüne uyum sağlayın (örn. SRBS için sistem-bilimi sözcükleri, BioSystems için biyolojik-sibernetik sözcükler)

**Çıktı biçimi**: makaledeki değişiklik izleri. Örnekler: Makale 1'deki v0.4.x revizyonları (`archive-all-versions/` altında görünür).

---

## İnsan yazarın elinde kalan

Bu desende, insan yazar şu konularda münhasır sorumluluğu elinde tutar:

| Karar | Neden devredilemez |
|---|---|
| Yayımlanan her cümlenin nihai ifadesi | Yazarın imzası yayımlanmış metne iliştirilir |
| Her YZ önerisinin kabul / reddi | YZ ajanlarının kaybedecek bir sicili yoktur; yazarın vardır |
| Stratejik gönderim zamanlaması ve mecra seçimi | Çok-ajanlı akıl yürütme, kariyer ve alan-konumlandırma kısıtlarını bütünleştiremez |
| R&R'da hakem yorumlarına yanıt | Yazar seçimlerini kendi sesiyle savunmak zorundadır |
| YZ kullanımının ifşası | Editoryal politikalar (Wiley 2024, Elsevier 2025, ICMJE 2024) insan ifşasını şart koşar |

---

## Bu, ŞU DEĞİLDİR

- "YZ tarafından üretilmiş içerik" değildir — yayımlanan her cümle insan yazar tarafından incelenir ve yeniden yazılır
- Ortak yazarlık değildir — YZ ajanlarının akademik bağlılığı, sicili veya R&R'da çalışmalarını savunma yetisi yoktur
- Kestirme bir yol değildir — bu metodoloji klasik tek-yazarlıktan daha az değil, daha emek-yoğundur. Telafisi *hız* değil, *kalite* ve *izlenebilirliktir*.

---

## Bu programda kullanılan ifşa metni

Aşağıdaki YZ Kullanım Beyanı hem Makale 1'de (BioSystems, yayımlandı) hem de Makale 2'de (SRBS, gönderildi) yer almıştır:

> Bu çalışmanın hazırlığı sırasında yazar, makale organizasyonu, seçili pasajların dil editörlüğü ve netlik kontrollerini desteklemek üzere YZ destekli araçlar (Claude Opus, GPT, Gemini) kullanmıştır. Bu araçları kullandıktan sonra yazar, makalenin içeriğini — tüm argümantasyon, atıflar, tarihsel iddialar ve nihai ifade dahil — incelemiş, düzenlemiş ve doğrulamıştır. YZ araçları, yazarın gönderilen materyal üzerindeki haklarını koruyacak ve sağlayıcılara makale içeriği üzerinde eğitim hakkı vermeyecek ayarlarda kullanılmıştır. Yazar, makalenin içeriğinden tam sorumluluk almaktadır.

Bu metin, yayım öncesinde BioSystems editör kurulu (Elsevier) tarafından incelenmiş ve kabul edilmiştir.

---

## Yeniden kullanıma davet

Bu desen, akademik topluluğa bir şablon olarak sunulmaktadır. Uyarlama yönergeleri:

- **Matematik-yoğun alanlar için**: Biçimsel Doğrulayıcı rolünü öne çıkarın; 2+ bağımsız model kullanın
- **Ampirik-nicel alanlar için**: kod çalıştırma yeteneğine sahip Bağımsız İkincil Hakem'i öne çıkarın
- **Felsefe-tarih alanları için**: Düşmanca Hakem ve Çapraz YZ Diyaloğunu öne çıkarın; Biçimsel Doğrulayıcıya daha az dayanın
- **Disiplinlerarası çalışmalar için** (bu programın profili): beş rolün tamamını kullanın

Her zaman koruyun:
1. Tek bir insan editoryal sorumluluğu
2. Yayımlanmış makalede YZ kullanımının ifşası
3. YZ-işbirliği yapıtlarının kamusal erişilebilirliği (bu paket deseni)

---

## Ayrıca bakınız

- [`adversarial-review-pattern.md`](adversarial-review-pattern.md) — somut karşıt inceleme şablonu
- [`shadow-package-pattern.md`](shadow-package-pattern.md) — önceden hazırlanmış yanıt paketi metodolojisi
- [`transdisciplinary-framework.md`](transdisciplinary-framework.md) — TURFU A.R.T. çerçevesi
