export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function formatPhoneDisplay(phone: string) {
  return phone;
}
