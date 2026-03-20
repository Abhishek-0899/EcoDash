"use client";
import Image from "next/image";
import { useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState("Admin");
  const roles = ["Admin", "Seller", "User"];

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

  return (
    <div className="bg-green-50 min-h-screen w-full">
      <div className="flex items-center">
        <Image src="/logo.png" alt="Product Image" width={60} height={60} />
        <h1>Ecodash Platform</h1>
      </div>

      {/* Main layout */}
      <div className="flex flex-row min-h-screen">
        <div className="w-[50%] bg-green-50 px-20 py-20">
          <div className="">
            <h1 className="text-xl font-bold text-green-900 mt-2 mb-10 ">
              {" "}
              Role based ecommerce access
            </h1>
            <h1 className="font-bold text-black text-6xl mb-6">
              Open secure login for admin, seller and customer access.
            </h1>
            <p className="text-2xl text-gray-500 font-semibold">
              Manage storefront operations, orders, users, payout, and platform
              settings from one consistent system designed for mutli-role
              commerce teams
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

        {/* right */}

        <div className="w-[50%] bg-green-100 flex justify-center items-center">
          {/* login  */}

          <div className="rounded-2xl  translate-y-[-100px] shadow-2xl backdrop-blur-md bg-white/80 border border-white/40 flex flex-col p-10 max-w-md mx-auto">
            {" "}
            <h1 className="text-4xl font-bold mb-4">Login</h1>
            <p>Choose your role and continue to dashboard</p>
            {/*  */}
            <div className="flex p-2 rounded-2xl bg-gray-200 items-center justify-between w-full">
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
            <form action="">
              <div className="">
                <h1 className="mt-4 mb-2">Email Address</h1>
                <div className="relative w-full">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <AiOutlineMail className=" absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <h1 className="mt-4 mb-2">Password</h1>
                  <h1 className="text-green-600">Forget Password?</h1>
                </div>
                <div className="relative w-full">
                  <input
                    type="password"
                    placeholder="**********"
                    className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <RiLockPasswordLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
                </div>
              </div>
              <button className="rounded-lg text-xl bg-blue-400 w-full mt-4 p-2 font-bold">
                Login{" "}
              </button>
            </form>
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="mx-4 text-gray-500 text-sm font-medium">OR</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
