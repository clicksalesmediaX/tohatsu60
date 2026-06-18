import { WaButton } from "./WaButton";

const CARDS = [
  {
    span: "span-7",
    num: "01",
    title: "موثوقية يابانية لا تساوم",
    text: "توهاتسو هي أقدم مصنّع لمحركات البحر في اليابان. تشغيل فوري حتى بعد التخزين الطويل، وأداء ثابت في الحر والرطوبة وملوحة مياه الخليج والبحر الأحمر.",
  },
  {
    span: "span-5",
    num: "02",
    title: "الأخف وزنًا في فئته",
    text: "98.5 كجم فقط — وزن أقل يعني غاطسًا أخف، وسرعة أعلى، واستجابة فورية للقوارب من 5 إلى 8 أمتار.",
  },
  {
    span: "span-5",
    num: "03",
    title: "اقتصادي في كل ميل بحري",
    text: "حقن إلكتروني EFI بدون شفّاط: احتراق أنظف، استهلاك أقل، ومدى أطول لكل تعبئة — فرق تحس به في نهاية كل موسم.",
  },
  {
    span: "span-7",
    num: "04",
    title: "خدمة وقطع غيار في المملكة",
    text: "عبر توهاتسو أرابيا تحصل على ضمان معتمد، وقطع غيار أصلية، وفنيين مختصين — حتى لا تتوقف طلعاتك على انتظار شحنة من الخارج.",
  },
];

export function WhySection() {
  return (
    <section className="why light" id="why">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">لماذا توهاتسو؟</span>
          <h2 data-words>أقدم اسم ياباني في محركات البحر</h2>
          <p>
            منذ أكثر من قرن، تصنع توهاتسو محركات يعتمد عليها الصيادون حول العالم
            — وتصل اليوم إلى سواحل المملكة عبر توهاتسو أرابيا.
          </p>
        </div>
        <div className="why-grid" data-reveal-group="1">
          {CARDS.map((c) => (
            <div className={`why-card ${c.span}`} key={c.num}>
              <div className="why-num en">{c.num}</div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
        <div className="heritage" data-reveal>
          <div className="heritage-year">
            <b>
              <span>1922</span>
            </b>
            <span>عام التأسيس — اليابان</span>
          </div>
          <p className="heritage-note">
            أكثر من مئة عام من الهندسة البحرية. ملايين المحركات في مياه العالم،
            من بحر اليابان إلى البحر الأحمر والخليج العربي.
          </p>
        </div>
        <div className="section-cta" data-reveal>
          <WaButton message="السلام عليكم، حاب أعرف أكثر عن مميزات محرك توهاتسو 60 حصان.">
            تواصل معنا على واتساب
          </WaButton>
        </div>
      </div>
    </section>
  );
}
