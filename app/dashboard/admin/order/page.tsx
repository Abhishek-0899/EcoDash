import Navbar from "@/components/navbar/navbar";

export default function Order() {
  return (
    <>
      <Navbar />
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-4">Order Page</h1>
        <p>
          Welcome to your order page! Here you can view your order details,
          track your shipment, and manage your orders.
        </p>
      </div>
    </>
  );
}
