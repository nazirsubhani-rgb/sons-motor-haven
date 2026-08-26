export function buildWhatsAppUrl(phoneInternational: string, message: string) {
  // WhatsApp requires international format WITHOUT "+" or leading zeros.
  // Example for UK number 02046468471 => 442046468471
  return `https://wa.me/${phoneInternational}?text=${encodeURIComponent(message)}`;
}

export function openWhatsAppChat(phoneInternational: string, message: string) {
  const url = buildWhatsAppUrl(phoneInternational, message);

  // Some browsers (and some embedded/in-app browsers) block popups.
  // Try opening a new tab; if blocked, fall back to same-tab navigation.
  const win = window.open(url, "_blank", "noopener,noreferrer");
  if (!win) window.location.assign(url);
}
