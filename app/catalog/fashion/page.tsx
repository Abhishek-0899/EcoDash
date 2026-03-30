"use client";

import Navbar from "@/components/navbar/navbar";
import { useFashionProducts } from "@/components/store/useFetchFashionProducts";
import Image from "next/image";

interface FashionItem {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

export default function FashionPage() {
  const { data, isLoading, error } = useFashionProducts();

  if (isLoading) return <p>Loading Fashion...</p>;
  if (error) return <p>Error loading products</p>;
const categories = data ? [...new Set(data.map((item: FashionItem) => item.category))] : [];
console.log(categories)
  // const keywords = ["men", "man", "women", "woman", "mens", "womens"];
  const keywords = ['men\'s clothing', 'women\'s clothing'];

  const fashionItems = data?.filter((item: FashionItem) => {
    const txt = JSON.stringify(item).toLowerCase();
    return keywords.some((k) => txt.includes(k));
  });
// men's clothing,jewelery,electronics,women's clothing
  console.log(fashionItems);

  return (
    <>
      <Navbar />

      <div className="p-4 grid grid-cols-2 gap-4">
        {fashionItems?.map((item: FashionItem) => (
          <div key={item.id} className="border p-4 rounded-lg">
            <div className="w-20 h-20 flex gap-6 items-center justify-center overflow-hidden">
              <Image
                src={item.image}
                width={80}
                height={80}
                alt={item.title}
                className="object-contain"
              />
              {/* <p className="text-xl">{item.title}</p>
              <p className="text-xl">{item.price}</p> */}
            </div>
      
          </div>
        ))}
      </div>
    </>
  );
}
