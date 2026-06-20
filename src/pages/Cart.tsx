import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import { sellers } from "../data/sellers";
import { formatINR, unitLabel } from "../lib/format";

export function Cart() {
  const { lines, updateQuantity, removeLine, totalValue } = useCart();

  const grouped = lines.reduce<Record<string, typeof lines>>((acc, line) => {
    const product = products.find((p) => p.id === line.productId);
    const sellerId = product?.sellerId ?? "unknown";
    acc[sellerId] = acc[sellerId] ? [...acc[sellerId], line] : [line];
    return acc;
  }, {});

  const shipping = lines.length > 0 ? 0 : 0;

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <h1 className="font-display text-2xl font-semibold text-basalt-900">Your cart is empty</h1>
          <p className="mt-2 text-sm text-stone-500">Browse the catalog and add tiles, slabs, or accessories.</p>
          <Link to="/products" className="mt-6 inline-block rounded-full bg-basalt-900 px-6 py-3 text-sm font-semibold text-stone-50">
            Continue shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
      <h1 className="font-display text-3xl font-semibold text-basalt-900">Your cart</h1>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
        <div className="space-y-8">
          <AnimatePresence>
            {Object.entries(grouped).map(([sellerId, sellerLines]) => {
              const seller = sellers.find((s) => s.id === sellerId);
              return (
                <motion.div key={sellerId} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, height: 0 }} className="rounded-xl border border-stone-200 bg-white">
                  <div className="flex items-center gap-2 border-b border-stone-200 px-4 py-3 text-sm font-medium text-basalt-800">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-6 9 6v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9z" /></svg>
                    {seller?.storeName ?? "Seller"}
                  </div>
                  <div className="divide-y divide-stone-100">
                    <AnimatePresence>
                      {sellerLines.map((line) => {
                        const product = products.find((p) => p.id === line.productId)!;
                        const variant = product.variants.find((v) => v.id === line.variantId)!;
                        const price = variant.priceOverride ?? product.sellingPrice;
                        return (
                          <motion.div
                            key={`${line.productId}-${line.variantId}`}
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 40 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-4 px-4 py-4"
                          >
                            <img src={product.images[0]} alt="" className="h-16 w-16 rounded-lg object-cover" />
                            <div className="flex-1">
                              <Link to={`/products/${product.id}`} className="line-clamp-1 text-sm font-medium text-basalt-900 hover:text-clay-600">
                                {product.title}
                              </Link>
                              <p className="text-xs text-stone-500">{variant.size} &middot; {variant.color}</p>
                              <p className="mt-1 text-xs font-medium text-stone-500">{formatINR(price)} {unitLabel(product.pricingUnit)}</p>
                            </div>
                            <div className="flex items-center rounded-full border border-stone-300">
                              <button onClick={() => updateQuantity(line.productId, line.variantId, line.quantity - 1)} className="px-2.5 py-1.5 text-base">&minus;</button>
                              <motion.span key={line.quantity} initial={{ scale: 1.3 }} animate={{ scale: 1 }} className="w-10 text-center text-sm font-semibold">
                                {line.quantity}
                              </motion.span>
                              <button onClick={() => updateQuantity(line.productId, line.variantId, line.quantity + 1)} className="px-2.5 py-1.5 text-base">+</button>
                            </div>
                            <motion.p key={price * line.quantity} initial={{ backgroundColor: "rgba(194,96,61,0.2)" }} animate={{ backgroundColor: "rgba(194,96,61,0)" }} transition={{ duration: 0.6 }} className="w-24 rounded text-right text-sm font-semibold text-basalt-900">
                              {formatINR(price * line.quantity)}
                            </motion.p>
                            <button onClick={() => removeLine(line.productId, line.variantId)} className="text-stone-400 transition-colors hover:text-clay-600" aria-label="Remove">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6h16z" /></svg>
                            </button>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* SUMMARY */}
        <motion.div layout className="h-fit rounded-xl border border-stone-200 bg-white p-5">
          <h2 className="font-display text-lg font-semibold text-basalt-900">Order summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-basalt-700">
              <span>Subtotal</span>
              <motion.span key={totalValue} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }}>{formatINR(totalValue)}</motion.span>
            </div>
            <div className="flex justify-between text-basalt-700">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Calculated at checkout" : formatINR(shipping)}</span>
            </div>
          </div>
          <div className="my-4 border-t border-dashed border-stone-300" />
          <div className="flex justify-between text-base font-semibold text-basalt-900">
            <span>Total</span>
            <motion.span key={totalValue} initial={{ scale: 1.1 }} animate={{ scale: 1 }}>{formatINR(totalValue)}</motion.span>
          </div>
          <Link to="/checkout" className="mt-5 block rounded-full bg-clay-500 py-3 text-center text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95">
            Proceed to checkout
          </Link>
          <Link to="/products" className="mt-3 block text-center text-xs font-medium text-stone-500 hover:text-clay-600">
            Continue shopping
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
