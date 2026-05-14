import type { CartItem, CartState } from "@/types/marketplace";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CART_KEY = "devmarket-cart";

const CartContext = createContext<CartState | null>(null);

function serializeItems(items: CartItem[]): string {
  return JSON.stringify(items, (_key, val) =>
    typeof val === "bigint" ? `${val.toString()}n` : val,
  );
}

function deserializeItems(raw: string): CartItem[] {
  return JSON.parse(raw, (_key, val) => {
    if (typeof val === "string" && val.endsWith("n") && /^\d+n$/.test(val)) {
      return BigInt(val.slice(0, -1));
    }
    return val;
  });
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? deserializeItems(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, serializeItems(items));
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) return prev;
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: bigint) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: bigint, quantity: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId
          ? { ...i, quantity: Math.max(1, quantity) }
          : i,
      ),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const hasItem = useCallback(
    (productId: bigint) => items.some((i) => i.productId === productId),
    [items],
  );

  const totalCount = useMemo(
    () => items.reduce((s, i) => s + i.quantity, 0),
    [items],
  );
  const totalAmount = useMemo(
    () =>
      items.reduce((s, i) => s + i.priceUsd * BigInt(i.quantity), BigInt(0)),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      totalCount,
      totalAmount,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      hasItem,
    }),
    [
      items,
      totalCount,
      totalAmount,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      hasItem,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartState {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
