import Navbar from "@/components/navbar/navbar";

export default function Cart() {
  return (
    <>
    <Navbar/>
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <p>Your cart is empty</p>
    </div>
    </>
  );
}
