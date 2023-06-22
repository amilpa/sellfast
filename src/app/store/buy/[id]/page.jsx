"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Page({ params }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const { data: session } = useSession();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/products/${params.id}`);
      const json = await res.json();
      setData(json.data);
      setLoading(false);
    }
    let ignore = false;
    if (ignore) return;
    fetchData();
    return () => {
      ignore = true;
    };
  }, [params.id]);

  async function handleBuy(e) {
    e.preventDefault();
    if (!session) {
      alert("You need to login to buy this item");
      return;
    }
    const res = await fetch(`/api/products/buy/${params.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: session.user.id, price: data.price }),
    });
    const json = await res.json();
    if (json.error) {
      alert(json.error);
      return;
    }
    alert("Item bought successfully");
  }

  return (
    <div className="w-full absolute top-[27%] flex justify-evenly gap-16 pb-12 border-b-[1px] border-gray-500">
      {loading ? (
        <div className="bg-black absolute inset-0 z-10 flex justify-center">
          <div className="w-12 h-12 relative top-[30%] border-4 border-gray-400 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        ""
      )}
      <div className="flex flex-col gap-5">
        <Image
          src={data.imageurl}
          alt="product image"
          width={450}
          height={450}
          className="rounded-lg"
        />
      </div>
      <div className="relative border-l-[1px] border-green-700 pl-24">
        <h1 className="text-3xl font-medium mb-2">{data.name}</h1>
        <p className="text-lg text-gray-300 mb-2">{data.description}</p>
        <p className="text-3xl text-green-400">${data.price}</p>
        <button
          onClick={handleBuy}
          className="mt-4 transition-all duration-300 text-xl py-2 px-4 bg-blue-600 hover:bg-blue-500"
        >
          Buy item
        </button>
      </div>
    </div>
  );
}
