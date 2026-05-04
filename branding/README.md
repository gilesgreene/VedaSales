# Selva Brand Assets

## Files Included

| File | Use |
|------|-----|
| `logo-dark.svg` | Main logo on dark backgrounds (nav, hero) |
| `logo-light.svg` | Logo on light backgrounds |
| `icon-dark.svg` | Icon mark only — sidebar, app icon |
| `favicon-32.svg` | Browser favicon 32×32 |
| `favicon-16.svg` | Browser favicon 16×16 |
| `apple-touch-icon.svg` | iOS home screen icon 180×180 |
| `og-image.svg` | Social share / Open Graph image 1200×630 |
| `brand-tokens.css` | All CSS variables + component snippets |

---

## Quick Setup (Next.js)

### 1. Add fonts to layout.tsx
```tsx
import { Sora, DM_Mono } from 'next/font/google'

const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--vs-font-sans',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--vs-font-mono',
})

export default function RootLayout({ children }) {
  return (
    <html className={`${sora.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

### 2. Add CSS tokens to globals.css
Copy the entire contents of `brand-tokens.css` into your `globals.css`.

### 3. Add favicons to app/layout.tsx metadata
```tsx
export const metadata = {
  title: 'Selva — Ecommerce Intelligence',
  description: 'Find winning products before they peak.',
  icons: {
    icon: [
      { url: '/favicon-16.svg', sizes: '16x16', type: 'image/svg+xml' },
      { url: '/favicon-32.svg', sizes: '32x32', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.svg',
  },
  openGraph: {
    images: [{ url: '/og-image.svg', width: 1200, height: 630 }],
  },
}
```

### 4. Place SVG files
Copy all `.svg` files into your `public/` folder:
```
public/
  logo-dark.svg
  logo-light.svg
  icon-dark.svg
  favicon-16.svg
  favicon-32.svg
  apple-touch-icon.svg
  og-image.svg
```

### 5. Use logo in your navbar
```tsx
import Image from 'next/image'

export function Navbar() {
  return (
    <nav>
      <Image src="/logo-dark.svg" alt="Selva" width={160} height={38} />
    </nav>
  )
}
```

---

## Color Reference

| Token | Hex | Usage |
|-------|-----|-------|
| `--vs-bg` | `#0B0F1A` | Page background |
| `--vs-surface` | `#0D1B2A` | Cards, panels |
| `--vs-surface-2` | `#112236` | Hover states |
| `--vs-accent` | `#4EEBC0` | Primary accent |
| `--vs-accent-dim` | `#1ECFA0` | CTA buttons |
| `--vs-blue` | `#5B8DEF` | Charts, links |
| `--vs-amber` | `#F5A623` | Rising trends |
| `--vs-red` | `#F06060` | Declining trends |
| `--vs-text` | `#E5E9F5` | Primary text |
| `--vs-text-muted` | `#7B8FB7` | Secondary text |

---

## Typography

- **Display / Headings:** Sora 700, letter-spacing: -0.03em
- **Body:** Sora 400, line-height: 1.7
- **Labels / Data / Scores:** DM Mono 400-500, letter-spacing: 0.08em uppercase

Both fonts are free on Google Fonts.
