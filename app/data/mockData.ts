import type { Profile, Service, Education, BlogPost, Testimonial, SiteSettings } from '../types'

export const profileData: Profile = {
  id: 'profile-1',
  name: 'Anıl Erdoğan',
  title: 'Yönetici Koçu & Teknoloji Stratejisi Danışmanı',
  bio: '15 yılı aşkın süredir teknoloji, ürün yönetimi ve organizasyonel gelişim alanlarında edindiğim tecrübeyle; liderlerin potansiyellerini açığa çıkarmalarına, ekiplerin yüksek performanslı yapılar kurmalarına ve şirketlerin dijital dönüşüm süreçlerini başarıyla yönetmelerine rehberlik ediyorum.',
  avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600',
  socialLinks: {
    linkedin: 'https://linkedin.com/in/anilerdogan',
    twitter: 'https://twitter.com/anilerdogan',
    instagram: 'https://instagram.com/anilerdogan',
    medium: 'https://medium.com/@anilerdogan'
  },
  stats: {
    clients: '150+',
    experience: '15+ Yıl',
    trainings: '40+',
    satisfaction: '%98'
  }
}

export const servicesData: Service[] = [
  {
    id: 'srv-1',
    title: 'Yönetici ve Liderlik Koçluğu',
    shortDescription: 'Liderlik becerilerinizi geliştirin, stratejik düşünme kapasitenizi artırın ve ekiplerinizle daha güçlü bağlar kurun.',
    fullDescription: 'Bu program, üst düzey yöneticiler, kurucular ve lider adayları için özel olarak tasarlanmıştır. Değişen iş dünyasında vizyoner kararlar alabilmeniz, delegasyon ve yetkilendirmeyi etkin yapabilmeniz ve kriz anlarında soğukkanlılığınızı koruyarak yön vermeniz için birebir seanslarla destek sağlıyorum. Süreç boyunca güçlü ve zayıf yönlerinizi analiz ediyor, kişiselleştirilmiş bir liderlik yol haritası çıkarıyoruz.',
    features: [
      'Birebir 60 dakikalık derinlemesine seanslar',
      'Liderlik tarzı ve etki analizi',
      'Stratejik karar alma ve kriz yönetimi pratikleri',
      'Ekiplerle iletişim ve geri bildirim döngüleri kurma',
      'E-posta ve mesaj yoluyla seans dışı sınırsız soru-cevap desteği'
    ],
    duration: '3 Ay (12 Seans)',
    price: '₺25.000',
    slug: 'yonetici-ve-liderlik-koclugu',
    icon: 'i-heroicons-user-group',
    isActive: true
  },
  {
    id: 'srv-2',
    title: 'Teknoloji ve Ürün Stratejisi',
    shortDescription: 'Teknoloji yatırımlarınızı optimize edin, ürün yol haritalarınızı pazara uyumlu ve ölçeklenebilir hale getirin.',
    fullDescription: 'Yazılım geliştirme süreçlerinden ürün yaşam döngüsü yönetimine kadar, teknoloji vizyonunuzu iş hedeflerinizle hizalıyoruz. Ekiplerin çevik (Agile) çalışma prensiplerini doğru uygulamasını sağlıyor, mimari kararlar, teknoloji borçları (tech debt) ve ürün-pazar uyumu (product-market fit) konularında danışmanlık veriyorum. Şirketinizin ölçeklenirken karşılaşacağı teknik ve operasyonel engelleri önceden tespit edip çözüyoruz.',
    features: [
      'Mevcut teknoloji ve organizasyonel yapı analizi',
      'Ürün yol haritası (Roadmap) ve önceliklendirme çalıştayları',
      'Agile / Scrum / Kanban süreçlerinin optimizasyonu',
      'Teknolojik mimari ve altyapı değerlendirmesi',
      'KPI ve OKR metriklerinin tanımlanması ve takibi'
    ],
    duration: 'Minimum 2 Ay',
    price: 'Teklif Alınız',
    slug: 'teknoloji-ve-urun-stratejisi',
    icon: 'i-heroicons-cpu-chip',
    isActive: true
  },
  {
    id: 'srv-3',
    title: 'Kariyer Dönüşüm Danışmanlığı',
    shortDescription: 'Kariyerinizde yeni bir sayfa açın. Güçlü yönlerinizi keşfedin ve hedeflerinize ulaştıracak adımları planlayın.',
    fullDescription: 'Kariyerinde tıkanmış hisseden, sektör değiştirmek isteyen veya yönetici rollerine geçiş yaparken desteğe ihtiyaç duyan profesyoneller için özel bir mentorluk sürecidir. Güçlü yönlerinizi, beceri envanterinizi ve tutkularınızı haritalandırarak en uygun rolleri belirliyoruz. CV revizyonu, LinkedIn profil optimizasyonu, mülakat simülasyonları ve maaş pazarlığı gibi kritik aşamalarda yol gösteriyorum.',
    features: [
      'Detaylı kariyer analizi ve hedef belirleme seansları',
      'CV, Portfolyo ve LinkedIn profil revizyonu',
      'Sektör ve rol bazlı teknik / davranışsal mülakat simülasyonları',
      'Networking stratejileri ve kişisel markalama rehberliği',
      'Maaş ve yan haklar pazarlığı danışmanlığı'
    ],
    duration: '6 Hafta (6 Seans)',
    price: '₺12.500',
    slug: 'kariyer-donusum-danismanligi',
    icon: 'i-heroicons-academic-cap',
    isActive: true
  }
]

export const educationData: Education[] = [
  {
    id: 'edu-1',
    title: 'Modern Yöneticinin Yol Haritası: Etkili Liderlik',
    description: 'Mikro yönetimden vizyoner liderliğe geçiş. Ekiplerini motive eden, yüksek performanslı ve otonom yapılar kurmak isteyen yöneticiler için pratik araçlar ve vaka analizleri.',
    duration: '4 Hafta (Toplam 16 Saat)',
    price: '₺4.500',
    level: 'Orta / İleri Seviye',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
    slug: 'modern-yoneticinin-yol-haritasi-etkili-liderlik',
    features: [
      'Canlı interaktif dersler ve vaka analizleri',
      'Delegasyon ve geri bildirim şablonları',
      'Zor konuşmalar yönetimi rehberi',
      'Özel Discord topluluğuna erişim',
      'Katılım Sertifikası'
    ],
    isActive: true
  },
  {
    id: 'edu-2',
    title: 'A\'dan Z\'ye Dijital Ürün Yönetimi ve Ürün Liderliği',
    description: 'Fikir aşamasından lansmana bir ürünün yaşam döngüsü. Pazar araştırması, kullanıcı testleri, önceliklendirme teknikleri, veri analizi ve paydaş yönetimi.',
    duration: '6 Hafta (Toplam 24 Saat)',
    price: '₺6.800',
    level: 'Her Seviye İçin Uygun',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800',
    slug: 'adan-zye-dijital-urun-yonetimi-ve-urun-liderligi',
    features: [
      'Haftalık canlı yayınlar ve soru-cevap seansları',
      'Ürün gereksinim dokümanı (PRD) yazma pratikleri',
      'Metrik takibi ve analitik araç kullanımı (Amplitude/Mixpanel)',
      '1e1 mentorluk geribildirimi ödev değerlendirmeleri',
      'Grup projesi çalışması ve sunum günü'
    ],
    isActive: true
  }
]

export const testimonialsData: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Ahmet Yılmaz',
    role: 'Mühendislik Direktörü',
    company: 'PayTech Finansal Teknolojiler',
    quote: 'Anıl Bey ile 6 aylık bir liderlik koçluğu süreci geçirdik. Teknik bir yöneticiden stratejik bir lidere dönüşmemde sağladığı içgörüler ve sunduğu pratik araçlar kariyerimde sıçrama yapmamı sağladı. Kesinlikle tavsiye ederim.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Zeynep Kaya',
    role: 'Ürün Lideri',
    company: 'GrowSaaS Yazılım',
    quote: 'Ürün stratejimizdeki karmaşayı çözmek için çalıştık. Kısa sürede ürün yol haritamızı netleştirmemizi, ekiplerin odaklanmasını ve en önemlisi doğru metrikleri ölçmeye başlamamızı sağladı. Müthiş bir deneyimdi.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Can Demir',
    role: 'Kurucu Ortak & CEO',
    company: 'LogiSoft Lojistik Çözümleri',
    quote: 'Şirketimizin büyüme aşamasında (scaling) teknik altyapımızın ve organizasyonel yapımızın tıkanıklıklarını aşmak için Anıl Bey ile çalıştık. Tecrübesiyle ekipler arasındaki koordinasyonu mükemmelleştirdi.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    rating: 5
  }
]

export const blogPostsData: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Modern Liderlikte Duygusal Zeka ve Empatinin Rolü',
    summary: 'Yalnızca teknik becerilerle yönetmek artık yeterli değil. Takımların bağlılığını ve performansını artıran duygusal zeka pratikleri.',
    content: `
## Liderlikte Empatinin Yeri

Günümüz iş dünyasında, özellikle uzaktan veya hibrit çalışma modellerinin yaygınlaşmasıyla birlikte, ekiplerin motivasyonunu yüksek tutmak her zamankinden daha karmaşık hale geldi. Geleneksel "komuta-kontrol" yönetim tarzı artık işlevselliğini yitirdi. Modern liderlerden beklenen en önemli özelliklerden biri **Duygusal Zeka (EQ)** ve empati kurabilme yeteneğidir.

### Empati Zayıflık Değil, Stratejik Bir Güçtür

Birçok yönetici empatinin performansı düşüreceğini, insanlara fazla yumuşak davranıldığında disiplinin kaybolacağını düşünür. Oysa bilimsel araştırmalar ve pratik deneyimler bunun tam tersini gösteriyor. Empatik bir lider:
1. **Güven Ortamı Yaratır:** Çalışanlar hata yapmaktan korkmadıklarında daha yaratıcı ve yenilikçi çözümler üretir.
2. **Bağlılığı Artırır:** Kendini değerli hisseden çalışanlar, iş hedeflerine ulaşmak için daha fazla çaba sarf eder.
3. **Erken Uyarı Sistemidir:** Ekipleriyle empati kurabilen liderler, tükenmişlik (burnout) veya işten ayrılma sinyallerini erkenden fark eder ve aksiyon alır.

### Liderler İçin Empati Pratikleri

Liderlik tarzınıza empatiyi entegre etmek için şu basit adımlarla başlayabilirsiniz:
- **Aktif Dinleme Yapın:** Biriyle konuşurken telefonunuzu veya bilgisayar ekranınızı kapatın. Sadece kelimelere değil, ses tonuna ve beden diline de odaklanın.
- **Kişiselleştirilmiş Yaklaşım:** Her çalışanın motivasyon kaynağı farklıdır. Kimisi takdir edilmekten hoşlanırken, kimisi otonom bırakılmak ister. Ekibinizdeki bireyleri tanıyın.
- **Kendi Duygularınızı Yönetin:** Stres altındayken vereceğiniz ani tepkiler ekibinizde güvensizlik yaratır. Tepki vermeden önce kendinize 5 saniye zaman tanıyın.
    `,
    category: 'Liderlik',
    readTime: '5 dk okuma',
    publishedAt: '12 Ağustos 2026',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    slug: 'modern-liderlikte-duygusal-zeka-ve-empatinin-rolu',
    author: {
      name: 'Anıl Erdoğan',
      role: 'Yönetici Koçu',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150'
    }
  },
  {
    id: 'post-2',
    title: 'Teknoloji Takımlarında Yüksek Performans Kültürü Nasıl Oluşturulur?',
    summary: 'İyi yazılım sadece iyi kod yazmakla ilgili değildir. Başarılı teknoloji ekiplerinin arkasındaki psikolojik güven, iletişim ve süreç mimarisi.',
    content: `
## Yüksek Performanslı Takımların Sırrı

Harika yazılım mimarileri tasarlayabilirsiniz, en güncel teknolojileri kullanabilirsiniz ancak günün sonunda projelerinizi hayata geçiren şey insandır. Teknoloji takımlarında yüksek performans elde etmek, sadece en iyi yazılımcıları işe almakla değil, onların en verimli şekilde çalışabileceği **kültürü** inşa etmekle mümkündür.

### 1. Psikolojik Güvenlik (Psychological Safety)

Google'ın gerçekleştirdiği meşhur "Aristoteles Projesi", en başarılı ekiplerin ortak özelliğinin "Psikolojik Güvenlik" olduğunu ortaya koydu. Ekiplerinizde şu durumlar yaşanıyor mu?
- Fikir ayrılıkları yapıcı bir şekilde tartışılabiliyor mu?
- Bir hata yapıldığında suçlu aramak yerine kök neden analizi (Post-mortem) yapılıyor mu?
- Takım üyeleri "Bu konuyu bilmiyorum, yardım edebilir misiniz?" diyebiliyor mu?

Eğer bu sorulara yanıtınız "evet" ise, yüksek performans için en temel zemini hazırlamışsınız demektir.

### 2. Net Hedefler ve Otonomi

Yazılımcılar problem çözücülerdir. Onlara sadece "ne yapacaklarını" söyleyip mikro yönetim uygularsanız yaratıcılıklarını öldürürsünüz. Doğru yaklaşım:
- **"Neden" sorusunu açıklayın:** Yapılan işin iş hedeflerine ve müşteriye nasıl bir fayda sağlayacağını netleştirin.
- **Otonomi verin:** Çözüm yolunu bulmayı ekibin teknik uzmanlığına bırakın.
- **Sınırları çizin:** Hangi kurallar ve standartlar dahilinde hareket edebileceklerini belirleyin (örneğin test kapsamı, kod standartları).

### 3. Sürekli Gelişim ve Retrospektifler

Kültür bir günde kurulmaz, sürekli bakım ister. Her sprint veya proje sonunda yapılan dürüst retrospektif toplantıları, süreçlerin iyileştirilmesinde en kritik araçtır. "Neyi iyi yaptık?", "Neyi daha iyi yapabilirdik?" ve "Hangi somut adımları atacağız?" soruları, ekibin sürekli öğrenmesini sağlar.
    `,
    category: 'Teknoloji & Yönetim',
    readTime: '6 dk okuma',
    publishedAt: '05 Ağustos 2026',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    slug: 'teknoloji-takimlarinda-yuksek-performans-kulturu-nasil-olusturulur',
    author: {
      name: 'Anıl Erdoğan',
      role: 'Teknoloji Danışmanı',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150'
    }
  },
  {
    id: 'post-3',
    title: 'Kariyer Değişiminde Doğru Zamanı Belirlemek',
    summary: 'Mevcut işinizden mutsuz musunuz yoksa sadece geçici bir yorgunluk mu yaşıyorsunuz? Sektör ve rol değişimi yaparken değerlendirmeniz gereken 5 kriter.',
    content: `
## Kariyer Yollarında Yol Ayrımı

Kariyerimizin belirli dönemlerinde hepimiz "Doğru yerde miyim?" sorusunu kendimize sorarız. Bazen bu soru, geçici bir stres veya tükenmişlikten kaynaklanırken; bazen de artık gerçekten köklü bir değişim yapma zamanının geldiğinin habercisidir. Peki, bu ayrımı nasıl yapabiliriz?

### Karar Vermenizi Sağlayacak 5 Altın Soru

Bir kariyer değişimi kararı almadan önce, kendinize şu soruları sorun ve dürüstçe yanıtlayın:

1. **Öğrenme Eğriniz Düzleşti mi?** Son 6 ayda yeni bir beceri kazandınız mı, yoksa sadece otomatik pilotta rutin işleri mi tekrarlıyorsunuz? Gelişimin durduğu yerde motivasyon kaybı başlar.
2. **Değerleriniz Şirket Değerleriyle Uyuşuyor mu?** Yaptığınız işin amacına inanmıyorsanız veya şirketin çalışma ahlakı sizi rahatsız ediyorsa, yüksek maaş veya iyi bir unvan dahi sizi uzun süre tatmin etmeyecektir.
3. **Mevcut Sektörün Geleceği Nasıl?** Sektörünüz küçülüyor mu yoksa dijital dönüşüme yenik mi düşüyor? Geleceğin yükselen sektörlerini ve rollerini analiz edin.
4. **Finansal Güvenceniz Var mı?** Yeni bir sektöre veya bağımsız çalışmaya geçerken belirli bir hazırlık dönemi gerekebilir. En az 6 aylık yaşam giderlerinizi karşılayacak bir "geçiş fonunuz" var mı?
5. **Fiziksel ve Ruhsal Sağlığınız Ne Durumda?** İşiniz artık uykularınızı kaçırıyor, sağlığınızı veya sosyal ilişkilerinizi olumsuz etkiliyorsa, değişim artık bir lüks değil gerekliliktir.

### Yumuşak Bir Geçiş İçin Yol Haritası

Bir anda istifa etmek yerine, geçiş sürecini planlı yönetin. Yan projeler (side projects) yapın, gitmek istediğiniz alandaki insanlarla kahve sohbetleri (informal interviews) ayarlayın ve eksik becerilerinizi tamamlamak için eğitimler alın.
    `,
    category: 'Kariyer',
    readTime: '4 dk okuma',
    publishedAt: '28 Temmuz 2026',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
    slug: 'kariyer-degisiminde-dogru-zamani-belirlemek',
    author: {
      name: 'Anıl Erdoğan',
      role: 'Kariyer Mentoru',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150'
    }
  }
]

export const siteSettingsData: SiteSettings = {
  siteName: 'Anıl Erdoğan',
  siteTitle: 'Anıl Erdoğan | Yönetici Koçu & Teknoloji Stratejisi Danışmanı',
  siteDescription: 'Premium ve sonuç odaklı yönetici koçluğu, liderlik gelişimi ve teknoloji stratejisi danışmanlık hizmetleri.',
  contactInfo: {
    email: 'info@anilerdogan.com',
    phone: '+90 (555) 123 45 67',
    address: 'Levent, Büyükdere Caddesi, No:199, Loft Ofisleri, 34394 Şişli/İstanbul',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3007.4720448109675!2d29.009772576579344!3d41.08051781525714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab65d4b3df4ff%3A0xc6cbfa84ebfa2487!2sKanyon%20Al%C4%B1%C5%9Fveri%C5%9F%20Merkezi!5e0!3m2!1str!2str!4v1724666000000!5m2!1str!2str'
  }
}
