"use client";
import Image from "next/image";
import { useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import Link from "next/link";
import { createClient } from "@/lib/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("Admin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const roles = ["Admin", "Seller", "User"];

  const [loading, setLoading] = useState(false);

  const features = [
    {
      title:
        "Protected access with role-aware permissions and audit-ready account control",
      imgSrc: "/logo.png",
    },
    {
      title:
        "Dedicated seller workspace for product listings, fulfilment, revenue tracking, and payouts",
      imgSrc: "/logo.png",
    },
    {
      title:
        "User dashboard for orders, profile settings, addresses, and purchase activity in one place",
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      toast.error(error.message);
      return;
    }
    const userId = data?.user?.id;
    if (!userId) return;

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .maybeSingle();

    if (profileError) {
      setLoading(false);
      toast.error("Failed to get user role: " + profileError.message);
      return;
    }
    toast.success("Successfully logged in 🎉");
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };
  const handleGoogle = async (e) => {
    e.preventDefault();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://uqezvcerovmpbpspxvns.supabase.co/auth/v1/callback",
      },
    });
    toast.success("Signup successful 🎉");

    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  return (
    <div className="bg-green-50 min-h-screen w-full">
      {/* Header */}
      <div className="md:flex items-center p-4 hidden">
        <Image src="/logo.png" alt="Product Image" width={60} height={60} />
        <h1 className="ml-4 text-2xl font-bold">Ecodash Platform</h1>
      </div>

      {/* Main layout */}
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Left side (features) - hide on mobile */}
        <div className="hidden md:flex w-1/2 bg-green-50 px-10 py-10 flex-col">
          <h1 className="text-xl font-bold text-green-900 mt-2 mb-10">
            Role based ecommerce access
          </h1>
          <h1 className="font-bold text-black text-4xl mb-6">
            Open secure login for admin, seller and customer access.
          </h1>
          <p className="text-lg text-gray-500 font-semibold mb-6">
            Manage storefront operations, orders, users, payout, and platform
            settings from one consistent system designed for multi-role commerce
            teams
          </p>

          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              title={feature.title}
              imgSrc={feature.imgSrc}
            />
          ))}
        </div>

        {/* Right side (login) */}
        <div className="w-full md:w-1/2 bg-green-100 flex justify-center items-center p-6">
          <div className="rounded-2xl shadow-2xl backdrop-blur-md md:translate-y-[-80px] translate-y-[40px] bg-white/80 border border-white/40 flex flex-col p-10 max-w-md w-full">
            <h1 className="text-4xl font-bold mb-4 md:text-center">Login</h1>
            <p className="mb-4">Choose your role and continue to dashboard</p>  

            {/* Role selection */}
            <div className="flex p-2 rounded-2xl bg-gray-200 items-center justify-between w-full mb-4">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`flex-1 text-center px-4 py-2 rounded-xl font-medium transition-all duration-300
                  ${
                    selectedRole === role
                      ? "bg-white shadow-md scale-105 text-green-700"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block mb-2">Email Address</label>
                <div className="relative w-full">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <label className="block mb-2">Password</label>
                  <span className="text-green-600 cursor-pointer">
                    Forget Password?
                  </span>
                </div>
                <div className="relative w-full">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="**********"
                    className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <RiLockPasswordLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
                </div>
              </div>

              <button
                type="submit"
                className="rounded-lg text-xl bg-blue-400 w-full mt-4 p-2 font-bold"
              >
                {loading ? "Logging in..." : "Login"}
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
                <span className="text-2xl sm:text-2xl"> Continue with google</span>
              </button>
            </div>

            <Link href="/signup">
              <p className="text-black px-4 py-2 text-center">
                Create an account?{" "}
                <span className="text-green-500">SignUp</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
