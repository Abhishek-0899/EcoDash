"use client";

import Category from "@/components/layout/category";
import Navbar from "@/components/layout/navbar";

export default function SellerDashboard() {
  return (
    <>
      <Navbar />
      <div className="px-5">
        <Category />
      </div>
    </>
  );
}
