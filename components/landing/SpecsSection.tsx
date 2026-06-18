import { WaButton } from "./WaButton";

const SPECS: Array<{ dt: string; dd: React.ReactNode }> = [
  { dt: "الموديل", dd: <span className="en-val">MFS60A</span> },
  { dt: "القوة القصوى", dd: <>60 حصان <span className="en-val">(44.1 kW)</span></> },
  { dt: "نوع المحرك", dd: <>4 أشواط — 3 أسطوانات <span className="en-val">SOHC</span> بتسعة صمامات</> },
  { dt: "سعة المحرك", dd: "866 سم³" },
  { dt: "القطر × الشوط", dd: <><span className="en-val">70 × 75</span> مم</> },
  { dt: "نطاق التشغيل", dd: "5000 – 6000 دورة/دقيقة" },
  { dt: "نظام الوقود", dd: <>حقن إلكتروني <span className="en-val">EFI</span></> },
  { dt: "الوزن", dd: "من 98.5 كجم — الأخف في فئته" },
  { dt: "طول العمود", dd: "508 مم (20″) أو 635 مم (25″)" },
  { dt: "المولّد", dd: <span className="en-val">12V – 21A</span> },
  { dt: "الرفع والإمالة", dd: <>هيدروليكي <span className="en-val">Power Trim & Tilt</span></> },
  { dt: "سرعة الخمول", dd: "متغيرة 650 – 950 دورة/دقيقة" },
  { dt: "نظام الغسيل بالماء العذب", dd: "قياسي — لإطالة عمر المحرك" },
  { dt: "الألوان", dd: "أزرق أكوامارين / أبيض بيلوغا" },
];

export function SpecsSection() {
  return (
    <section className="specs" id="specs">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">المواصفات الكاملة</span>
          <h2 data-words>توهاتسو MFS60A بالأرقام</h2>
        </div>
        <dl className="specs-table">
          {SPECS.map((s) => (
            <div className="spec-row" key={s.dt}>
              <dt>{s.dt}</dt>
              <dd>{s.dd}</dd>
            </div>
          ))}
        </dl>
        <div className="section-cta" data-reveal>
          <WaButton message="السلام عليكم، حاب أعرف سعر وتوفّر محرك توهاتسو 60 (MFS60A).">
            اطلب السعر والتوفّر عبر واتساب
          </WaButton>
        </div>
      </div>
    </section>
  );
}
