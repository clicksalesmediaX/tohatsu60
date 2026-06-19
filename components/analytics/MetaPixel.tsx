"use client";

import { useEffect } from "react";
import Script from "next/script";
import { META_PIXEL_ID, META_WHATSAPP_EVENT } from "@/lib/meta";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

/** Matches every WhatsApp deep link we render (wa.me + api/web.whatsapp.com). */
const WA_SELECTOR =
  'a[href*="wa.me/"], a[href*="api.whatsapp.com"], a[href*="web.whatsapp.com"]';

function readCookie(name: string): string | undefined {
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"),
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // Fallback for non-secure contexts where crypto.randomUUID is unavailable.
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Fire one deduplicated lead event across Pixel (browser) and CAPI (server).
 * Both share the same eventID so Meta counts a single conversion.
 */
function trackWhatsAppLead(href: string) {
  const eventId = uuid();

  let content: string | undefined;
  try {
    content = new URL(href).searchParams.get("text") || undefined;
  } catch {
    // ignore malformed hrefs
  }

  // 1) Browser Pixel
  window.fbq?.(
    "track",
    META_WHATSAPP_EVENT,
    { content_name: content, content_category: "whatsapp" },
    { eventID: eventId },
  );

  // 2) Server-side Conversions API (keepalive so it survives the new tab opening)
  try {
    fetch("/api/meta/capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        eventId,
        eventName: META_WHATSAPP_EVENT,
        eventSourceUrl: window.location.href,
        content,
        fbp: readCookie("_fbp"),
        fbc: readCookie("_fbc"),
      }),
    }).catch(() => {});
  } catch {
    // never let tracking break the click
  }
}

export function MetaPixel() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as Element | null;
      const link = target?.closest?.(WA_SELECTOR) as HTMLAnchorElement | null;
      if (link) trackWhatsAppLead(link.href);
    }
    // Capture phase so we still record the click even if something stops propagation.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
