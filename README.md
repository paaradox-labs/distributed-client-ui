# MERN Space - Client UI

A food ordering client built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and **shadcn/ui**.

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Styling | Tailwind CSS v4 + tw-animate-css |
| Components | shadcn/ui (Radix primitives) |
| Icons | lucide-react |
| Language | TypeScript |
| Package Manager | pnpm |

## Features Built So Far

- **Header** — sticky top navigation with logo, restaurant selector dropdown, menu/orders links, cart icon with badge, phone number, logout CTA, and mobile hamburger menu
- **Hero Section** — full-width hero with headline, subtitle, CTA button, and pizza image (responsive two-column layout)
- **Category Tabs** — Pizza / Beverages tabs powered by shadcn Tabs primitive
- **Product Cards** — grid of product cards with image, name, description, price, and "Choose" button
- **Cart Badge** — cart icon with item count indicator in the header

## Project Structure

```
src/
├── app/
│   ├── (home)/
│   │   ├── page.tsx              # Home page (hero + category tabs + product grid)
│   │   └── components/
│   │       └── ProductCard.tsx    # Product card component
│   ├── layout.tsx                 # Root layout (Manrope font + Header)
│   ├── globals.css                # Tailwind imports + theme variables
│   └── favicon.ico
├── components/
│   ├── custom/
│   │   └── header.tsx             # Site header (sticky nav)
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── select.tsx
│       └── tabs.tsx
└── lib/
    └── utils.ts                   # cn() utility (clsx + tailwind-merge)
```

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **pnpm** (recommended) or npm

### Clone and Run

```bash
# Clone the repository
git clone https://github.com/paaradox-labs/distributed-client-ui.git
cd distributed-client-ui

# Install dependencies (using pnpm — recommended)
pnpm install

# Or if you prefer npm
npm install

# Start the development server
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build
pnpm start
```

### Lint

```bash
pnpm lint
```

## Available Scripts

| Script | Command |
|---|---|
| `dev` | `next dev` — start dev server |
| `build` | `next build` — production build |
| `start` | `next start` — start production server |
| `lint` | `eslint` — run linter |

## Color Theme

The project uses a warm orange-primary theme. Key variables are defined in `globals.css`:

- **Primary**: `hsl(24.6 95% 53.1%)` — the orange used for CTAs, active states, and accents
- **Background**: `hsl(15, 33%, 98%)` — a warm off-white
- **Font**: Manrope (Google Fonts) via `next/font`

Dark mode variables are also defined and ready to use via the `.dark` class.

## Deployment

The project is deployed on **Hetzner VPS** at [Pizza Store](https://pizza.adityavyas.com).
