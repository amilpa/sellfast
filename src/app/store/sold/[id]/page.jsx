"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { BsCheckLg } from "react-icons/bs";

export default function Page({ params }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);

  const [stock, setStock] = useState(0);

  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/products/${params.id}`);
      const json = await res.json();
      setData(json.data);
      setStock(json.data.quantity);
      setLoading(false);
    }
    let ignore = false;
    if (ignore) return;
    fetchData();
    return () => {
      ignore = true;
    };
  }, [params.id]);

  async function handleChange(e) {
    e.preventDefault();
    if (!session) {
      alert("You need to login to rate this item");
      return;
    }
    // check if stock is a valid number betweeen 1 and 1000
    if (!/^\d+$/.test(stock) || stock < 1 || stock > 1000) {
      alert("Stock must be between 1 and 1000");
      return;
    }

    setLoading(true);
    const res = await fetch(`/api/products/sold/${params.id}/stock`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: stock,
        user_id: session.user.id,
      }),
    });
    const json = await res.json();
    if (json.error) {
      alert(json.error);
      setLoading(false);
      return;
    }
    setLoading(false);
    setShow(false);
    router.push("/profile");
    alert("Successfully updated stock");
  }

  return (
    <div className="w-full absolute top-[27%] flex flex-col md:flex-row px-12 md:px-0 justify-evenly gap-16 pb-12 border-b-[1px] border-gray-500">
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
      <div className="relative border-t-[1px] md:border-t-0 md:border-l-[1px] border-green-700 pt-6 md:pt-0 md:pl-24">
        <h1 className="text-3xl font-medium mb-2">{data.name}</h1>
        <p className="text-lg text-gray-300 mb-2">{data.description}</p>
        <p className="text-3xl text-green-400">${data.price}</p>
        <p className="text-2xl mt-1 text-yellow-400">Rating : {data.rating}</p>
        {show ? null : (
          <p className="text-2xl text-blue-500">Stock : {data.quantity}</p>
        )}
        <p className="text-2xl mt-1 text-red-400">
          Unit sold : {data.units_sold}
        </p>
        {show ? (
          <div className="mt-4 flex items-center">
            <input
              type="text"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-12 h-12 pl-1 bg-black text-xl text-white border-2 border-gray-500 outline-none mr-2"
            />
            <button onClick={handleChange}>
              <BsCheckLg className="text-3xl cursor-pointer" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShow(true)}
            className="mt-4 transition-all duration-300 text-xl py-2 px-4 bg-blue-500 hover:bg-blue-400"
          >
            Change stock
          </button>
        )}
      </div>
    </div>
  );
}
