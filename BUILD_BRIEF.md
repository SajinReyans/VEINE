# BUILD PROMPT: Tiles & Marbles B2C/B2B Marketplace

> Hand this entire document to a developer or an AI coding tool (e.g. Claude Code, v0, Cursor, Bolt) as the build brief. It defines a two-sided marketplace (Buyers + Sellers) for tiles, marbles, stone slabs, and related accessories, with a strong emphasis on rich, interactive, motion-driven UI — not just fade-ins.

---

## 1. PROJECT OVERVIEW

Build a **two-sided e-commerce marketplace** called for now "TileMarbleMart" (placeholder name) connecting:

- **Buyers** — homeowners, contractors, architects, interior designers who browse, filter, and purchase tiles, marbles, stone slabs, and installation accessories.
- **Sellers / Merchants** — showrooms, manufacturers, and distributors who list and manage their own product catalog, inventory, pricing, and orders through a dedicated seller dashboard.

The platform is a single web application with two distinct authenticated experiences (Buyer Portal and Seller/Merchant Portal), sharing one product database and one design system, but with separate login flows, dashboards, and permissions.

### Core Principle
Every screen should feel **alive and tactile** — this is explicitly NOT a static catalog site. Motion should communicate state, guide attention, and make heavy-content pages (large grids of tiles/slabs) feel light and responsive. See Section 9 for detailed animation requirements.

---

## 2. RECOMMENDED TECH STACK

| Layer | Recommendation | Why |
|---|---|---|
| Frontend | React (Next.js, App Router) + TypeScript | SSR for SEO on product pages, fast routing |
| Styling | Tailwind CSS + CSS variables for theming | Rapid, consistent design system |
| Animation | Framer Motion (React) + GSAP (for complex scroll/3D sequences) | Framer for component-level transitions, GSAP for scrollytelling/timeline work |
| 3D / 360° viewer | Three.js (react-three-fiber) | For 360° product spins and slab texture close-ups |
| State management | Zustand or Redux Toolkit | Cart, filters, auth state |
| Backend | Node.js (NestJS or Express) or Next.js API routes | REST or GraphQL API |
| Database | PostgreSQL (relational — orders, inventory, pricing integrity) | Strong consistency for commerce |
| Search/Filter engine | Elasticsearch or Algolia/Meilisearch | Fast multi-tag faceted filtering at scale |
| Image storage/CDN | Cloudinary or S3 + CloudFront | Image transforms (zoom, crop) on the fly |
| Auth | NextAuth.js / Clerk / Auth0, with separate Buyer and Seller roles & JWT claims | Two-sided RBAC |
| Payments | Razorpay or Stripe (India-first: Razorpay) | COD + online payment + escrow-style payout to sellers |
| Maps/Location | Google Maps Places API | Delivery address capture, seller showroom locator |
| Notifications | Firebase Cloud Messaging / Twilio (SMS + WhatsApp) | Order status, OTP login |
| Hosting | Vercel (frontend) + Railway/Render/AWS (backend, DB) | |

(A developer/tool may substitute equivalents — this table communicates intent, not lock-in.)

---

## 3. USER ROLES & AUTHENTICATION

### 3.1 Buyer Account
Sign-up / login via mobile number + OTP (primary) or email + password (secondary), plus optional Google/Apple OAuth.

Required onboarding fields:
- Full name
- Mobile number (verified via OTP)
- Email (optional but recommended)
- Default delivery address (street, city, state, pincode, landmark) — captured via Google Maps autocomplete with a draggable pin confirmation step
- Buyer type (Individual / Contractor / Architect-Designer / Builder) — used later for B2B pricing tiers and bulk-order UX
- Profile photo (optional)

### 3.2 Seller / Merchant Account
Separate sign-up flow, requires verification before going live (manual or semi-automated approval queue).

Required onboarding fields:
- Business / Store name
- Owner / contact person name
- Mobile number (OTP verified) + business email
- GSTIN / business registration number
- Business address + showroom/warehouse location(s) (multiple warehouses supported)
- Business type (Manufacturer / Distributor / Showroom / Retailer)
- Bank account / payout details
- Store logo + storefront banner image
- Categories they intend to sell in (used to pre-filter their product-creation form)
- Document upload (GST certificate, business proof) for verification
- Return policy text (store-level default, overridable per product)

### 3.3 Roles Summary
- `buyer` — browse, cart, checkout, order tracking, reviews, Q&A
- `seller` — product CRUD, inventory, order fulfillment, store analytics
- `admin` (internal) — seller approval, dispute resolution, platform-wide catalog moderation, featured-product curation

---

## 4. BUYER-SIDE FEATURES

### 4.1 Core Pages
1. **Landing / Home** — animated hero, category showcase, featured products, new arrivals carousel, "shop by room" (Bathroom / Kitchen / Outdoor / Living Room) visual navigation, trending searches.
2. **Category Listing Page (PLP)** — grid of products with sticky filter sidebar (desktop) / bottom-sheet filter (mobile).
3. **Product Detail Page (PDP)** — image gallery with zoom, 360° spin viewer, variant selector (size/color/finish), price, seller info card, specifications table, reviews & Q&A, "frequently bought with" (e.g., tile + adhesive + grout bundle), delivery estimate by pincode.
4. **Search Results Page** — same filter system as PLP, plus search-term highlighting and "did you mean" suggestions.
5. **Cart** — line items grouped by seller (since multiple sellers may be in one cart), quantity stepper with live price recalculation, coverage-area calculator (sq ft → boxes needed, tile-specific).
6. **Checkout** — address selection/creation, delivery slot selection, payment method, order summary, coupon application.
7. **Order Tracking** — animated status timeline (Placed → Confirmed → Packed → Shipped → Out for Delivery → Delivered), live map for last-mile if available.
8. **Buyer Dashboard** — order history, saved addresses, wishlist, saved/recently viewed products, reviews written, support tickets.
9. **Seller Storefront Page** — public page per seller showing their full catalog, ratings, business details (buyers can browse "by showroom").
10. **Wishlist / Compare** — side-by-side comparison table for up to 4 products (especially useful for tiles — comparing size, finish, price/box).

### 4.2 Search & Filtering System

**Category Taxonomy** (each product can carry multiple category tags):

*Tiles & Slabs*
- Floor tiles
- Wall tiles
- Vitrified tiles
- Porcelain tiles
- Ceramic tiles
- Glossy tiles
- Matte tiles
- Wooden finish tiles
- Marble finish tiles
- Mosaic tiles
- Outdoor / parking tiles
- Elevation tiles
- Bathroom tiles
- Kitchen tiles
- Subway tiles
- Large format slabs
- Marble slabs
- Granite slabs
- Quartz slabs
- Natural stone slabs
- Stone cladding

*Accessories*
- Tile adhesive
- Grout
- Tile spacers
- Tile trims / edge profiles
- Tile cleaner
- Sealants
- Waterproofing chemicals
- Tile leveling systems
- Stone polish products
- Tile cutting tools

> Implementation note: model categories as a many-to-many `product_categories` join table (not a single enum field), since one SKU (e.g. a glossy, marble-finish, large-format floor tile) legitimately belongs to 4+ categories simultaneously. Filtering should be tag-based (faceted search), not a strict tree.

**Product Detail Filters (facets):**
- Color
- Size
- Material
- Pattern
- Style
- Capacity
- Weight
- Dimensions

**Shopping Preference / Sort Controls:**
- New arrivals
- Best sellers
- Featured products
- Sort by relevance (default)
- Price: low → high
- Price: high → low
- Avg. customer review
- Newest arrivals

**UX requirement:** Filters must be combinable (multi-select within a facet, AND across facets), update result counts live before applying ("Glossy (124)"), and show active filters as removable chips above the grid. Use an instant-search pattern — results update without full page reload as filters are toggled.

---

## 5. SELLER-SIDE FEATURES

### 5.1 Core Pages
1. **Seller Dashboard / Home** — sales overview, pending orders count, low-stock alerts, revenue chart (animated, real-time-feeling).
2. **Product Management** — list of all products with quick-edit, bulk actions (bulk price update, bulk stock update via CSV import/export), clone-product (for fast variant creation).
3. **Add/Edit Product Form** — multi-step form (see Section 6 for full field schema), with live preview pane showing exactly how the PDP will render as the seller fills it in.
4. **Inventory Management** — per-warehouse stock levels, low-stock threshold alerts, stock history log.
5. **Order Management** — incoming orders queue, status update workflow (Confirm → Pack → Ship → Mark Delivered), printable invoice/shipping label generation.
6. **Pricing & Offers** — bulk discount rules (e.g., 5% off orders above 500 sq ft), coupon creation, festival sale scheduling.
7. **Analytics** — best-selling products, traffic-to-conversion funnel, customer demographics, review sentiment summary.
8. **Store Profile & Settings** — store branding, business details, payout/bank details, return policy editor, support contact.
9. **Reviews & Q&A Inbox** — respond to customer questions and reviews directly.

### 5.2 Add Product Form — Full Field Schema

Structure this as a **multi-step wizard** (not one giant form) with a persistent progress sidebar and autosave-as-draft. Suggested steps map directly to these groups:

**Step 1 — Basic Information**
- Product title
- Brand name
- Product category (multi-select from taxonomy in 4.2)
- Model name / model number
- SKU / seller code
- Product ID (UPC / EAN / ISBN) — optional

**Step 2 — Media**
- Product images (multi-upload, drag-to-reorder, min 3 / max 10 recommended)
- Videos (optional, upload or YouTube link)
- 360° view (optional — sequence of images stitched client-side into a spin viewer)

**Step 3 — Description**
- Short description (used in search snippets/cards, char-limited)
- Bullet point highlights (3–6 key selling points)
- Full product description (rich text)
- Features & benefits (structured list, e.g. "Slip-resistant", "Frost-proof")

**Step 4 — Pricing**
- Selling price
- MRP / List price
- Discount percentage (auto-calculated from above, editable)
- Offers / coupons (link existing or create new)
- Pricing unit clarifier specific to this vertical: price per box / per sq ft / per piece / per slab (critical — tiles are sold by box/sq ft, not just "each")

**Step 5 — Inventory**
- Stock quantity
- Availability status (In Stock / Out of Stock / Made to Order / Pre-Order)
- Warehouse location (select from seller's registered warehouses)

**Step 6 — Variants**
- Size
- Color
- Style
- Material
- Pack quantity (e.g., tiles per box)
- Each variant combination gets its own price/stock override if needed

**Step 7 — Specifications**
- Dimensions (L × W × Thickness)
- Weight (per box/per piece)
- Capacity (where relevant, e.g. coverage per box in sq ft)
- Technical specifications (water absorption %, PEI rating, slip resistance/R-rating, breaking strength — domain-specific tile/stone specs)
- Compatibility (e.g., "suitable for underfloor heating", "exterior use rated")

**Step 8 — Shipping**
- Delivery regions (pincode/zone selection or map-based radius)
- Shipping weight
- Shipping charges (flat / calculated / free above threshold)
- Delivery time (estimate range)

**Step 9 — Seller Information** (mostly pre-filled from seller profile, confirm/override per listing)
- Seller name
- Store name
- Business details
- Return policy (product-level override of store default)

**Step 10 — Compliance**
- Warranty (duration + terms)
- Certifications (ISI, CE, GreenPro, etc. — file upload)
- Safety information
- Country of origin

**Step 11 — SEO / Discovery**
- Search keywords (customer-facing, shown as tags)
- Backend keywords (hidden, search-index only)
- Search terms / synonyms

**Step 12 — Review & Publish**
- Live preview of the full PDP exactly as a buyer will see it
- Validation summary (required fields missing, image count warnings)
- Save as Draft / Submit for Listing

**Customer-facing Metrics** (system-generated, NOT seller-editable, displayed read-only on seller's product view):
- Ratings (aggregate)
- Reviews (list, with seller reply capability)
- Questions & Answers
- Bestseller rank (within category)

---

## 6. ANIMATION & INTERACTION REQUIREMENTS

This is a stated priority — the site should feel **interactive and alive**, going well beyond simple fade/slide-ins. Concrete direction for the builder:

### 6.1 Global Motion Language
- Define a consistent easing curve (e.g., `cubic-bezier(0.22, 1, 0.36, 1)` — "expressive ease-out") and use it everywhere for unity.
- Micro-interactions on every interactive element: buttons scale/depress on click, cards lift with a soft shadow + slight tilt (3D `rotateX/rotateY` on mouse position) on hover, icons morph between states (e.g., heart icon "pops" with a small particle burst when added to wishlist).
- Page transitions: route changes use shared-element transitions (e.g., a product card image morphs/expands into the PDP hero image rather than a hard cut — Framer Motion's `layoutId` pattern).

### 6.2 Homepage
- Hero section with parallax-scrolling tile/marble imagery (layers move at different scroll speeds).
- Category tiles that visually "tilt and shine" on hover, simulating light reflecting off a glossy tile surface (CSS gradient mask following cursor position).
- Scroll-triggered reveal sequences (GSAP ScrollTrigger) — e.g., as the user scrolls past "Shop by Room," room imagery builds itself piece by piece (floor tiles animate into place first, then walls, then fixtures) — a literal animated "room being tiled."

### 6.3 Product Listing Page
- Filter panel: facets expand/collapse with smooth height animation; selecting a filter triggers a brief shimmer/skeleton-loading state on the grid before results animate in with a staggered fade+rise (each card offset by ~30–50ms).
- Live result count ticks up/down with a number-rolling animation as filters change.
- "Quick view" on hover/long-press opens a modal that scales up from the card's exact position (shared layout transition), not a generic centered modal.

### 6.4 Product Detail Page
- Image gallery: smooth drag-to-zoom and pinch-to-zoom, with a magnifier-lens effect on desktop hover.
- 360° viewer: drag-to-rotate spin (Three.js or sprite-sequence), with inertia/momentum on release.
- Variant selection (color/size swatches): selecting a different color swatch triggers a cross-fade + subtle texture-swap animation on the main image, not an instant cut.
- "Add to Cart" button: on click, a small animated icon of the product flies from the button into the cart icon in the header (classic but effective "fly to cart" animation), and the cart icon bounces/badge-counts up.
- Sticky "Add to Cart" bar that slides up from the bottom once the user scrolls past the main buy box.

### 6.5 Cart & Checkout
- Coverage calculator: as the buyer types square footage, an animated visual (simple grid of tile icons) fills in proportionally to show "this is roughly how many boxes you need" — turns an abstract math step into a visual one.
- Quantity stepper: price updates with a brief highlight-flash + number-roll animation, not an instant jump.
- Checkout step indicator: animated progress bar that fills smoothly between steps, with a checkmark "pop" animation on step completion.

### 6.6 Order Tracking
- Animated horizontal/vertical timeline where the "current status" node pulses, and the connecting line between completed steps fills with a draw-on animation (SVG stroke-dashoffset technique) rather than appearing instantly.

### 6.7 Seller Dashboard
- Revenue/analytics charts animate in on load (bars grow from baseline, line charts draw left-to-right).
- Drag-and-drop image reordering in the product form with smooth reflow animation.
- Bulk CSV upload: animated progress indicator showing rows processed in real time.

### 6.8 Performance Guardrails (important — don't let this brief produce a janky site)
- All animations should run on GPU-accelerated properties (`transform`, `opacity`) — avoid animating `width`/`height`/`top`/`left` directly where possible.
- Respect `prefers-reduced-motion` — provide a reduced-motion fallback (simple fades) for accessibility.
- Lazy-load below-the-fold animations/components; don't run heavy GSAP/Three.js scripts until elements are near viewport.
- Image-heavy grids (tile catalogs) must use virtualization or pagination — don't animate-render 500 DOM nodes at once.

---

## 7. PRODUCT DATABASE SCHEMA (high-level)

```
products
  id, seller_id, title, brand, model_number, sku, upc_ean_isbn,
  short_description, bullet_highlights[], full_description, features_benefits[],
  selling_price, mrp, discount_pct, pricing_unit (box|sqft|piece|slab),
  stock_quantity, availability_status, warehouse_id,
  dimensions (length, width, thickness), weight, capacity_per_unit,
  technical_specs (jsonb: water_absorption, pei_rating, slip_rating, etc.),
  compatibility[], shipping_weight, shipping_charge, delivery_time_estimate,
  warranty, certifications[], safety_info, country_of_origin,
  search_keywords[], backend_keywords[], created_at, updated_at, status (draft|published|paused)

product_categories (many-to-many)
  product_id, category_id

categories
  id, name, parent_id (nullable, for accessory vs tile grouping)

product_variants
  id, product_id, size, color, style, material, pack_quantity,
  price_override, stock_override, sku_suffix

product_images
  id, product_id, url, sort_order, alt_text

product_360_frames
  id, product_id, frame_index, url

sellers
  id, store_name, owner_name, mobile, email, gstin, address, warehouses[],
  bank_details, logo_url, banner_url, return_policy_default, verification_status

buyers
  id, name, mobile, email, addresses[], buyer_type

addresses
  id, buyer_id, label, line1, line2, city, state, pincode, lat, lng, is_default

orders
  id, buyer_id, status, total_amount, payment_status, placed_at

order_items
  id, order_id, product_id, variant_id, seller_id, quantity, unit_price, line_total

reviews
  id, product_id, buyer_id, rating, text, images[], seller_reply, created_at

qna
  id, product_id, buyer_id, question, answer, answered_by

coupons
  id, seller_id (nullable for platform-wide), code, discount_type, value, conditions
```

---

## 8. NON-FUNCTIONAL REQUIREMENTS

- **Responsive**: mobile-first; bottom-sheet filters and a thumb-reachable bottom nav on mobile buyer-side.
- **SEO**: server-rendered PDPs and category pages with structured data (schema.org Product markup) for rich search snippets (price, rating, availability).
- **Performance**: target <2.5s LCP on PLP/PDP despite heavy imagery — use responsive image sets (srcset), CDN, lazy-loading.
- **Security**: role-based access control between buyer/seller/admin APIs; seller can only edit their own products; input validation on all form steps; rate-limit OTP requests.
- **Scalability**: faceted search must remain fast at 50k+ SKUs — this is why a dedicated search engine (Algolia/Meilisearch/Elasticsearch) is recommended over raw SQL `WHERE` filtering.
- **Localization-ready**: currency and units (sq ft vs sq m) should be configurable, given India-first but potentially multi-region future.
- **Payments**: support COD and prepaid; seller payouts should be tracked separately from buyer payment capture (marketplace escrow pattern) to handle returns/refunds cleanly.

---

## 9. SUGGESTED BUILD ORDER (for an AI coding tool or dev team)

1. Design system + component library (buttons, cards, inputs, modals) with the motion language baked in from the start.
2. Auth (buyer + seller, separate flows) and core data models.
3. Seller: Add Product wizard (Sections 5.2) → Product list/edit → Inventory.
4. Buyer: Home → Category/PLP with filters → PDP.
5. Cart → Checkout → Order placement (mock payment first, real gateway integration after).
6. Order tracking + Seller order management (the two sides of the same workflow).
7. Reviews/Q&A, Wishlist, Compare.
8. Seller analytics dashboard.
9. Animation polish pass (Section 6) applied across all completed screens.
10. Performance/accessibility audit, then real payment gateway + SMS/OTP integration.

---

*End of brief. This document is intended to be complete enough to start architecture and screen-by-screen implementation without further clarification on scope — open questions (final brand name, exact payment gateway, hosting region) can be resolved during kickoff.*
