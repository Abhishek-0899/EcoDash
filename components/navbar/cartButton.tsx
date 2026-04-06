"use client";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCartStore } from "@/components/store/useCartStore";

export default function Cart() {
  const total = useCartStore((s) => s.getTotalItems());

  return (
    <div>
      <div className="relative flex justify-between items-center rounded-lg gap-2 border-2 px-2 py-1">
        <AiOutlineShoppingCart size={30} />

        {total > 0 && (
          <p className="absolute right-0 top-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center">
            {total}
          </p>
        )}
      </div>
    </div>
  );
}