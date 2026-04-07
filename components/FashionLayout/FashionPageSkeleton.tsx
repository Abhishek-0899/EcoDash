import Navbar from "../navbar/navbar";
import FashionCardSkeleton from "./FashionCardSkeleton";

export function FashionPageSkeleton() {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-5 gap-4 p-4">
        {[...Array(10)].map((_, i) => (
          <FashionCardSkeleton key={i} />
        ))}
      </div>
    </>
  );
}