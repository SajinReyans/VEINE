import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories, facetOptions } from "../data/categories";

export interface FilterState {
  categoryIds: string[];
  color: string[];
  size: string[];
  material: string[];
  pattern: string[];
  style: string[];
}

export const emptyFilters: FilterState = {
  categoryIds: [],
  color: [],
  size: [],
  material: [],
  pattern: [],
  style: [],
};

function FacetSection({
  title,
  options,
  selected,
  onToggle,
  counts,
  defaultOpen = true,
}: {
  title: string;
  options: { id: string; label: string }[];
  selected: string[];
  onToggle: (id: string) => void;
  counts: Record<string, number>;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-stone-200 py-4">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between text-sm font-semibold text-basalt-900">
        {title}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-1.5 pt-3">
              {options.map((opt) => {
                const isSelected = selected.includes(opt.id);
                const count = counts[opt.id] ?? 0;
                return (
                  <label
                    key={opt.id}
                    className={`flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors ${
                      isSelected ? "bg-clay-500/10 text-clay-600" : "text-basalt-700 hover:bg-stone-100"
                    } ${count === 0 ? "opacity-40" : ""}`}
                  >
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggle(opt.id)}
                        className="h-3.5 w-3.5 accent-[var(--color-clay-500)]"
                      />
                      {opt.label}
                    </span>
                    <span className="text-xs text-stone-400">{count}</span>
                  </label>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FilterPanel({
  filters,
  setFilters,
  facetCounts,
}: {
  filters: FilterState;
  setFilters: (f: FilterState) => void;
  facetCounts: {
    categoryIds: Record<string, number>;
    color: Record<string, number>;
    size: Record<string, number>;
    material: Record<string, number>;
    pattern: Record<string, number>;
    style: Record<string, number>;
  };
}) {
  function toggle(key: keyof FilterState, id: string) {
    const current = filters[key];
    const next = current.includes(id) ? current.filter((c) => c !== id) : [...current, id];
    setFilters({ ...filters, [key]: next });
  }

  const activeChips: { key: keyof FilterState; id: string; label: string }[] = [];
  filters.categoryIds.forEach((id) => activeChips.push({ key: "categoryIds", id, label: categories.find((c) => c.id === id)?.label ?? id }));
  (["color", "size", "material", "pattern", "style"] as const).forEach((key) => {
    filters[key].forEach((id) => activeChips.push({ key, id, label: id }));
  });

  return (
    <div className="w-full">
      <AnimatePresence>
        {activeChips.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-3 flex flex-wrap gap-2 overflow-hidden"
          >
            {activeChips.map((chip) => (
              <motion.button
                key={`${chip.key}-${chip.id}`}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={() => toggle(chip.key, chip.id)}
                className="flex items-center gap-1.5 rounded-full bg-basalt-900 px-3 py-1 text-xs font-medium text-stone-50"
              >
                {chip.label}
                <span>&times;</span>
              </motion.button>
            ))}
            <button onClick={() => setFilters(emptyFilters)} className="text-xs font-medium text-clay-600 underline underline-offset-2">
              Clear all
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <FacetSection
        title="Category"
        options={categories.map((c) => ({ id: c.id, label: c.label }))}
        selected={filters.categoryIds}
        onToggle={(id) => toggle("categoryIds", id)}
        counts={facetCounts.categoryIds}
        defaultOpen={false}
      />
      <FacetSection
        title="Color"
        options={facetOptions.color.map((c) => ({ id: c, label: c }))}
        selected={filters.color}
        onToggle={(id) => toggle("color", id)}
        counts={facetCounts.color}
      />
      <FacetSection
        title="Size"
        options={facetOptions.size.map((c) => ({ id: c, label: c }))}
        selected={filters.size}
        onToggle={(id) => toggle("size", id)}
        counts={facetCounts.size}
      />
      <FacetSection
        title="Material"
        options={facetOptions.material.map((c) => ({ id: c, label: c }))}
        selected={filters.material}
        onToggle={(id) => toggle("material", id)}
        counts={facetCounts.material}
      />
      <FacetSection
        title="Pattern"
        options={facetOptions.pattern.map((c) => ({ id: c, label: c }))}
        selected={filters.pattern}
        onToggle={(id) => toggle("pattern", id)}
        counts={facetCounts.pattern}
        defaultOpen={false}
      />
      <FacetSection
        title="Style"
        options={facetOptions.style.map((c) => ({ id: c, label: c }))}
        selected={filters.style}
        onToggle={(id) => toggle("style", id)}
        counts={facetCounts.style}
        defaultOpen={false}
      />
    </div>
  );
}
