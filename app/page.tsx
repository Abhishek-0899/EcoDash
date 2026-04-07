"use client";
import Category from "@/components/layout/category";
import ProductSlider from "@/components/layout/ProductSlider";
import ProductSliderSkeleton from "@/components/layout/ProductSliderSkeleton";
import Navbar from "@/components/navbar/navbar";
import { useElectronicProducts } from "@/store/useFetchElectronicProducts";
import { useFashionProducts } from "@/store/useFetchFashionProducts";

export default function Home() {
  const { data: fashionData, isLoading, error } = useFashionProducts();
  const {
    data: Electronis,
    isLoading: isLoadingMobile,
    error: errorMobile,
  } = useElectronicProducts();

  const errorState = error || errorMobile;

  if (errorState) return <p>Error loading products...</p>;

  const FashionProd = fashionData?.products?.slice(0, 15) ?? [];
  const ElectronicData = Electronis?.products?.slice(0, 10) ?? [];

  return (
    <>
      <Navbar />
      <Category />
      {isLoading ? (
        <ProductSliderSkeleton />
      ) : (
        <ProductSlider
          title="Fashion"
          href={"/catalog/fashion"}
          products={FashionProd}
        />
      )}

      {isLoadingMobile ? (
        <ProductSliderSkeleton />
      ) : (
        <ProductSlider
          title="Electronis"
          href={"/catalog/electronics"}
          products={ElectronicData}
        />
      )}
    </>
  );
}
