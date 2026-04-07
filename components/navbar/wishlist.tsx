"use client";
import { useWishlistStore } from "@/store/useWishlistStore";
import { AiOutlineHeart } from "react-icons/ai";
export default function Wishlist() {
  const { wishlist } = useWishlistStore();
  return (
    <div className="">
      <div className="relative flex justify-between items-center rounded-lg gap-2 border-2 px-2 py-1">
        <div className="flex items-center gap-2">
          {wishlist.length > 0 ? (
            <p className="text-xl">❤️</p>
          ) : (
            <AiOutlineHeart width={3} height={3} />
          )}
          <h1>Wishlist</h1>
        </div>
        {wishlist.length > 0 && (
          <p className="absolute -top-2 -right-3 px-2 bg-red-600 rounded-4xl text-white">
            {wishlist.length}
          </p>
        )}
      </div>
    </div>
  );
}
