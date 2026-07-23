"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { waLink } from "@/lib/site";
import { Brand, WhatsAppIcon } from "./icons";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FEATURES = [
  {
    number: "01",
    label: "178.5 كجم",
    title: "أخف وزن. أداء أقوى.",
    text: "وزن رائد في فئته يمنح القارب تسارعًا أسرع، توازنًا أفضل، وكفاءة أعلى دون المساومة على القوة.",
  },
  {
    number: "02",
    label: "4–2–1",
    title: "عزم يبدأ من أول انطلاقة",
    text: "تصميم مجمع العادم 4–2–1 يعزز العزم عند الدورات المنخفضة، لتسارع أسرع وصعود أسلس إلى وضع التخطيط حتى مع الحمولة الكاملة.",
  },
  {
    number: "03",
    label: "Lean Burn + Knock Control",
    title: "مدى أبعد باستهلاك أقل",
    text: "تقنيات الاحتراق الاقتصادي وحساس الطرق تعمل باستمرار لضبط الاحتراق، ما يحقق كفاءة وقود ممتازة وأداءً ثابتًا في مختلف ظروف التشغيل.",
  },
  {
    number: "04",
    label: "41 أمبير",
    title: "طاقة لكل ما تحتاجه",
    text: "مولد عالي الخرج يوفر طاقة مستقرة لأنظمة الملاحة، الشاشات، أجهزة الاتصال، والإلكترونيات البحرية طوال الرحلة.",
  },
  {
    number: "05",
    label: "DOHC 16-Valve",
    title: "قوة سلسة في كل دورة",
    text: "محرك رباعي الأسطوانات مزود بعمودي كامات علويين و16 صمامًا لتحقيق استجابة أسرع، تسارع سلس، وأداء موثوق في جميع سرعات التشغيل.",
  },
];

const USE_CASES = [
  {
    number: "01",
    title: "مشغّلو الرحلات البحرية",
    text: "انطلاقة أسرع من المرسى، هدوء أفضل للضيوف، وقوة كافية لبرنامج رحلات يومي بثقة.",
    metric: "رحلات أكثر سلاسة",
  },
  {
    number: "02",
    title: "تأجير القوارب وRIB",
    text: "وزن محسّن وتحكم مباشر يساعدان العملاء على المناورة بسهولة ويقللان العبء على القارب.",
    metric: "تشغيل أسهل",
  },
  {
    number: "03",
    title: "النزهات العائلية الطويلة",
    text: "قوة احتياطية عند الحاجة، اقتصاد في الإبحار، وهدوء يحافظ على راحة الحديث طوال الرحلة.",
    metric: "مدى وراحة أكبر",
  },
];

const SPECS = [
  ["الموديل", "MFS150A"],
  ["القوة القصوى", "150 حصان / 110.3 كيلوواط"],
  ["المحرك", "4 أسطوانات — SOHC بأربعة صمامات لكل أسطوانة"],
  ["السعة", "1,995 سم³"],
  ["القطر × الشوط", "84 × 90 مم"],
  ["نطاق التشغيل", "5,500 – 6,200 دورة/دقيقة"],
  ["الوزن الأدنى", "178.5 كجم"],
  ["نظام الوقود", "حقن إلكتروني EFI"],
  ["نسبة التخفيض", "2.08 : 1"],
  ["المولّد", "12V / 492W / 41A"],
  ["طول العمود", "20 أو 25 بوصة"],
  ["الرفع والإمالة", "هيدروليكي Power Trim & Tilt"],
];

function WhatsAppLink({
  children,
  message,
  className = "",
}: {
  children: React.ReactNode;
  message: string;
  className?: string;
}) {
  return (
    <a
      className={`cta cta-whatsapp ${className}`.trim()}
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsAppIcon />
      <span>{children}</span>
      <span className="cta-arrow" aria-hidden="true">↗</span>
    </a>
  );
}

export default function TohatsuLanding() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const nav = root.querySelector(".site-nav");
      const progress = root.querySelector<HTMLElement>(".scroll-progress span");

      ScrollTrigger.create({
        start: 12,
        end: "max",
        onUpdate: (self) => {
          nav?.classList.toggle("is-scrolled", self.scroll() > 24);
          if (progress) progress.style.transform = `scaleX(${self.progress})`;
        },
      });

      if (reduced) {
        root.querySelectorAll<HTMLElement>("[data-count]").forEach((element) => {
          element.textContent = element.dataset.count ?? "";
        });
        return;
      }

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(".site-nav", { yPercent: -120, duration: 0.75 })
        .from(".hero-kicker", { opacity: 0, y: 24, duration: 0.7 }, 0.18)
        .from(".hero-title > span", { opacity: 0, yPercent: 90, duration: 0.9, stagger: 0.08 }, 0.25)
        .from(".hero-lead", { opacity: 0, y: 30, duration: 0.8 }, 0.58)
        .from(".hero-actions > *", { opacity: 0, y: 24, duration: 0.65, stagger: 0.1 }, 0.72)
        .from(".hero-metrics .metric", { opacity: 0, y: 20, duration: 0.6, stagger: 0.08 }, 0.84)
        .from(".hero-model", { opacity: 0, x: -30, duration: 0.8 }, 0.9);

      root.querySelectorAll<HTMLElement>(".hero-metrics [data-count]").forEach((element, index) => {
        const target = Number(element.dataset.count ?? 0);
        const decimals = Number(element.dataset.decimals ?? 0);
        const value = { current: 0 };
        gsap.to(value, {
          current: target,
          duration: 1.5,
          delay: 1 + index * 0.08,
          ease: "power2.out",
          onUpdate: () => {
            element.textContent = value.current.toFixed(decimals);
          },
        });
      });

      gsap.to(".hero-scene", {
        scale: 1.1,
        yPercent: 7,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.6 },
      });

      gsap.to(".hero-light", {
        xPercent: 320,
        duration: 2.2,
        repeat: -1,
        repeatDelay: 3.4,
        ease: "power2.inOut",
      });

      gsap.to(".product-engine", {
        y: -16,
        rotate: -1.8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".product-orbit", {
        rotate: 360,
        duration: 34,
        repeat: -1,
        ease: "none",
      });

      gsap.fromTo(
        ".product-engine",
        { scale: 0.86, rotate: 5 },
        {
          scale: 1.03,
          rotate: -4,
          ease: "none",
          scrollTrigger: {
            trigger: ".features-layout",
            start: "top 85%",
            end: "bottom 40%",
            scrub: 0.7,
          },
        },
      );

      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 54,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 86%" },
        });
      });

      root.querySelectorAll<HTMLElement>("[data-stagger]").forEach((group) => {
        gsap.from(group.children, {
          opacity: 0,
          y: 48,
          duration: 0.8,
          stagger: 0.11,
          ease: "power3.out",
          scrollTrigger: { trigger: group, start: "top 83%" },
        });
      });

      gsap.to(".proof-photo", {
        scale: 1.08,
        yPercent: 4,
        ease: "none",
        scrollTrigger: { trigger: ".proof", start: "top bottom", end: "bottom top", scrub: 0.6 },
      });

      const handleAnchorClick = (event: MouseEvent) => {
        const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
        if (!link) return;
        const target = root.querySelector<HTMLElement>(link.getAttribute("href") ?? "");
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      };

      root.addEventListener("click", handleAnchorClick);
      return () => root.removeEventListener("click", handleAnchorClick);
    },
    { scope: rootRef },
  );

  return (
    <div className="landing" ref={rootRef}>
      <div className="noise" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true"><span /></div>

      <nav className="site-nav" aria-label="التنقل الرئيسي">
        <div className="nav-shell">
          <Brand />
          <div className="nav-links">
            <a href="#features">المزايا</a>
            <a href="#business">لأعمال الرحلات</a>
            <a href="#specs">المواصفات</a>
          </div>
          <WhatsAppLink
            className="nav-whatsapp"
            message="السلام عليكم، أرغب في معرفة سعر وتوفّر محرك توهاتسو MFS150A."
          >
            اطلب السعر
          </WhatsAppLink>
        </div>
      </nav>

      <main>
        <header className="hero" id="top">
          <Image
            className="hero-scene"
            src="/images/mfs150-tour-hero.png"
            alt="قارب رحلات بحرية بمحرك توهاتسو MFS150A أبيض أثناء الإبحار"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
          />
          <div className="hero-overlay" aria-hidden="true" />
          <div className="hero-light" aria-hidden="true" />
          <div className="hero-gridlines" aria-hidden="true" />

          <div className="hero-shell">
            <div className="hero-copy">
              <div className="hero-kicker">
                <span className="signal-dot" />
                <span>الجديد كليًا لعام 2026</span>
                <b dir="ltr">MFS150A</b>
              </div>
              <h1 className="hero-title">
                <span>قوة تدفع</span>
                <span className="shine">رحلتك للأمام</span>
              </h1>
              <p className="hero-lead">
                توهاتسو 150 حصان الجديد — عزم قوي، وزن هو الأخف في فئته،
                وهدوء يرفع جودة التجربة. صُمّم لقوارب الرحلات، التأجير، والنزهات
                الطويلة التي لا تحتمل التوقف.
              </p>
              <div className="hero-actions">
                <WhatsAppLink message="السلام عليكم، أدير رحلات بحرية أو قارب تأجير وأرغب بعرض سعر لمحرك توهاتسو MFS150A مع تفاصيل التركيب.">
                  اطلب عرضًا لمشروعك
                </WhatsAppLink>
                <a className="cta cta-secondary" href="#features">
                  اكتشف المحرك
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
              <div className="hero-metrics" aria-label="أهم الأرقام">
                <div className="metric">
                  <strong><span data-count="150">0</span><small>HP</small></strong>
                  <span>قوة كاملة</span>
                </div>
                <div className="metric">
                  <strong><span data-count="178.5" data-decimals="1">0</span><small>KG</small></strong>
                  <span>الوزن الأدنى</span>
                </div>
                <div className="metric">
                  <strong><span data-count="41">0</span><small>A</small></strong>
                  <span>قدرة الشحن</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-model" aria-hidden="true">
            <span>TOHATSU</span>
            <b>150</b>
            <small>SIMPLIQ™ TECHNOLOGY</small>
          </div>
          <div className="hero-scroll" aria-hidden="true">
            <span>مرّر للاستكشاف</span>
            <i />
          </div>
        </header>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            <div className="marquee-content">
              <span>الأخف في فئته</span><i />
              <span dir="ltr">150 HP</span><i />
              <span>عادم مضبوط 4–2–1</span><i />
              <span>حقن إلكتروني EFI</span><i />
              <span>مولّد 41 أمبير</span><i />
              <span>هندسة يابانية منذ 1922</span><i />
            </div>
            <div className="marquee-content">
              <span>الأخف في فئته</span><i />
              <span dir="ltr">150 HP</span><i />
              <span>عادم مضبوط 4–2–1</span><i />
              <span>حقن إلكتروني EFI</span><i />
              <span>مولّد 41 أمبير</span><i />
              <span>هندسة يابانية منذ 1922</span><i />
            </div>
          </div>
        </div>

        <section className="features section-dark" id="features">
          <div className="section-shell">
            <div className="section-heading" data-reveal>
              <div>
                <span className="eyebrow">قوة مدروسة للتشغيل الحقيقي</span>
                <h2>كل حصان يعمل<br /><em>لصالح رحلتك.</em></h2>
              </div>
              <p>
                ليس الرقم وحده ما يصنع محركًا ناجحًا. MFS150A يجمع قوة 150 حصان
                مع وزن منخفض، عزم مبكر، واقتصاد ينعكس على كل ميل بحري.
              </p>
            </div>

            <div className="features-layout">
              <div className="product-sticky">
                <div className="stage-spotlight" aria-hidden="true" />
                <div className="stage-grid" aria-hidden="true" />
                <div className="product-glow" aria-hidden="true" />
                <div className="product-orbit" aria-hidden="true" />
                <div className="stage-ring" aria-hidden="true" />
                <span className="product-ghost" aria-hidden="true">150</span>
                <div className="stage-floor" aria-hidden="true" />
                <Image
                  className="product-engine"
                  src="/images/mfs150-official-cut.png"
                  alt="محركا توهاتسو MFS150A باللونين الأبيض والأزرق أكوامارين"
                  width={544}
                  height={664}
                  sizes="(max-width: 900px) 82vw, 44vw"
                />
                <div className="product-chip chip-power" aria-hidden="true" dir="ltr">
                  <b>150</b>
                  <span>HP</span>
                </div>
                <div className="product-chip chip-tech" aria-hidden="true" dir="ltr">
                  <b>EFI</b>
                  <span>DOHC 16V</span>
                </div>
                <div className="product-badge">
                  <b>الأخف</b>
                  <span>ضمن فئة 150 حصان رباعية الأشواط</span>
                </div>
              </div>

              <div className="feature-list">
                {FEATURES.map((feature) => (
                  <article className="feature-card" data-reveal key={feature.number}>
                    <div className="feature-topline">
                      <span>{feature.number}</span>
                      <b dir="ltr">{feature.label}</b>
                    </div>
                    <h3>{feature.title}</h3>
                    <p>{feature.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="business section-light" id="business">
          <div className="section-shell">
            <div className="business-intro" data-reveal>
              <span className="eyebrow">عندما يكون القارب جزءًا من عملك</span>
              <h2>المحرك لا ينقل الضيوف فقط.<br /><em>إنه يحمي سمعة الرحلة.</em></h2>
              <p>
                التأخير، الضوضاء، والاستهلاك الزائد تُرى في تقييم العميل وفي
                هامش الربح. لذلك صُمم MFS150A ليخدم الاستخدام الترفيهي والتجاري
                بقوة سلسة وسهولة تشغيل يومية.
              </p>
            </div>

            <div className="use-case-grid" data-stagger>
              {USE_CASES.map((useCase) => (
                <article className="use-case" key={useCase.number}>
                  <span className="use-number">{useCase.number}</span>
                  <h3>{useCase.title}</h3>
                  <p>{useCase.text}</p>
                  <b>{useCase.metric}</b>
                </article>
              ))}
            </div>

            <div className="operator-panel" data-reveal>
              <div>
                <span>قرار شراء مبني على قاربك</span>
                <h3>أرسل لنا نوع القارب وطوله وطبيعة الاستخدام.</h3>
              </div>
              <WhatsAppLink message="السلام عليكم، أريد التأكد من ملاءمة محرك توهاتسو MFS150A لقاربي. سأرسل نوع القارب وطوله وطبيعة الاستخدام.">
                استشرنا عبر واتساب
              </WhatsAppLink>
            </div>
          </div>
        </section>

        <section className="proof">
          <Image
            className="proof-photo"
            src="/images/mfs150-white.jpg"
            alt="محرك توهاتسو MFS150A أبيض مركب على قارب"
            fill
            sizes="100vw"
          />
          <div className="proof-overlay" aria-hidden="true" />
          <div className="proof-copy" data-reveal>
            <span className="eyebrow">هدوء يشعر به الجميع</span>
            <blockquote>
              دع صوت البحر يتقدّم،<br />واترك المحرك يعمل في الخلفية.
            </blockquote>
            <p>
              سحب متساوي الطول، منفذ خمول واسع، وبرمجة دقيقة لوحدة ECU تمنحك
              صوتًا محسوبًا عند الانطلاق وهدوءًا أفضل قرب المرسى.
            </p>
          </div>
        </section>

        <section className="specs section-dark" id="specs">
          <div className="section-shell specs-layout">
            <div className="specs-copy" data-reveal>
              <span className="eyebrow">المواصفات الرسمية</span>
              <h2 dir="ltr">MFS150A</h2>
              <p>
                منظومة رباعية الأشواط بهندسة SOHC-4V، متوفرة بخيارات تحكم عن
                بعد أو مقبض متعدد الوظائف، ومع خيار دوران عكسي للتركيب المزدوج.
              </p>
              <div className="specs-chips">
                <span>EFI</span>
                <span>Power Trim & Tilt</span>
                <span>Fresh-water Flush</span>
              </div>
              <WhatsAppLink message="السلام عليكم، أرغب بعرض سعر وتفاصيل التوفّر والتركيب لمحرك توهاتسو MFS150A.">
                اسأل عن السعر والتوفّر
              </WhatsAppLink>
            </div>

            <dl className="specs-table" data-stagger>
              {SPECS.map(([term, value]) => (
                <div className="spec-row" key={term}>
                  <dt>{term}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="section-shell spec-note">
            <p>
              المواصفات بحسب توهاتسو الدولية وقد تختلف الخيارات المتاحة حسب السوق.
              الوزن المذكور لأخف نسخة.
            </p>
            <a
              href="https://www.tohatsu.com/marine/int/outboards/mfs150a.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              صفحة المنتج الرسمية ↗
            </a>
          </div>
        </section>

        <section className="closing section-light" id="contact">
          <div className="section-shell closing-grid">
            <div className="closing-mark" aria-hidden="true">150</div>
            <div className="closing-copy" data-reveal>
              <span className="eyebrow">الخطوة التالية بسيطة</span>
              <h2>رحلتك القادمة<br /><em>تبدأ من المحرك.</em></h2>
              <p>
                اكتب لنا على واتساب. سنسألك عن القارب، الاستخدام، وعدد ساعات
                التشغيل لنساعدك في اختيار التجهيز المناسب لـ MFS150A.
              </p>
              <WhatsAppLink message="السلام عليكم، أرغب في عرض سعر لمحرك توهاتسو MFS150A. استخدام القارب: رحلات بحرية / تأجير / شخصي، وأرغب بمعرفة التجهيز المناسب.">
                ابدأ المحادثة الآن
              </WhatsAppLink>
              <span className="closing-hint">بدون نماذج — تواصل مباشر مع الفريق</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="section-shell footer-inner">
          <Brand />
          <p>توهاتسو أرابيا — قوة يابانية لأهل البحر منذ 1922.</p>
          <span dir="ltr">MFS150A © 2026</span>
        </div>
      </footer>

      <a
        className="whatsapp-fab"
        href={waLink("السلام عليكم، أرغب في معرفة سعر وتوفّر محرك توهاتسو MFS150A.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل عبر واتساب عن محرك توهاتسو MFS150A"
      >
        <WhatsAppIcon />
        <span>واتساب</span>
      </a>
    </div>
  );
}
