"use client";
import Category from "@/components/layout/category";
import ProductSlider from "@/components/layout/ProductSlider";
import Navbar from "@/components/navbar/navbar";
import { useElectronicProducts } from "@/store/useFetchElectronicProducts";
import { useFashionProducts } from "@/store/useFetchFashionProducts";

export default function Home() {
  const { data: fashionData, isLoading, error } = useFashionProducts();
  const {data:Electronis, isLoading: isLoadingMobile, error: errorMobile} = useElectronicProducts()

const loading = isLoading || isLoadingMobile
const errorState = error ||  errorMobile

  if (loading) return <p>Loading ...</p>;
  if (errorState) return <p>Error loading products...</p>;

  const FashionProd = fashionData?.products?.slice(0, 15) ?? [];
  const ElectronicData = Electronis?.products?.slice(0, 10) ?? [];


  return (
    <>
      <Navbar />
      <Category />

      <ProductSlider
        title="Fashion"
        href={"/catalog/fashion"}
        products={FashionProd}
      />
      <ProductSlider
        title="Electronis"
        href={"/catalog/electronics"}
        products={ElectronicData}
      />
    </>
  );
}
