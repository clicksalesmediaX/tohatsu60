import type { NextRequest } from "next/server";
import { META_GRAPH_VERSION, META_WHATSAPP_EVENT } from "@/lib/meta";

/**
 * Meta Conversions API (server-side) endpoint.
 *
 * The browser Pixel and this route fire the SAME event with the SAME `event_id`,
 * so Meta deduplicates them into a single conversion. This route adds the
 * server signals the browser can't reliably send (real client IP, user agent).
 */

type CapiBody = {
  eventId?: string;
  eventName?: string;
  eventSourceUrl?: string;
  content?: string;
  fbp?: string;
  fbc?: string;
};

function clientIp(req: NextRequest): string | undefined {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip")?.trim() || undefined;
}

export async function POST(req: NextRequest) {
  const pixelId =
    process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;

  if (!pixelId || !token) {
    // Misconfigured server — fail soft so the browser Pixel still works.
    return Response.json(
      { ok: false, error: "Meta CAPI is not configured on the server." },
      { status: 200 },
    );
  }

  let body: CapiBody;
  try {
    body = (await req.json()) as CapiBody;
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const userData: Record<string, string> = {};
  const ip = clientIp(req);
  const ua = req.headers.get("user-agent") || undefined;
  // Prefer first-party cookies (most reliable), fall back to what the client sent.
  const fbp = req.cookies.get("_fbp")?.value || body.fbp;
  const fbc = req.cookies.get("_fbc")?.value || body.fbc;

  if (ip) userData.client_ip_address = ip;
  if (ua) userData.client_user_agent = ua;
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;

  const payload = {
    data: [
      {
        event_name: body.eventName || META_WHATSAPP_EVENT,
        event_time: Math.floor(Date.now() / 1000),
        event_id: body.eventId,
        action_source: "website",
        event_source_url: body.eventSourceUrl,
        user_data: userData,
        ...(body.content
          ? { custom_data: { content_name: body.content, content_category: "whatsapp" } }
          : {}),
      },
    ],
    ...(process.env.META_TEST_EVENT_CODE
      ? { test_event_code: process.env.META_TEST_EVENT_CODE }
      : {}),
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/${META_GRAPH_VERSION}/${pixelId}/events?access_token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    const result = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error("[meta-capi] Graph API error", result);
      return Response.json({ ok: false, error: result }, { status: 502 });
    }
    return Response.json({ ok: true, result });
  } catch (err) {
    console.error("[meta-capi] request failed", err);
    return Response.json({ ok: false, error: "Upstream request failed." }, { status: 502 });
  }
}
