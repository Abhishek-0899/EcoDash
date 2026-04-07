"use client";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCartStore } from "../../store/useCartStore";
export default function Cart() {
  const cart = useCartStore((s) => s.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <div className="">
      <div className="relative flex justify-between items-center rounded-lg gap-2 border-2 px-2 py-1">
        <AiOutlineShoppingCart size={30} />
        {totalItems > 0 && (
          <p className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center">
            {totalItems}
          </p>
        )}
      </div>
    </div>
  );
}
