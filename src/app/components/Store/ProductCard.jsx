"use client";
import Image from "next/image";
import { AiOutlineArrowRight } from "react-icons/ai";
import Link from "next/link";

export default function ProductCard({ data }) {
  return (
    <div className="w-64 h-64 overflow-hidden relative transition-all duration-200 border-[1px] rounded-md border-gray-600 hover:border-white">
      <Image
        src={data.imageurl}
        alt="product image"
        width={250}
        height={250}
        className="mb-2 w-full h-[70%]"
      />
      <div className="ml-3 mb-3">
        <h3 className="text-lg font-semibold">{data.name}</h3>
        <h6 className="text-base text-green-400 font-normal">${data.price}</h6>
      </div>
      <Link href={`/store/buy/${data.product_id}`}>
        <AiOutlineArrowRight className="w-6 h-6 absolute bottom-3 right-3 text-gray-400" />
      </Link>
    </div>
  );
}
