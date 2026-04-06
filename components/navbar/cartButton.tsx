"use client";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCartStore } from "../store/useCartStore";
export default function Cart() {
  const getTotaLQuantity = useCartStore((s) => s.getTotaLQuantity());
  return (
    <div className="">
      <div className="relative flex justify-between items-center rounded-lg gap-2 border-2 px-2 py-1">
        <AiOutlineShoppingCart size={30} />
        {getTotaLQuantity > 0 && (
          <p className="absolute right-0 top-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center">
            {getTotaLQuantity}
          </p>
        )}
      </div>
    </div>
  );
}
