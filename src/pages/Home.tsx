import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { categories } from "../data/categories";

const rooms = [
  { id: "bathroom-tiles", label: "Bathroom", img: "https://picsum.photos/seed/room-bathroom/700/900" },
  { id: "kitchen-tiles", label: "Kitchen", img: "https://picsum.photos/seed/room-kitchen/700/900" },
  { id: "outdoor-tiles", label: "Outdoor", img: "https://picsum.photos/seed/room-outdoor/700/900" },
  { id: "floor-tiles", label: "Living Room", img: "https://picsum.photos/seed/room-living/700/900" },
];

const shopByCategory = categories.slice(0, 8);

export function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, 240]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const featured = products.filter((p) => p.isFeatured);
  const newArrivals = products.filter((p) => p.isNewArrival);
  const bestSellers = products.filter((p) => p.isBestSeller);

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} className="relative h-[88vh] min-h-[560px] overflow-hidden bg-basalt-900">
        <motion.img
          style={{ y: layer2Y }}
          src="https://picsum.photos/seed/hero-back/1800/1100"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <motion.div style={{ y: layer1Y }} className="absolute inset-0 bg-gradient-to-t from-basalt-900 via-basalt-900/40 to-transparent" />
        <motion.div style={{ y: textY, opacity }} className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 md:px-8">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-stone-300/30 px-3 py-1 text-xs font-medium uppercase tracking-widest text-stone-200"
          >
            Tiles &middot; Marble &middot; Granite &middot; Quartz
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl font-display text-5xl font-semibold leading-[1.05] text-stone-50 md:text-7xl"
          >
            Every surface starts with a vein of stone.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-5 max-w-md text-base text-stone-300"
          >
            Source floor tiles, marble slabs, granite, and every adhesive and trim you need &mdash; direct from verified showrooms across the country.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link to="/products" className="glaze-sheen rounded-full bg-clay-500 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03] active:scale-95">
              Browse the catalog
            </Link>
            <Link to="/seller/login" className="rounded-full border border-stone-300/40 px-6 py-3 text-sm font-semibold text-stone-100 transition-colors hover:border-stone-100">
              Sell on Veine &rarr;
            </Link>
          </motion.div>
        </motion.div>

        <div className="veining-divider absolute bottom-0 left-0 right-0" />
      </section>

      {/* SHOP BY ROOM — staggered build-in */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold text-basalt-900 md:text-3xl">Shop by room</h2>
          <Link to="/products" className="text-sm font-medium text-clay-600 hover:underline">View all categories</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {rooms.map((room, i) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 40, clipPath: "inset(100% 0% 0% 0%)" }}
              whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to={`/products?category=${room.id}`} className="group relative block aspect-[3/4] overflow-hidden rounded-xl">
                <img src={room.img} alt={room.label} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-basalt-900/80 via-basalt-900/10 to-transparent" />
                <span className="absolute bottom-4 left-4 font-display text-lg font-semibold text-stone-50">{room.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CATEGORY SHINE GRID */}
      <section className="bg-stone-100 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <h2 className="mb-8 font-display text-2xl font-semibold text-basalt-900 md:text-3xl">Explore categories</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {shopByCategory.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  to={`/products?category=${cat.id}`}
                  className="glaze-sheen group flex h-24 items-center justify-center rounded-lg border border-stone-200 bg-white px-4 text-center text-sm font-medium text-basalt-800 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift hover:text-clay-600"
                >
                  {cat.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <Rail title="Featured products" subtitle="Hand-picked by our merchandising team" products={featured} />
      <Rail title="New arrivals" subtitle="Just listed by our showroom partners" products={newArrivals} tone="light" />
      <Rail title="Best sellers" subtitle="What contractors and homeowners are buying most" products={bestSellers} />

      {/* CTA STRIP */}
      <section className="bg-basalt-900 py-16 text-center text-stone-50">
        <h2 className="font-display text-2xl font-semibold md:text-3xl">Have a showroom or factory?</h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-stone-300">List your full catalog, manage orders, and reach buyers searching by exact tile spec.</p>
        <Link to="/seller/login" className="mt-6 inline-block rounded-full bg-clay-500 px-7 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95">
          Become a seller
        </Link>
      </section>
    </div>
  );
}

function Rail({ title, subtitle, products, tone = "default" }: { title: string; subtitle: string; products: typeof import("../data/products").products; tone?: "default" | "light" }) {
  if (products.length === 0) return null;
  return (
    <section className={`mx-auto max-w-7xl px-6 py-14 md:px-8 ${tone === "light" ? "bg-stone-50" : ""}`}>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold text-basalt-900">{title}</h2>
        <p className="text-sm text-stone-500">{subtitle}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}
