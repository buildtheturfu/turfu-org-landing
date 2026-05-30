# Gölge Paket Deseni

> Hakem yorumları gelmeden ÖNCE yanıtı önceden hazırlayın. Gerçek R&R ulaştığında haftalar yerine günler içinde devreye alın.

---

## Desen tek paragrafta

Hakemli bir mecraya gönderimden sonra makale 60–90 günlük bir bekleme dönemine girer. Çoğu yazar bu süre boyunca hiçbir şey yapmaz. **Gölge paket deseni bu dönemi, karşıt incelemeye dayalı olarak en olası hakem taleplerini öngören önleyici bir R&R yanıtı oluşturmak için kullanır** (bkz. `adversarial-review-pattern.md`). Gerçek hakem raporları geldiğinde yazar, yanıt-mektubu metni hâlihazırda taslaklanmış olarak, önceden hazırlanmış modüllerin bir alt kümesini günler içinde devreye alır.

---

## Bu neden işler

Akademik yayıncılıktan üç gözlem:

1. **R&R taleplerinin çoğu öngörülebilirdir.** Yetkin bir karşıt hakem (insan ya da YZ) gerçek bir hakemin yapacağı taleplerin ~%70-80'ini öngörebilir. Öngörülemeyen %20-30 yeni itirazlardır, ancak öngörülebilir kısım önceden hazırlanabilir.

2. **R&R yanıt süresi katılım sinyali verir.** 2 hafta içinde gönderilen bir yanıt "yazar önem verdi ve sıkı çalıştı" sinyali verir. 8 hafta içinde gönderilen bir yanıt "yazar koşturarak yetiştirdi" sinyali verir. Editörler ve hakemler bunu fark eder.

3. **Soğuk yazım, sıcak yazımdan daha keskindir.** R&R yanıtlarını gönderimden üç ay sonra yazmak zihinsel olarak taze ve stratejiktir. Üç hafta sonra yazmak (karşıt inceleme henüz tazeyken) bağlamsal olarak keskin ve yapısal olarak sıkıdır.

---

## Somut protokol

### Adım 0 — Karşıt inceleme yapılmıştır (bkz. `adversarial-review-pattern.md`)

Gölge paket, karşıt incelemenin en olası revizyon taleplerini olasılığa göre sıralamış olduğunu varsayar.

### Adım 1 — Modül belirleme

Olasılığı ≥ %60 olan her karşıt-öngörülmüş talep için gölge pakette bir "modül" oluşturun. Her modül TEK bir revizyon talebini ele alır.

`papers/02-relational-exit-srbs/strategic-documents/SRBS_R&R_SHADOW_PACKAGE_v3_1_2.md` belgesinden örnek modüller:

| Modül | Öngörülen talep | Olasılık |
|---|---|---:|
| A | Biyoloji dışında "yapısal gerçekleştirme" → "aday" | %80-90 |
| B | Çerçeve ilkelerinde işlenmiş Reichsfluchtsteuer eşlemesi | %65-80 |
| C | Normatif tarafsızlık + 4-tamamlama denkliği | %70-85 |
| D | Ampirik durum: "doğrulayıcı değil, hipotez-üretici" | %85-95 |
| E | In situ çıkışın sınır koşulları | %80-90 |
| F | "Tanısal, teoremsel değil" makalede daha erkene alınmış | %90 |

### Adım 2 — Modül yapısı

Her modül şunları içerir:

1. **Öngörülen hakem itirazı** (karşıt hakemin sesiyle — "hakem şunu söyleyecek")
2. **Strateji** (neyi kabul edip neyi savunmak)
3. **Yamalar** (her makale düzenlemesi için dosya:satır + birebir öncesi/sonrası)
4. **Yanıt mektubu parçası** (R&R'ın kapak yazısı bölümü için yapıştırmaya hazır metin)
5. **Maliyet / risk / tatmin-etme şansı** tahminleri

### Adım 3 — Devreye alma senaryoları

"Senaryolar" bölümü hakem profillerini hangi modüllerin devreye alınacağıyla eşler:

| Hakem profili | Devreye alınan modüller | Not |
|---|---|---|
| Yapıcı, sistem-yanlısı | A + B + C + D + F | 5 modül, ~2 hafta R&R çalışması |
| Düşmanca biçimci | A + B (yalnız 1 vaka) + F | Biçimsel iddiaları sınırla |
| İdeolojik itirazcı | Önceliği C, A + D ile | Ön mektup 4-tamamlama denkliğini vurgulamalı |
| Ampirisist | Önceliği D, + B | Vakaları akla yatkınlık denemeleri olarak yeniden çerçevele |
| Metodolojik, sistem-yanlısı | F + E | Küçük modüller yeterli |

### Adım 4 — Genel yanıt mektubu iskeleti

Paket, yapıştırmaya hazır bir yanıt mektubu şablonu içerir:

```
Date: [date of R&R submission]
Re: SRES-XX-XXXX — [manuscript title]

Dear Editor,

We thank the editor and the reviewers for the careful and constructive
engagement with our manuscript. The reviewers' comments have led to
substantive improvements that we believe strengthen the paper without
altering its core thesis. We respond to each comment below, with revisions
indicated by section and line number against the resubmitted manuscript.

== Reviewer 1 ==

R1.1 [reviewer's comment paraphrased]
[Response — copy from Module X]
[Specific revision location: "Revised in §4 opening (line 71); see Module A patches."]

[etc.]

We are grateful to the reviewers for their work and to the editor for the
opportunity to revise.

Sincerely,
[Author]
```

### Adım 5 — Hakem raporları alındığında

Gerçek R&R ulaştığında:
1. Her hakem talebini önceden hazırlanmış bir modülle eşleştirin
2. Eşleşmeyen talepler için hızlıca yeni modül taslaklayın (tur başına genelde 1–3 eşleşmeyen)
3. Eşleşen modülleri birebir veya küçük düzenlemelerle devreye alın
4. Ön mektubu iskelet + modül parçalarından oluşturun
5. 2–3 hafta içinde gönderin

---

## Çoğu yazar bunu neden YAPMAZ

1. **Batık-maliyet iyimserliği**: gönderimden sonra yazar makaleden zihinsel olarak kopmak ister ("bitti, bekleyeyim artık")
2. **Karşıt inceleme yapılmamıştır**: olası taleplerin yapılandırılmış bir öngörüsü olmadan gölge pakete girdi yoktur
3. **Kültürel atalet**: "hakemin gerçekten söylediğine yanıt verirsin, öngördüğüne değil"

Üçüncü noktanın hakikat payı vardır. Gölge paket deseni, sorulmamış değişikliklere önceden taahhüt vermekle ilgili DEĞİLDİR. Mesele şudur: **taslaklar hazır olsun ki**, öngörü tutarsa devreye alma hızlı olsun.

---

## Ya öngörü tutmazsa?

Öngörülemeyen %20-30 talep klasik R&R yöntemiyle gerçek zamanlı taslaklanır. Önceden hazırlanmış %70-80 yanıt teslimini hızlandırır ve yazara öngörülmemiş yeni talepler için kapasite bırakır.

En kötü durumda (öngörülen taleplerden hiçbiri çıkmaz, tüm talepler yenidir), gölge paket ~10–20 saatlik bir emek israfıdır. En iyi durumda (öngörülen taleplerin çoğu çıkar), devreye alma süresi 6–8 haftadan 2–3 haftaya iner.

Asimetri göz önüne alındığında beklenen değer açıkça pozitiftir.

---

## Örnek: SRBS Gölge Paketi v3.1.2

Makale 2 (relational exit, SRBS gönderimi 2026-05-29) için tam önceden hazırlanmış gölge paket şuradadır:

`papers/02-relational-exit-srbs/strategic-documents/SRBS_R&R_SHADOW_PACKAGE_v3_1_2.md`

7 modül (A–G), 5 devreye alma senaryosu, genel bir yanıt mektubu iskeleti ve R&R sonrası tahmini kabul olasılığı dönüşümünü içerir.

Gölge paket, Peter G düşmanca-hakem denetimine dayanarak 2026-05-30 tarihinde (gönderimin ertesi günü) oluşturuldu. Gerçek hakem raporları ~60-90 gün sonra beklenmektedir. Devreye alma sonrası sonuç, sonuçlandığında `turfu.org/recherche/relational-exit/srbs-journey` adresinde kaydedilecektir.

---

## Ayrıca bakınız

- [`adversarial-review-pattern.md`](adversarial-review-pattern.md) — gölge pakete girdi
- [`ai-agents-as-research-collaborators.md`](ai-agents-as-research-collaborators.md) — daha geniş metodoloji
