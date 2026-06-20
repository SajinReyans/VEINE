import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { sellers } from "../data/sellers";
import { products } from "../data/products";

export function Sellers() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
      <h1 className="font-display text-3xl font-semibold text-basalt-900">Showrooms on Veine</h1>
      <p className="mt-1 text-sm text-stone-500">Verified manufacturers, distributors and showrooms.</p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sellers.map((s, i) => {
          const count = products.filter((p) => p.sellerId === s.id).length;
          return (
            <motion.div key={s.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Link to={`/sellers/${s.id}`} className="glaze-sheen flex items-center gap-4 rounded-xl border border-stone-200 bg-white p-5 shadow-soft transition-shadow hover:shadow-lift">
                <img src={s.logo} alt="" className="h-14 w-14 rounded-full object-cover" />
                <div>
                  <p className="flex items-center gap-1.5 font-display text-base font-semibold text-basalt-900">
                    {s.storeName}
                    {s.verified && <span className="text-moss-600" title="Verified seller">✓</span>}
                  </p>
                  <p className="text-xs text-stone-500">{s.city}</p>
                  <p className="mt-1 text-xs text-basalt-700">{count} products listed &middot; {s.rating.toFixed(1)} ★</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
