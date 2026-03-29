import Navbar from "@/components/navbar/navbar";

export default function WishList() {
    return (
        <>
        <Navbar/>
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Wishlist Page</h1>
            <p>Welcome to your wishlist! Here you can view and manage the products you have added to your wishlist. You can move items to your cart or remove them from your wishlist as needed.</p>
        </div>
        </>
    )
}