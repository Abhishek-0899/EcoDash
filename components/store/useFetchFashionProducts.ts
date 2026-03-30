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
  });
};