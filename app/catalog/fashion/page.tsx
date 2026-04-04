"use client";
import Navbar from "@/components/navbar/navbar";
import { useFashionProducts } from "@/components/store/useFetchFashionProducts";
import Image from "next/image";

export default function FashionPage() {
  const { data, isLoading, error } = useFashionProducts();

  const prod = data?.products || [];

  console.log(prod);

  const filterData = prod.filter((item: any) => {
    const c = item.category?.toLowerCase?.() || "";
    return (
      (c.includes("men") || c.includes("women")) &&
      // !c.includes("watches") &&
      // !c.includes("shoes") &&
      // !c.includes("bags")


       (c.includes("men") || c.includes("women")) 
    );
  });
  if (isLoading) return <p>Loading Fashion...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-5 items-center">
        {filterData.length ? (
          filterData.map((p: any) => (
            <div key={p.id} style={{ marginBottom: "20px" }}>
              <p>{p.title}</p>
              <Image src={p.images[0]} width={80} height={80} alt="img"/>
              {/* <p>{p.title}</p>
              <Image src={p.thumbnail} width={80} height={80} /> */}
              {/* Show all product images */}
              {/* <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {p.images.map((img: string, i: number) => (
                  <Image
                    key={i}
                    src={img}
                    width={80}
                    height={80}
                    alt={`${p.title} image ${i}`}
                    style={{ borderRadius: 8 }}
                  />
                ))}
              </div> */}
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </>
  );
}
