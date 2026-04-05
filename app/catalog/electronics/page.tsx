"use client";

import Navbar from "@/components/navbar/navbar";
import { useMobileProducts } from "@/components/store/useFetchMobileProducts";
import Image from "next/image";
interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: string;
}
export default function Electronics() {
  const { data, isLoading, error } = useMobileProducts();

  const MData = data?.products || [];

  if (isLoading) return <p>Loading Mobile data...</p>;
  if (error) return <p>Error fetching mobile data.</p>;

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-4 gap-3 items-center p-5">
        {MData.map((item: Product) => {
          return (
            <div
              key={item.id}
              className="flex items-center flex-col border-2 rounded-xl shadow-2xl"
            >
              <p className="font-bold">{item.title}</p>
              <Image
                className="object-cover"
                src={item.images[0]}
                height={300}
                width={300}
                alt="mobile.png"
              />
              <p>{`${item.price} $`}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
