"use client";
import Category from "@/components/layout/category";
import Navbar from "@/components/navbar/navbar";
import { useFashionProducts } from "@/components/store/useFetchFashionProducts";
import Image from "next/image";
import { AiFillRightCircle } from "react-icons/ai";
import { AiFillLeftCircle } from "react-icons/ai";

interface FashionItem {
  id: number;
  image: string;
  title: string;
}

export default function Home() {
  const { data, isLoading, error } = useFashionProducts();

  if (isLoading) return <p>Loading Fashion...</p>;
  if (error) return <p>Error loading products</p>;
  return (
    <>
      <Navbar />

      <div className="px-5">
        <Category />
        <div className="flex items-center relative">
          <AiFillRightCircle width={100} height={100} />
          <div className="flex overflow-hidden gap-4">
            {data?.map((item: FashionItem) => {
              return (
                <div
                  key={item.id}
                  className="border p-4 rounded-lg flex justify-center"
                >
                  <div className="w-24 h-24 flex items-center justify-center bg-white rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      width={80}
                      height={80}
                      alt={item.title}
                      className="object-contain"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        <AiFillLeftCircle width={100} height={100} />
        </div>
      </div>
    </>
  );
}
