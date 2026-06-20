import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "../data/categories";

const steps = [
  "Basic Info",
  "Media",
  "Description",
  "Pricing",
  "Inventory",
  "Variants",
  "Specifications",
  "Shipping",
  "Seller Info",
  "Compliance",
  "SEO",
  "Review",
];

interface FormState {
  title: string;
  brand: string;
  categoryIds: string[];
  model: string;
  sku: string;
  images: string[];
  shortDescription: string;
  highlights: string;
  fullDescription: string;
  sellingPrice: string;
  mrp: string;
  pricingUnit: string;
  stock: string;
  availability: string;
  warehouse: string;
  size: string;
  color: string;
  packQty: string;
  dimensions: string;
  weight: string;
  technicalSpecs: string;
  deliveryRegions: string;
  shippingCharge: string;
  deliveryTime: string;
  returnPolicy: string;
  warranty: string;
  certifications: string;
  countryOfOrigin: string;
  keywords: string;
}

const initialForm: FormState = {
  title: "",
  brand: "",
  categoryIds: [],
  model: "",
  sku: "",
  images: [],
  shortDescription: "",
  highlights: "",
  fullDescription: "",
  sellingPrice: "",
  mrp: "",
  pricingUnit: "sqft",
  stock: "",
  availability: "In Stock",
  warehouse: "Main warehouse — Chennai",
  size: "600x600mm",
  color: "White",
  packQty: "",
  dimensions: "",
  weight: "",
  technicalSpecs: "",
  deliveryRegions: "",
  shippingCharge: "",
  deliveryTime: "4-7 business days",
  returnPolicy: "7-day replacement for damaged tiles",
  warranty: "1 Year",
  certifications: "",
  countryOfOrigin: "India",
  keywords: "",
};

export function SellerAddProduct() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const previewImage = form.images[0] ?? "https://picsum.photos/seed/new-product-preview/700/700";
  const progressPct = ((step + 1) / steps.length) * 100;

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-6 py-28 text-center">
        <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 14 }}>
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-moss-500 text-white">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="font-display text-2xl font-semibold text-basalt-900">Listing submitted</h1>
          <p className="mt-2 text-sm text-stone-500">"{form.title || "Your product"}" is now live in your catalog.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
      <h1 className="font-display text-2xl font-semibold text-basalt-900 md:text-3xl">Add a product</h1>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr_300px]">
        {/* Step sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <div className="mb-3 h-1 w-full overflow-hidden rounded-full bg-stone-200">
              <motion.div className="h-full bg-clay-500" animate={{ width: `${progressPct}%` }} transition={{ duration: 0.4 }} />
            </div>
            <ol className="space-y-1">
              {steps.map((label, i) => (
                <li key={label}>
                  <button
                    onClick={() => setStep(i)}
                    className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm transition-colors ${
                      i === step ? "bg-clay-500/10 font-semibold text-clay-600" : i < step ? "text-moss-600" : "text-stone-400"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${
                        i < step ? "bg-moss-500 text-white" : i === step ? "bg-clay-500 text-white" : "bg-stone-200 text-stone-500"
                      }`}
                    >
                      {i < step ? "✓" : i + 1}
                    </span>
                    {label}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Form panel */}
        <div className="rounded-xl border border-stone-200 bg-white p-6">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
              {step === 0 && <BasicInfoStep form={form} update={update} />}
              {step === 1 && <MediaStep form={form} update={update} />}
              {step === 2 && <DescriptionStep form={form} update={update} />}
              {step === 3 && <PricingStep form={form} update={update} />}
              {step === 4 && <InventoryStep form={form} update={update} />}
              {step === 5 && <VariantsStep form={form} update={update} />}
              {step === 6 && <SpecsStep form={form} update={update} />}
              {step === 7 && <ShippingStep form={form} update={update} />}
              {step === 8 && <SellerInfoStep form={form} update={update} />}
              {step === 9 && <ComplianceStep form={form} update={update} />}
              {step === 10 && <SeoStep form={form} update={update} />}
              {step === 11 && <ReviewStep form={form} />}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-between border-t border-stone-100 pt-5">
            <button
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="rounded-full border border-stone-300 px-5 py-2.5 text-sm font-medium text-basalt-700 disabled:opacity-30"
            >
              Back
            </button>
            <div className="flex gap-2">
              <button className="rounded-full border border-stone-300 px-5 py-2.5 text-sm font-medium text-basalt-700">Save draft</button>
              <button
                onClick={() => (step === steps.length - 1 ? setSubmitted(true) : setStep((s) => s + 1))}
                className="rounded-full bg-basalt-900 px-6 py-2.5 text-sm font-semibold text-stone-50 transition-transform hover:scale-[1.02] active:scale-95"
              >
                {step === steps.length - 1 ? "Submit listing" : "Continue"}
              </button>
            </div>
          </div>
        </div>

        {/* Live preview */}
        <div className="hidden lg:block">
          <div className="sticky top-24 rounded-xl border border-stone-200 bg-white p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-stone-500">Live preview</p>
            <div className="aspect-square overflow-hidden rounded-lg bg-stone-100">
              <img src={previewImage} alt="" className="h-full w-full object-cover" />
            </div>
            <p className="mt-3 text-[11px] font-medium uppercase tracking-wide text-stone-500">{form.brand || "Your brand"}</p>
            <motion.h3 key={form.title} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} className="font-display text-base font-semibold text-basalt-900">
              {form.title || "Untitled product"}
            </motion.h3>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-display text-lg font-semibold text-basalt-900">₹{form.sellingPrice || "—"}</span>
              <span className="text-xs text-stone-500">/ {form.pricingUnit}</span>
            </div>
            {form.categoryIds.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {form.categoryIds.slice(0, 3).map((id) => (
                  <span key={id} className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] text-basalt-700">
                    {categories.find((c) => c.id === id)?.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Step components ---------- */

type StepProps = { form: FormState; update: <K extends keyof FormState>(key: K, value: FormState[K]) => void };

function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-1 block text-xs font-medium text-stone-500">{children}</label>;
}
function Input({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm outline-none focus:border-clay-500"
    />
  );
}
function TextArea({ value, onChange, placeholder, rows = 4 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm outline-none focus:border-clay-500"
    />
  );
}
function StepTitle({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
  return (
    <div className="mb-5">
      <h2 className="font-display text-lg font-semibold text-basalt-900">{children}</h2>
      {subtitle && <p className="mt-0.5 text-xs text-stone-500">{subtitle}</p>}
    </div>
  );
}

function BasicInfoStep({ form, update }: StepProps) {
  return (
    <div>
      <StepTitle subtitle="The core identity of your listing.">Basic information</StepTitle>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2"><Label>Product title</Label><Input value={form.title} onChange={(v) => update("title", v)} placeholder="Calacatta Gloss Vitrified Floor Tile" /></div>
        <div><Label>Brand name</Label><Input value={form.brand} onChange={(v) => update("brand", v)} placeholder="Kavery Stone" /></div>
        <div><Label>Model name / number</Label><Input value={form.model} onChange={(v) => update("model", v)} placeholder="KS-CG-6012" /></div>
        <div><Label>SKU / seller code</Label><Input value={form.sku} onChange={(v) => update("sku", v)} placeholder="SKU-00231" /></div>
        <div><Label>Product ID (UPC / EAN / ISBN)</Label><Input value="" onChange={() => {}} placeholder="Optional" /></div>
      </div>
      <div className="mt-4">
        <Label>Product category (select all that apply)</Label>
        <div className="flex max-h-44 flex-wrap gap-2 overflow-y-auto rounded-md border border-stone-200 p-3">
          {categories.map((c) => {
            const selected = form.categoryIds.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => update("categoryIds", selected ? form.categoryIds.filter((id) => id !== c.id) : [...form.categoryIds, c.id])}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  selected ? "border-clay-500 bg-clay-500/10 text-clay-600" : "border-stone-300 text-basalt-700"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MediaStep({ form, update }: StepProps) {
  const sampleImages = ["a", "b", "c", "d"].map((s) => `https://picsum.photos/seed/upload-${s}/400/400`);
  return (
    <div>
      <StepTitle subtitle="Buyers zoom into tile texture before anything else — add at least 3 images.">Media</StepTitle>
      <Label>Product images</Label>
      <div className="grid grid-cols-4 gap-3">
        {sampleImages.map((img) => {
          const active = form.images.includes(img);
          return (
            <button
              key={img}
              onClick={() => update("images", active ? form.images.filter((x) => x !== img) : [...form.images, img])}
              className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-colors ${active ? "border-clay-500" : "border-dashed border-stone-300"}`}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
              {active && <div className="absolute right-1 top-1 rounded-full bg-clay-500 px-1.5 text-[10px] font-semibold text-white">{form.images.indexOf(img) + 1}</div>}
              {!active && <div className="absolute inset-0 flex items-center justify-center bg-white/60 text-xs font-medium text-basalt-700">Click to add</div>}
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-stone-400">Demo uploader — click placeholder tiles to simulate adding photos, drag to reorder in production.</p>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div><Label>Video (optional)</Label><Input value="" onChange={() => {}} placeholder="YouTube link or upload" /></div>
        <div><Label>360° view</Label><Input value="" onChange={() => {}} placeholder="Upload spin-frame sequence" /></div>
      </div>
    </div>
  );
}

function DescriptionStep({ form, update }: StepProps) {
  return (
    <div className="space-y-4">
      <StepTitle subtitle="Help buyers picture this on their floor or wall.">Description</StepTitle>
      <div><Label>Short description</Label><Input value={form.shortDescription} onChange={(v) => update("shortDescription", v)} placeholder="One line for search cards" /></div>
      <div><Label>Bullet point highlights (one per line)</Label><TextArea value={form.highlights} onChange={(v) => update("highlights", v)} rows={4} placeholder={"High gloss finish\nScratch resistant\nRectified edges"} /></div>
      <div><Label>Full product description</Label><TextArea value={form.fullDescription} onChange={(v) => update("fullDescription", v)} rows={6} /></div>
    </div>
  );
}

function PricingStep({ form, update }: StepProps) {
  const discount = form.mrp && form.sellingPrice ? Math.round(((Number(form.mrp) - Number(form.sellingPrice)) / Number(form.mrp)) * 100) : 0;
  return (
    <div>
      <StepTitle subtitle="Tiles sell by box or sq.ft, not always 'each' — set the right unit.">Pricing</StepTitle>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div><Label>Selling price (₹)</Label><Input value={form.sellingPrice} onChange={(v) => update("sellingPrice", v.replace(/\D/g, ""))} placeholder="78" /></div>
        <div><Label>MRP / list price (₹)</Label><Input value={form.mrp} onChange={(v) => update("mrp", v.replace(/\D/g, ""))} placeholder="95" /></div>
        <div>
          <Label>Pricing unit</Label>
          <select value={form.pricingUnit} onChange={(e) => update("pricingUnit", e.target.value)} className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm outline-none">
            <option value="sqft">Per sq.ft</option>
            <option value="box">Per box</option>
            <option value="piece">Per piece</option>
            <option value="slab">Per slab</option>
          </select>
        </div>
        <div className="flex items-end">
          <motion.div key={discount} initial={{ scale: 1.15 }} animate={{ scale: 1 }} className="rounded-md bg-moss-500/10 px-3 py-2 text-sm font-semibold text-moss-600">
            {discount > 0 ? `${discount}% discount` : "Enter both prices"}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function InventoryStep({ form, update }: StepProps) {
  return (
    <div>
      <StepTitle>Inventory</StepTitle>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div><Label>Stock quantity</Label><Input value={form.stock} onChange={(v) => update("stock", v.replace(/\D/g, ""))} placeholder="4200" /></div>
        <div>
          <Label>Availability status</Label>
          <select value={form.availability} onChange={(e) => update("availability", e.target.value)} className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm outline-none">
            <option>In Stock</option>
            <option>Out of Stock</option>
            <option>Made to Order</option>
            <option>Pre-Order</option>
          </select>
        </div>
        <div className="sm:col-span-2"><Label>Warehouse location</Label><Input value={form.warehouse} onChange={(v) => update("warehouse", v)} /></div>
      </div>
    </div>
  );
}

function VariantsStep({ form, update }: StepProps) {
  return (
    <div>
      <StepTitle subtitle="Each combination can carry its own price/stock override later.">Variants</StepTitle>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div><Label>Size</Label><Input value={form.size} onChange={(v) => update("size", v)} placeholder="600x600mm" /></div>
        <div><Label>Color</Label><Input value={form.color} onChange={(v) => update("color", v)} placeholder="White" /></div>
        <div><Label>Pack quantity</Label><Input value={form.packQty} onChange={(v) => update("packQty", v)} placeholder="Tiles per box" /></div>
      </div>
    </div>
  );
}

function SpecsStep({ form, update }: StepProps) {
  return (
    <div>
      <StepTitle>Specifications</StepTitle>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div><Label>Dimensions</Label><Input value={form.dimensions} onChange={(v) => update("dimensions", v)} placeholder="600 x 1200 x 9 mm" /></div>
        <div><Label>Weight</Label><Input value={form.weight} onChange={(v) => update("weight", v)} placeholder="22 kg / box" /></div>
        <div className="sm:col-span-2"><Label>Technical specifications</Label><TextArea value={form.technicalSpecs} onChange={(v) => update("technicalSpecs", v)} rows={3} placeholder="Water absorption %, PEI rating, slip resistance..." /></div>
      </div>
    </div>
  );
}

function ShippingStep({ form, update }: StepProps) {
  return (
    <div>
      <StepTitle>Shipping</StepTitle>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div><Label>Delivery regions</Label><Input value={form.deliveryRegions} onChange={(v) => update("deliveryRegions", v)} placeholder="Tamil Nadu, Karnataka, AP" /></div>
        <div><Label>Shipping charge (₹)</Label><Input value={form.shippingCharge} onChange={(v) => update("shippingCharge", v)} placeholder="Flat / calculated / free above ₹5000" /></div>
        <div className="sm:col-span-2"><Label>Delivery time estimate</Label><Input value={form.deliveryTime} onChange={(v) => update("deliveryTime", v)} /></div>
      </div>
    </div>
  );
}

function SellerInfoStep({ form, update }: StepProps) {
  return (
    <div>
      <StepTitle subtitle="Pre-filled from your store profile — override for this listing if needed.">Seller information</StepTitle>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div><Label>Store name</Label><Input value="Kavery Stone Gallery" onChange={() => {}} /></div>
        <div><Label>Seller name</Label><Input value="Kavery Murthy" onChange={() => {}} /></div>
        <div className="sm:col-span-2"><Label>Return policy</Label><TextArea value={form.returnPolicy} onChange={(v) => update("returnPolicy", v)} rows={2} /></div>
      </div>
    </div>
  );
}

function ComplianceStep({ form, update }: StepProps) {
  return (
    <div>
      <StepTitle>Compliance</StepTitle>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div><Label>Warranty</Label><Input value={form.warranty} onChange={(v) => update("warranty", v)} /></div>
        <div><Label>Country of origin</Label><Input value={form.countryOfOrigin} onChange={(v) => update("countryOfOrigin", v)} /></div>
        <div className="sm:col-span-2"><Label>Certifications</Label><Input value={form.certifications} onChange={(v) => update("certifications", v)} placeholder="ISI, GreenPro, CE..." /></div>
      </div>
    </div>
  );
}

function SeoStep({ form, update }: StepProps) {
  return (
    <div>
      <StepTitle subtitle="Customer-facing keywords show as tags; backend keywords stay hidden in search index.">SEO &amp; discovery</StepTitle>
      <Label>Search keywords (comma separated)</Label>
      <Input value={form.keywords} onChange={(v) => update("keywords", v)} placeholder="glossy tile, marble finish, living room floor" />
      <div className="mt-2 flex flex-wrap gap-1.5">
        {form.keywords.split(",").map((k) => k.trim()).filter(Boolean).map((k) => (
          <motion.span key={k} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-full bg-stone-100 px-2.5 py-1 text-xs text-basalt-700">
            {k}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function ReviewStep({ form }: { form: FormState }) {
  const missing = [
    !form.title && "Product title",
    !form.sellingPrice && "Selling price",
    form.images.length < 3 && "At least 3 images recommended",
  ].filter(Boolean) as string[];

  return (
    <div>
      <StepTitle subtitle="Everything below is exactly what buyers will see on the product page.">Review &amp; publish</StepTitle>
      {missing.length > 0 && (
        <div className="mb-4 rounded-lg border border-clay-400/40 bg-clay-500/5 p-3 text-sm text-clay-600">
          <p className="font-semibold">Before you publish:</p>
          <ul className="mt-1 list-disc pl-5">
            {missing.map((m) => <li key={m}>{m}</li>)}
          </ul>
        </div>
      )}
      <div className="rounded-lg border border-stone-200 p-4 text-sm text-basalt-700">
        <p><span className="font-medium text-basalt-900">{form.title || "Untitled product"}</span> by {form.brand || "—"}</p>
        <p className="mt-1">₹{form.sellingPrice || "—"} / {form.pricingUnit} &middot; {form.stock || "0"} in stock &middot; {form.categoryIds.length} categories tagged</p>
      </div>
    </div>
  );
}
