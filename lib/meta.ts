/* Shared config for Meta Pixel + Conversions API (CAPI). */

/** Graph API version used by the server-side CAPI route. */
export const META_GRAPH_VERSION = "v21.0";

/**
 * Standard event fired when a visitor taps any WhatsApp CTA.
 * "Lead" is Meta's recommended optimization event for a wa.me funnel;
 * switch to "Contact" here if you prefer to optimize for that instead.
 */
export const META_WHATSAPP_EVENT = "Lead";

/**
 * Public Pixel ID. Exposed to the browser via NEXT_PUBLIC_, with the pasted
 * ID as a fallback so the Pixel still loads if the env var is missing.
 */
export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID || "2014722516585852";
