import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatINR } from "../lib/format";

const steps = ["Address", "Delivery", "Payment", "Review"];

export function Checkout() {
  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState(false);
  const { totalValue, totalItems } = useCart();
  const navigate = useNavigate();

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-6 py-28 text-center">
        <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 14 }}>
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-moss-500 text-white">
            <motion.svg initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.2 }} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 13l4 4L19 7" />
            </motion.svg>
          </div>
          <h1 className="font-display text-2xl font-semibold text-basalt-900">Order placed</h1>
          <p className="mt-2 text-sm text-stone-500">We've notified the seller(s). You'll get tracking updates by SMS and email.</p>
          <button onClick={() => navigate("/orders/demo")} className="mt-6 rounded-full bg-basalt-900 px-6 py-3 text-sm font-semibold text-stone-50">
            Track your order
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 md:px-8">
      <h1 className="font-display text-3xl font-semibold text-basalt-900">Checkout</h1>

      {/* Step indicator */}
      <div className="relative mt-8 flex items-center justify-between">
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-stone-200" />
        <motion.div
          className="absolute left-0 top-4 h-0.5 bg-clay-500"
          animate={{ width: `${(step / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
        {steps.map((label, i) => (
          <div key={label} className="relative z-10 flex flex-col items-center gap-2">
            <motion.div
              animate={{
                backgroundColor: i <= step ? "var(--color-clay-500)" : "var(--color-stone-50)",
                borderColor: i <= step ? "var(--color-clay-500)" : "var(--color-stone-300)",
                scale: i === step ? 1.15 : 1,
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold text-white"
            >
              {i < step ? "✓" : i + 1}
            </motion.div>
            <span className={`text-xs font-medium ${i <= step ? "text-basalt-900" : "text-stone-400"}`}>{label}</span>
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="mt-10 min-h-[260px] rounded-xl border border-stone-200 bg-white p-6">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
            {step === 0 && <AddressStep />}
            {step === 1 && <DeliveryStep />}
            {step === 2 && <PaymentStep />}
            {step === 3 && <ReviewStep totalValue={totalValue} totalItems={totalItems} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="rounded-full border border-stone-300 px-5 py-2.5 text-sm font-medium text-basalt-700 disabled:opacity-30"
        >
          Back
        </button>
        <button
          onClick={() => (step === steps.length - 1 ? setPlaced(true) : setStep((s) => s + 1))}
          className="rounded-full bg-basalt-900 px-6 py-2.5 text-sm font-semibold text-stone-50 transition-transform hover:scale-[1.02] active:scale-95"
        >
          {step === steps.length - 1 ? "Place order" : "Continue"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-stone-500">{label}</label>
      <input placeholder={placeholder} className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm outline-none focus:border-clay-500" />
    </div>
  );
}

function AddressStep() {
  return (
    <div>
      <h3 className="mb-4 font-display text-lg font-semibold">Delivery address</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Full name" placeholder="Arjun Kumar" />
        <Field label="Mobile number" placeholder="+91 98765 43210" />
        <div className="sm:col-span-2"><Field label="Address line" placeholder="Flat / street / area" /></div>
        <Field label="City" placeholder="Chennai" />
        <Field label="Pincode" placeholder="600028" />
      </div>
    </div>
  );
}
function DeliveryStep() {
  const slots = ["Tomorrow, 9am – 1pm", "Tomorrow, 2pm – 6pm", "In 3 days, anytime"];
  const [chosen, setChosen] = useState(0);
  return (
    <div>
      <h3 className="mb-4 font-display text-lg font-semibold">Delivery slot</h3>
      <div className="space-y-2">
        {slots.map((s, i) => (
          <button
            key={s}
            onClick={() => setChosen(i)}
            className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-sm transition-colors ${
              chosen === i ? "border-clay-500 bg-clay-500/10 text-clay-600" : "border-stone-300 text-basalt-700"
            }`}
          >
            {s}
            {chosen === i && <span>✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
function PaymentStep() {
  const methods = ["UPI", "Credit / Debit Card", "Cash on Delivery"];
  const [chosen, setChosen] = useState(0);
  return (
    <div>
      <h3 className="mb-4 font-display text-lg font-semibold">Payment method</h3>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {methods.map((m, i) => (
          <button
            key={m}
            onClick={() => setChosen(i)}
            className={`rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
              chosen === i ? "border-clay-500 bg-clay-500/10 text-clay-600" : "border-stone-300 text-basalt-700"
            }`}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
}
function ReviewStep({ totalValue, totalItems }: { totalValue: number; totalItems: number }) {
  return (
    <div>
      <h3 className="mb-4 font-display text-lg font-semibold">Review &amp; place order</h3>
      <div className="flex justify-between text-sm text-basalt-700">
        <span>{totalItems} items</span>
        <span className="font-semibold text-basalt-900">{formatINR(totalValue)}</span>
      </div>
      <p className="mt-3 text-xs text-stone-500">By placing this order you agree to the seller's return policy shown on each product page.</p>
    </div>
  );
}
