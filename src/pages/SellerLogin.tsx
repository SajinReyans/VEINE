import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function SellerLogin() {
  const [stage, setStage] = useState<"signin" | "business">("signin");
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-basalt-900 px-5 py-12">
      <div className="grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-2xl bg-stone-50 shadow-lift md:grid-cols-2">
        <div className="p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-clay-600">Seller Portal</p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-basalt-900">
            {stage === "signin" ? "Sign in to your showroom" : "Tell us about your business"}
          </h1>

          <AnimatePresence mode="wait">
            {stage === "signin" && (
              <motion.div key="signin" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="mt-6 space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-stone-500">Business mobile / email</label>
                  <input className="w-full rounded-md border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-clay-500" placeholder="contact@yourshowroom.com" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-stone-500">Password</label>
                  <input type="password" className="w-full rounded-md border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-clay-500" placeholder="••••••••" />
                </div>
                <button
                  onClick={() => navigate("/seller/dashboard")}
                  className="w-full rounded-full bg-basalt-900 py-3 text-sm font-semibold text-stone-50 transition-transform hover:scale-[1.01] active:scale-95"
                >
                  Sign in
                </button>
                <button onClick={() => setStage("business")} className="w-full text-center text-xs font-medium text-clay-600 hover:underline">
                  New seller? Register your showroom
                </button>
              </motion.div>
            )}

            {stage === "business" && (
              <motion.div key="business" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Store / business name" placeholder="Kavery Stone Gallery" full />
                <Field label="Owner name" placeholder="Kavery Murthy" />
                <Field label="Business mobile" placeholder="+91 98765 43210" />
                <Field label="GSTIN" placeholder="33AAAAA0000A1Z5" />
                <Field label="Business type" placeholder="Showroom / Manufacturer / Distributor" />
                <Field label="Warehouse / showroom address" placeholder="City, state" full />
                <button
                  onClick={() => navigate("/seller/dashboard")}
                  className="mt-1 w-full rounded-full bg-clay-500 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.01] active:scale-95 sm:col-span-2"
                >
                  Submit for verification
                </button>
                <p className="text-xs text-stone-500 sm:col-span-2">We'll review your GST and business documents within 1–2 business days before your store goes live.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative hidden md:block">
          <img src="https://picsum.photos/seed/seller-auth/700/900" alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-basalt-900/80 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-stone-50">
            <p className="font-display text-xl font-semibold">Reach buyers searching by exact spec.</p>
            <p className="mt-1 text-sm text-stone-200">List your full catalog with rich filters &mdash; size, finish, material &mdash; and manage every order from one dashboard.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, placeholder, full }: { label: string; placeholder: string; full?: boolean }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="mb-1 block text-xs font-medium text-stone-500">{label}</label>
      <input placeholder={placeholder} className="w-full rounded-md border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-clay-500" />
    </div>
  );
}
