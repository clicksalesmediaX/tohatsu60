"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

import { Nav, DepthMeter, WhatsAppFab } from "./Nav";
import { Hero, Marquee } from "./Hero";
import { EngineChapter } from "./EngineChapter";
import { WhySection } from "./WhySection";
import { VideoSection } from "./VideoSection";
import { FishersSection } from "./FishersSection";
import { SpecsSection } from "./SpecsSection";
import { ContactSection, Footer } from "./ContactSection";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ---------- word-split helpers (mutate static headings once) ---------- */
function splitWords(el: HTMLElement) {
  if (el.dataset.split) return;
  el.dataset.split = "1";
  el.classList.add("reveal-words");
  const nodes = Array.from(el.childNodes);
  let html = "";
  const wrap = (text: string) =>
    text
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => `<span class="w"><span>${w}</span></span>`)
      .join(" ");
  nodes.forEach((n) => {
    if (n.nodeType === Node.TEXT_NODE) {
      html += wrap(n.textContent ?? "") + " ";
    } else if (n.nodeType === Node.ELEMENT_NODE) {
      const elNode = n as HTMLElement;
      const cls = elNode.className ? ` class="${elNode.className}"` : "";
      html += `<span${cls}>${wrap(elNode.textContent ?? "")}</span> `;
    }
  });
  el.innerHTML = html;
}

function revealWords(el: HTMLElement, vars?: gsap.TweenVars) {
  splitWords(el);
  const targets = el.querySelectorAll(".w > span");
  gsap.set(targets, { yPercent: 145 });
  return gsap.to(targets, {
    yPercent: 0,
    duration: 0.9,
    stagger: 0.055,
    ease: "power3.out",
    ...vars,
  });
}

function counter(
  el: Element,
  target: number,
  opts: { from?: number; duration?: number; ease?: string; decimals?: number } = {}
) {
  const obj = { v: opts.from ?? 0 };
  const decimals = opts.decimals ?? 0;
  return gsap.to(obj, {
    v: target,
    duration: opts.duration ?? 1.6,
    ease: opts.ease ?? "power2.out",
    onUpdate: () => {
      el.textContent = obj.v.toFixed(decimals);
    },
  });
}

export default function TohatsuLanding() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const root = rootRef.current;
      if (!root || !contextSafe) return;
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const $ = <T extends Element = HTMLElement>(sel: string) =>
        Array.from(root.querySelectorAll<T>(sel));

      /* mobile: ignore URL-bar show/hide resizes so pins don't jump */
      ScrollTrigger.config({ ignoreMobileResize: true });

      /* ---------- smooth scroll (Lenis) — pointer devices only; native
         touch scrolling is smoother and cheaper on phones ---------- */
      const finePointer = window.matchMedia("(pointer: fine)").matches;
      let lenis: Lenis | null = null;
      let lenisRaf: ((time: number) => void) | null = null;
      if (!prefersReduced && finePointer) {
        lenis = new Lenis({ duration: 1.15, smoothWheel: true });
        lenis.on("scroll", ScrollTrigger.update);
        lenisRaf = (time) => lenis?.raf(time * 1000);
        gsap.ticker.add(lenisRaf);
        gsap.ticker.lagSmoothing(0);
      }

      /* ---------- nav state + depth meter ---------- */
      const nav = root.querySelector(".nav");
      ScrollTrigger.create({
        start: 10,
        end: "max",
        onToggle: (self) => nav?.classList.toggle("scrolled", self.isActive),
      });
      gsap.to(".depth-fill", {
        height: "100%",
        ease: "none",
        scrollTrigger: { trigger: document.body, start: "top top", end: "max", scrub: 0.4 },
      });

      /* ---------- hero intro ---------- */
      if (!prefersReduced) {
        const heroTl = gsap.timeline({ delay: 0.15 });
        const heroH1 = root.querySelector<HTMLElement>(".hero h1");
        heroTl
          .from(".nav", { yPercent: -120, duration: 0.8, ease: "power3.out" }, 0)
          .from(".hero .kicker", { opacity: 0, x: 30, duration: 0.8, ease: "power3.out" }, 0.2)
          .from(".hero-sub", { opacity: 0, y: 24, duration: 0.9, ease: "power3.out" }, 0.7)
          .from(".hero-ctas .btn", { opacity: 0, y: 24, stagger: 0.1, duration: 0.7, ease: "power3.out" }, 0.85)
          .from(".hero-stats", { opacity: 0, y: 20, duration: 0.8 }, 1.05)
          .from(".hero-visual", { opacity: 0, scale: 0.92, duration: 1.2, ease: "power3.out" }, 0.4)
          .from(".hero-ghost", { opacity: 0, xPercent: -8, duration: 1.6, ease: "power2.out" }, 0.3);
        if (heroH1) heroTl.add(revealWords(heroH1), 0.1);

        $(".hero-stats .hstat b span[data-count]").forEach((el, i) => {
          const t = parseFloat(el.getAttribute("data-count") ?? "0");
          const d = parseInt(el.getAttribute("data-decimals") ?? "0", 10);
          heroTl.add(counter(el, t, { decimals: d, duration: 1.8 }), 1.1 + i * 0.08);
        });

        /* levitation */
        gsap.to(".hero-float", { y: -16, duration: 2.6, yoyo: true, repeat: -1, ease: "sine.inOut" });
        gsap.to(".hero-engine-frame .ring", { rotation: 360, duration: 40, repeat: -1, ease: "none" });
      } else {
        /* reduced motion: show final numbers immediately */
        $("[data-count]").forEach((el) => {
          const t = parseFloat(el.getAttribute("data-count") ?? "0");
          const d = parseInt(el.getAttribute("data-decimals") ?? "0", 10);
          el.textContent = t.toFixed(d);
        });
      }

      /* hero parallax on scroll */
      gsap.to(".hero-ghost", {
        yPercent: 24,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.4 },
      });
      gsap.to(".hero-visual", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.4 },
      });

      /* hero photo: periodic light sweep + inner depth parallax */
      if (!prefersReduced) {
        gsap.fromTo(
          ".hero-shine",
          { xPercent: 0 },
          { xPercent: 480, duration: 1.8, ease: "power2.inOut", repeat: -1, repeatDelay: 2.6, delay: 1.6 }
        );
      }
      gsap.fromTo(
        ".hero-photo",
        { scale: 1.1, yPercent: -3 },
        {
          scale: 1,
          yPercent: 3,
          ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.4 },
        }
      );

      /* hero waves draw */
      $<SVGPathElement>(".hero-waves path").forEach((p, i) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(p, { strokeDashoffset: 0, duration: 2.4, delay: 0.6 + i * 0.25, ease: "power2.inOut" });
        if (!prefersReduced) {
          gsap.to(p, { y: i % 2 ? 8 : -8, duration: 3 + i, yoyo: true, repeat: -1, ease: "sine.inOut" });
        }
      });

      /* ---------- marquee (seamless infinite loop, velocity reactive) ---------- */
      const marqueeEl = root.querySelector<HTMLElement>(".marquee");
      const track = root.querySelector<HTMLElement>(".marquee-track");
      let marqueeTick: ((time: number, delta: number) => void) | null = null;
      let marqueeDisposed = false;
      const setupMarquee = contextSafe(() => {
        if (marqueeDisposed || !marqueeEl || !track) return;
        const base = track.querySelector<HTMLElement>(".marquee-chunk");
        if (!base) return;
        /* collapse back to one chunk, then clone enough copies so the row
           always spans at least 2× the viewport — guarantees no empty gap
           after a chunk scrolls off, at any screen width */
        while (track.children.length > 1) track.removeChild(track.lastChild as ChildNode);
        const chunkW = base.offsetWidth;
        if (!chunkW) return;
        const copies = Math.max(2, Math.ceil((marqueeEl.clientWidth * 2) / chunkW) + 1);
        for (let i = 1; i < copies; i += 1) track.appendChild(base.cloneNode(true));

        let x = 0;
        const speed = prefersReduced ? 0 : 55; /* px per second */
        let velo = 0;
        ScrollTrigger.create({
          trigger: document.body,
          start: 0,
          end: "max",
          onUpdate: (self) => {
            velo = self.getVelocity() / 130;
          },
        });
        marqueeTick = (_t, delta) => {
          const boost = gsap.utils.clamp(-700, 700, velo);
          velo *= 0.9;
          x -= (speed + Math.abs(boost)) * (delta / 1000);
          /* wrap by exactly one chunk width → the next copy lands seamlessly */
          if (x <= -chunkW) x = x % chunkW;
          gsap.set(track, { x });
        };
        gsap.ticker.add(marqueeTick);
      });
      /* measure after fonts load so the Arabic chunk width is correct */
      if (typeof document !== "undefined" && document.fonts && document.fonts.status !== "loaded") {
        document.fonts.ready.then(setupMarquee);
      } else {
        setupMarquee();
      }

      /* ---------- engine chapter: pinned scrub ---------- */
      const stage = root.querySelector(".engine-stage");
      if (stage) {
        const rpmValue = root.querySelector(".rpm-value");
        const rpmNeedle = root.querySelector(".rpm-needle");
        const rpmArc = root.querySelector<SVGPathElement>(".rpm-arc-fill");
        const arcLen = rpmArc ? rpmArc.getTotalLength() : 0;
        if (rpmArc) gsap.set(rpmArc, { strokeDasharray: arcLen, strokeDashoffset: arcLen });

        const rpmState = { v: 650 };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".engine-chapter",
            start: "top top",
            end: "+=320%",
            pin: ".engine-stage",
            scrub: 0.6,
            anticipatePin: 1,
          },
        });

        tl.fromTo(".engine-ghost60", { scale: 1.25, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2 }, 0)
          .fromTo(".engine-center", { scale: 0.78, y: 80 }, { scale: 1, y: 0, duration: 1.2 }, 0)
          .fromTo(".engine-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, 0.15)
          .to(".engine-orbit", { rotation: 200, duration: 5.8, ease: "none" }, 0);

        $(".callout").forEach((co, i) => {
          const at = 1.1 + i * 0.95;
          tl.fromTo(co, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.55 }, at).fromTo(
            co.querySelector(".c-line"),
            { scaleX: 0 },
            { scaleX: 1, duration: 0.5 },
            at + 0.1
          );
          const num = co.querySelector("[data-count]");
          if (num) {
            const target = parseFloat(num.getAttribute("data-count") ?? "0");
            const dec = parseInt(num.getAttribute("data-decimals") ?? "0", 10);
            const st = { v: 0 };
            tl.to(
              st,
              {
                v: target,
                duration: 0.8,
                ease: "power1.out",
                onUpdate: () => {
                  num.textContent = st.v.toFixed(dec);
                },
              },
              at
            );
          }
        });

        /* rpm sweep across the whole pin */
        tl.to(
          rpmState,
          {
            v: 6000,
            duration: 5.2,
            ease: "power1.inOut",
            onUpdate: () => {
              if (rpmValue) rpmValue.textContent = String(Math.round(rpmState.v / 10) * 10);
              const p = (rpmState.v - 650) / (6000 - 650);
              if (rpmNeedle) gsap.set(rpmNeedle, { rotation: -90 + p * 180, svgOrigin: "60 62" });
              if (rpmArc) gsap.set(rpmArc, { strokeDashoffset: arcLen * (1 - p) });
            },
          },
          0.6
        );

        tl.fromTo(".rpm-dial", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, 0.5);
        tl.to({}, { duration: 0.6 }); /* settle beat at the end */

        /* 360° spin scrubbed across the whole pinned chapter — alpha WebP
           frames drawn to canvas (true transparency on every device) */
        const spinCanvas = root.querySelector<HTMLCanvasElement>(".engine-spin-canvas");
        if (spinCanvas) {
          const SPIN_FRAMES = 46;
          /* lighter frame set on small screens */
          const spinDir = window.matchMedia("(max-width: 640px)").matches
            ? "/images/spin/sm"
            : "/images/spin";
          const ctx = spinCanvas.getContext("2d");
          const frames: HTMLImageElement[] = [];
          let drawn = -1;
          const draw = (i: number) => {
            const img = frames[i];
            if (!ctx || !img?.complete || !img.naturalWidth) return;
            if (spinCanvas.width !== img.naturalWidth) {
              spinCanvas.width = img.naturalWidth;
              spinCanvas.height = img.naturalHeight;
            }
            ctx.clearRect(0, 0, spinCanvas.width, spinCanvas.height);
            ctx.drawImage(img, 0, 0);
            drawn = i;
          };
          /* defer the ~1MB sequence until the browser is idle so it never
             competes with hero paint / first scroll */
          const loadFrames = () => {
            for (let i = 0; i < SPIN_FRAMES; i += 1) {
              const img = new Image();
              img.src = `${spinDir}/frame-${String(i).padStart(3, "0")}.webp`;
              if (i === 0) img.onload = () => draw(0);
              frames.push(img);
            }
          };
          if ("requestIdleCallback" in window) {
            window.requestIdleCallback(loadFrames, { timeout: 1200 });
          } else {
            setTimeout(loadFrames, 350);
          }
          const spinState = { f: 0 };
          tl.to(
            spinState,
            {
              f: SPIN_FRAMES - 1,
              duration: tl.duration(),
              ease: "none",
              onUpdate: () => {
                const i = Math.round(spinState.f);
                if (i !== drawn) draw(i);
              },
            },
            0
          );
        }
      }

      /* ---------- generic section reveals ---------- */
      $("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 46,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 84%" },
        });
      });
      $("[data-reveal-group]").forEach((group) => {
        gsap.from(group.children, {
          opacity: 0,
          y: 50,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: group, start: "top 82%" },
        });
      });
      $("h2[data-words]").forEach((h) => {
        splitWords(h);
        const targets = h.querySelectorAll(".w > span");
        gsap.set(targets, { yPercent: 145 });
        gsap.to(targets, {
          yPercent: 0,
          duration: 0.85,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: { trigger: h, start: "top 85%" },
        });
      });

      /* heritage 1922 counter */
      const heritageYear = root.querySelector(".heritage-year b span");
      if (heritageYear) {
        ScrollTrigger.create({
          trigger: ".heritage",
          start: "top 80%",
          once: true,
          onEnter: () => {
            if (prefersReduced) heritageYear.textContent = "1922";
            else counter(heritageYear, 1922, { from: 1850, duration: 2 });
          },
        });
      }

      /* video frame subtle scale-in */
      gsap.fromTo(
        ".video-frame",
        { scale: 0.94 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: ".video-frame", start: "top 95%", end: "top 35%", scrub: 0.5 },
        }
      );

      /* fisher shots parallax — desktop only (avoids transform thrash on mobile) */
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        $(".fisher-shot").forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 ? -34 : 34,
            ease: "none",
            scrollTrigger: { trigger: ".fishers-grid", start: "top bottom", end: "bottom top", scrub: 0.6 },
          });
        });
      });

      /* specs rows cascade */
      gsap.from(".spec-row", {
        opacity: 0,
        x: 40,
        duration: 0.7,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: ".specs-table", start: "top 80%" },
      });

      /* ---------- anchor links via lenis ---------- */
      const onAnchorClick = (e: Event) => {
        const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
        if (!a) return;
        const target = document.querySelector<HTMLElement>(a.getAttribute("href") ?? "");
        if (!target) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(target, { offset: -70 });
        else
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - 70,
            behavior: "smooth",
          });
      };
      root.addEventListener("click", onAnchorClick);

      return () => {
        marqueeDisposed = true;
        root.removeEventListener("click", onAnchorClick);
        if (marqueeTick) gsap.ticker.remove(marqueeTick);
        if (lenisRaf) gsap.ticker.remove(lenisRaf);
        lenis?.destroy();
      };
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef}>
      <div className="grain" />
      <Nav />
      <DepthMeter />
      <Hero />
      <Marquee />
      <EngineChapter />
      <WhySection />
      <VideoSection />
      <FishersSection />
      <SpecsSection />
      <ContactSection />
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
