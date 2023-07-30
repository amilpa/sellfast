"use client";
import { useEffect, useState } from "react";

export default function ShowProducts(user_id) {

  const [borderChange, setBorderChange] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/products/${user_id}`);
      const json = await res.json();
      setData(json.data);
    }
    let ignore = false;
    if (ignore) return;
    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div>
      <div className="flex justify-around pt-4">
        <h1 className="text-xl">Bought</h1>
        <h1 className="text-xl" onCLick>
          Sold
        </h1>
      </div>
      {loading ? (
        <div className="bg-black absolute inset-0 z-10 flex justify-center">
          <div className="w-12 h-12 relative top-[30%] border-4 border-gray-400 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : 
        ({data.map((item) => {
          return (<div>Hello world</div>)
      })})
    }
    </div>
  );
}
