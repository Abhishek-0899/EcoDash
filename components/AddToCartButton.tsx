"use client";

import { AiTwotoneDelete } from "react-icons/ai";
import { useCartStore } from "../store/useCartStore";

interface AddToCartButtonProps {
  id: number;
  title: string;
  price: number;
  images: string[];
}

export default function AddtoCartButton({
  id,
  title,
  price,
  images,
}: AddToCartButtonProps) {
  const cart = useCartStore((s) => s.cart);
  const addToCart = useCartStore((s) => s.addToCart);
  const deleteItem = useCartStore((s) => s.deleteItem);
  const decreaseItem = useCartStore((s) => s.decreaseItem);
  const increaseItem = useCartStore((s) => s.increaseItem);
  const quantity = cart.find((item) => item.id == id)?.quantity ?? 0;
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      {/* Show Add to Cart only if quantity is 0 */}

      {quantity === 0 && (
        <button
          onClick={() =>
            addToCart({
              id: id,
              title: title,
              price: price,
              images: images,
            })
          }
          className="w-full bg-yellow-500 rounded-xl text-2xl font-bold mt-2 p-3"
        >
          Add To Cart
        </button>
      )}

      {/* Show Quantity + Delete if quantity is above 0 */}
      {quantity > 0 && (
        <div className=" flex items-center justify-center gap-5 w-full bg-yellow-500 rounded-xl text-2xl font-bold mt-2 p-3">
          <button onClick={() => deleteItem(id)}>
            <AiTwotoneDelete size={40} />
          </button>
          <div className="flex gap-3">
            <button onClick={() => decreaseItem(id)}>➖</button>
            <p className="bg-black text-white px-4 py-1 rounded-full text-lg">
              {quantity}
            </p>
            <button onClick={() => increaseItem(id)}>➕</button>
          </div>
        </div>
      )}
    </div>
  );
}
