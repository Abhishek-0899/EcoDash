"use client";
import { AiOutlineHeart } from "react-icons/ai";
import { useWishlistStore } from "@/store/useWishlistStore";

interface WishlistButtonProps {
  id: number;
  size?: number;
}

export default function WishlistButton({
  id,
  size = 30
}: WishlistButtonProps) {
  const { toggleLike, wishlist } = useWishlistStore();

  const isLiked = wishlist.includes(id);
  return (
    <button onClick={() => toggleLike(id)}>
      {isLiked ? (
        <span style={{ fontSize: size }}>❤️</span>
      ) : (
        <AiOutlineHeart size={size} />
      )}
    </button>
  );
}
