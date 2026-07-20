/**
 * Image metadata and Unsplash credits.
 * All images are downloaded locally under /public/images.
 */

export type ImageMeta = {
  src: string;
  alt: string;
  credit: {
    photographer: string;
    url: string;
    source: "Unsplash";
    license: string;
  };
};

export const images = {
  heroDining: {
    src: "/images/hero/dining.jpg",
    alt: "Накрытый стол в тёплом вечернем свете",
    credit: {
      photographer: "Jay Wennington",
      url: "https://unsplash.com/photos/WnLSLCmK2qE",
      source: "Unsplash",
      license: "Unsplash License",
    },
  },
  heroDetail: {
    src: "/images/hero/detail.jpg",
    alt: "Интерьер ресторана с мягким освещением",
    credit: {
      photographer: "Emiliano Belet",
      url: "https://unsplash.com/photos/hCb3lIB8L8E",
      source: "Unsplash",
      license: "Unsplash License",
    },
  },
  pasta: {
    src: "/images/dishes/pasta.jpg",
    alt: "Свежая паста крупным планом",
    credit: {
      photographer: "Danijela Prijovic",
      url: "https://unsplash.com/photos/cZ0Z5XGg9xI",
      source: "Unsplash",
      license: "Unsplash License",
    },
  },
  bruschetta: {
    src: "/images/dishes/bruschetta.jpg",
    alt: "Брускетта с томатами",
    credit: {
      photographer: "Jennifer Schmidt",
      url: "https://unsplash.com/photos/fRLGQRH8-Yc",
      source: "Unsplash",
      license: "Unsplash License",
    },
  },
  meat: {
    src: "/images/dishes/meat.jpg",
    alt: "Мясное блюдо в тёплой подаче",
    credit: {
      photographer: "Alex Haney",
      url: "https://unsplash.com/photos/CAhjZmVk5H4",
      source: "Unsplash",
      license: "Unsplash License",
    },
  },
  seafood: {
    src: "/images/dishes/seafood.jpg",
    alt: "Морепродукты и сервировка",
    credit: {
      photographer: "Pablo Merchan Montes",
      url: "https://unsplash.com/photos/Orz90t6o0e4",
      source: "Unsplash",
      license: "Unsplash License",
    },
  },
  dessert: {
    src: "/images/dishes/dessert.jpg",
    alt: "Десерт с ягодами",
    credit: {
      photographer: "Brooke Lark",
      url: "https://unsplash.com/photos/08bOYnH_r_E",
      source: "Unsplash",
      license: "Unsplash License",
    },
  },
  salad: {
    src: "/images/dishes/salad.jpg",
    alt: "Свежий зелёный салат",
    credit: {
      photographer: "Anna Pelzer",
      url: "https://unsplash.com/photos/IGfIGP5ONV0",
      source: "Unsplash",
      license: "Unsplash License",
    },
  },
  room: {
    src: "/images/interior/room.jpg",
    alt: "Основной зал ресторана вечером",
    credit: {
      photographer: "Wil Stewart",
      url: "https://unsplash.com/photos/U3C79SeHa7k",
      source: "Unsplash",
      license: "Unsplash License",
    },
  },
  table: {
    src: "/images/interior/table.jpg",
    alt: "Детали сервировки стола",
    credit: {
      photographer: "Jay Wennington",
      url: "https://unsplash.com/photos/WnLSLCmK2qE",
      source: "Unsplash",
      license: "Unsplash License",
    },
  },
  bar: {
    src: "/images/interior/bar.jpg",
    alt: "Барная стойка и бутылки",
    credit: {
      photographer: "Clem Onojeghuo",
      url: "https://unsplash.com/photos/zlABb6Gke24",
      source: "Unsplash",
      license: "Unsplash License",
    },
  },
  kitchen: {
    src: "/images/interior/kitchen.jpg",
    alt: "Открытая кухня и работа команды",
    credit: {
      photographer: "Louis Hansel",
      url: "https://unsplash.com/photos/ViEBSoAd1_M",
      source: "Unsplash",
      license: "Unsplash License",
    },
  },
  privateRoom: {
    src: "/images/interior/private.jpg",
    alt: "Приватная зона для ужина",
    credit: {
      photographer: "Emiliano Belet",
      url: "https://unsplash.com/photos/hCb3lIB8L8E",
      source: "Unsplash",
      license: "Unsplash License",
    },
  },
  winePour: {
    src: "/images/wine/pour.jpg",
    alt: "Наливание красного вина в бокал",
    credit: {
      photographer: "Kelsey Knight",
      url: "https://unsplash.com/photos/udj2tD3WKsY",
      source: "Unsplash",
      license: "Unsplash License",
    },
  },
  wineGlasses: {
    src: "/images/wine/glasses.jpg",
    alt: "Бокалы вина на столе",
    credit: {
      photographer: "Kelsey Knight",
      url: "https://unsplash.com/photos/udj2tD3WKsY",
      source: "Unsplash",
      license: "Unsplash License",
    },
  },
  chefHands: {
    src: "/images/chef/hands.jpg",
    alt: "Руки шефа за работой на кухне",
    credit: {
      photographer: "Louis Hansel",
      url: "https://unsplash.com/photos/mPZQh_5HGzY",
      source: "Unsplash",
      license: "Unsplash License",
    },
  },
  cafe: {
    src: "/images/atmosphere/cafe.jpg",
    alt: "Камерная атмосфера зала",
    credit: {
      photographer: "Toa Heftiba",
      url: "https://unsplash.com/photos/Wn4Qf4_5d0U",
      source: "Unsplash",
      license: "Unsplash License",
    },
  },
  olive: {
    src: "/images/atmosphere/olive.jpg",
    alt: "Оливковое масло и ингредиенты",
    credit: {
      photographer: "Rahul",
      url: "https://unsplash.com/photos/8eJRTL2D8xM",
      source: "Unsplash",
      license: "Unsplash License",
    },
  },
  ingredients: {
    src: "/images/atmosphere/ingredients.jpg",
    alt: "Свежие ингредиенты на столе",
    credit: {
      photographer: "Calum Lewis",
      url: "https://unsplash.com/photos/8Nc_oQsc2qQ",
      source: "Unsplash",
      license: "Unsplash License",
    },
  },
  plates: {
    src: "/images/atmosphere/plates.jpg",
    alt: "Сервировка и посуда",
    credit: {
      photographer: "Pablo Merchan Montes",
      url: "https://unsplash.com/photos/Orz90t6o0e4",
      source: "Unsplash",
      license: "Unsplash License",
    },
  },
} as const satisfies Record<string, ImageMeta>;

export const copy = {
  hero: {
    eyebrow: "Ресторан современной итальянской кухни",
    title: "Вечер, в котором всё на своих местах",
    lead: "Сезонный продукт, точная паста, спокойный свет и сервис без спешки.",
  },
  story: {
    title: "Италия — это не спектакль",
    body: [
      "Мы готовим так, чтобы вкус говорил сам: хороший продукт, верное время на огне, аккуратная подача.",
      "VINCENZO — про теплоту гостеприимства и современную кухню без лишнего шума. Здесь важны детали: температура вина, ритм подачи, тишина между блюдами.",
    ],
  },
  signature: {
    title: "Блюда, с которых начинается вечер",
    lead: "Несколько позиций, которые особенно точно передают характер кухни. Полное меню — ниже.",
  },
  chef: {
    title: "Философия кухни",
    name: "Шеф VINCENZO",
    role: "Редактируемое имя и портрет можно добавить позже",
    body: [
      "Уважение к ингредиенту важнее эффекта. Мы берём знакомые итальянские формы и работаем с ними спокойно: сезон, баланс, чистый вкус.",
      "Подача сдержанная. Знакомое рядом с новым — без резких жестов, с вниманием к температуре и текстуре.",
    ],
  },
  atmosphere: {
    title: "Пространство вечера",
    lead: "Тёплый свет, тактильные материалы, открытая кухня и тихие углы для разговора.",
  },
  wine: {
    title: "Вино и бар",
    lead: "Итальянская карта, подобранная к меню, и спокойный aperitivo перед ужином.",
    points: [
      {
        title: "Сомелье-подбор",
        text: "Бокал или бутылка — под блюдо и настроение. Sample позиции в меню редактируются.",
      },
      {
        title: "Aperitivo",
        text: "Лёгкое начало: spritz, bitter, тихие игристые.",
      },
      {
        title: "Digestivo",
        text: "Мягкое завершение вечера — amaro и классика по запросу.",
      },
    ],
  },
  events: {
    title: "Частные ужины",
    lead: "Дни рождения, деловые встречи, предложения руки и сердца, небольшие корпоративные вечера.",
    items: [
      "Частичная или полная аренда зала",
      "Индивидуальный сет или адаптация меню",
      "Винное сопровождение",
      "Тихий формат без лишней постановки",
    ],
    cta: "Оставить запрос на событие",
  },
  reservation: {
    title: "Забронировать стол",
    lead: "Оставьте заявку — мы свяжемся для подтверждения. Без автоматического «бронь подтверждена».",
    note: "Интеграция с Yandex Booking, Restoplace, Quick Resto, OpenTable, SevenRooms, Telegram или email настраивается через конфигурацию.",
  },
  practical: {
    title: "Как нас найти",
  },
  final: {
    title: "До встречи за столом",
    lead: "Один спокойный вечер. Точная кухня. Тёплый свет.",
  },
} as const;
