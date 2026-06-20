# Veine — Tiles, Marble & Stone Marketplace (Demo)

This is a working **frontend demo** of the two-sided marketplace described in `BUILD_BRIEF.md` — it implements the buyer shopping experience and the seller dashboard/listing flow with real interactivity and animation, running on mock in-memory data (no backend yet).

## What's included

**Buyer side**
- Animated home page (parallax hero, scroll reveals, category/room navigation)
- Product listing page with faceted filters (category, color, size, material, pattern, style), live-updating result counts, and sort controls
- Product detail page with zoom gallery, variant switching, a "fly to cart" animation, a sq.ft → boxes coverage calculator, specs table and reviews
- Cart grouped by seller, with animated quantity steppers
- Multi-step animated checkout flow
- Animated order-tracking timeline
- Buyer sign-up/login flow (mobile OTP-style + delivery location capture)

**Seller side**
- Seller sign-up / onboarding flow (business details, GSTIN, warehouse)
- Seller dashboard with animated revenue chart, low-stock alerts, and a product table
- A full 12-step "Add Product" wizard implementing every field group from the spec (Basic Info, Media, Description, Pricing, Inventory, Variants, Specifications, Shipping, Seller Info, Compliance, SEO, Review) with a live preview pane

**Shared**
- A small design system (see `src/index.css` — palette, type scale, motion tokens) themed around stone/marble materials
- Reusable animated components: number-rolling counters, fly-to-cart, 3D-tilt product cards with a "glaze sheen" hover, animated filter facets, SVG draw-on order timeline

## Running it

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To produce a production build:

```bash
npm run build
npm run preview
```

## What's mocked / not yet wired up

This is a frontend-only demo to validate the interaction design — it is **not** connected to a real backend, database, or payment gateway:

- All products, sellers, and reviews live in `src/data/*.ts` (in-memory mock data)
- Cart state lives in React context and resets on page reload (no persistence)
- Login/signup forms don't actually authenticate — they're UI flows only
- The "Add Product" wizard doesn't persist new products into the catalog
- Images are placeholder photos (picsum.photos) standing in for real product photography
- Search/filtering runs client-side over the small mock dataset; a real deployment should swap in a server-side faceted search engine (Algolia/Meilisearch/Elasticsearch) per `BUILD_BRIEF.md`

## Next steps toward a real build

See `BUILD_BRIEF.md` for the full architecture recommendation (Next.js + Postgres + a dedicated search engine + payments), database schema, and suggested build order. This demo validates steps 1 and 9 from that document (design system + animation language) ahead of backend work.

## Tech stack used here

- Vite + React + TypeScript
- Tailwind CSS v4
- Framer Motion (all animation)
- React Router
