# B1 — SRBS Sunum Yolculuğu

*B1 versiyonu için takip sayfası (Systems Research and Behavioral Science için sistemik maske) — akademik çatallanma ve sunum öncesi yinelemeler.*

---

## Mevcut Durum

Sayfa, B1 makalesinin en güncel versiyonunu (durum, tarih, özet, PDF/DOCX indirmeleri) `antifascisme-ontologique` makalesinin meta verilerinden (`data/papers/antifascisme-ontologique.json :: versions`) render eder. Bileşen, etiketi `B1` ile başlayan versiyonları filtreler ve kronolojik olarak sıralar.

---

## Akademik çatallanma

B1 çatallanma noktasını betimleyen bölüm — yekpare "ontolojik antifaşizm" makalesinin üç paralel versiyona yeniden yapılandırıldığı an:

- **A** — militan Fransız temel makalesi (orijinal NLEX)
- **B1** — SRBS (Systems Research and Behavioral Science) için sistemik maske
- **B2** — felsefi maske (gelecekteki hedef)

Özellikle B1 versiyonu için, çatallanma çalışması şunlardan oluşuyordu:

- Başlığı "*Relational Exit as a Structural Condition of Viability in Multi-Level Cooperative Systems*" olarak dönüştürmek
- "Ontolojik antifaşizm" terimini başlıktan ve metinden tamamen çıkarmak
- Özgürlükçü sözcük dağarcığını (NAP, mülkiyet, ayrılma) yansız eşdeğerlerle değiştirmek ("korunmuş alan", "sınır bütünlüğü", *tasarım ilkesi* olarak "saldırmazlık")
- Kripto-yerli referansları (Moloch DAO, Steem → Hive) tartışmada ağırbaşlı bir anmaya indirgemek
- Çerçeveyi "totalitarizmi neyin mümkün kıldığı?" sorusundan "işbirlikçi bir sistemin geçerli kalabilmesi için hangi yapısal koşulları sağlaması gerektiği?" sorusuna kaydırmak

Çatallanma noktasının ve ilgili geri bildirimin (Peter G, Ek, Claude Opus 4 ve birkaç Claude Code çekişmeli değerlendiricisinin) özeti, JSON meta verilerinden render edilir.

---

## Sunum öncesi yinelemeler

B1 yinelemelerinin (vB1 → B1 v2 → B1 v3 → B1 v3.1 …) tam zaman çizelgesi, kaynak JSON'un `versions` alanından render edilir. Her yineleme için sayfa şunları sergiler:

- Versiyon, tarih, durum
- Değişikliklerin özeti
- Ayrıntılı değişiklik günlüğü (tür, ne, neden)
- Yineleme sırasında alınan geri bildirim (kaynak, tür, özet)
- İndirmeler (PDF, sunuma hazır DOCX)

En son yineleme LATEST olarak işaretlenir ve değişiklik günlüğü varsayılan olarak açıktır.

---

## PDF gömme

Sayfa, manuskrinin sunuma hazır en son versiyonuna işaret eden satır içi bir PDF görüntüleyici içerir. Gömülü PDF, `/public/papers/` içine yapılan en son yükleme ile her zaman senkronize edilir.

---

*Bu sayfa öncelikle veri odaklıdır: anlatı, `data/papers/antifascisme-ontologique.json` üzerinden dinamik olarak render edilir. Tam yineleme içeriği için — her adlandırılmış geri bildirim, her değişiklik günlüğü girdisi, her indirme — o kaynağa başvurun. Sayfanın rolü, makalenin çatallanmadan sunuma hazır duruma evrimini kronolojik ve okunaklı bir biçimde sunmaktır.*
