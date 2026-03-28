"use client";
import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";

export default function Profile() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const item = [
    { label: "Order", href: "/order" },
    { label: "Cart", href: "/cart" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Logout", href: "/login", isLogOut: true },
  ];

  // outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // keyboard navigation
  const handleKeyDown = e => {
    if (!open) return;

    if (e.key === "ArrowDown") {
      setActiveIdx(prev => (prev + 1) % item.length);
    }

    if (e.key === "ArrowUp") {
      setActiveIdx(prev => (prev - 1 + item.length) % item.length);
    }

    if (e.key === "Enter") {
      const selected = item[activeIdx];
      window.location.href = selected.href;
    }

    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}>
        <FaUserCircle className="w-9 h-9 cursor-pointer" />
      </button>

      {open && (
        <div
          ref={dropdownRef}
          tabIndex={0}            // IMPORTANT
          onKeyDown={handleKeyDown}
          className="absolute right-0 w-36 mt-2 bg-white shadow-md overflow-hidden rounded-xl outline-none"
        >
          {item.map(({ label, href, isLogOut }, idx) => (
            <Link
              key={label}
              href={href}
              className={`block px-4 py-2 text-lg ${
                idx === activeIdx
                  ? isLogOut
                    ? "bg-red-600 text-white"
                    : "bg-green-100 hover:bg-green-600"
                  : isLogOut
                    ? "bg-red-600 text-black hover:bg-red-500"
                    : "bg-green-100 hover:bg-green-600"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}