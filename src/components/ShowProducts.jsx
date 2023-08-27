"use client";
import { useEffect, useState, useRef, createRef } from "react";
import Link from "next/link";

import { AiFillEdit } from "react-icons/ai";

export default function ShowProducts(user_id) {
  const [borderChange, setBorderChange] = useState(false);
  const [data, setData] = useState(["Hello world"]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      let res;
      if (!borderChange) {
        res = await fetch(`/api/products/bought/${user_id.userId}`);
      } else {
        res = await fetch(`/api/products/sold/${user_id.userId}`);
      }
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
  }, [borderChange, user_id]);

  return (
    <div className="relative px-4 md:px-0">
      <div className="flex pt-4 gap-2 mb-4">
        <h1
          className={`transition-all text-xl text-center py-2 hover:bg-gray-900 flex-grow cursor-pointer ${
            borderChange ? "bg-none" : "bg-gray-900 border-b-2 border-white"
          }}`}
          onClick={() => setBorderChange(false)}
        >
          Bought
        </h1>
        <h1
          className={`transition-all text-xl text-center py-2 hover:bg-gray-900 flex-grow cursor-pointer ${
            borderChange ? "bg-gray-900 border-b-2 border-white" : "bg-none"
          }}`}
          onClick={() => setBorderChange(true)}
        >
          Sold
        </h1>
      </div>
      {loading ? (
        <div className="bg-black relative top-8 w-full z-10 flex justify-center">
          <div className="w-12 h-12 border-4 border-gray-400 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        data.map((item, index) => {
          if (borderChange)
            return (
              <div
                key={item.product_id}
                className="transition-all flex justify-between border-2 border-gray-700  p-2 mb-4 rounded-md"
              >
                <h1 className="text-xl">{item.name}</h1>
                <div className="flex gap-2">
                  <h1 className="text-xl">Stock left : {item.quantity}</h1>
                  <Link
                    href={`/store/sold/${item.product_id}`}
                    className="text-green grid place-items-center border-[1px] border-white px-1"
                  >
                    <AiFillEdit />
                  </Link>
                </div>
              </div>
            );
          else {
            return (
              <div
                key={item.product_id}
                className="transition-all flex justify-between border-2 border-gray-700  p-2 mb-4 rounded-md"
              >
                <h1 className="text-xl">{item.name}</h1>
                <Link
                  href={`/store/bought/${item.product_id}`}
                  className="text-xl text-yellow-600"
                >
                  Add rating
                </Link>
              </div>
            );
          }
        })
      )}
    </div>
  );
}
