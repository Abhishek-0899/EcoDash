"use client";
import Image from "next/image";
import React, { useState } from "react";
import { MdOutlineStorefront } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const supabase = createClient();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("Admin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [storeName, setStoreName] = useState("");

  const [loading, setloading] = useState(false);

  const rolesType = [
    {
      logo: MdAdminPanelSettings,
      role: "Admin",
      Info: "Manage users, approvals,settings, and platform operations.",
    },
    {
      logo: MdOutlineStorefront,
      role: "Seller",
      Info: "Open your store, list products, and manage incoming orders",
    },
    {
      logo: FiUsers,
      role: "User",
      Info: "Shop products, place orders, and manage your purchases.",
    },
  ];

  const features = [
    {
      title:
        "Monitor platform activity, manage seller, review disputes, and control permissions.",
      imgSrc: "/logo.png",
    },
    {
      title:
        "Launch your store, manage products, track orders and monitor payouts in one place",
      imgSrc: "/logo.png",
    },
    {
      title:
        "Browse products, manage orders, save addressess, and keep track of your activity",
      imgSrc: "/logo.png",
    },
  ];

  const FeatureCard = ({
    title,
    imgSrc,
  }: {
    title: string;
    imgSrc: string;
  }) => (
    <div className="flex rounded-3xl shadow-lg bg-white items-center gap-4 mb-4 mt-6 p-4">
      <Image
        src={imgSrc}
        alt="Feature Image"
        width={60}
        height={60}
        className="rounded-full"
      />
      <h3 className="text-gray-800">{title}</h3>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    setloading(true);
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      toast.error("Please fill all required fields");
      setloading(false);
      return;
    }
    if (!email.includes("@")) {
      toast.error("Enter a valid email");
      setloading(false);
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setloading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setloading(false);

      return;
    }
    if (!storeName && selectedRole === "Seller") {
      toast.error("Store name required");
      setloading(false);
      return;
    }
    const { data: profileData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: selectedRole,
          ...(selectedRole === "Seller" && { store_name: storeName }),
        },
      },
    });
    if (error) {
      toast.error(error.message);
    }
    toast.success("Signup successful 🎉");
    const role = profileData?.user?.user_metadata?.role.toLowerCase()
    console.log("role", role)
    if (!role) {
      router.push("/login");
    }
    if (role === "admin") {
      router.push("/dashboard/admin");
    } else if (role === "seller") {
      router.push("/dashboard/seller");
    } else {
      router.push("/");
    }
  };

  const handleGoogle = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://uqezvcerovmpbpspxvns.supabase.co/auth/v1/callback",
      },
    });
    toast.success("Signup successful 🎉");
  };

  return (
    // left
    <div className="bg-green-50 min-h-screen w-full">
      <div className="md:flex items-center p-4 hidden">
        <Image src="/logo.png" alt="Product Image" width={60} height={60} />
        <h1 className="ml-4 text-2xl font-bold">Ecodash Platform</h1>
      </div>

      {/* Main layout */}
      <div className="flex md:flex-row flex-col min-h-screen">
        {/* Left side (features) - hide on mobile */}
        <div className="hidden md:flex w-1/2 bg-green-50 px-10 py-10 flex-col">
          <div className="">
            <h1 className="text-xl font-bold text-green-900 mt-2 mb-10 ">
              {" "}
              Role based ecommerce access
            </h1>
            <h1 className="font-bold text-black text-6xl mb-7">
              Create an account for your admin, seller, or customer workspace.
            </h1>
            <p className="text-2xl text-gray-500 font-semibold">
              Set up the right role from the start. Each account gets a tailored
              dashboard, access permissions, and sign in path inside the same
              EcoDash platform.
            </p>

            {features.map((feature, idx) => (
              <FeatureCard
                key={idx}
                title={feature.title}
                imgSrc={feature.imgSrc}
              />
            ))}
          </div>
        </div>

        {/* Right side (Signup) */}

        <div className="w-full md:w-1/2 bg-green-100 flex justify-center items-center p-6">
          {/* Signup  */}

          <div className="rounded-2xl  md:-translate-y-30 translate-y-10  shadow-2xl backdrop-blur-md bg-white/80 border border-white/40 flex flex-col p-5 max-w-xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Sign Up</h1>
            <p>
              Choose your role, fill in your details and create your EcoDash
              account.
            </p>
            <h1 className="font-bold mt-4 mb-4">Choose account type</h1>

            {/* roles */}

            <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rolesType.map(({ logo: Icon, role, Info }, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedRole(role)}
                  className={`flex flex-col p-2 gap-2 rounded-lg border-1 cursor-pointer
        ${selectedRole === role ? " bg-green-100 border-green-800" : ""}`}
                >
                  <Icon className="w-5 h-5 text-gray-600" />
                  <h1 className="text-xl font-medium">{role}</h1>
                  <p className="text-sm">{Info}</p>
                </div>
              ))}
            </div>

            {/* Form */}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <h1 className="mt-4 block mb-2 font-bold">Email Address</h1>
                <div className="relative w-full">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter your email"
                    className="pl-2  py-3 w-full rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <AiOutlineMail className=" absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>

              {selectedRole === "Seller" ? (
                <div className="mt-4">
                  <h1 className="mt-4 mb-2 font-bold">Store Name</h1>

                  <div className="relative w-full">
                    <input
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      type="name"
                      placeholder="Enter your store name"
                      className="pl-2 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <MdOutlineStorefront className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-between">
                <div className="sm:w-1/2 w-full">
                  <h1 className="mt-4 mb-2 font-bold">Password</h1>
                  <div className="relative w-full">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Create Password"
                      className="pl-2 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <RiLockPasswordLine className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
                  </div>
                </div>
                <div className="sm:w-1/2 w-full">
                  <h1 className="mt-4 mb-2 font-bold">Confirm Password</h1>
                  <div className="relative w-full">
                    <input
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type="password"
                      placeholder="Confirm Password"
                      className="pl-2 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <RiLockPasswordLine className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <input
                  type="checkbox"
                  id="terms"
                  className="accent-blue-700 w-5 h-4"
                />
                <label htmlFor="terms">Remember me</label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`rounded-lg shadow-xl text-xl w-full mt-4 p-2 font-bold transition
    ${
      loading
        ? "bg-blue-300 cursor-not-allowed"
        : "bg-blue-400 hover:shadow-blue-700"
    }
  `}
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="mx-4 text-gray-500 text-sm font-medium">OR</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>
            <div className="w-full">
              <button
                onClick={handleGoogle}
                className="flex items-center justify-center gap-3 w-full rounded-lg border border-gray-200 p-3"
              >
                <Image
                  src="/google.png"
                  alt="google image"
                  width={20}
                  height={20}
                />
                <span className="text-2xl sm:text-xl">
                  {" "}
                  Continue with google
                </span>
              </button>
            </div>
            <Link href="/login">
              <p className=" text-black px-4 py-2 text-center">
                Already have an account?{" "}
                <span className="font-bold text-green-400">Login In</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
