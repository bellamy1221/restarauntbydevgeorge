export const navigation = [
  { id: "about", label: "О ресторане", href: "#about" },
  { id: "menu", label: "Меню", href: "#menu" },
  { id: "atmosphere", label: "Атмосфера", href: "#atmosphere" },
  { id: "wine", label: "Вино", href: "#wine" },
  { id: "events", label: "События", href: "#events" },
  { id: "contacts", label: "Контакты", href: "#contacts" },
] as const;

export const reserveCta = {
  label: "Забронировать стол",
  href: "#reservation",
} as const;

export const menuCta = {
  label: "Смотреть меню",
  href: "#menu",
} as const;
