import { waLink } from "@/lib/site";
import { Brand, WhatsAppIcon } from "./icons";

export function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Brand />
        <div className="nav-links">
          <a href="#engine">المحرك</a>
          <a href="#why">لماذا توهاتسو</a>
          <a href="#video">الفيديو</a>
          <a href="#specs">المواصفات</a>
          <a href="#contact">تواصل معنا</a>
        </div>
        <a className="nav-cta" href={waLink()} target="_blank" rel="noopener">
          <WhatsAppIcon />
          واتساب
        </a>
      </div>
    </nav>
  );
}

export function DepthMeter() {
  return (
    <div className="depth-meter">
      <span className="depth-label en">DEPTH</span>
      <div className="depth-track">
        <div className="depth-fill" />
      </div>
    </div>
  );
}

export function WhatsAppFab() {
  return (
    <a
      className="wa-fab"
      href={waLink()}
      target="_blank"
      rel="noopener"
      aria-label="تواصل عبر واتساب"
    >
      <WhatsAppIcon />
    </a>
  );
}
