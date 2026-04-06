"use client";
import Link from "next/link";
import Navbar from "@/components/navbar/navbar";
import { useElectronicProducts } from "@/components/store/useFetchElectronicProducts";
import StarRating from "@/components/StarRating";
import Image from "next/image";

interface Product {
  rating: number;
  id: number;
  title: string;
  price: number;
  images: string[];
  category: string;
}

export default function ElectronicsPage() {
  const { data, isLoading, error } = useElectronicProducts();
  const products = data?.products || [];

  if (isLoading) return <p>Loading Electronics...</p>;
  if (error) return <p>Error fetching electronics.</p>;

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-4 gap-4 p-5">
        {products.length ? (
          products.map((item: Product) => (
            <Link
              key={item.id}
              href={`/catalog/electronics/${item.id}`}
              className="flex flex-col items-center border-2 rounded-xl shadow-xl p-4 transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-800"
            >
              <p className="font-bold text-center">{item.id}</p>
              <p className="font-bold text-center">{item.title}</p>
              <div className="flex items-center justify-center bg-gray-100 rounded-md p-2">
                <Image
                  className="object-contain"
                  src={item.images[0]}
                  height={300}
                  width={300}
                  alt={item.title}
                  blurDataURL="/placeholder.png"
                  loading="lazy"
                />
              </div>
              <StarRating rating={item.rating} />
              <p className="font-bold mt-2">{`${item.price} $`}</p>
              <button className="w-full bg-yellow-500 rounded-xl text-2xl font-bold mt-4 p-3">
                Add To cart
              </button>
            </Link>
          ))
        ) : (
          <p>No electronics products found.</p>
        )}
      </div>
    </>
  );
}
