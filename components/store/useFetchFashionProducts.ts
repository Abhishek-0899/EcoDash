"use client";
import { useQuery } from "@tanstack/react-query";

export const useFashionProducts = () => {
  return useQuery({
    queryKey: ["fashionProducts"],
    queryFn: async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      if (!res.ok) throw new Error("Failed to fetch fashion products");
      return res.json();
    },

    // ⭐⭐ IMPORTANT ⭐⭐
    staleTime: 1000 * 60 * 5,        // 5 minutes no refetching
    cacheTime: 1000 * 60 * 10,       // keep in memory for 10 minutes

    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};