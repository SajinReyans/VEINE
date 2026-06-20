import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { formatINR } from "../lib/format";

const statuses = ["Placed", "Confirmed", "Packed", "Shipped", "Out for delivery", "Delivered"];
const currentIndex = 3; // demo state

export function OrderTracking() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 md:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold text-basalt-900">Order #VN-48213</h1>
          <p className="mt-1 text-sm text-stone-500">Placed on 18 June 2026 &middot; 3 items &middot; {formatINR(8420)}</p>
        </div>
        <Link to="/products" className="hidden rounded-full border border-stone-300 px-4 py-2 text-sm font-medium sm:block">
          Shop again
        </Link>
      </div>

      <div className="rounded-xl border border-stone-200 bg-white p-6">
        <div className="relative pl-2">
          {/* vertical track */}
          <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-stone-200" />
          <motion.div
            className="absolute left-[15px] top-2 w-0.5 origin-top bg-moss-500"
            initial={{ height: 0 }}
            animate={{ height: `${(currentIndex / (statuses.length - 1)) * 100}%` }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="space-y-8">
            {statuses.map((status, i) => {
              const done = i <= currentIndex;
              const isCurrent = i === currentIndex;
              return (
                <motion.div
                  key={status}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="relative flex items-center gap-4"
                >
                  <motion.div
                    animate={isCurrent ? { scale: [1, 1.25, 1] } : {}}
                    transition={isCurrent ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" } : {}}
                    className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold ${
                      done ? "border-moss-500 bg-moss-500 text-white" : "border-stone-300 bg-white text-stone-400"
                    }`}
                  >
                    {done ? "✓" : i + 1}
                  </motion.div>
                  <div>
                    <p className={`text-sm font-medium ${done ? "text-basalt-900" : "text-stone-400"}`}>{status}</p>
                    {isCurrent && <p className="text-xs text-moss-600">Updated 2 hours ago</p>}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-stone-200 bg-white p-6">
        <h2 className="font-display text-lg font-semibold text-basalt-900">Delivery details</h2>
        <p className="mt-2 text-sm text-basalt-700">Arjun Kumar &middot; +91 98765 43210</p>
        <p className="text-sm text-basalt-700">42 Lake View Road, Adyar, Chennai 600028</p>
      </div>
    </div>
  );
}
