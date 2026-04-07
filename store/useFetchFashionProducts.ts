"use client";
import { useQuery } from "@tanstack/react-query";

export const useFashionProducts = () => {
  return useQuery({
    queryKey: ["fashionProducts"],

    queryFn: async () => {
      const res = await fetch("https://dummyjson.com/products?limit=200");
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },

    staleTime: 1000 * 60 * 5,   // 5 minutes → no loading when going back
    gcTime: 1000 * 60 * 10,  // 10 minutes → keep data in memory
    refetchOnWindowFocus: false // prevents unwanted triggers
  });
};