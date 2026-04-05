"use client";
import Navbar from "@/components/navbar/navbar";
import { useFashionProducts } from "@/components/store/useFetchFashionProducts";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: string;
}

export default function FashionPage() {
  const { data, isLoading, error } = useFashionProducts();

  const prod = data?.products || [];

  // console.log(prod);

  const filterData = prod.filter((item: Product) => {
    const c = item.category?.toLowerCase?.() || "";
    return (
      (c.includes("men") || c.includes("women")) &&
      !c.includes("watches") &&
      !c.includes("shoes") &&
      !c.includes("bags")
    );
  });
  if (isLoading) return <p>Loading Fashion...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-5 items-center p-4 gap-4">
        {filterData.length ? (
          filterData.map((p: Product) => (
            <div
              key={p.id}
              style={{ marginBottom: "20px" }}
              className="flex flex-col rounded-xl border-2 items-center shadow-2xl"
            >
              <p className="font-stretch-50% font-extrabold text-xl">{p.title}</p>
              <Image src={p.images[0]} height={300} width={300} alt="img" />
              <p className="font-bold text-xl">{`${p.price} $ `}</p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </>
  );
}
