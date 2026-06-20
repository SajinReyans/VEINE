import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { sellers } from "../data/sellers";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";

export function SellerStorefront() {
  const { id } = useParams();
  const seller = sellers.find((s) => s.id === id);
  const sellerProducts = products.filter((p) => p.sellerId === id);

  if (!seller) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-2xl">Showroom not found</h1>
        <Link to="/sellers" className="mt-4 inline-block text-clay-600 underline">Back to showrooms</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-basalt-900 py-10 text-stone-50">
        <div className="mx-auto flex max-w-7xl items-center gap-5 px-5 md:px-8">
          <motion.img initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} src={seller.logo} alt="" className="h-20 w-20 rounded-full border-2 border-stone-50/20 object-cover" />
          <div>
            <h1 className="flex items-center gap-2 font-display text-2xl font-semibold md:text-3xl">
              {seller.storeName}
              {seller.verified && <span className="rounded-full bg-moss-500 px-2 py-0.5 text-xs font-semibold">Verified</span>}
            </h1>
            <p className="mt-1 text-sm text-stone-300">{seller.city} &middot; {seller.productsCount} products &middot; {seller.rating.toFixed(1)} ★ rating</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <h2 className="mb-5 font-display text-xl font-semibold text-basalt-900">Catalog ({sellerProducts.length})</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {sellerProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
