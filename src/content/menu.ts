/**
 * Centralized menu data — sample editable content for a premium Italian restaurant.
 * Not verified real menu items. Replace names, descriptions, and prices as needed.
 */

export type DietaryTag = "veg" | "vegan" | "gf" | "pescatarian" | "contains_nuts";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  dietary?: DietaryTag[];
  seasonal?: boolean;
  featured?: boolean;
  image?: string;
  sensory?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  italian?: string;
  description?: string;
  items: MenuItem[];
};

export const dietaryLabels: Record<DietaryTag, string> = {
  veg: "Вегетарианское",
  vegan: "Веганское",
  gf: "Без глютена",
  pescatarian: "Рыба / морепродукты",
  contains_nuts: "Содержит орехи",
};

export const menuCategories: MenuCategory[] = [
  {
    id: "antipasti",
    name: "Antipasti",
    italian: "Antipasti",
    description: "Лёгкое начало вечера.",
    items: [
      {
        id: "burrata",
        name: "Буррата с томатами datterini",
        description: "Тёплый хлеб, оливковое масло, базилик.",
        price: 1490,
        dietary: ["veg"],
        featured: true,
        image: "/images/dishes/bruschetta.jpg",
        sensory: "Мягкая, тёплая, с чистой кислотностью томата.",
      },
      {
        id: "vitello",
        name: "Vitello tonnato",
        description: "Тонко нарезанная телятина, соус из тунца, каперсы.",
        price: 1690,
        image: "/images/dishes/meat.jpg",
        sensory: "Прохладное, шелковистое, с морской нотой.",
      },
      {
        id: "carpaccio",
        name: "Карпаччо из говядины",
        description: "Руккола, пармезан, лимон, оливковое масло.",
        price: 1590,
        dietary: ["gf"],
      },
      {
        id: "olives",
        name: "Маринованные оливки и маринованные овощи",
        description: "Домская заготовка сезона.",
        price: 690,
        dietary: ["vegan", "gf"],
        seasonal: true,
      },
    ],
  },
  {
    id: "crudo",
    name: "Crudo",
    description: "Свежесть и точность нарезки.",
    items: [
      {
        id: "tonno",
        name: "Тунец с цитрусом и фенхелем",
        description: "Масло, морская соль, лёгкая горечь цедры.",
        price: 1890,
        dietary: ["pescatarian", "gf"],
        featured: true,
        image: "/images/dishes/seafood.jpg",
        sensory: "Холодное, чистое, с лёгкой сладостью рыбы.",
      },
      {
        id: "scallop",
        name: "Морской гребешок",
        description: "Зелёное яблоко, юдзу, оливковое масло.",
        price: 2190,
        dietary: ["pescatarian", "gf"],
        seasonal: true,
      },
    ],
  },
  {
    id: "pasta",
    name: "Pasta",
    description: "Свежая паста ручной работы.",
    items: [
      {
        id: "cacio",
        name: "Cacio e pepe",
        description: "Pecorino, чёрный перец, вода пасты.",
        price: 1290,
        dietary: ["veg"],
        featured: true,
        image: "/images/dishes/pasta.jpg",
        sensory: "Кремовая, пряная, с плотной аль денте текстурой.",
      },
      {
        id: "ragout",
        name: "Pappardelle с рагу из утки",
        description: "Медленное тушение, розмарин, пармезан.",
        price: 1790,
        featured: true,
        image: "/images/dishes/pasta.jpg",
        sensory: "Глубокое, тёплое, с мягкой мясной сладостью.",
      },
      {
        id: "vongole",
        name: "Spaghetti alle vongole",
        description: "Вонголе, чеснок, белое вино, петрушка.",
        price: 1890,
        dietary: ["pescatarian"],
      },
      {
        id: "funghi",
        name: "Тальятелле с лесными грибами",
        description: "Сливочное масло, тимьян, пармезан.",
        price: 1590,
        dietary: ["veg"],
        seasonal: true,
      },
    ],
  },
  {
    id: "secondi",
    name: "Secondi",
    description: "Основные блюда.",
    items: [
      {
        id: "branzino",
        name: "Сибас на гриле",
        description: "Лимон, оливковое масло, сезонные овощи.",
        price: 2490,
        dietary: ["pescatarian", "gf"],
        featured: true,
        image: "/images/dishes/seafood.jpg",
        sensory: "Дымное, сочное, с чистым морским вкусом.",
      },
      {
        id: "costoletta",
        name: "Costoletta di vitello",
        description: "Телячья котлета, салат, лимон.",
        price: 3290,
        image: "/images/dishes/meat.jpg",
        sensory: "Хрустящая корочка, нежное мясо.",
      },
      {
        id: "pollo",
        name: "Цыплёнок al mattone",
        description: "Травы, чеснок, сок лимона.",
        price: 2190,
        dietary: ["gf"],
      },
    ],
  },
  {
    id: "contorni",
    name: "Contorni",
    description: "Гарниры и овощи.",
    items: [
      {
        id: "patate",
        name: "Картофель al forno",
        description: "Розмарин, морская соль.",
        price: 590,
        dietary: ["vegan", "gf"],
      },
      {
        id: "cicoria",
        name: "Цикорий с чесноком",
        description: "Оливковое масло, перец чили.",
        price: 690,
        dietary: ["vegan", "gf"],
        seasonal: true,
      },
      {
        id: "insalata",
        name: "Зелёный салат",
        description: "Сезонные листья, лимонная заправка.",
        price: 790,
        dietary: ["vegan", "gf"],
        image: "/images/dishes/salad.jpg",
      },
    ],
  },
  {
    id: "dolci",
    name: "Dolci",
    description: "Десерты.",
    items: [
      {
        id: "tiramisu",
        name: "Тирамису",
        description: "Маскарпоне, эспрессо, какао.",
        price: 990,
        dietary: ["veg"],
        featured: true,
        image: "/images/dishes/dessert.jpg",
        sensory: "Мягкое, кофейное, с лёгкой горечью какао.",
      },
      {
        id: "panna",
        name: "Panna cotta",
        description: "Ваниль, ягодный сезон.",
        price: 890,
        dietary: ["veg", "gf"],
        seasonal: true,
      },
      {
        id: "gelato",
        name: "Джелато дня",
        description: "Уточняйте у официанта.",
        price: 690,
        dietary: ["veg"],
      },
    ],
  },
  {
    id: "vini",
    name: "Vini",
    description: "Курируемая итальянская карта. Позиции — sample content.",
    items: [
      {
        id: "prosecco-glass",
        name: "Prosecco — бокал",
        description: "Лёгкое, сухое. Регион и производитель — по карте зала.",
        price: 690,
      },
      {
        id: "chianti-glass",
        name: "Toscana rosso — бокал",
        description: "Средняя плотность, красные ягоды, мягкие танины.",
        price: 890,
      },
      {
        id: "etna-bottle",
        name: "Etna Bianco — бутылка",
        description: "Вулканическая минеральность. Демо-позиция карты.",
        price: 6900,
        seasonal: true,
      },
    ],
  },
  {
    id: "cocktail",
    name: "Cocktail",
    description: "Aperitivo и авторские коктейли.",
    items: [
      {
        id: "negroni",
        name: "Negroni",
        description: "Gin, vermouth, bitter. Классика без лишнего.",
        price: 890,
      },
      {
        id: "spritz",
        name: "Spritz",
        description: "Горьковато-цитрусовый aperitivo.",
        price: 790,
      },
      {
        id: "house",
        name: "VINCENZO aperitivo",
        description: "Сезонный домский коктейль — состав уточняйте в зале.",
        price: 990,
        seasonal: true,
      },
    ],
  },
];

export const featuredDishes = menuCategories
  .flatMap((c) => c.items)
  .filter((i) => i.featured);

export function formatPrice(price: number, currency = "₽"): string {
  return `${price.toLocaleString("ru-RU")} ${currency}`;
}
