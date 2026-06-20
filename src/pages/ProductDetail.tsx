import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getProduct, products } from "../data/products";
import { sellers } from "../data/sellers";
import { formatINR, unitLabel } from "../lib/format";
import { RatingStars } from "../components/RatingStars";
import { useCart } from "../context/CartContext";
import { useFlyToCart } from "../components/FlyToCart";
import { ProductCard } from "../components/ProductCard";

export function ProductDetail() {
  const { id } = useParams();
  const product = id ? getProduct(id) : undefined;

  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0]);
  const [qty, setQty] = useState(1);
  const [sqft, setSqft] = useState(0);
  const [showSticky, setShowSticky] = useState(false);
  const [zoom, setZoom] = useState({ active: false, x: 50, y: 50 });

  const galleryRef = useRef<HTMLImageElement>(null);
  const buyBoxRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const { fly, portal } = useFlyToCart();

  useEffect(() => {
    function handleScroll() {
      const rect = buyBoxRef.current?.getBoundingClientRect();
      if (!rect) return;
      setShowSticky(rect.bottom < 0);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!product || !selectedVariant) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-2xl">Product not found</h1>
        <Link to="/products" className="mt-4 inline-block text-clay-600 underline">
          Back to shop
        </Link>
      </div>
    );
  }

  const seller = sellers.find((s) => s.id === product.sellerId);

  const price = selectedVariant.priceOverride ?? product.sellingPrice;
  const discount = Math.round(((product.mrp - price) / product.mrp) * 100);
  const boxesNeeded = product.coveragePerUnit ? Math.ceil(sqft / product.coveragePerUnit) : Math.ceil(sqft / 16);

  function handleMove(e: React.MouseEvent) {
    const rect = galleryRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoom({ active: true, x, y });
  }

  function handleAddToCart() {
    if (galleryRef.current) fly(galleryRef.current, product!.images[activeImage]);
    addToCart(product!.id, selectedVariant!.id, qty);
  }

  const related = products.filter((p) => p.id !== product.id && p.categories.some((c) => product.categories.includes(c))).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
      <div className="mb-5 text-xs text-stone-500">
        <Link to="/products" className="hover:text-clay-600">Shop</Link> / <span className="text-basalt-800">{product.categories[0]}</span>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* GALLERY */}
        <div>
          <div
            className="relative aspect-square overflow-hidden rounded-xl border border-stone-200 bg-stone-100"
            onMouseMove={handleMove}
            onMouseEnter={() => setZoom((z) => ({ ...z, active: true }))}
            onMouseLeave={() => setZoom((z) => ({ ...z, active: false }))}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage + selectedVariant.id}
                ref={galleryRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                src={product.images[activeImage]}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            </AnimatePresence>
            {zoom.active && (
              <div
                className="pointer-events-none absolute inset-0 hidden rounded-xl border-2 border-clay-400 md:block"
                style={{
                  backgroundImage: `url(${product.images[activeImage]})`,
                  backgroundSize: "220%",
                  backgroundPosition: `${zoom.x}% ${zoom.y}%`,
                }}
              />
            )}
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {product.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImage(i)}
                className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                  activeImage === i ? "border-clay-500" : "border-transparent"
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* BUY BOX */}
        <div ref={buyBoxRef}>
          <p className="text-xs font-medium uppercase tracking-wide text-stone-500">{product.brand}</p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-basalt-900">{product.title}</h1>
          <div className="mt-2 flex items-center gap-3">
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
            {seller && (
              <Link to={`/sellers/${seller.id}`} className="text-xs font-medium text-clay-600 hover:underline">
                Sold by {seller.storeName}
              </Link>
            )}
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <motion.span key={price} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="font-display text-3xl font-semibold text-basalt-900">
              {formatINR(price)}
            </motion.span>
            <span className="text-sm text-stone-500">{unitLabel(product.pricingUnit)}</span>
            {product.mrp > price && <span className="text-sm text-stone-400 line-through">{formatINR(product.mrp)}</span>}
            {discount > 0 && <span className="rounded-full bg-moss-500/10 px-2 py-0.5 text-xs font-semibold text-moss-600">{discount}% off</span>}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-basalt-700">{product.shortDescription}</p>

          {/* Variants */}
          {product.variants.length > 1 && (
            <div className="mt-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">Variant</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                      selectedVariant.id === v.id ? "border-clay-500 bg-clay-500/10 text-clay-600" : "border-stone-300 text-basalt-700 hover:border-basalt-700"
                    }`}
                  >
                    {v.size} &middot; {v.color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Coverage calculator for box-priced items */}
          {product.pricingUnit === "sqft" || product.pricingUnit === "box" ? (
            <div className="mt-6 rounded-xl border border-stone-200 bg-stone-100/60 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">Coverage calculator</p>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={0}
                  value={sqft || ""}
                  onChange={(e) => setSqft(Number(e.target.value))}
                  placeholder="Area in sq.ft"
                  className="w-32 rounded-md border border-stone-300 bg-white px-3 py-1.5 text-sm outline-none focus:border-clay-500"
                />
                <span className="text-sm text-stone-500">sq.ft &rarr; approx.</span>
                <motion.span key={boxesNeeded} initial={{ scale: 1.3, color: "var(--color-clay-500)" }} animate={{ scale: 1, color: "var(--color-basalt-900)" }} className="text-sm font-semibold">
                  {sqft > 0 ? `${boxesNeeded} boxes` : "—"}
                </motion.span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {Array.from({ length: Math.min(boxesNeeded, 40) }).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.015 }}
                    className="h-3 w-3 rounded-sm bg-clay-400"
                  />
                ))}
              </div>
            </div>
          ) : null}

          {/* Quantity + Add to cart */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-full border border-stone-300">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2 text-lg">&minus;</button>
              <motion.span key={qty} initial={{ scale: 1.3 }} animate={{ scale: 1 }} className="w-10 text-center text-sm font-semibold">
                {qty}
              </motion.span>
              <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2 text-lg">+</button>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="flex-1 rounded-full bg-basalt-900 py-3 text-sm font-semibold text-stone-50 transition-transform hover:scale-[1.01]"
            >
              Add to cart
            </motion.button>
          </div>
          <p className="mt-2 text-xs text-stone-500">{product.availability} &middot; Delivery in 4&ndash;7 business days</p>

          {/* Highlights */}
          <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-basalt-700">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-500" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* DESCRIPTION + SPECS */}
      <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-xl font-semibold text-basalt-900">Description</h2>
          <p className="mt-3 text-sm leading-relaxed text-basalt-700">{product.description}</p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-basalt-900">Specifications</h2>
          <table className="mt-3 w-full text-sm">
            <tbody>
              {[
                ["Material", product.material],
                ["Size", product.size],
                ["Dimensions", product.dimensions],
                ["Color", product.color],
                ["Pattern", product.pattern],
                ["Style", product.style],
                ["Weight", `${product.weightKg} kg`],
                ["Warranty", product.warranty],
                ["Country of origin", product.countryOfOrigin],
                ["Certifications", product.certifications.join(", ")],
              ].map(([k, v]) => (
                <tr key={k} className="border-b border-stone-200">
                  <td className="py-2 pr-4 font-medium text-stone-500">{k}</td>
                  <td className="py-2 text-basalt-800">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="mt-16">
        <h2 className="font-display text-xl font-semibold text-basalt-900">Customer reviews</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {product.reviews.map((r) => (
            <div key={r.id} className="rounded-xl border border-stone-200 bg-white p-4">
              <RatingStars rating={r.rating} showValue={false} />
              <p className="mt-2 text-sm text-basalt-700">{r.text}</p>
              <p className="mt-3 text-xs font-medium text-stone-500">{r.author} &middot; {new Date(r.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-xl font-semibold text-basalt-900">Frequently bought with</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* STICKY ADD TO CART BAR */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-40 border-t border-stone-200 bg-stone-50/95 px-5 py-3 backdrop-blur-md md:px-8"
          >
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src={product.images[0]} alt="" className="h-10 w-10 rounded-md object-cover" />
                <div>
                  <p className="line-clamp-1 text-sm font-medium text-basalt-900">{product.title}</p>
                  <p className="text-xs text-stone-500">{formatINR(price)} {unitLabel(product.pricingUnit)}</p>
                </div>
              </div>
              <button onClick={handleAddToCart} className="rounded-full bg-basalt-900 px-6 py-2.5 text-sm font-semibold text-stone-50">
                Add to cart
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {portal}
    </div>
  );
}
