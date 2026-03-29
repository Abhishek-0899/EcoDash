"use client";
import { AiOutlineHeart } from "react-icons/ai";
export default function Wishlist() {
  return (
    <div className="">
      <div className="flex justify-between items-center rounded-lg gap-2 border-2 px-2 py-1">
        <AiOutlineHeart width={3} height={3} />
        <h1>Wishlist</h1>
      </div>
    </div>
  );
}
