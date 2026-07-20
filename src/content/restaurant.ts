/**
 * Central restaurant configuration — edit here to update site-wide details.
 * Values are editable placeholders until real venue data is confirmed.
 */

export const restaurant = {
  name: "VINCENZO",
  legalName: "VINCENZO",
  tagline: "Современная Италия. Без лишних слов.",
  shortDescription:
    "Современный итальянский ресторан с сезонной кухней, точной подачей и тёплой вечерней атмосферой.",
  description:
    "VINCENZO — пространство вечернего ужина: сезонная итальянская кухня, внимательный сервис и спокойный свет. Мы работаем с продуктом, временем и деталями — без театральности, с уважением к вкусу.",
  category: "Ресторан современной итальянской кухни",
  cuisine: "Contemporary Italian",
  priceRange: "$$$",
  currency: "₽",
  address: {
    street: "ул. Примерная, 12",
    city: "Москва",
    postalCode: "119019",
    country: "Россия",
    full: "Москва, ул. Примерная, 12",
    note: "Адрес — редактируемый placeholder. Замените на фактический перед запуском.",
  },
  geo: {
    latitude: 55.7558,
    longitude: 37.6173,
    mapUrl: "https://yandex.ru/maps/",
    mapEmbedNote:
      "Подключите Яндекс.Карты или Google Maps iframe, когда будет подтверждён адрес.",
  },
  contacts: {
    phone: "+7 (495) 000-00-00",
    phoneHref: "tel:+74950000000",
    email: "hello@vincenzo.example",
    emailHref: "mailto:hello@vincenzo.example",
    telegram: "@vincenzo_reserve",
    telegramHref: "https://t.me/",
    whatsapp: "+7 900 000-00-00",
    whatsappHref: "https://wa.me/79000000000",
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
    "Рядом есть городская парковка. Детали и валет-сервис уточняйте при бронировании.",
  dressCode:
    "Smart casual. Мы ценим аккуратность и комфорт — без строгих формальных требований.",
  reservationPolicy:
    "Бронь считается подтверждённой только после ответа ресторана. В пиковые вечера рекомендуем резервировать стол заранее.",
  accessibility:
    "Доступность пространства уточняйте по телефону — мы поможем с выбором удобного стола.",
  privateEvents: {
    capacityNote:
      "Вместимость и формат мероприятия уточняются индивидуально (редактируемый placeholder).",
    minGuestsPlaceholder: "от 8 гостей",
    maxGuestsPlaceholder: "до полного зала — по запросу",
  },
  social: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "Telegram", href: "https://t.me/" },
  ],
  legal: {
    entity: "ООО «VINCENZO» — placeholder",
    inn: "ИНН: 0000000000",
    privacy: "/privacy",
    terms: "/terms",
  },
  booking: {
    provider: "none" as
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
      "Заявка подготовлена. Для подтверждения свяжитесь с рестораном.",
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
    url: "https://vincenzo.example",
    locale: "ru_RU",
    ogImage: "/og.png",
  },
} as const;

export type Restaurant = typeof restaurant;
