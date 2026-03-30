"use client";

import Link from "next/link";

import Image from "next/image";

export default function Category() {
  const ListCategory = [
    {
      label: "Fashion",
      href: "/catalog/fashion",
      icon: <Image src={"/fashion.png"} height={25} width={25} alt="fashion" />,
    },
    {
      label: "Beauty",
      href: "/beauty",
      icon: <Image src={"/beauty.png"} height={25} width={25} alt="beauty" />,
    },
    {
      label: "Furniture",
      href: "/furniture",
      icon: <Image src={"/furniture.png"} height={25} width={25} alt="furniture" />,
    },
    {
      label: "Electronics",
      href: "/electronics",
      icon: (
        <Image
          src={"/electronic.png"}
          height={25}
          width={25}
          alt="electronic"
        />
      ),
    },
    {
      label: "Mobile",
      href: "/mobile",
      icon: <Image src={"/mobile.png"} height={25} width={25} alt="mobile" />,
    },
  ];

  return (
    <div className=" shadow-xl mt-9 px-4">
      <ul className="flex justify-between w-full text-lg">
        {ListCategory.map(({ label, href, icon }) => (
          <li
            key={label}
            className={`flex items-center gap-2 cursor-pointer hover:rounded hover:bg-green-300 transition shadow-2xs `}
          >
            <Link href={href} className="flex flex-col items-center">
              {icon}
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
