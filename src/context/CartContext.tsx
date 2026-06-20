import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { CartLine } from "../lib/types";
import { products } from "../data/products";

interface CartContextValue {
  lines: CartLine[];
  addToCart: (productId: string, variantId: string, quantity?: number) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  removeLine: (productId: string, variantId: string) => void;
  totalItems: number;
  totalValue: number;
  flyTrigger: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([
    { productId: "p1", variantId: "v1", quantity: 120 },
    { productId: "p13", variantId: "v1", quantity: 2 },
  ]);
  const [flyTrigger, setFlyTrigger] = useState(0);

  function addToCart(productId: string, variantId: string, quantity = 1) {
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === productId && l.variantId === variantId);
      if (existing) {
        return prev.map((l) =>
          l.productId === productId && l.variantId === variantId
            ? { ...l, quantity: l.quantity + quantity }
            : l
        );
      }
      return [...prev, { productId, variantId, quantity }];
    });
    setFlyTrigger((n) => n + 1);
  }

  function updateQuantity(productId: string, variantId: string, quantity: number) {
    setLines((prev) =>
      prev
        .map((l) => (l.productId === productId && l.variantId === variantId ? { ...l, quantity } : l))
        .filter((l) => l.quantity > 0)
    );
  }

  function removeLine(productId: string, variantId: string) {
    setLines((prev) => prev.filter((l) => !(l.productId === productId && l.variantId === variantId)));
  }

  const totalItems = lines.reduce((sum, l) => sum + l.quantity, 0);

  const totalValue = useMemo(() => {
    return lines.reduce((sum, l) => {
      const product = products.find((p) => p.id === l.productId);
      if (!product) return sum;
      const variant = product.variants.find((v) => v.id === l.variantId);
      const price = variant?.priceOverride ?? product.sellingPrice;
      return sum + price * l.quantity;
    }, 0);
  }, [lines]);

  return (
    <CartContext.Provider value={{ lines, addToCart, updateQuantity, removeLine, totalItems, totalValue, flyTrigger }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
