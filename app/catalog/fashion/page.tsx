"use client";
import { MdOutlineDeleteForever } from "react-icons/md";
import Navbar from "@/components/navbar/navbar";
import { useFashionProducts } from "@/components/store/useFetchFashionProducts";
import StarRating from "@/components/StarRating";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/components/store/useCartStore";
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

  const addToCart = useCartStore((s) => s.addToCart);
  const cart = useCartStore((s) => s.cart);
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
            const quantity =
              cart.find((item) => item.id === p.id)?.quantity ?? 0;
            return (
              <div
                key={p.id}
                style={{ marginBottom: "20px" }}
                className="flex items-center flex-col border-2 rounded-xl shadow-xl transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:border-blue-800"
              >
                <p className="font-stretch-50% font-extrabold text-xl">
                  {p.title}
                </p>
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
                <StarRating rating={p.rating} />
                <p className="font-bold text-xl">{`${p.price} $ `}</p>
                {/* <button className="w-full bg-yellow-500 rounded-xl text-2xl font-bold mt-4 p-3">
                Add To cart
              </button> */}

                <div className="flex flex-col items-center gap-2 w-full">
                  {/* Show Add to Cart only if quantity is 0 */}
                  {quantity === 0 && (
                    <button
                      onClick={() =>
                        addToCart({
                          id: p.id,
                          title: p.title,
                          price: p.price,
                          images: p.images,
                        })
                      }
                      className="w-full bg-yellow-500 rounded-xl text-2xl font-bold mt-2 p-3"
                    >
                      Add To Cart
                    </button>
                  )}

                  {/* Show Quantity + Delete if quantity is above 0 */}
                  {quantity > 0 && (
                    <div className=" flex items-center justify-center gap-5 w-full bg-yellow-500 rounded-xl text-2xl font-bold mt-2 p-3">
                      {" "}
                      <p className="bg-black text-white px-4 py-1 rounded-full text-lg">
                        {quantity}
                      </p>
                      <button onClick={() => remove(p.id)}>
                        <MdOutlineDeleteForever size={40} />
                      </button>
                    </div>
                  )}
                </div>
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
