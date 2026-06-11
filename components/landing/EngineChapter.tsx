const CALLOUTS = [
  {
    cls: "co-1",
    count: "60",
    unit: "حصان",
    text: "قوة قصوى 44.1 كيلوواط، بثلاث أسطوانات وتسعة صمامات لتسارع سلس وسحب قوي.",
  },
  {
    cls: "co-2",
    count: "98.5",
    decimals: "1",
    unit: "كجم",
    text: "الأخف وزنًا في فئته — حمل أخف على القارب، وتسارع أسرع من لحظة الانطلاق.",
  },
  {
    cls: "co-3",
    count: "866",
    unit: "سم³",
    text: "سعة مدروسة بنظام SOHC مع روافع دوّارة تقلل الاحتكاك وترفع الاستجابة.",
  },
  {
    cls: "co-4",
    count: "21",
    unit: "أمبير",
    text: "مولّد عالي الإخراج يشغّل أجهزتك الملاحية والكشافات بثقة طوال الرحلة.",
  },
];

export function EngineChapter() {
  return (
    <section className="engine-chapter" id="engine">
      <div className="engine-stage">
        <div className="engine-ghost60">60</div>
        <div className="engine-title">
          <span className="kicker">عن قرب</span>
          <h2>هندسة يابانية، رقمًا رقمًا</h2>
        </div>
        <div className="engine-center">
          <div className="engine-orbit" />
          <div className="slot">
            {/* 360° spin scrubbed across the pinned chapter — alpha encodes, white keyed out */}
            <video
              className="engine-spin-video"
              muted
              playsInline
              preload="auto"
              aria-label="محرك توهاتسو 60 حصان MFS60A — عرض دوران"
            >
              <source src="/images/video-alpha.mov" type='video/mp4; codecs="hvc1"' />
              <source src="/images/video-alpha.webm" type="video/webm" />
              <source src="/images/video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {CALLOUTS.map((c) => (
          <div className={`callout ${c.cls}`} key={c.cls}>
            <div className="c-line" />
            <b>
              <span data-count={c.count} data-decimals={c.decimals}>0</span>
              <small>{c.unit}</small>
            </b>
            <span>{c.text}</span>
          </div>
        ))}

        <div className="rpm-dial">
          <svg viewBox="0 0 120 70" aria-hidden="true">
            <path
              className="rpm-arc"
              d="M12,62 A48,48 0 0 1 108,62"
              fill="none"
              stroke="rgba(235,244,248,0.12)"
              strokeWidth="2"
            />
            <path
              className="rpm-arc-fill"
              d="M12,62 A48,48 0 0 1 108,62"
              fill="none"
              stroke="var(--aqua)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              className="rpm-needle"
              x1="60"
              y1="62"
              x2="60"
              y2="24"
              stroke="var(--red)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="60" cy="62" r="4" fill="var(--red)" />
          </svg>
          <span className="rpm-value">650</span>
          <span className="rpm-label en">RPM</span>
        </div>
      </div>
    </section>
  );
}
