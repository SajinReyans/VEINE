

# 🛍️ Intelligent Cart

The shopping cart is organized **seller-wise**, allowing buyers to clearly identify which products are coming from which supplier.

It includes:

* Quantity controls
* Variant management
* Seller grouping
* Price calculation
* Coverage-based quantity handling
* Animated cart interactions
* Automatic subtotal updates

A production implementation can later extend this into **seller-wise shipping, delivery estimates, tax calculation, and invoice generation**.

---

# 💳 Multi-Step Checkout

The checkout experience is divided into multiple stages:

1. Customer information
2. Delivery address
3. Product review
4. Shipping selection
5. Order summary
6. Payment
7. Order confirmation

The flow is animated while maintaining the buyer's current state between steps.

A production backend can later connect this layer to payment providers such as Razorpay, Stripe, or other region-specific gateways.

---

# 📦 Order Tracking

Orders are represented through an animated state-based timeline:

**Order Placed → Confirmed → Processing → Dispatched → In Transit → Delivered**

The current demo simulates these states on the frontend.

A production version can connect the timeline to real logistics events and seller fulfillment updates.

---

# 🔐 Buyer Authentication

The prototype includes a mobile-first authentication experience inspired by OTP-based login systems.

The flow includes:

* Mobile number entry
* OTP-style verification interface
* User information
* Delivery location capture
* Account creation
* Login state

The current implementation is visual only and does not perform real authentication.

A production version can integrate:

* Firebase Authentication
* Auth0
* Supabase Auth
* Custom OTP infrastructure

---

# 🏪 Seller Platform

Veine is not only a marketplace for buyers.

It also provides a dedicated seller ecosystem.

---

## Seller Onboarding

Suppliers can go through a structured onboarding process containing:

* Business information
* Company details
* GSTIN
* Contact information
* Warehouse information
* Business address
* Seller verification data

The architecture allows this to later become a proper **KYC and seller approval workflow**.

---

# 📊 Seller Dashboard

The seller dashboard provides a centralized view of marketplace activity.

### Dashboard components

* Revenue overview
* Sales statistics
* Product count
* Inventory status
* Low-stock alerts
* Recent orders
* Product performance
* Revenue charts
* Seller product table

The dashboard is designed to eventually consume real-time information from the backend.

---

# ➕ Advanced Product Creation System

One of the major components of Veine is the **12-step product creation wizard**.

The wizard divides product creation into manageable sections:

### 01 — Basic Information

Product name, category and basic identification.

### 02 — Media

Product images and visual assets.

### 03 — Description

Detailed product description and material information.

### 04 — Pricing

Base price, selling price and pricing information.

### 05 — Inventory

Stock quantity, SKU and warehouse information.

### 06 — Variants

Size, finish, color and other product variations.

### 07 — Specifications

Technical characteristics and product dimensions.

### 08 — Shipping

Weight, packaging and shipping information.

### 09 — Seller Information

Supplier and business details.

### 10 — Compliance

GST and other required marketplace information.

### 11 — SEO

Search-friendly product metadata.

### 12 — Review

Final validation before publishing.

The wizard includes a **live product preview**, allowing sellers to see how their product will appear to buyers while they are creating the listing.

---

# 🎨 Design System

Veine uses a dedicated design system instead of relying purely on default component styling.

The design language is inspired by:

* Natural stone
* Marble surfaces
* Architectural interiors
* Premium material catalogs
* Luxury construction materials

The system defines:

* Color tokens
* Typography scale
* Spacing system
* Border radius
* Shadows
* Motion tokens
* Component states
* Responsive breakpoints

---

# ✨ Motion & Interaction System

Animation is treated as part of the product experience rather than decoration.

Reusable interactions include:

* Number-rolling counters
* Fly-to-cart animations
* Product-card tilt
* Glaze/sheeen hover effects
* Animated filter transitions
* Scroll reveals
* SVG order timeline animations
* Page transitions
* Modal transitions
* Wizard step transitions

Animations are implemented using **Framer Motion**.

---

# 🧠 Proposed Production Architecture

The current frontend is intentionally separated from the future backend architecture.

A production implementation can evolve toward:

```text
                    VEINE PLATFORM
                          │
        ┌─────────────────┴─────────────────┐
        │                                   │
   BUYER APPLICATION                   SELLER APPLICATION
        │                                   │
        └─────────────────┬─────────────────┘
                          │
                     API LAYER
                          │
       ┌──────────────────┼──────────────────┐
       │                  │                  │
   PostgreSQL         Search Engine      Object Storage
       │                  │                  │
   Users              Products           Images
   Sellers            Filters            Videos
   Orders             Facets             Documents
   Inventory          Search
   Reviews
       │
       ├──────── Payment Gateway
       │
       ├──────── Authentication
       │
       └──────── Logistics / Shipping
```

---

# 🗄️ Future Database Domains

The backend can be structured around independent domains:

### Identity

* Users
* Roles
* Addresses
* Authentication

### Seller

* Sellers
* Businesses
* Warehouses
* Verification

### Catalog

* Products
* Categories
* Materials
* Variants
* Specifications
* Images

### Inventory

* Stock
* Warehouses
* SKU
* Stock movements
* Low-stock thresholds

### Commerce

* Cart
* Orders
* Order items
* Payments
* Invoices
* Refunds

### Marketplace

* Reviews
* Ratings
* Seller performance
* Product visibility

### Logistics

* Shipments
* Tracking
* Delivery status
* Shipping zones

---

# ⚡ Current Demo State

This version is intentionally **frontend-only**.

The following components currently use mock or in-memory data:

* Products
* Sellers
* Reviews
* Authentication
* Cart persistence
* Orders
* Inventory
* Product creation
* Order tracking

No real transaction is performed.

---

# 🔌 Backend Integration Roadmap

The frontend can progressively be connected to:

### Phase 1 — Core Backend

* REST/GraphQL API
* PostgreSQL
* Authentication
* User management
* Seller management

### Phase 2 — Marketplace

* Product APIs
* Product variants
* Inventory
* Seller listings
* Reviews

### Phase 3 — Search

Replace client-side filtering with a dedicated search service supporting:

* Full-text search
* Faceted search
* Typo tolerance
* Material filtering
* Price filtering
* Seller filtering
* Relevance ranking

### Phase 4 — Commerce

* Persistent cart
* Checkout API
* Payment gateway
* Order creation
* Invoice generation
* Refund handling

### Phase 5 — Logistics

* Shipment creation
* Tracking
* Delivery updates
* Seller fulfillment
* Buyer notifications

---

# 🛠️ Technology Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS v4
* Framer Motion
* React Router

### Proposed Backend

* Next.js
* PostgreSQL
* REST/GraphQL APIs
* Redis
* Dedicated search engine

### Infrastructure

* Object storage for product media
* CDN for image delivery
* Background workers
* Monitoring and logging
* Automated backups

---

# ▶️ Running the Demo

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed by Vite, typically:

```text
http://localhost:5173
```

For a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

# 📌 Current Limitations

This is currently an **interaction and architecture prototype**, not a production marketplace.

The major missing components are:

* Persistent database
* Real authentication
* Payment processing
* Server-side search
* Persistent cart
* Real inventory synchronization
* Seller verification
* Real order management
* Logistics integration
* Image storage/CDN
* Notifications
* Production security
* Backend API
* Database migrations
* Monitoring
* Backup and recovery

---

# 🔮 Long-Term Vision

Veine can evolve from a simple product marketplace into a **specialized digital commerce infrastructure for the architectural-material industry**.

The long-term platform can support:

**Manufacturers → Distributors → Sellers → Designers → Contractors → Builders → Homeowners**

with product discovery, specification, quotation, purchasing, inventory, logistics, and seller management operating inside one ecosystem.
