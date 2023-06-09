"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Page({ params }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.id}`
      );
      const json = await res.json();
      setData(json.data);
      console.log(json.data);
      setLoading(false);
    }
    let ignore = false;
    if (ignore) return;
    fetchData();
    return () => {
      ignore = true;
    };
  }, [params.id]);
  return (
    <div className="absolute top-[20%] left-1/2 -translate-x-1/2 grid grid-cols-2 place-items-center">
      {loading ? (
        <div className="bg-black absolute inset-0 z-10 flex justify-center">
          <div className="w-12 h-12 relative top-[30%] border-4 border-gray-400 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        ""
      )}
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl text-center font-medium">{data.name}</h1>
        <Image
          src={data.imageurl}
          alt="product image"
          width={250}
          height={250}
          className="rounded-lg"
        />
      </div>
      <div>
        <p>{data.description}</p>
        <div>
          <button>Buy item</button>
        </div>
      </div>
    </div>
  );
}
