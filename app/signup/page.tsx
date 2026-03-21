"use client";
import Image from "next/image";
import { useState } from "react";
import { MdOutlineStorefront } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";

export default function SignUp() {
  const [selectedRole, setSelectedRole] = useState("Admin");

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

  return (
    // left
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

        {/* right */}

        <div className="w-[50%] bg-green-100 flex justify-center items-center">
          {/* Signup  */}

          <div className="rounded-2xl  translate-y-[-50px] shadow-2xl backdrop-blur-md bg-white/80 border border-white/40 flex flex-col p-5 max-w-xl mx-auto">
            {" "}
            <h1 className="text-4xl font-bold mb-4">Sign Up</h1>
            <p>
              Choose your role, fill in your details and create your EcoDash
              account.
            </p>
            <h1 className="font-bold mt-4 mb-4">Chosse account type</h1>
            {/* roles */}
            <div className="grid grid-cols-3 gap-4">
              {rolesType.map(({ logo : Icon, role, Info }, idx) => (
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
            <form action="">
              <div className="">
                <h1 className="mt-4 mb-2 font-bold">Email Address</h1>
                <div className="relative w-full">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="pl-2  py-3 w-full rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <AiOutlineMail className=" absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>

              <div className="mt-4">
                <h1 className="mt-4 mb-2 font-bold">Store Name</h1>

                <div className="relative w-full">
                  <input
                    type="name"
                    placeholder="Enter your store name"
                    className="pl-2 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <MdOutlineStorefront className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
                </div>
              </div>

              <div className="mt-4 flex gap-3 justify-between">
                <div className="w-1/2">
                  <h1 className="mt-4 mb-2">Password</h1>
                  <div className="relative w-full">
                    <input
                      type="password"
                      placeholder="Create Password"
                      className="pl-2 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <RiLockPasswordLine className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
                  </div>
                </div>
                <div className="w-1/2">
                  <h1 className="mt-4 mb-2">Confirm Password</h1>
                  <div className="relative w-full">
                    <input
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
                <label htmlFor="terms">
                  I agree to the terms & conditions.
                </label>
              </div>
              <button className="rounded-lg text-xl bg-blue-400 w-full mt-4 p-2 font-bold">
                Create Account{" "}
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
