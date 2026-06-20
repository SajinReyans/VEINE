import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Product } from "../lib/types";
import { formatINR, unitLabel } from "../lib/format";
import { RatingStars } from "./RatingStars";
import { useCart } from "../context/CartContext";
import { useFlyToCart } from "./FlyToCart";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [wished, setWished] = useState(false);
  const { addToCart } = useCart();
  const { fly, portal } = useFlyToCart();

  function handleMouseMove(e: React.MouseEvent) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: py * -6, ry: px * 8 });
  }

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (imgRef.current) fly(imgRef.current, product.images[0]);
    addToCart(product.id, product.variants[0].id, 1);
  }

  const discount = Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index, 10) * 0.04, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/products/${product.id}`}>
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
          style={{ perspective: 900 }}
          className="group relative"
        >
          <motion.div
            animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-soft transition-shadow group-hover:shadow-lift"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="glaze-sheen relative aspect-square overflow-hidden bg-stone-100">
              <img ref={imgRef} src={product.images[0]} alt={product.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute left-2 top-2 flex flex-col gap-1">
                {product.isNewArrival && (
                  <span className="rounded-full bg-moss-500 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">New</span>
                )}
                {product.isBestSeller && (
                  <span className="rounded-full bg-clay-500 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">Bestseller</span>
                )}
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setWished((w) => !w);
                }}
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur transition-transform active:scale-75"
                aria-label="Add to wishlist"
              >
                <motion.svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  animate={wished ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                  transition={{ duration: 0.35 }}
                  fill={wished ? "var(--color-clay-500)" : "none"}
                  stroke={wished ? "var(--color-clay-500)" : "var(--color-basalt-700)"}
                  strokeWidth="1.8"
                >
                  <path d="M12 21s-7.5-4.6-10-9.3C0.3 8.1 2 4.5 5.6 4c2-.3 3.7.6 4.9 2.3.5.7.9 1.4 1.5 1.4s1-.7 1.5-1.4C14.7 4.6 16.4 3.7 18.4 4c3.6.5 5.3 4.1 3.6 7.7C19.5 16.4 12 21 12 21z" />
                </motion.svg>
              </button>

              <motion.button
                onClick={handleQuickAdd}
                initial={{ y: 12, opacity: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.94 }}
                className="absolute bottom-2 left-2 right-2 translate-y-2 rounded-lg bg-basalt-900 py-2 text-xs font-semibold text-stone-50 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
              >
                Quick add to cart
              </motion.button>
            </div>

            <div className="space-y-1.5 p-3.5">
              <p className="text-[11px] font-medium uppercase tracking-wide text-stone-500">{product.brand}</p>
              <h3 className="line-clamp-1 font-display text-[15px] font-medium text-basalt-900">{product.title}</h3>
              <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
              <div className="flex items-baseline gap-2 pt-0.5">
                <span className="font-display text-lg font-semibold text-basalt-900">{formatINR(product.sellingPrice)}</span>
                <span className="text-xs text-stone-500">{unitLabel(product.pricingUnit)}</span>
                {discount > 0 && <span className="text-xs font-medium text-moss-600">{discount}% off</span>}
              </div>
            </div>
          </motion.div>
        </div>
      </Link>
      {portal}
    </motion.div>
  );
}
