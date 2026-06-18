import { waLink } from "@/lib/site";
import { Brand, WhatsAppIcon } from "./icons";
import { WaButton } from "./WaButton";

export function ContactSection() {
  return (
    <section className="contact light" id="contact">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">تواصل معنا</span>
          <h2 data-words>جاهز تطلع البحر بقوة 60؟</h2>
        </div>
        <div className="contact-grid">
          <div className="contact-side" data-reveal>
            <p className="big">
              كلّمنا مباشرة على واتساب — فريق توهاتسو أرابيا يرد عليك بعرض سعر
              وتفاصيل التركيب بأسرع وقت.
            </p>
            <a className="wa-card" href={waLink()} target="_blank" rel="noopener">
              <span className="wa-ic">
                <WhatsAppIcon />
              </span>
              <span>
                <b>تفضّل الواتساب؟</b>
                <span>كلّمنا مباشرة — نرد عليك بسرعة</span>
              </span>
            </a>
          </div>
          <div className="wa-panel" data-reveal>
            <h3>ابدأ المحادثة الآن</h3>
            <p className="wa-panel-sub">
              اختر طلبك ونفتح لك رسالة واتساب جاهزة — أرسلها وخلاص.
            </p>
            <div className="wa-actions">
              <WaButton message="السلام عليكم، أرغب بطلب عرض سعر لمحرك توهاتسو 60 حصان (MFS60A).">
                اطلب عرض سعر
              </WaButton>
              <WaButton
                variant="ghost"
                message="السلام عليكم، حاب أستفسر عن تركيب وتوصيل محرك توهاتسو 60."
              >
                استفسار عن التركيب والتوصيل
              </WaButton>
              <WaButton
                variant="ghost"
                message="السلام عليكم، حاب أستفسر عن قطع الغيار والصيانة لمحركات توهاتسو."
              >
                قطع الغيار والصيانة
              </WaButton>
            </div>
            <p className="wa-panel-hint">
              تواصلك يتم مباشرة عبر واتساب — بدون نماذج ولا انتظار.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-big en">TOHATSU</div>
        <div className="footer-inner">
          <Brand />
          <small>
            توهاتسو أرابيا — محركات توهاتسو البحرية في المملكة العربية السعودية
            <br />
            موثوقية يابانية منذ 1922
          </small>
        </div>
      </div>
    </footer>
  );
}
