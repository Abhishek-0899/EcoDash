import { create } from "zustand";

interface FashionStoreState {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const useFashionStore = create<FashionStoreState>((set) => ({
  selectedCategory: "",
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),
}));