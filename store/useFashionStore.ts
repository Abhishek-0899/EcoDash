import { create } from "zustand";

interface FashionStoreState {
  selectedCategory: string;
  setSelectedCategory: (fashion: string) => void;
}

export const useFashionStore = create<FashionStoreState>((set) => ({
  selectedCategory: "",
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),
}));