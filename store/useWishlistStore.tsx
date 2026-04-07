import { create } from "zustand";

interface WishlistState {
  wishlist: number[];
  toggleLike: (id: number) => void;
}

export const useWishlistStore = create<WishlistState>((set) => ({
  wishlist: [],
  toggleLike: (id) => {
    set((state) => ({
      wishlist: state.wishlist.includes(id)
        ? state.wishlist.filter((x) => x !== id)
        : [...state.wishlist, id],
    }));
  },
}));
