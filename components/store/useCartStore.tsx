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
  }
}));
