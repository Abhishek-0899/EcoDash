"use client";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import Link from "next/link";
import { useRef } from "react";
import Image from "next/image";

interface Products {
  id: number;
  title: string;
  images: string[];
  price: number;
}
interface SliderProps {
  title: string;
  href: string;
  products: Products[];
}

export default function ProductSlider({ title, href,products}: SliderProps) {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const cardWidth = 180;
  const step = cardWidth * 4; // move 5 cards at a time

  const handleNext = () => {
    if (rowRef.current) {
      rowRef.current.scrollLeft += step;
    }
  };

  const handlePrev = () => {
    if (rowRef.current) {
      rowRef.current.scrollLeft -= step;
    }
  };
  return (
    <>
      <div className="px-4 py-6">
        <div className="mb-4 flex items-center gap-3">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <Link
            href={href}
            className="text-xl text-blue-500 hover:text-blue-900"
          >
            See more
          </Link>
        </div>

        <div className="relative flex items-center">
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-0 z-10 rounded-full bg-white text-gray-700 shadow-md cursor-pointer"
            aria-label="Previous products"
          >
            <AiFillLeftCircle size={40} />
          </button>

          <div
            ref={rowRef}
            className="mx-12 flex gap-4 overflow-x-auto hover:overflow-x-auto scroll-smooth"
          >
            {products.map((prod: Products) => (
              <div
                key={prod.id}
                className="min-w-40 min-h-auto rounded-lg border p-3 text-center shadow-sm"
              >
                <Image
                  height={200}
                  width={200}
                  alt={prod.title}
                  src={prod.images[0]}
                  className="mx-auto mb-3 h-35 w-35 rounded-md object-cover"
                />
                <h1 className="text-sm font-medium">{prod.title}</h1>
                <p className="text-md font-bold">{`${prod.price} $`}</p>
              </div>
            ))}
          </div>

          <button
            onClick={handleNext}
            type="button"
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
