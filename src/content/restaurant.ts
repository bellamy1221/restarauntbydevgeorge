/**
 * Central restaurant configuration for the VINCENZO portfolio concept.
 * All contact and legal values are fictional demo-brand data — not a real venue.
 */

export const restaurant = {
  name: "VINCENZO",
  legalName: "VINCENZO",
  tagline: "Современная Италия. Без лишних слов.",
  shortDescription:
    "Концепт современного итальянского ресторана: сезонная кухня, точная подача и тёплая вечерняя атмосфера.",
  description:
    "VINCENZO — портфолио-концепт пространства вечернего ужина: сезонная итальянская кухня, внимательный сервис и спокойный свет. Демо-бренд для демонстрации дизайна и UX бронирования.",
  category: "Ресторан современной итальянской кухни",
  cuisine: "Contemporary Italian",
  priceRange: "$$$",
  currency: "₽",
  address: {
    street: "Патриаршие пруды, д. 7",
    city: "Москва",
    postalCode: "123001",
    country: "Россия",
    full: "Москва, Патриаршие пруды, д. 7",
    note: "Демо-адрес для портфолио-концепта.",
  },
  geo: {
    latitude: 55.7636,
    longitude: 37.5925,
    mapUrl: "https://yandex.ru/maps/?text=Москва%2C%20Патриаршие%20пруды",
    mapEmbedNote:
      "Карта демо-локации. В реальном проекте здесь будет встроенный виджет карт.",
  },
  contacts: {
    phone: "+7 (495) 555-01-23",
    phoneHref: "tel:+74955550123",
    email: "hello@vincenzo.demo",
    emailHref: "mailto:hello@vincenzo.demo",
    telegram: "@vincenzo_demo",
    telegramHref: "https://t.me/vincenzo_demo",
    whatsapp: "+7 900 555-01-23",
    whatsappHref: "https://wa.me/79005550123",
  },
  hours: [
    { days: "Вт — Чт", time: "12:00 — 23:00" },
    { days: "Пт — Сб", time: "12:00 — 00:00" },
    { days: "Вс", time: "13:00 — 22:00" },
    { days: "Пн", time: "Выходной" },
  ],
  hoursStructured: {
    tuesday: "12:00-23:00",
    wednesday: "12:00-23:00",
    thursday: "12:00-23:00",
    friday: "12:00-00:00",
    saturday: "12:00-00:00",
    sunday: "13:00-22:00",
    monday: "Closed",
  },
  parking:
    "Рядом городская парковка. Детали и валет-сервис — по запросу при бронировании.",
  dressCode:
    "Smart casual. Аккуратность и комфорт — без строгих формальных требований.",
  reservationPolicy:
    "В демо-форме заявка не подтверждает бронь автоматически. В реальном ресторане бронь подтверждается ответом заведения.",
  accessibility:
    "Доступность пространства уточняйте при связи — поможем выбрать удобный стол.",
  privateEvents: {
    capacityNote:
      "Вместимость и формат мероприятия уточняются индивидуально — от камерного ужина до аренды зала.",
    minGuests: "от 8 гостей",
    maxGuests: "до полного зала — по запросу",
  },
  social: [
    { label: "Instagram", href: "https://instagram.com/vincenzo.demo" },
    { label: "Telegram", href: "https://t.me/vincenzo_demo" },
  ],
  legal: {
    entity: "Демо-бренд для портфолио",
    privacy: "/privacy",
    terms: "/terms",
  },
  portfolioNote:
    "Концептуальный проект для портфолио. Не является действующим рестораном.",
  booking: {
    provider: "telegram" as
      | "none"
      | "yandex"
      | "restoplace"
      | "quickresto"
      | "opentable"
      | "sevenrooms"
      | "custom"
      | "telegram"
      | "email",
    integrationEndpoint: "/api/reservations",
    fallbackMessage:
      "Заявка отправлена. Для подтверждения свяжитесь с рестораном.",
    timeSlots: [
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "18:00",
      "18:30",
      "19:00",
      "19:30",
      "20:00",
      "20:30",
      "21:00",
      "21:30",
      "22:00",
    ],
    maxGuests: 12,
    minGuests: 1,
  },
  site: {
    /** Fallback only — runtime metadata uses getSiteUrl() */
    url: "https://vincenzo.demo",
    locale: "ru_RU",
  },
} as const;

export type Restaurant = typeof restaurant;
