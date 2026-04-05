"use client";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export default function StarRating({ rating }) {
  const full = Math.floor(rating);
  const empty = 5 - full;

  return (
    <div className="flex text-yellow-500 text-xl">
      {Array(full)
        .fill(0)
        .map((_, i) => (
          <AiFillStar key={`full - ${i} `} />
        ))}
      {Array(empty)
        .fill(0)
        .map((_, i) => (
          <AiOutlineStar key={`empty - ${i} `} />
        ))}
    </div>
  );
}
