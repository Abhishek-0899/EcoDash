"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
export default function Electronics() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
    }
    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading…</div>;

  return (
    <>
      <div>
        <h1>{product?.title}</h1>
        <Image
          src={product?.images[0]}
          width={300}
          height={300}
          alt={product?.title}
        />
      </div>
    </>
  );
}
