# VINCENZO

Сайт премиального ресторана современной итальянской кухни.

**Креативная концепция:** «Свет ужина» — тёплая вечерняя палитра (espresso, linen, olive, burgundy), редакционная типографика, кинематографичная фотография, спокойный motion в ритме ужина.

## Стек

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- GSAP + `@gsap/react`
- Lenis (smooth scroll, отключается при `prefers-reduced-motion`)
- Motion package available; primary animation via GSAP/CSS

## Быстрый старт

```bash
pnpm install
pnpm dev
```

Откройте [http://localhost:3000](http://localhost:3000).

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
pnpm start
```

## Редактирование контента

Все ключевые данные вынесены из компонентов:

| Файл | Содержимое |
|------|------------|
| `src/content/restaurant.ts` | Адрес, контакты, часы, бронь, политика, события |
| `src/content/menu.ts` | Категории, блюда, цены, dietary tags |
| `src/content/copy.ts` | Тексты секций |
| `src/content/faq.ts` | FAQ |
| `src/content/navigation.ts` | Навигация и CTA |
| `src/content/images.ts` | Метаданные и кредиты изображений |

Меню и цены — **sample content**, не верифицированное реальное меню.

Адрес, телефон, email и гео — **placeholders**. Замените перед продакшеном.

## Бронирование / интеграции

Эндпоинт: `POST /api/reservations` (`src/app/api/reservations/route.ts`).

По умолчанию `restaurant.booking.provider = "none"`:

- заявка **не** подтверждается автоматически;
- UI показывает: «Заявка подготовлена. Для подтверждения свяжитесь с рестораном.»

Поддерживаемые точки расширения (нужны реальные credentials):

- Yandex Booking
- Restoplace
- Quick Resto
- OpenTable
- SevenRooms
- custom API
- Telegram / email

Переключите `provider` в `restaurant.ts` и реализуйте ветку в API route.

## Визуальные ассеты

Локальные копии в `public/images/`. Источник: [Unsplash](https://unsplash.com) (Unsplash License).

См. `src/content/images.ts` и `docs/IMAGE_CREDITS.md`.

## Бренд

- Wordmark: типографический `VINCENZO` (Cormorant Garamond)
- Sans UI: Manrope (кириллица)
- Mono акценты: JetBrains Mono
- Палитра: paper / ink / olive / burgundy / terracotta / metal — без «чёрно-золотого» шаблона

## Структура секций

1. Hero  
2. О ресторане  
3. Signature dishes  
4. Меню  
5. Философия кухни  
6. Атмосфера  
7. Вино и бар  
8. Частные события  
9. Бронирование  
10. Контакты / практика  
11. FAQ  
12. Финальный CTA + Footer  

## Accessibility

- Семантические landmarks
- Клавиатурная навигация и focus states
- `prefers-reduced-motion`
- Подписи полей формы, ARIA для меню/FAQ

## Заметки

- OG image: `src/app/opengraph-image.tsx`
- Favicon: `src/app/icon.tsx`
- Schema.org Restaurant: `src/components/seo/JsonLd.tsx` (placeholder-данные)
