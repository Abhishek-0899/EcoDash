import { create } from "zustand";

interface CartItem {
  id: number;
  title: string;
  price: number;
  images: string[];
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  getQuantity: (id: number) => number;
  increaseItem: (id: number) => void;
  decreaseItem: (id: number) => void;
  deleteItem: (id: number) => void;
  getTotaLQuantity: (id: number) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],

  addToCart: (product) => {
    const cart = get().cart;
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
      set({ cart: [...cart] });
    } else {
      set({ cart: [...cart, { ...product, quantity: 1 }] });
    }
  },

  getQuantity: (id) => {
    const item = get().cart.find((p) => p.id === id);
    return item ? item.quantity : 0;
  },

  getTotalItems: () => {
    return get().cart.reduce((sum, item) => sum + item.quantity, 0);
  },
  increaseItem: (id) => {
    const cart = get().cart;
    const updated = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: (item.quantity += 1),
          }
        : item,
    );
    set({ cart: updated });
  },
  decreaseItem: (id) => {
    const cart = get().cart;
    const updated = cart
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: (item.quantity -= 1),
            }
          : item,
      )
      .filter((item) => item.quantity > 0);
    set({ cart: updated });
  },
  deleteItem: (id) => {
    const cart = get().cart;
    const updated = cart.filter((item) => item.id !== id);
    set({ cart: updated });
  },
  getTotaLQuantity: () => {
    return get().cart.reduce((total, item) => item.quantity + total, 0);
  },
}));
