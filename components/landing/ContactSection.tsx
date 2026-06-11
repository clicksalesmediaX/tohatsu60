"use client";

import { useEffect, useRef, useState } from "react";
import { waLink } from "@/lib/site";
import { Brand, WhatsAppIcon } from "./icons";

const CITIES = ["جدة", "جازان", "ينبع", "أملج", "الليث", "القنفذة", "الدمام", "القطيف", "الجبيل", "أخرى"];
const USAGES = ["صيد", "نزهة بحرية", "عمل / نقل", "أخرى"];

export function ContactSection() {
  const [sent, setSent] = useState(false);
  const sentTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (sentTimer.current) clearTimeout(sentTimer.current);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const lines = [
      "طلب عرض سعر — محرك توهاتسو 60 (MFS60A)",
      "الاسم: " + (d.get("name") || "—"),
      "الجوال: " + (d.get("phone") || "—"),
      "المدينة: " + (d.get("city") || "—"),
      "القارب: " + (d.get("boat") || "—"),
      "الاستخدام: " + (d.get("usage") || "—"),
    ];
    if (d.get("notes")) lines.push("ملاحظات: " + d.get("notes"));
    window.open(waLink(lines.join("\n")), "_blank");
    setSent(true);
    if (sentTimer.current) clearTimeout(sentTimer.current);
    sentTimer.current = setTimeout(() => setSent(false), 6000);
  };

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
              اترك بياناتك وبيتواصل معك فريق توهاتسو أرابيا بعرض سعر وتفاصيل التركيب.
            </p>
            <a className="wa-card" href={waLink()} target="_blank" rel="noopener">
              <span className="wa-ic">
                <WhatsAppIcon />
              </span>
              <span>
                <b>تفضّل الواتساب؟</b>
                <span>كلمنا مباشرة — نرد عليك بسرعة</span>
              </span>
            </a>
          </div>
          <form className="form-card" id="lead-form" data-reveal onSubmit={handleSubmit}>
            <h3>اطلب عرض سعر</h3>
            <p className="form-sub">
              عند الإرسال تنفتح رسالة واتساب جاهزة ببياناتك — أرسلها وخلاص.
            </p>
            <div className="form-row">
              <div className="field">
                <label htmlFor="f-name">الاسم</label>
                <input id="f-name" name="name" type="text" placeholder="اسمك الكريم" required />
              </div>
              <div className="field">
                <label htmlFor="f-phone">رقم الجوال</label>
                <input id="f-phone" name="phone" type="tel" placeholder="05XXXXXXXX" dir="ltr" required />
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="f-city">المدينة</label>
                <select id="f-city" name="city">
                  {CITIES.map((c) => (
                    <option value={c} key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-usage">الاستخدام</label>
                <select id="f-usage" name="usage">
                  {USAGES.map((u) => (
                    <option value={u} key={u}>{u}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="field">
              <label htmlFor="f-boat">نوع القارب وطوله</label>
              <input id="f-boat" name="boat" type="text" placeholder="مثال: قارب فايبر 23 قدم" />
            </div>
            <div className="field">
              <label htmlFor="f-notes">ملاحظات (اختياري)</label>
              <textarea id="f-notes" name="notes" placeholder="أي تفاصيل إضافية…" />
            </div>
            <button className="btn btn-red" type="submit">
              أرسل عبر واتساب
            </button>
            <p className={`form-success${sent ? " show" : ""}`}>
              تم تجهيز رسالتك — أكمل الإرسال من واتساب ✓
            </p>
            <p className="form-hint">
              بياناتك تُرسل مباشرة عبر واتساب ولا تُخزَّن في أي مكان آخر.
            </p>
          </form>
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
