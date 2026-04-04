"use client";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import Category from "@/components/layout/category";
import Navbar from "@/components/navbar/navbar";
import { useFashionProducts } from "@/components/store/useFetchFashionProducts";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default function Home() {
  const { data, isLoading, error } = useFashionProducts();
  const [items, setItems] = useState(0);
  if (isLoading) return <p>Loading Fashion...</p>;
  if (error) return <p>Error loading products...</p>;
  // const rowRef = useRef(null);
  
  const fashionData = data?.products ?? [];
  // show only first 15 products
  const limitedData = fashionData.slice(0, 15);

  const displayCount = 9;

  // slice based on items index
  const featureProducts = limitedData.slice(items, items + displayCount);

  // maximum index you can scroll to
  const maxIndex = limitedData.length - displayCount;

  // const cardWidth = 180; // adjust based on your card's width

  // const handleNext = () => {
  //   if (rowRef.current) {
  //     rowRef.current.scrollLeft += cardWidth;
  //   }
  // };

  // const handlePrev = () => {
  //   if (rowRef.current) {
  //     rowRef.current.scrollLeft -= cardWidth;
  //   }
  // };
  const handleNext = () => {
    setItems((prev) => Math.min(prev + 1, maxIndex));
  };
  const handlePrev = () => {
    setItems((prev) => Math.max(prev - 1, 0));
  };

  return (
    <>
      <Navbar />
      <Category />

      <div className="px-4 py-6">
        <div className="mb-4 flex items-center gap-3">
          <h1 className="text-2xl font-semibold">Fashion</h1>
          <Link
            href="/catalog/fashion"
            className="text-xl text-blue-500 hover:text-blue-900"
          >
            See more
          </Link>
        </div>

        <div className="relative flex items-center">
          <button
            hidden={items === 0}
            type="button"
            onClick={handlePrev}
            className="absolute left-0 z-10 rounded-full bg-white text-gray-700 shadow-md cursor-pointer"
            aria-label="Previous products"
          >
            <AiFillLeftCircle size={40} />
          </button>

          <div
            // ref={rowRef}
            className="mx-12 flex gap-4 "
          >
            {featureProducts.map((prod) => (
              <div
                key={prod.id}
                className="min-w-[160px] rounded-lg border p-3 text-center shadow-sm"
              >
                <Image
                  height={140}
                  width={140}
                  alt={prod.title}
                  src={prod.images[0]}
                  className="mx-auto mb-3 h-35 w-35 rounded-md object-cover"
                />
                <h1 className="text-sm font-medium">{prod.title}</h1>
              </div>
            ))}
          </div>

          <button
            onClick={handleNext}
            type="button"
            hidden={items >= maxIndex}
            className="absolute right-0 z-10 rounded-full bg-white text-gray-700 shadow cursor-pointer"
            aria-label="Next products"
          >
            <AiFillRightCircle size={40} />
          </button>
        </div>
      </div>
    </>
  );
}
