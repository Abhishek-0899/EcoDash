"use client";
import Image from "next/image";
import Search from "../search";
import Wishlist from "../wishlist";
import Cart from "../cart";
import Profile from "../profile";
export default function Navbar() {
  return (
    // parent div
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-2">
        <Image src="/logoId.png" width={50} height={50} alt="plng" />
        <h1 className="text-xl font-bold">Ecodash</h1>
      </div>

      <div className="flex-1 mx-4">
        <Search />
      </div>

      <div className="flex gap-5 items-center">
        <Wishlist />
        <Cart />
        <Profile />
      </div>
    </div>
  );
}
