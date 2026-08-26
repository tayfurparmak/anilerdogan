-- ==========================================
-- REAL INITIAL SEED DATA FOR ANIL ERDOĞAN WEBSITE
-- Run this script in your Supabase SQL Editor if your tables are empty.
-- ==========================================

-- 1. SITE SETTINGS
INSERT INTO site_settings (id, site_name, site_description, default_seo_title, default_seo_description, default_og_image)
VALUES (
  1,
  'Anıl Erdoğan',
  'Yönetici koçluğu, liderlik gelişimi, teknoloji ve ürün yönetimi danışmanlığı.',
  'Anıl Erdoğan | Yönetici Koçu & Yönetim Danışmanı',
  'Yönetici koçluğu, takım kültürü, teknolojik liderlik ve kariyer gelişimi danışmanlığı.',
  'https://anilerdogan.com/anil-erdogan.png'
)
ON CONFLICT (id) DO UPDATE SET
  site_name = EXCLUDED.site_name,
  site_description = EXCLUDED.site_description,
  default_seo_title = EXCLUDED.default_seo_title,
  default_seo_description = EXCLUDED.default_seo_description,
  default_og_image = EXCLUDED.default_og_image;

-- 2. SERVICES
INSERT INTO services (title, slug, short_description, description, icon, sort_order, is_published)
VALUES
(
  'Yönetici ve Liderlik Koçluğu',
  'yonetici-ve-liderlik-kocluu',
  'Liderlik becerilerinizi geliştirin, stratejik düşünme kapasitenizi artırın ve ekiplerinizle daha güçlü bağlar kurun.',
  'Bu program, üst düzey yöneticiler, kurucular ve lider adayları için özel olarak tasarlanmıştır. Değişen iş dünyasında vizyoner kararlar alabilmeniz, delegasyon ve yetkilendirmeyi etkin yapabilmeniz ve kriz anlarında soğukkanlılığınızı koruyarak yön vermeniz için birebir seanslarla destek sağlıyorum.',
  'i-heroicons-user-group',
  1,
  true
),
(
  'Teknoloji ve Ürün Yönetimi Danışmanlığı',
  'teknoloji-ve-urun-yonetimi-danismanligi',
  'Ürün vizyonunuzu netleştirin, çevik süreçleri entegre edin ve yüksek performanslı mühendislik takımları kurun.',
  'Teknoloji odaklı şirketler için ürün stratejisi geliştirme, agile dönüşüm, OKR süreçlerinin kurgulanması ve mühendislik takımlarının verimliliğinin artırılması konularında uçtan uca danışmanlık hizmeti sunuyorum.',
  'i-heroicons-cpu-chip',
  2,
  true
),
(
  'Kariyer ve Üst Seviye Mentorluk',
  'kariyer-ve-ust-seviye-mentorluk',
  'Kariyerinizde bir sonraki seviyeye geçin, yönetici pozisyonlarına hazırlanın ve kişisel markanızı güçlendirin.',
  'Kariyerinde tıkanıklık hisseden veya üst düzey yönetici pozisyonlarına (C-Level, VP, Director) geçiş yapmak isteyen profesyoneller için bireysel mentorluk sürecidir.',
  'i-heroicons-academic-cap',
  3,
  true
)
ON CONFLICT (slug) DO NOTHING;

-- 3. EDUCATIONS
INSERT INTO educations (title, institution, description, image_url, sort_order, is_published)
VALUES
(
  'Yöneticiler İçin Stratejik Liderlik Akademisi',
  'Anıl Erdoğan Akademi',
  'Modern iş dünyasında çevik ve etkili liderlik modelleri, kriz yönetimi ve takım motivasyonu üzerine 4 haftalık yoğun program.',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
  1,
  true
),
(
  'Ürün Yönetimi ve Agile Dönüşüm Eğitimi',
  'Anıl Erdoğan Akademi',
  'Fikirden ürüne giden yolda MVP tasarımı, kullanıcı araştırması, sprint planlama ve metriklere dayalı ürün yönetimi eğitimi.',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
  2,
  true
)
ON CONFLICT DO NOTHING;

-- 4. BLOG POSTS
INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, category, tags, is_published, published_at)
VALUES
(
  'Modern Liderlikte Duygusal Zeka ve Empatinin Rolü',
  'modern-liderlikte-duygusal-zeka-ve-empatinin-rolu',
  'Geleneksel komuta-kontrol anlayışının yerini alan empatik liderlik yaklaşımı, ekiplerin bağlılığını ve performansını nasıl artırıyor?',
  'Günümüz iş dünyasında başarılı liderler, sadece teknik bilgi ve stratejik yetkinlikleriyle değil; yüksek duygusal zekaları ve empati yetenekleriyle öne çıkıyor. Ekiplerini dinleyen, güvensizlik hissini ortadan kaldıran ve psikolojik güven ortamı yaratan liderler, kriz anlarında dahi sürdürülebilir başarı yakalayabiliyor.',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
  'Liderlik',
  ARRAY['Liderlik', 'Duygusal Zeka', 'Yönetim'],
  true,
  NOW()
),
(
  'Teknoloji Ekiplerinde Yüksek Performanslı Takım Kültürü Oluşturmak',
  'teknoloji-ekiplerinde-yuksek-performansli-takim-kulturu-olusturmak',
  'Yazılım ve ürün takımlarında motivasyonu, kaliteyi ve teslimat hızını artırmanın 5 temel prensibi.',
  'Teknoloji ekiplerinin verimliliği, kullanılan araçlardan ziyade kurulan takım kültürüne bağlıdır. Şeffaf iletişim, otonomi, sürekli öğrenme mantalitesi ve net hedefler (OKR) ile donatılmış ekipler, pazara çıkış süresini kısaltırken ürün kalitesini maksimuma çıkarır.',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
  'Teknoloji & Yönetim',
  ARRAY['Teknoloji', 'Agile', 'Takım Kültürü'],
  true,
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- 5. TESTIMONIALS
INSERT INTO testimonials (name, position, company, content, image_url, sort_order, is_published)
VALUES
(
  'Caner Yılmaz',
  'VP of Product',
  'TechCorp Solutions',
  'Anıl Erdoğan ile gerçekleştirdiğimiz 6 aylık liderlik koçluğu süreci, hem ekibimi sevk ve idare etme biçimimi hem de stratejik kararlar alma özgüvenimi baştan sona değiştirdi.',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
  1,
  true
),
(
  'Selin Kara',
  'Co-Founder & CEO',
  'Fintech Scaleup',
  'Şirketimizin hızlı büyüme aşamasında yaşadığımız yönetimsel tıkanıklıkları Anıl Beyin rehberliğinde aştık. Ürün takımlarımız arasındaki iletişim ve teslimat kalitesi belirgin şekilde arttı.',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150',
  2,
  true
)
ON CONFLICT DO NOTHING;

-- 6. SOCIAL LINKS
INSERT INTO social_links (platform, title, url, icon, sort_order, is_visible)
VALUES
('linkedin', 'LinkedIn', 'https://linkedin.com/in/anilerdogan', 'i-simple-icons-linkedin', 1, true),
('twitter', 'Twitter / X', 'https://x.com/anilerdogan', 'i-simple-icons-x', 2, true),
('instagram', 'Instagram', 'https://instagram.com/anilerdogan', 'i-simple-icons-instagram', 3, true),
('medium', 'Medium', 'https://medium.com/@anilerdogan', 'i-simple-icons-medium', 4, true)
ON CONFLICT DO NOTHING;
