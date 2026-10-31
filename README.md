# EPILAB — сайт студии электроэпиляции (Kielce)

Next.js 16 + TypeScript + Tailwind CSS 4 + Lucide. Полностью статический сайт (`output: "export"`):
без сервера и без базы данных — `npm run build` собирает готовый HTML в папку `out/`,
её можно залить на любой хостинг (GitHub Pages, Netlify, обычный FTP).

## Команды
- `npm run dev` — локальная разработка (http://localhost:3000)
- `npm run build` — сборка в `out/`
- `npm run lint` — проверка ESLint

## Где править контент
| Что | Файл |
| --- | --- |
| Телефон, адрес, Instagram, карта, часы работы | `src/content/site.ts` |
| Цены | `src/content/pricing.ts` |
| Отзывы (пустые записи = плейсхолдеры) | `src/content/reviews.ts` |
| Все тексты сайта (PL) | `src/i18n/dictionaries/pl.ts` |
| Расписание и шаг слотов для бронирования | `src/lib/availability.ts` |
| Фото | `public/images/` + список в `src/content/site.ts` |
| Цвета, шрифты, радиусы, тени | `src/app/globals.css` (`@theme`) |

Всё, что в **[квадратных скобках]**, — плейсхолдеры: заменить реальными данными перед публикацией.

## Формы (без бэкенда)
По умолчанию контактная форма и бронирование работают в демо-режиме (валидация, состояния, экран
подтверждения, но данные никуда не уходят — сайт честно об этом сообщает). Чтобы заявки реально
отправлялись, задайте при сборке URL любого приёмника JSON (Formspree, вебхук Make/Zapier, API системы записи):

```
NEXT_PUBLIC_CONTACT_ENDPOINT=https://...
NEXT_PUBLIC_BOOKING_ENDPOINT=https://...
NEXT_PUBLIC_SITE_URL=https://ваш-домен.pl   # для canonical, sitemap, Open Graph
```

## Переводы (UK / EN)
Тексты типизированы по `pl.ts`. Чтобы добавить язык: скопировать словарь в `uk.ts`/`en.ts`,
зарегистрировать в `src/i18n/index.ts` и перенести страницы в `src/app/[locale]/`
(подробности — в `src/i18n/config.ts`).

## Деплой на GitHub Pages
`npm run deploy` — собирает сайт с `basePath=/epilab` и выкладывает `out/` в ветку `gh-pages`.
Адрес: https://sosqska.github.io/epilab/
