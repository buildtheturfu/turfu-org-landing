# Karşıt İnceleme Deseni

> Bir akademik makalenin gönderim öncesinde çok-ajanlı karşıt incelemesini yürütmek için somut şablon.

---

## Desen tek paragrafta

Hakemli bir mecraya göndermeden önce makaleyi, farklı rollerde davranan YZ ajanları tarafından **N karşıt incelemeye** tabi tutun. Yargıları karşılaştırın. Anlaşmazlıkları insan kararıyla çözün. Üzerinde uzlaşılan en güçlü eleştirileri makaleye entegre edin. Sürecin tamamını kamuya açık biçimde belgeleyin. Gerçek hakem raporları geldiğinde makale, gerçek bir hakemin yapacağı eleştiriye zaten dayanmıştır — yanıt büyük ölçüde önceden hazırdır.

---

## "Karşıt" niçin önemlidir

Kendi işbirlikçisinin makalesini inceleyen tek bir YZ ajanı önyargıları teyit eder. Farklı model ailelerinden, her biri eleştirel-hakem tutumunu benimsemeye yönlendirilen birden çok YZ ajanı **yapılandırılmış bir anlaşmazlık** üretir. Gerçek epistemik iş bu anlaşmazlıkta gerçekleşir.

Desen şunlara dayanır:
- En az 2 farklı model ailesinin kullanılması (Claude, GPT, Gemini, Kimi — birden çok Claude değil)
- Açıkça düşmanca-hakem yönlendirmesi (modele "zayıf olanı bul" denir, "özetle" değil)
- Bağımsız incelemeler (her ajan kendi yargısını oluşturmadan önce diğer ajanların çıktılarını görmez)

---

## Somut protokol

### Adım 0 — Makale kararlı v3 durumdadır

Desen, insan yazarın zaten gönderime hazır kabul ettiği bir makaleye uygulanır. Karşıt geçiş bir *uçuş öncesi kontrol*tür; taslak iyileştirme döngüsü değildir.

### Adım 1 — Düşmanca hakem geçişi (Peter G rolü)

İlk YZ ajanına makale, şu yönlendirme şablonuyla verilir:

```
You are an experienced peer reviewer for [target journal]. The author has
asked you to review this manuscript in hostile-reviewer mode before submission.

Your task:
1. Score the most likely outcome at submission to [journal] on a calibrated
   probability tree: desk reject / reject after review / major revision /
   minor / direct accept. Justify each probability with one sentence.
2. List the 5-10 most likely revision asks a real reviewer would make, ranked
   by probability. For each, estimate: probability of being asked, cost to
   fix, chance of satisfying a reviewer if implemented.
3. Recommend the winning response style.

Do not be polite. Do not summarise. Find what is weak.
```

Çıktı: yapılandırılmış bir not. Bu paketteki örnekler:
- `papers/01-categorical-sketch-biosystems/reviews/peter-memo.md`
- `papers/02-relational-exit-srbs/strategic-documents/SRBS_R&R_SHADOW_PACKAGE_v3_1_2.md` (bölüm 0–1)

### Adım 2 — Biçimsel doğrulayıcı geçişi (Opus rolü)

İkinci bir YZ ajanı (tercihen farklı bir model ailesinden) biçimsel içeriği doğrular:

```
You are a mathematician / formal verifier. Read [manuscript] and verify:
1. Every definition: is the type explicit, are the variables introduced?
2. Every proposition: is the proof complete, are there silent assumptions?
3. Every diagram or equation: is the notation consistent across sections?
4. Every cross-reference (Def. X, Prop. Y): does the target exist?

Output a line-by-line annotation with verdict per item: correct / unclear / wrong / undefined.
```

Çıktı: satır-satır açıklama. Örnek: `papers/01-categorical-sketch-biosystems/reviews/opus-review.md`.

### Adım 3 — Bağımsız ikincil inceleme (Gemini / Kimi rolü)

Üçüncü bir ajan, Adım 1 ve 2'nin çıktılarına erişmeden makaleyi sıfırdan okur:

```
You are a peer reviewer for [target journal]. Read this manuscript and provide
a structured review covering:
1. Main contribution as you see it (one paragraph)
2. Three strongest aspects of the paper
3. Three biggest concerns (specific, not generic)
4. Recommendation (accept / minor / major / reject)
5. What the author should clarify if R&R'd
```

Çıktı: bağımsız inceleme. Örnekler: `papers/01-categorical-sketch-biosystems/reviews/{gemini,kimi}-review.md`.

### Adım 4 — Çapraz YZ diyaloğu (hakemler anlaşamadığında)

Adım 1–3 belirli bir noktada anlaşamıyorsa (örn. "kardinalite argümanı geçerli mi?"), bir diyalog kurulur:

```
Agent A says: [quote]
Agent B says: [quote]
Both, please respond to each other's point. Do not concede unless you find
the other's argument decisive.
```

Çıktı: diyalog dökümü. Örnek: `papers/01-categorical-sketch-biosystems/reviews/gpt-opus-discussion.md`.

### Adım 5 — İnsan kararı

İnsan yazar tüm incelemeleri okur ve:
- TÜM ajanların hemfikir olduğu noktaları belirler → bunlar gönderim öncesi "mutlaka düzeltilmesi gereken"lerdir
- ÇOĞUNUN hemfikir olduğu noktaları belirler → "düzeltilmesi düşünülecek"
- TEK bir ajanın yalnız başına itiraz ettiği noktaları belirler → elle karar verir; tek itiraz çoğu zaman en ilginç yakalama VEYA bir halüsinasyondur
- Karar gerekçelerini belgeler

### Adım 6 — Entegrasyon

Makale revize edilir. Bir sonraki sürüm (örn. v3.1.1) karşıt geçişin sonucudur.

### Adım 7 — Gölge paket (isteğe bağlı ama önerilen)

Karşıt hakemlerin gerçek-hakem taleplerini öngördüğü, ancak makalenin önceden değiştirmemeyi seçtiği noktalar → bunlar **gölge R&R paketine** dönüşür (bkz. `shadow-package-pattern.md`).

---

## Araçlar

Her ajan çağrısı şu yollarla yapılabilir:
- Claude.ai / ChatGPT / Gemini / Kimi konsollarında **doğrudan sohbet**
- Yinelenebilir çağrılar için **API çağrıları** (Anthropic, OpenAI, Google, Moonshot)
- LangChain, OpenRouter veya Claude Agent SDK gibi araçlarla **çok-modelli orkestrasyon**

Bu programda, karşıt incelemelerin büyük çoğunluğu, insan yazarın makaleyi her modelin bağlam penceresine kopyala-yapıştır yaparak konsol üzerinden (Claude.ai, ChatGPT, Gemini) etkileşimli biçimde yürütülmüştür.

---

## Maliyet disiplini

Çok-ajanlı karşıt inceleme, makale uzunluğuna ve iterasyon sayısına bağlı olarak API ücretlerinde 0–~50 dolar arasında bir maliyet doğurur. Desen, **maliyet-sınırlı değil, emek-zamanı sınırlıdır**.

Bir tam karşıt geçiş için tipik emek maliyeti:
- Adım 1 (düşmanca hakem): 30–60 dk yazar zamanı + 15 dk model çağrısı
- Adım 2 (biçimsel doğrulayıcı): 30–60 dk yazar zamanı + 15 dk model çağrısı
- Adım 3 (bağımsız hakemler, x2): 30 dk yazar zamanı + 30 dk model çağrısı
- Adım 4 (diyalog, isteğe bağlı): 15–30 dk
- Adım 5 (karar verme): 1–3 saat (en uzun aşama)
- Adım 6 (entegrasyon): 2–4 saat

Toplam: karşıt geçiş başına 5–10 saat. Gönderim öncesinde makale başına iki ila üç geçiş.

---

## Ayrıca bakınız

- [`ai-agents-as-research-collaborators.md`](ai-agents-as-research-collaborators.md) — daha geniş desen bağlamı
- [`shadow-package-pattern.md`](shadow-package-pattern.md) — öngörülen ancak önceden düzeltilmemiş taleplerle ne yapılacağı
