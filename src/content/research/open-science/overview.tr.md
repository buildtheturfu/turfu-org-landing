# Metodoloji — YZ Araştırma İşbirlikçileri ile TURFU Açık Bilim

> *Transdisipliner araştırmanın, YZ ajanları bilişsel işbirlikçi olarak, her iterasyonun, her incelemenin, her stratejik kararın bütüncül izlenebilirliği ile — tek bir insan yazarın editoryal sorumluluğu altında — nasıl açık biçimde yürütülebileceğine dair örnek bir vaka çalışması.*

---

## Tez

2026 yılında üretken YZ ajanlarının yardımıyla yürütülen akademik araştırma, insan emeği gibi görünmeye çalışan "YZ tarafından üretilmiş içerik" değildir. Bu, **yeni bir bilişsel işbirliği biçimidir** ve şunları içerir:

1. İnsan yazar, editoryal ve entelektüel sorumluluğun tamamını elinde tutar,
2. YZ ajanları **karşıt hakemler, biçimsel doğrulama asistanları, metin editörleri ve tarihsel kaynak hızlandırıcıları** olarak hizmet eder,
3. İşbirliğinin tam izleri saklanmak yerine kamuya açılır,
4. Metodoloji, klasik akademik çalışmayla aynı epistemik ölçütler altında hakem değerlendirmesinden geçen sonuçlar üretir — *ve* kendi üretim sürecini de incelemeye açar.

Bu paket, söz konusu modu Ocak–Mayıs 2026 arasında yürütülmüş iki akademik yayın boyunca uygulamada göstermektedir.

---

## Beş desen ilkesi

### 1. Bütüncül tarihçe deseni

Her makalenin her sürümü korunur. Paket içindeki `archive-all-versions/` dizinleri Makale 2 için `v0.1`'den `v3.1.2`'ye ve Makale 1 için `v3`'ten `v0.4.13`'e kadar tüm makale revizyonlarını barındırır.

**Bu neden önemli**: Klasik akademik yayıncılıkta tarihsel kayda yalnızca yayımlanmış sürüm girer. Ara revizyonlar, yanıt mektupları ve stratejik notlar özel kalır. Burada ise baştan itibaren kamuya açıktırlar. Bir okuyucu argümanın evriminin her adımını yeniden kurabilir.

### 2. Karşıt inceleme deseni (çoklu YZ ajanları + Peter G)

Hakemli bir mecraya gönderim öncesinde her makale, **farklı rollerde davranan birden çok YZ ajanı tarafından karşıt incelemeye** tabi tutulur:

| Ajan rolü | İşlev | İz çıktısı |
|---|---|---|
| **Peter G** | Düşmanca-hakem simülasyonu. Gerçek bir hakemin yapacağı en olası R&R taleplerini öngörür. | `B1_ADVERSARIAL_REVIEW.md`, `peter-memo` (Makale 1), Shadow R&R Paketi |
| **Claude Opus** | Biçimsel doğrulama: tip kontrolü, tanımlar, iç tutarlılık, kategori-teorik sağlamlık. | `opus-review.md`, `opus-review-b1.md` |
| **GPT (5 / Opus)** | Çapraz kontrol, metin editörlüğü, yapısal eleştiri. Bazen Claude ile diyalog halinde. | `gpt-review.md`, `gpt-opus-discussion.md`, `gpt-synthese.md` |
| **Gemini** | Bağımsız ikincil inceleme. | `gemini-review.md` |
| **Kimi** | Bağımsız ikincil inceleme (uzun-bağlam analizi). | `kimi-review.md` |

Karşıt desen, yeniden kullanılabilir bir şablon olarak `methodology/adversarial-review-pattern.md` belgesinde belgelenmiştir.

### 3. Gölge paket deseni

Hakem raporları gelmeden önce, karşıt incelemelere dayalı olarak **önceden hazırlanmış bir yanıt paketi** oluşturulur. Gerçek hakem raporları 60–90 gün sonra ulaştığında yanıt, haftalar yerine günler içinde devreye alınır.

Bu desen `papers/02-relational-exit-srbs/strategic-documents/SRBS_R&R_SHADOW_PACKAGE_v3_1_2.md` belgesinde örneklenmektedir — en olası revizyon taleplerinin ~%80'ini kapsayan 7 önceden hazırlanmış modül; her biri kesin yamalar, yanıt mektubu parçaları ve maliyet/risk tahminleri içerir.

`methodology/shadow-package-pattern.md` belgesinde tanımlanmıştır.

### 4. Transdisipliner çerçeve (TURFU A.R.T.)

Tüm araştırma **TURFU A.R.T. çerçevesi** içinde yürütülür: Action / Research / T (T = Tiers, Lupasco–Nicolescu transdisiplinerliği anlamında dahil edilmiş orta terim). Bilgi, indirgeyerek değil, gerçeklik düzeylerinin (biyolojik, ekolojik, politik, normatif) kesişiminde üretilir.

Bu nedenle Makale 1 (BioSystems) ile Makale 2 (SRBS) ortak bir biçimsel çekirdeği (*viability sketch* / yapısal canlılık koşulları) paylaşırken farklı gerçeklik düzeylerini ele alır — konu üzerinden değil, yapısal desen üzerinden eşgüdümlenirler.

`methodology/transdisciplinary-framework.md` belgesinde tanımlanmıştır.

### 5. Tek yazarlı editoryal sorumluluk

Tüm YZ işbirliği, tek bir insan yazarın (Christopher Keo, TURFU) sorumluluğu altında yürütülür. Yazar şu konularda nihai kararı verir:
- hangi önerilen revizyonların kabul edileceği,
- hangi formülasyonların korunacağı,
- hangi YZ önerilerinin reddedileceği.

YZ ajanları **işbirlikçidir, ortak yazar değildir**. Yayımlanmış imza satırı (Makale 1, BioSystems) ile gönderilmiş imza satırı (Makale 2, SRBS) tek yazarlıdır. Her makaledeki YZ Kullanım Beyanları, mevcut editoryal politikalara (Wiley, Elsevier, ICMJE) uygun olarak bu yardımı açıkça beyan eder.

---

## Bu neden 2026 Açık Bilimi için örnek niteliğindedir

| Açık Bilim ölçütü | Bu paket bunu nasıl karşılar |
|---|---|
| **Yeniden üretilebilirlik** | Her sürüm, her yanıt mektubu, her ön mektup, her şekil kaynağı korunur. Herkes yolu yeniden inşa edebilir. |
| **Şeffaflık** | Her revizyonu şekillendiren karşıt incelemeler ve stratejik notlar açığa çıkarılmıştır. Yazarın akıl yürütmesi bir kara kutu değildir. |
| **YZ ifşası** | Makaleler, Wiley/Elsevier/ICMJE 2025 yönergelerine uygun YZ Kullanım Beyanları içerir. Bu paket, YZ işbirliğinin *somut yapıtlarını* da ekler: yalnızca soyut bir beyan değil, tam incelemeler. |
| **Birikimli bilgi** | Makale 2, Makale 1'in yayımlanmış biçimselleştirmesini açıkça genişletir. Makaleler arası yapısal süreklilik `strategic-documents/B1_LEVERAGE_FROM_BIOSYSTEMS.md` belgesinde kayıt altına alınmıştır. |
| **Yeniden yayımlama** | Bu paket, NLAW kaynak deposuna bağımlı kalmadan `turfu.org` veya başka herhangi bir platformda yeniden konuşlandırılabilecek biçimde tasarlanmıştır. `DEPLOYMENT_GUIDE.md` desenleri listeler. |

---

## Sınırlar ve dürüstlük

Bu metodoloji evrensel bir çözüm değildir. Üç dürüst sınırlama:

1. **Yetkin bir insan yazar gerektirir**: YZ ajanları zaten var olanı güçlendirir. Yoktan özgün matematiksel veya felsefi içgörü üretmezler. Editoryal hattı yazar tutmak zorundadır.
2. **Yalnızca tek bir model değil, birden çok YZ modeli gerektirir**: Tek bir YZ ajanı, yazarın önyargılarını teyit etme riski taşır. Asıl hata tespitini üreten şey karşıt-çoklu-ajan desenidir.
3. **Mevcut model yetenekleriyle sınırlıdır**: 2026'da Claude Opus 4.7 (1M bağlam) ve emsalleri kayda değer biçimsel eleştiri yapabilir, ancak tamamen özgün matematiksel kanıt üretemez. Model yetenekleri olgunlaştıkça desen de olgunlaşacaktır.

---

## Ayrıca bakınız

- [`methodology/ai-agents-as-research-collaborators.md`](methodology/ai-agents-as-research-collaborators.md) — uzun biçimli desen belgesi
- [`methodology/adversarial-review-pattern.md`](methodology/adversarial-review-pattern.md) — çok-ajanlı inceleme şablonu
- [`methodology/shadow-package-pattern.md`](methodology/shadow-package-pattern.md) — önceden hazırlanmış R&R yanıt şablonu
- [`methodology/transdisciplinary-framework.md`](methodology/transdisciplinary-framework.md) — TURFU A.R.T. çerçevesi
