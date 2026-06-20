import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { products } from "../data/products";
import { formatINR } from "../lib/format";

const revenueByDay = [42, 58, 39, 71, 88, 65, 94]; // thousands, demo data
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const maxRevenue = Math.max(...revenueByDay);

const lowStock = products.filter((p) => p.stock < 700).slice(0, 4);
const sellerProducts = products.slice(0, 6);

export function SellerDashboard() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-clay-600">Seller Portal</p>
          <h1 className="font-display text-2xl font-semibold text-basalt-900 md:text-3xl">Welcome back, Kavery Stone Gallery</h1>
        </div>
        <Link to="/seller/products/new" className="rounded-full bg-clay-500 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95">
          + Add product
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Revenue (7 days)" value={4_57_000} prefix="₹" />
        <StatCard label="Pending orders" value={12} />
        <StatCard label="Active listings" value={142} />
        <StatCard label="Avg. rating" value={4.6} suffix=" / 5" decimals />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Revenue chart */}
        <div className="rounded-xl border border-stone-200 bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-basalt-900">Revenue, last 7 days</h2>
          <div className="mt-6 flex h-48 items-end gap-3">
            {revenueByDay.map((v, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(v / maxRevenue) * 100}%` }}
                  transition={{ duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full rounded-t-md bg-gradient-to-t from-clay-500 to-clay-400"
                  style={{ minHeight: 4 }}
                />
                <span className="text-xs text-stone-500">{days[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Low stock alert */}
        <div className="rounded-xl border border-stone-200 bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-basalt-900">Low stock alerts</h2>
          <div className="mt-4 space-y-3">
            {lowStock.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 rounded-lg border border-stone-200 p-2.5"
              >
                <img src={p.images[0]} alt="" className="h-10 w-10 rounded-md object-cover" />
                <div className="flex-1">
                  <p className="line-clamp-1 text-xs font-medium text-basalt-900">{p.title}</p>
                  <p className="text-[11px] text-clay-600">Only {p.stock} units left</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Product table */}
      <div className="mt-8 rounded-xl border border-stone-200 bg-white">
        <div className="flex items-center justify-between border-b border-stone-200 p-5">
          <h2 className="font-display text-lg font-semibold text-basalt-900">Your products</h2>
          <Link to="/seller/products/new" className="text-sm font-medium text-clay-600 hover:underline">+ Add new</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-left text-xs uppercase tracking-wide text-stone-500">
                <th className="px-5 py-3">Product</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3">Stock</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Rating</th>
              </tr>
            </thead>
            <tbody>
              {sellerProducts.map((p, i) => (
                <motion.tr
                  key={p.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-stone-100 last:border-0 hover:bg-stone-50"
                >
                  <td className="flex items-center gap-3 px-5 py-3">
                    <img src={p.images[0]} alt="" className="h-9 w-9 rounded-md object-cover" />
                    <span className="line-clamp-1 font-medium text-basalt-900">{p.title}</span>
                  </td>
                  <td className="px-5 py-3 text-basalt-700">{formatINR(p.sellingPrice)}</td>
                  <td className="px-5 py-3 text-basalt-700">{p.stock.toLocaleString("en-IN")}</td>
                  <td className="px-5 py-3">
                    <span className="rounded-full bg-moss-500/10 px-2.5 py-0.5 text-xs font-medium text-moss-600">{p.availability}</span>
                  </td>
                  <td className="px-5 py-3 text-basalt-700">{p.rating.toFixed(1)} ★</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, prefix = "", suffix = "", decimals = false }: { label: string; value: number; prefix?: string; suffix?: string; decimals?: boolean }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-stone-200 bg-white p-5">
      <p className="text-xs font-medium text-stone-500">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold text-basalt-900">
        {decimals ? `${prefix}${value.toFixed(1)}${suffix}` : <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />}
      </p>
    </motion.div>
  );
}
