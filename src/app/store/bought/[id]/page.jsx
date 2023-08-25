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

  const [rating, setRating] = useState(0);

  const { data: session } = useSession();

  const router = useRouter();

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

  async function handleRate(e) {
    e.preventDefault();
    if (!session) {
      alert("You need to login to rate this item");
      return;
    }
    // check if rating is valid between 0 and 5 and it is a number
    if (!/^\d+$/.test(rating) || rating < 0 || rating > 5) {
      alert("Rating must be a number between 0 and 5");
      return;
    }
    setLoading(true);
    const res = await fetch(`/api/products/bought/${params.id}/rate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating,
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
    alert("Successfully rated the item");
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
        {show ? (
          <div className="mt-4 flex items-center">
            <input
              type="text"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-12 h-12 pl-1 bg-black text-xl text-white border-2 border-gray-500 outline-none mr-2"
            />
            <button onClick={handleRate}>
              <BsCheckLg className="text-3xl cursor-pointer" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShow(true)}
            className="mt-4 transition-all duration-300 text-xl py-2 px-4 bg-yellow-600 hover:bg-yellow-500"
          >
            Rate item
          </button>
        )}
      </div>
    </div>
  );
}
