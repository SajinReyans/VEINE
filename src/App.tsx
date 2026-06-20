import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";
import { CartProvider } from "./context/CartContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { ProductListing } from "./pages/ProductListing";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { OrderTracking } from "./pages/OrderTracking";
import { BuyerLogin } from "./pages/BuyerLogin";
import { SellerLogin } from "./pages/SellerLogin";
import { SellerDashboard } from "./pages/SellerDashboard";
import { SellerAddProduct } from "./pages/SellerAddProduct";
import { Sellers } from "./pages/Sellers";
import { SellerStorefront } from "./pages/SellerStorefront";

function BuyerLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<BuyerLayout><Home /></BuyerLayout>} />
        <Route path="/products" element={<BuyerLayout><ProductListing /></BuyerLayout>} />
        <Route path="/products/:id" element={<BuyerLayout><ProductDetail /></BuyerLayout>} />
        <Route path="/cart" element={<BuyerLayout><Cart /></BuyerLayout>} />
        <Route path="/checkout" element={<BuyerLayout><Checkout /></BuyerLayout>} />
        <Route path="/orders/:id" element={<BuyerLayout><OrderTracking /></BuyerLayout>} />
        <Route path="/sellers" element={<BuyerLayout><Sellers /></BuyerLayout>} />
        <Route path="/sellers/:id" element={<BuyerLayout><SellerStorefront /></BuyerLayout>} />
        <Route path="/buyer/login" element={<BuyerLogin />} />
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/seller/dashboard" element={<BuyerLayout><SellerDashboard /></BuyerLayout>} />
        <Route path="/seller/products/new" element={<BuyerLayout><SellerAddProduct /></BuyerLayout>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AnimatedRoutes />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
