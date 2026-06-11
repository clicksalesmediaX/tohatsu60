import { waLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

export function Hero() {
  return (
    <header className="hero" id="hero">
      <div className="hero-ghost">60</div>
      <svg
        className="hero-waves"
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,80 C240,30 480,130 720,80 S1200,30 1440,80" stroke="rgba(47,182,201,0.5)" />
        <path d="M0,150 C240,100 480,200 720,150 S1200,100 1440,150" stroke="rgba(47,182,201,0.3)" />
        <path d="M0,225 C240,175 480,275 720,225 S1200,175 1440,225" stroke="rgba(47,182,201,0.16)" />
      </svg>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="kicker">
            <span className="en">TOHATSU 60 — MFS60A</span>
          </span>
          <h1>
            البحر لا ينتظر، <span className="accent">وتوهاتسو لا تتأخّر.</span>
          </h1>
          <p className="hero-sub">
            محرك توهاتسو 60 حصان — موثوقية يابانية منذ 1922، الأخف وزنًا في فئته،
            وحقن إلكتروني يجعل طلعاتك أطول وتكاليفك أقل. صُنع ليكون رفيق الصيادين
            في مياه المملكة.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-red" href="#contact">
              اطلب عرض سعر
            </a>
            <a className="btn btn-wa" href={waLink()} target="_blank" rel="noopener">
              <WhatsAppIcon />
              واتساب مباشر
            </a>
          </div>
          <div className="hero-stats">
            <div className="hstat">
              <b>
                <span data-count="60">0</span>
                <small>حصان</small>
              </b>
              <span>القوة القصوى</span>
            </div>
            <div className="hstat">
              <b>
                <span data-count="98.5" data-decimals="1">0</span>
                <small>كجم</small>
              </b>
              <span>الأخف في فئته</span>
            </div>
            <div className="hstat">
              <b>
                <span data-count="866">0</span>
                <small>سم³</small>
              </b>
              <span>سعة المحرك</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-engine-frame hero-float">
            <div className="ring" />
            <div className="slot">
              {/* scroll-scrubbed 360° spin — playback driven by ScrollTrigger */}
              <video
                className="hero-engine-video"
                src="/images/video.mp4"
                muted
                playsInline
                preload="auto"
                aria-label="محرك توهاتسو 60 حصان MFS60A — عرض دوران"
              />
            </div>
            <div className="hero-tag">
              <b className="en">EFI</b>
              <span>حقن وقود إلكتروني</span>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-hint">
        <span className="en">SCROLL</span>
        <span className="line" />
      </div>
    </header>
  );
}

export function Marquee() {
  const items = (
    <>
      <span>موثوقية يابانية منذ 1922</span>
      <span className="dot" />
      <span className="en">TOHATSU 60</span>
      <span className="dot" />
      <span>الأخف وزنًا في فئته</span>
      <span className="dot" />
      <span>حقن إلكتروني EFI</span>
      <span className="dot" />
      <span>صُنع في اليابان</span>
      <span className="dot" />
    </>
  );
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <div className="marquee-chunk">{items}</div>
        <div className="marquee-chunk">{items}</div>
      </div>
    </div>
  );
}
