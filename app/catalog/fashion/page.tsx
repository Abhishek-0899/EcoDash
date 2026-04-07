"use client";
import Navbar from "@/components/navbar/navbar";
import { useFashionProducts } from "@/store/useFetchFashionProducts";
import StarRating from "@/components/StarRating";
import Image from "next/image";
import Link from "next/link";
import AddtoCartButton from "@/components/AddToCartButton";
import WishlistButton from "@/components/WishListButton";
interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: string;
  rating: string;
}

export default function FashionPage() {
  const { data, isLoading, error } = useFashionProducts();
  const prod = data?.products || [];

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
          filterData.map((p: Product) => {
            // const isLiked = wishlist[p.id] || false;
            // console.log(isLiked);
            return (
              <div
                key={p.id}
                style={{ marginBottom: "20px" }}
                className="flex relative items-center flex-col border-2 rounded-xl shadow-xl transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:border-blue-800"
              >
                <div className="absolute top-2 right-2">
                  <WishlistButton id={p.id} />
                </div>
                <Link
                  href={`/catalog/fashion/${p.id}`}
                  className="flex items-center justify-between bg-gray-100 rounded-md"
                >
                  <Image
                    src={p.images[0]}
                    width={300}
                    height={300}
                    alt="img"
                    className="object-contain"
                    blurDataURL="/placeholder.png"
                    loading="lazy"
                  />
                </Link>
                <p className="font-stretch-50% font-extrabold text-xl">
                  {p.title}
                </p>
                <StarRating rating={p.rating} />
                <p className="font-bold text-xl">{`${p.price} $ `}</p>
                {/* button */}
                <AddtoCartButton
                  id={p.id}
                  title={p.title}
                  price={p.price}
                  images={p.images}
                />
              </div>
            );
          })
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </>
  );
}
