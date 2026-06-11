/* Site-wide config for the Tohatsu 60 landing page. */

export const SITE = {
  // TODO: replace with the real Tohatsu Arabia WhatsApp number (digits only, intl format)
  whatsappNumber: "966500000000",
  defaultWaMessage: "السلام عليكم، أرغب بالاستفسار عن محرك توهاتسو 60 حصان.",
};

export function waLink(message?: string): string {
  const num = SITE.whatsappNumber.replace(/\D/g, "");
  const text = encodeURIComponent(message ?? SITE.defaultWaMessage);
  return `https://wa.me/${num}?text=${text}`;
}
