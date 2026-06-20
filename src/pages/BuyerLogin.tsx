import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function BuyerLogin() {
  const [stage, setStage] = useState<"mobile" | "otp" | "profile">("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-stone-100 px-5 py-12">
      <div className="grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-lift md:grid-cols-2">
        <div className="relative hidden md:block">
          <img src="https://picsum.photos/seed/buyer-auth/700/900" alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-basalt-900/70 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-stone-50">
            <p className="font-display text-xl font-semibold">Find the exact slab you're picturing.</p>
            <p className="mt-1 text-sm text-stone-200">Filter by color, finish, and size across hundreds of verified showrooms.</p>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <h1 className="font-display text-2xl font-semibold text-basalt-900">
            {stage === "profile" ? "A few last details" : "Sign in to Veine"}
          </h1>
          <p className="mt-1 text-sm text-stone-500">Buy tiles, marble &amp; stone from verified showrooms.</p>

          <AnimatePresence mode="wait">
            {stage === "mobile" && (
              <motion.div key="mobile" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }} className="mt-6">
                <label className="mb-1 block text-xs font-medium text-stone-500">Mobile number</label>
                <input
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-md border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-clay-500"
                />
                <button
                  onClick={() => setStage("otp")}
                  className="mt-5 w-full rounded-full bg-basalt-900 py-3 text-sm font-semibold text-stone-50 transition-transform hover:scale-[1.01] active:scale-95"
                >
                  Send OTP
                </button>
                <p className="mt-4 text-center text-xs text-stone-400">or continue with</p>
                <button className="mt-3 w-full rounded-full border border-stone-300 py-2.5 text-sm font-medium text-basalt-700">Google</button>
              </motion.div>
            )}

            {stage === "otp" && (
              <motion.div key="otp" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }} className="mt-6">
                <p className="mb-3 text-xs text-stone-500">Enter the 4-digit code sent to {mobile || "your number"}</p>
                <div className="flex gap-3">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      value={digit}
                      maxLength={1}
                      onChange={(e) => {
                        const next = [...otp];
                        next[i] = e.target.value.replace(/\D/g, "");
                        setOtp(next);
                      }}
                      className="h-12 w-12 rounded-md border border-stone-300 text-center text-lg font-semibold outline-none focus:border-clay-500"
                    />
                  ))}
                </div>
                <button
                  onClick={() => setStage("profile")}
                  className="mt-5 w-full rounded-full bg-basalt-900 py-3 text-sm font-semibold text-stone-50 transition-transform hover:scale-[1.01] active:scale-95"
                >
                  Verify &amp; continue
                </button>
              </motion.div>
            )}

            {stage === "profile" && (
              <motion.div key="profile" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }} className="mt-6 space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-stone-500">Full name</label>
                  <input className="w-full rounded-md border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-clay-500" placeholder="Arjun Kumar" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-stone-500">Delivery location</label>
                  <div className="flex items-center gap-2 rounded-md border border-stone-300 px-3 py-2.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-clay-500)" strokeWidth="2"><path d="M12 21s7-7.4 7-12a7 7 0 1 0-14 0c0 4.6 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>
                    <input className="flex-1 text-sm outline-none" placeholder="Search your address" />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-stone-500">I am a</label>
                  <div className="flex flex-wrap gap-2">
                    {["Individual", "Contractor", "Architect / Designer", "Builder"].map((t) => (
                      <span key={t} className="rounded-full border border-stone-300 px-3 py-1.5 text-xs font-medium text-basalt-700">{t}</span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => navigate("/")}
                  className="w-full rounded-full bg-clay-500 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.01] active:scale-95"
                >
                  Create account
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
