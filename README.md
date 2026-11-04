# «Талшын» — сайт детского сада

Next.js (App Router), TypeScript, Tailwind CSS, Motion.

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck && npm run lint && npm run build
```

## Где что менять

| Что | Где |
| --- | --- |
| Телефон, ссылки, часы, 2GIS, `documentsUrl` | `src/data/site.ts` |
| Все тексты на казахском и русском | `src/data/translations.ts` |
| Десктопная / мобильная версия секций | `src/components/website/`, `src/components/mobile-website/` |
| Общие компоненты | `src/components/shared/` |

## Медиафайлы — `public/images`

Файлы находятся автоматически во время сборки, поэтому после добавления нужен новый деплой.

- `logo.png|webp|jpg|jpeg` — логотип. Если в нём уже есть слово «Талшын», поставьте `logoHasText: true` в `site.ts`.
- `main-page.jpg|jpeg|png|webp` — фото первого экрана.
- `main-page2.mp4|webm` или `main-page2.jpg|jpeg|png|webp` — медиа блока «О нас». Для видео можно добавить обложку `main-page2-poster.jpg`.
- `image1`, `image2`, … — галерея, в порядке номеров.

## Деплой на Vercel

Импортируйте репозиторий в Vercel, настройки по умолчанию подходят.
После подключения домена задайте `NEXT_PUBLIC_SITE_URL` (см. `.env.example`): от него зависят canonical и sitemap.
