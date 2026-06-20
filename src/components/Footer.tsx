import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-100">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <span className="font-display text-xl font-semibold text-basalt-900">Veine</span>
            <p className="mt-2 text-sm text-stone-500">Tiles, marble &amp; stone, sourced from verified showrooms.</p>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-stone-500">Shop</p>
            <ul className="space-y-2 text-sm text-basalt-700">
              <li><Link to="/products?category=floor-tiles" className="hover:text-clay-600">Floor tiles</Link></li>
              <li><Link to="/products?category=marble-slabs" className="hover:text-clay-600">Marble slabs</Link></li>
              <li><Link to="/products?category=tile-adhesive" className="hover:text-clay-600">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-stone-500">Sell</p>
            <ul className="space-y-2 text-sm text-basalt-700">
              <li><Link to="/seller/login" className="hover:text-clay-600">Become a seller</Link></li>
              <li><Link to="/seller/dashboard" className="hover:text-clay-600">Seller dashboard</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-stone-500">Support</p>
            <ul className="space-y-2 text-sm text-basalt-700">
              <li><Link to="/orders/demo" className="hover:text-clay-600">Track an order</Link></li>
              <li><a href="#" className="hover:text-clay-600">Returns &amp; refunds</a></li>
            </ul>
          </div>
        </div>
        <div className="veining-divider mt-10 pt-6 text-center text-xs text-stone-400">© 2026 Veine Marketplace. Demo build.</div>
      </div>
    </footer>
  );
}
