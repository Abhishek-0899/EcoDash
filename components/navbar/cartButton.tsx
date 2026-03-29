"use client";
import { AiOutlineShoppingCart } from "react-icons/ai"; 
export default function Cart() {
  return (
    <div className="">
      <div className="flex justify-between items-center rounded-lg gap-2 border-2 px-2 py-1">
        <AiOutlineShoppingCart width={3} height={3} />
        <h1>Cart</h1>
      </div>
    </div>
  );
}
