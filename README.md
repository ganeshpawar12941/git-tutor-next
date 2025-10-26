# GIT-TUTOR (Next.js)

This is the Next.js migration of your static site.

## Structure
- `app/` App Router pages (`/`, `/about`, `/contact`, `/courses`, `/login`, `/signup`, `/profile`, `/payment`, `/summary`, `/home`).
- `app/layout.js` global `<head>` links and `<body>` wrapper.
- `app/globals.css` global styles (migrated from `index.css`).
- `components/ClientBehaviors.jsx` client-only interactions (nav scroll class, FAQ toggle, menu open/close, Swiper init).
- `public/` Place all images/assets (e.g., `logo.png`, `s2.png`, `web.webp`, etc.).

## Migrate assets
Move images from your old folder into `public/`. Example mapping:
- `logo.png` -> `public/logo.png`
- `s2.png` -> `public/s2.png`
- `web.webp` -> `public/web.webp`
- `datavis.png` -> `public/datavis.png`
- `c.png` -> `public/c.png`
- testimonials: `dhruv.jpeg`, `amit.jpeg`, `paarth.jpeg`, `darshu.jpeg`, `aptu.jpeg` -> `public/`

Update/add any others similarly.

## Run locally
1. Install deps:
   ```bash
   npm install
   ```
2. Start dev server:
   ```bash
   npm run dev
   ```
3. Open http://localhost:3000

## Notes
- External CSS/JS (Font Awesome, Unicons, Swiper CSS) are linked in `app/layout.js`.
- Swiper JS is loaded via `<Script>` in `components/ClientBehaviors.jsx`.
- Links currently use plain `<a>`; you can switch to `next/link` later.
- To port other HTML pages fully, copy content from your existing `.html` files into their corresponding `app/<route>/page.js`.

## Tailwind CSS
Tailwind is pre-configured. Files added:
- `tailwind.config.js`
- `postcss.config.js`
- Tailwind directives added at the top of `app/globals.css`.

Install dev deps (if not already):
```bash
npm install
# or if you prefer explicit
npm install -D tailwindcss postcss autoprefixer
```

Restart the dev server after install so the `@tailwind` at-rule warnings disappear.

Use utility classes directly in JSX, for example:
```jsx
<h1 className="text-3xl font-bold text-white">GIT-TUTOR</h1>
```
