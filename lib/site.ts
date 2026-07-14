/* Site-wide config for the Tohatsu MFS150A landing page. */

export const SITE = {
  // Tohatsu Arabia WhatsApp number — digits only, international format (no leading 0).
  whatsappNumber: "966543699901",
  defaultWaMessage: "السلام عليكم، أرغب بالاستفسار عن محرك توهاتسو MFS150A بقوة 150 حصان.",
};

export function waLink(message?: string): string {
  const num = SITE.whatsappNumber.replace(/\D/g, "");
  const text = encodeURIComponent(message ?? SITE.defaultWaMessage);
  return `https://wa.me/${num}?text=${text}`;
}
