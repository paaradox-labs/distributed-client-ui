# MERN Space - Client UI

A multi-tenant pizza ordering frontend built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and **shadcn/ui**.

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Styling | Tailwind CSS v4 + tw-animate-css |
| Components | shadcn/ui (Radix primitives) |
| Icons | lucide-react |
| Language | TypeScript |
| State (Client) | Redux Toolkit (cart) |
| State (Server) | TanStack React Query |
| Forms | react-hook-form + zod |
| HTTP | axios |
| Package Manager | pnpm |

## Features

- **Multi-tenant support** — restaurant selector dropdown persists selection via localStorage + cookie; all URLs carry `?restaurantId=`
- **Authentication** — JWT-based login/register; HTTP-only cookies for tokens; auto token refresh via `jose`-based expiry scheduler
- **Product Catalog** — category tabs (Pizza / Beverages) with product cards showing image, name, description, and price
- **Product Customization** — modal with size/crust radio groups, optional toppings (with individual pricing), real-time price calculation, duplicate item detection
- **Cart** — Redux-based cart synced to localStorage; add/remove/change quantity; item identity via SHA-256 hash for dedup; badge count in header
- **Checkout** — saved address selection (or add new address), payment mode (Card / Cash), coupon code verification (with discount display), order summary with taxes and delivery charges
- **Responsive Design** — mobile hamburger menu, responsive grid layouts
- **SEO** — metadata, OpenGraph image for social sharing

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero section + product listing |
| `/login` | Login with email/password + redirect support |
| `/register` | Registration form |
| `/cart` | Cart overview with item management |
| `/checkout` | Checkout form with addresses, payment, coupon, and order summary |

## Project Structure

```
src/
├── app/
│   ├── (home)/
│   │   ├── page.tsx                  # Home page
│   │   └── components/
│   │       ├── product-card.tsx
│   │       ├── product-list.tsx
│   │       ├── product-modal.tsx
│   │       ├── topping-card.tsx
│   │       └── topping-list.tsx
│   ├── cart/
│   │   ├── cartItems/
│   │   │   ├── cartItem.tsx
│   │   │   ├── cartItems.tsx
│   │   │   └── qtyChanger.tsx
│   │   └── page.tsx
│   ├── checkout/
│   │   ├── components/
│   │   │   ├── addAddress.tsx
│   │   │   ├── customerForm.tsx
│   │   │   └── orderSummary.tsx
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   ├── api/auth/
│   │   ├── accessToken/route.ts
│   │   └── refresh/route.ts
│   ├── layout.tsx                    # Root layout
│   ├── globals.css                   # Tailwind + theme variables
│   ├── StoreProvider.tsx
│   └── QueryProvider.tsx
├── components/
│   ├── custom/
│   │   ├── header.tsx
│   │   ├── cart-counter.tsx
│   │   ├── cart-counter-wrapper.tsx
│   │   ├── logout.tsx
│   │   ├── mobile-menu.tsx
│   │   ├── refresher.tsx
│   │   └── tenant-select.tsx
│   └── ui/                           # shadcn/ui primitives
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── radio-group.tsx
│       ├── select.tsx
│       ├── sonner.tsx
│       ├── tabs.tsx
│       └── textarea.tsx
└── lib/
    ├── actions/
    │   ├── login.ts
    │   ├── logout.ts
    │   └── register.ts
    ├── hooks/
    │   └── useTotal.tsx
    ├── http/
    │   └── api.ts
    ├── store/
    │   ├── store.ts
    │   ├── hooks/index.ts
    │   └── features/cart/cartSlice.ts
    ├── session.ts
    ├── types/index.ts
    └── utils.ts
```

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **pnpm** (recommended) or npm

### Environment Variables

Create a `.env.local` file:

```
BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

### Install and Run

```bash
pnpm install
pnpm dev
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
| `dev` | `next dev` |
| `build` | `next build` |
| `start` | `next start` |
| `lint` | `eslint` |

## Color Theme

The project uses a warm orange-primary theme. Key variables are defined in `globals.css`:

- **Primary**: `hsl(24.6 95% 53.1%)` — orange for CTAs, active states, accents
- **Background**: `hsl(15, 33%, 98%)` — warm off-white
- **Font**: Manrope (Google Fonts) via `next/font`

Dark mode variables are also defined and ready via the `.dark` class.

## Deployment

The project is deployed on **Hetzner VPS** at [Pizza Store](https://pizza.adityavyas.com).

### Build Config

- `next.config.ts` sets `output: "standalone"` (for Docker/deployment)
- Remote images allowed from `mernspace-backend-project.s3.us-east-1.amazonaws.com`
