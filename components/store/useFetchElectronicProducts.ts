"use client";
import { useQuery } from "@tanstack/react-query";

export const useElectronicProducts = () => {
  return useQuery({
    queryKey: ["ElectonicProducts"],

    queryFn: async () => {
      const res = await fetch(
        "https://dummyjson.com/products/category/laptops?limit=200"
        
      );

      if (!res.ok) throw new Error("Failed to fetch products");

      // Convert to JSON before returning
      const data = await res.json();
      return data;
    },

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};