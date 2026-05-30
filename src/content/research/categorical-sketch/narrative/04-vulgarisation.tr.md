# Kategori teorisi, otopoiesis ve geçerlilik — bir okuyucu rehberi

*Kategorik taslak ThP'nin ardındaki kavramları anlamak — TURFu, Mart 2026*

---

## Neden matematik?

Bir organizmanın "canlı" olduğunu, bir ekosistemin "sağlıklı" olduğunu veya bir toplumun "geçerli" olduğunu söylediğimizde, açık görünen ancak aslında belirsiz olan sözcükler kullanırız. Bir sistemi tam olarak canlı yapan şey nedir? Bir sistemin kendini sürdürebilmesi için hangi yapısal özelliğe sahip olması gerekir?

Teorik biyoloji onlarca yıldır bu sorular üzerinde çalışmaktadır. Humberto Maturana ve Francisco Varela **autopoiesis** kavramını (Yunanca auto = kendi, poiesis = üretim) önerdiler: bir sistem, kendi işlemleri aracılığıyla kendini üretiyorsa canlıdır. Robert Rosen bu fikri **etkin nedensel kapalılık** terimleri çerçevesinde biçimselleştirdi: bir organizmada, her bileşenin nedeni aynı sistemin başka bir bileşenidir.

Sorun şu: bu tanımlamalar genellikle sözel kalır. Derindirler ama biçimsel olarak doğrulanmaları zordur. Belirli bir sistemin "otopoietik" olup olmadığını nasıl bilebiliriz? Bir organizmanın geçerliliğini bir ekosistem veya bir toplumun geçerliliği ile salt metafora düşmeden nasıl karşılaştırabiliriz?

İşte burada **kategori teorisi** devreye girer.

---

## 5 dakikada kategori teorisi

Kategori teorisi yalnızca diğerleri arasında bir matematik dalı değildir. Bir **dildir** — yapıları kendine özgü içeriklerinden bağımsız olarak tanımlamamıza olanak veren bir notasyon sistemidir.

Temel kavramları dikkat çekici biçimde basittir:

**Nesneler** — bahsettiğimiz "şeyler" (bir hücre, bir organizma, bir Devlet, bir ağ düğümü).

**Morfizmler** (oklar) — bu şeyler arasındaki "ilişkiler" (bir kapsam içerme, bir etkileşim, bir dönüşüm). Bir morfizm f : A → B, "A'dan B'ye yapılandırılmış bir ilişki vardır" der.

**Kompozisyon** — eğer f : A → B ve g : B → C ise, o zaman g ∘ f : A → C. İlişkiler birleşir. Hepsi bu.

Bu dilin gücü **soyutlamasındadır**: aynı diyagram bir hücre → doku ilişkisini, bir yurttaş → Devlet ilişkisini veya bir düğüm → ağ ilişkisini tanımlayabilir. Nesnelerin "doğası" hakkında hiçbir şey söylemeyiz — ilişkilerinin **yapısını** tanımlarız.

John Baez ve Mike Stay 2011'de fizik, mantık ve bilgisayar biliminin aynı kategorik yapının üç modeli olduğunu gösterdi. ThP taslağı (Keo, 2026) aynı stratejiyi uygular: soyut bir geçerlilik yapısı tanımlayın, ardından biyoloji, ekoloji ve siyasetin bunun bağımsız modelleri olduğunu gösterin.

---

## Otopoiesis kategorik dilde

ThP taslağında, bir **P-sistemi** üç unsurla tanımlanır:

**S** — bir nesne (sistem).
**M** — onun membranı (çevre ile sınırı).
**φ** — kendi-üretim fonksiyonu.

Geçerlilik koşulu, φ'nin **endojen** kalmasıdır: kendi-üretim fonksiyonu çevre E üzerinden "geçmez". Basit terimlerle: sistem kendini üretir, harici bir şey tarafından üretilmez.

φ E üzerinden geçtiğinde — harici bir ajan sistemin üretimini kontrol altına aldığında — sistemin **heteronom** hale geldiği söylenir. Artık kendini üretmez. Yakalanmıştır.

Bu, Varela'nın "özerklik" dediği şeyin ve Rosen'in "etkin nedensel kapalılık" dediği şeyin biçimsel çevirisidir. Taslak, bu kavramlara bir alandan diğerine taşınabilir, kesin, doğrulanabilir bir matematiksel form verir.

---

## Kabul edilebilir ve kabul edilemez morfizmler

Sistemler arasındaki tüm etkileşimler eşdeğer değildir. Taslak iki tür ayırt eder:

Bir **admissible morphism** (kabul edilebilir morfizm), φ'nin endojenliğini koruyan bir etkileşimdir. Sistem diğeriyle etkileşime girer, ancak kendini üretmeye devam eder. Etkileşim asimetrik olabilir (küçük bir sistem büyük bir sistemle etkileşime girer), ancak katılımcının özerkliğini yok etmez.

Bir **kabul edilemez morfizm**, endojenliği yok eden bir etkileşimdir. Sistem diğeriyle etkileşime girer ve bu süreçte kendini üretme kapasitesini kaybeder. Heteronom hale gelir — yakalanmış, kontrol edilmiş, boyun eğdirilmiş.

Ayrım "iyi" ile "kötü" arasında değildir. **Geçerli** ile **patolojik** arasındadır. Bir kabul edilemez morfizm dağıtılmış olabilir (rekabet ve alternatifler vardır — sistem kaçabilir) veya tekelci olabilir (rekabet yok, çıkış yok — sistem tuzağa düşürülmüştür).

---

## Dağıtılmış ve tekelci yırtıcılık — taslağın kalbi

Bu, ThP taslağının en önemli katkısıdır.

**Dağıtılmış yırtıcılık** (Tanım 7): kabul edilemez bir etkileşim, ancak hem bir rakip (g : A' → B) hem de bir çıkış morfizmi (e : B → C) mevcut. Sistem zayıflar ama tuzağa düşürülmez. Partner değiştirebilir veya ayrılabilir. Stres tolere edilebilirdir — hormetik, Taleb söyleyecektir.

**Tekelci yırtıcılık** (Tanım 8): rakipsiz VE çıkışsız kabul edilemez bir etkileşim. Sistem, alternatifsiz ve kaçış olanağı olmaksızın özerkliğini yok eden bir ilişkide tuzağa düşürülmüştür.

Geçerlilik tezi: **bir P-sistemi, ancak ve ancak maruz kaldığı her yırtıcılık dağıtılmış ise geçerlidir**. Yaşam, yırtıcılığın yokluğu değildir — yaşam dağıtılmış yırtıcılıktır.

Ve patoloji yırtıcının varlığı değildir — **üçüncünün** yokluğudur: rakip, alternatif, çıkış morfizmi. İkili değil, üçlü yapı. Bu, Lupasco'nun kategorik dile çevrilmiş içerilen üçüncüsüdür.

---

## Çok düzeyli uyumluluk (Önerme 2)

Gerçek sistemler düz değildir — **hiyerarşiktirler**. Dokulardaki hücreler, organlardaki dokular, toplumlardaki bireyler, protokollerdeki düğümler.

ThP'nin Önerme 2'si geçerlilik koşulunu çok düzeyli sistemlere genişletir: hiyerarşik bir sistem, ancak ve ancak **düzeyler arası kapsam içermeler** kabul edilebilir morfizmler ise geçerlidir.

Basit terimlerle: bir alt sistem (bir hücre, bir yurttaş, bir düğüm) daha üst düzeyde bir sisteme (bir doku, bir Devlet, bir ağ) dahil edildiğinde, bu kapsam içerme alt sistemin endojenliğini korumalı ve bir çıkış morfizminin varlığını sürdürmelidir.

Kapsam içerme artık kabul edilebilir olmadığında — üst düzey alt düzeyin özerkliğini yok ettiğinde ve çıkış olanağını ortadan kaldırdığında — sistem patolojik bir rejime girer.

Bu, **evrimde büyük geçişler** üzerine literatürün (Maynard Smith & Szathmáry, 1995) biyoloji dilinde anlattığı şeydir: her bireysellik sıçraması (genden hücreye, hücreden organizmaya, organizmadan gruba) çatışma çözüm mekanizmalarının icadını gerektirdi — apoptoz, farklılaşma, iş bölümü, iç polislik. ThP, bu yazarların alana özgü biçimde tanımladıklarını biçimselleştirir.

---

## "Rosetta Taşı" stratejisi

ThP taslağı, Baez & Stay'in (2011) stratejisini izler: heterojen alanlar arasında doğrudan köprüler kurmaktansa (ki bu ontolojik taahhütleri gerektirir: "hücreler yurttaşlar gibidir"), bir **soyut teori** tanımlanır ve her alanın bunu bağımsız olarak örneklediği doğrulanır.

Biyoloji taslağın tanımlarını karşılarsa ve siyaset bağımsız olarak aynı tanımları karşılarsa, o zaman kanser ile totalitarizm arasındaki paralellik bir analoji değildir — aynı biçimsel değişmezin ortak karşılanmasıdır.

Avantaj: "hücreler yurttaş değildir" itirazı yapılabilir — ancak bu konuyla ilgisizdir, çünkü tanımlar **alandan bağımsızdır**. Önemli olan şudur: sistem biçimsel koşulları karşılıyor mu, karşılamıyor mu?

Taslağı salt disiplinlerarası bir metafordan ayıran budur. Metafor "totalitarizm kansere benzer" der. Taslak şunu der: "İşte geçerli olmamanın biçimsel koşulları; işte kanserin bunları karşıladığının bir kanıtı; işte totalitarizmin bunları karşıladığının bağımsız bir kanıtı".

---

## Taslağın (henüz) söylemedikleri

Taslak sınırları konusunda dürüsttür:

**Kanıtlanan**: tanımlar iyi tanımlanmıştır, Rosen'in (M,R)-sistemleri taslağın Set kategorisinde bir modelidir, dağıtılmış/tekelci ayrımı biçimsel olarak yerleştirilmiştir.

**Örneklenen**: biyolojik kanser tekelci yırtıcılık örneği olarak, ampirik literatür tarafından desteklenir (Aktipis, Trigos, Michod).

**Önerilen**: siyasete ve ekolojiye uzantı. Sağlam tarihsel ve ekolojik düzenlilikler tarafından desteklenir, ancak "bir toplumsal ajanlar kategorisi"nin titiz inşası açık bir proje olarak kalır.

**Programatik olan**: geçerlilik ilkeleri ile çıkış hakkının liberteryen grameri arasındaki yakınsama. Güçlü ama kapalı değil — henüz biçimselleştirilmemiş ek normatif varsayımlar gerektirir.

Bu epistemik şeffaflık — neyin kanıtlandığını ve neyin kanıtlanmadığını tam olarak bilmek — belki de taslağın en önemli metodolojik katkısıdır.

---

*Bu metin, categorical-sketch manuscriptinde (Keo, 2026) geliştirilen fikirlere erişilebilir bir giriştir. Biçimsel bir sunum ve metodolojik sınırlar için tam sürümlere başvurun.*
