import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "../data/products";
import { categories } from "../data/categories";
import { ProductCard } from "../components/ProductCard";
import { FilterPanel, emptyFilters, type FilterState } from "../components/FilterPanel";
import { AnimatedCounter } from "../components/AnimatedCounter";

type SortKey = "relevance" | "newest" | "price-asc" | "price-desc" | "rating";

const sortOptions: { id: SortKey; label: string }[] = [
  { id: "relevance", label: "Relevance" },
  { id: "newest", label: "Newest arrivals" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "rating", label: "Avg. customer review" },
];

export function ProductListing() {
  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get("category");
  const urlQuery = searchParams.get("q")?.toLowerCase() ?? "";

  const [filters, setFilters] = useState<FilterState>({
    ...emptyFilters,
    categoryIds: urlCategory ? [urlCategory] : [],
  });
  const [sort, setSort] = useState<SortKey>("relevance");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = products;
    if (urlQuery) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(urlQuery) ||
          p.brand.toLowerCase().includes(urlQuery) ||
          p.categories.some((c) => c.includes(urlQuery)) ||
          p.tags.some((t) => t.includes(urlQuery))
      );
    }
    if (filters.categoryIds.length) list = list.filter((p) => p.categories.some((c) => filters.categoryIds.includes(c)));
    if (filters.color.length) list = list.filter((p) => filters.color.includes(p.color));
    if (filters.size.length) list = list.filter((p) => filters.size.includes(p.size));
    if (filters.material.length) list = list.filter((p) => filters.material.includes(p.material));
    if (filters.pattern.length) list = list.filter((p) => filters.pattern.includes(p.pattern));
    if (filters.style.length) list = list.filter((p) => filters.style.includes(p.style));

    const sorted = [...list];
    switch (sort) {
      case "newest":
        sorted.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
        break;
      case "price-asc":
        sorted.sort((a, b) => a.sellingPrice - b.sellingPrice);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.sellingPrice - a.sellingPrice);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sorted.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured) || b.reviewCount - a.reviewCount);
    }
    return sorted;
  }, [filters, sort, urlQuery]);

  const facetCounts = useMemo(() => {
    function countBy<K extends string>(getKeys: (p: (typeof products)[number]) => K[]) {
      const map: Record<string, number> = {};
      for (const p of products) {
        for (const key of getKeys(p)) {
          map[key] = (map[key] ?? 0) + 1;
        }
      }
      return map;
    }
    return {
      categoryIds: countBy((p) => p.categories),
      color: countBy((p) => [p.color]),
      size: countBy((p) => [p.size]),
      material: countBy((p) => [p.material]),
      pattern: countBy((p) => [p.pattern]),
      style: countBy((p) => [p.style]),
    };
  }, []);

  const heading = urlCategory ? categories.find((c) => c.id === urlCategory)?.label : urlQuery ? `Results for "${urlQuery}"` : "All products";

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-semibold text-basalt-900">{heading}</h1>
        <p className="mt-1 text-sm text-stone-500">
          <AnimatedCounter value={filtered.length} className="font-semibold text-basalt-800" /> products found
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 border-b border-stone-200 pb-4 lg:hidden">
        <button onClick={() => setMobileFiltersOpen(true)} className="rounded-full border border-stone-300 px-4 py-2 text-sm font-medium">
          Filters
        </button>
        <SortDropdown sort={sort} setSort={setSort} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <div className="mb-4 hidden lg:block">
              <SortDropdown sort={sort} setSort={setSort} full />
            </div>
            <FilterPanel filters={filters} setFilters={setFilters} facetCounts={facetCounts} />
          </div>
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-stone-300 py-24 text-center text-stone-500">
              No products match these filters yet. Try clearing a few.
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* mobile filter bottom sheet */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 z-50 bg-basalt-900/40 lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
              className="fixed bottom-0 left-0 right-0 z-50 max-h-[82vh] overflow-y-auto rounded-t-2xl bg-stone-50 p-5 lg:hidden"
            >
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-stone-300" />
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold">Filters</h3>
                <button onClick={() => setMobileFiltersOpen(false)} className="text-sm font-medium text-clay-600">
                  Done
                </button>
              </div>
              <FilterPanel filters={filters} setFilters={setFilters} facetCounts={facetCounts} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function SortDropdown({ sort, setSort, full = false }: { sort: SortKey; setSort: (s: SortKey) => void; full?: boolean }) {
  return (
    <select
      value={sort}
      onChange={(e) => setSort(e.target.value as SortKey)}
      className={`rounded-full border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-basalt-800 outline-none ${full ? "w-full" : ""}`}
    >
      {sortOptions.map((opt) => (
        <option key={opt.id} value={opt.id}>
          Sort: {opt.label}
        </option>
      ))}
    </select>
  );
}
