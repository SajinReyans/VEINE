import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface FlyingItem {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  image: string;
}

export function useFlyToCart() {
  const [items, setItems] = useState<FlyingItem[]>([]);

  const fly = useCallback((originEl: HTMLElement, image: string) => {
    const target = document.getElementById("cart-icon-target");
    if (!target) return;
    const startRect = originEl.getBoundingClientRect();
    const endRect = target.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setItems((prev) => [
      ...prev,
      {
        id,
        startX: startRect.left + startRect.width / 2,
        startY: startRect.top + startRect.height / 2,
        endX: endRect.left + endRect.width / 2,
        endY: endRect.top + endRect.height / 2,
        image,
      },
    ]);
    setTimeout(() => {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }, 750);
  }, []);

  const portal =
    typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ x: item.startX, y: item.startY, scale: 1, opacity: 1 }}
                animate={{ x: item.endX, y: item.endY, scale: 0.2, opacity: 0.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: 56,
                  height: 56,
                  marginLeft: -28,
                  marginTop: -28,
                  borderRadius: 8,
                  overflow: "hidden",
                  zIndex: 100,
                  boxShadow: "0 12px 24px -8px rgba(0,0,0,0.35)",
                  pointerEvents: "none",
                }}
              >
                <img src={item.image} alt="" className="h-full w-full object-cover" />
              </motion.div>
            ))}
          </AnimatePresence>,
          document.body
        )
      : null;

  return { fly, portal };
}
