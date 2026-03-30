"use client";
import Category from "@/components/layout/category";
import Navbar from "@/components/navbar/navbar";
import { useFashionProducts } from "@/components/store/useFetchFashionProducts";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiFillRightCircle, AiFillLeftCircle } from "react-icons/ai";

interface FashionItem {
  id: number;
  image: string;
  title: string;
}

export default function Home() {
  const { data, isLoading, error } = useFashionProducts();
  const [startIdx, setStartIdx] = useState(0);
  const [bounce, setBounce] = useState(false);

  const displayCount = 10;
  const endIdx = startIdx + displayCount;

  const items = data ?? [];
  const isLastSlide = endIdx >= items.length;
  console.log(isLastSlide, startIdx, endIdx);

  const handlePrev = () => {
    if (startIdx === 0) {
      triggerBounce();
      return;
    }
    setStartIdx((prev) => prev - 1);
  };

  const handleNext = () => {
    if (isLastSlide) {
      triggerBounce();
      return;
    }
    setStartIdx((prev) => prev + 1);
  };

  const triggerBounce = () => {
    setBounce(true);
    setTimeout(() => setBounce(false), 200);
  };

  const visibleProducts = items.slice(startIdx, endIdx);

  if (isLoading) return <p>Loading Fashion...</p>;
  if (error) return <p>Error loading products...</p>;

  return (
    <>
      <Navbar />

      <div className="px-5">
        <Category />

        <div className="flex items-center ml-8 mt-7 mb-3 gap-7">
          <h1 className="text-2xl font-heading ">Fashion</h1>
          <button className="rounded-xl p-1 border-2 bg-amber-100">
            <Link href={"/catalog/fashion"}>
              <h1 className="text-xl text-blue-700">See more...</h1>
            </Link>
          </button>
        </div>

        <div className="relative flex items-center justify-center">
          {/* FADE LEFT */}
          <div
            className="pointer-events-none absolute left-0 top-0 h-full w-20
            bg-gradient-to-r from-white to-transparent z-10"
          ></div>

          {/* FADE RIGHT */}
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-20
            bg-gradient-to-l from-white to-transparent z-10"
          ></div>

          {/* LEFT BUTTON */}
          <button
            className="absolute -left-5 text-3xl z-20"
            hidden={startIdx === 0}
            onClick={handlePrev}
          >
            <AiFillLeftCircle size={50} />
          </button>

          {/* SLIDER */}
          <div className="overflow-hidden w-full">
            <div
              className={`
                flex gap-4 transition-transform duration-300 ease-out
                ${bounce ? "animate-[wiggle_0.2s_ease]" : ""}
              `}
            >
              {visibleProducts.map((item: FashionItem) => (
                <div
                  key={item.id}
                  className="border p-4 rounded-lg flex justify-center shrink-0"
                >
                  <div className="w-24 h-24 flex items-center mr-5 justify-center bg-white rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      width={80}
                      height={80}
                      alt={item.title}
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT BUTTON */}
          <button
            className="absolute right-0 text-3xl z-20"
            hidden={isLastSlide}
            onClick={handleNext}
          >
            <AiFillRightCircle size={50} />
          </button>
        </div>
      </div>
    </>
  );
}
