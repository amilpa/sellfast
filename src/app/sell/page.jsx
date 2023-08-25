"use client";
import InputElement from "../../components/InputElement";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

export default function Page() {
  const formRef = useRef(null);

  const { data: session } = useSession();

  if (!session) {
  }

  const [nameError, setNameError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [quantityError, setQuantityError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [imageerr, setImageerr] = useState(false);

  // loading state
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(formRef.current);
    if (!data.get("name")) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    if (!data.get("desc")) {
      setDescError(true);
    } else {
      setDescError(false);
    }
    if (!data.get("image")) {
      setImageerr(true);
    } else {
      setImageerr(false);
    }
    if (!/^\d+$/.test(data.get("price")) || data.get("price").length > 6) {
      setPriceError(true);
    } else {
      setPriceError(false);
    }
    if (
      !/^\d+$/.test(data.get("quantity")) ||
      data.get("quantity") < 1 ||
      data.get("quantity") > 1000
    ) {
      setQuantityError(true);
    } else {
      setQuantityError(false);
    }
    if (!nameError && !priceError && !descError && !imageerr) {
      setLoading(true);
      data.set("soldBy", session.user.id);
      window.scrollTo(0, 0);
      console.log(data);
      const response = await fetch("/api/products/add", {
        method: "POST",
        body: data,
      });
      const res = await response.json();
      console.log(res);
      formRef.current.reset();
      setLoading(false);
    }
  }

  return (
    <div
      className={`w-full h-full relative top-24 flex flex-col ${
        loading ? "" : "px-8 pb-8"
      }`}
    >
      {loading ? (
        <div className="bg-black absolute inset-0 z-10 flex justify-center">
          <div className="w-12 h-12 relative top-[30%] border-4 border-gray-400 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        ""
      )}
      <h1 className="text-3xl font-semibold">Sell a product</h1>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 mt-8"
      >
        <InputElement label="Name" />
        {nameError ? (
          <span className="text-red-400 text-base -translate-y-4">
            Please enter a valid name
          </span>
        ) : (
          ""
        )}
        <InputElement label="Price" />
        {priceError ? (
          <span className="text-red-400 text-base -translate-y-4">
            Please enter a valid price(maximum is 999999)
          </span>
        ) : (
          ""
        )}
        <InputElement label="Quantity" />
        {quantityError ? (
          <span className="text-red-400 text-base -translate-y-4">
            Please enter a valid quantity(from 1 to 1000)
          </span>
        ) : (
          ""
        )}
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="desc" className="block">
            Description
          </label>
          <textarea
            name="desc"
            id=""
            cols="30"
            rows="3"
            className="bg-inherit outline-none text-base border-2 border-gray-700 focus:border-gray-600 rounded-sm py-1 pl-3"
          ></textarea>
          {descError ? (
            <span className="text-red-400 text-base mt-1">
              Description is required
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="relative top-2 flex flex-col gap-2">
          <label htmlFor="fileInput">Upload image</label>
          <input
            name="image"
            type="file"
            accept=".png,.jpg,.jpeg"
            className=""
          />
        </div>
        {imageerr ? (
          <span className="text-red-400 text-base -translate-y-2">
            Please select an image to upload
          </span>
        ) : (
          ""
        )}
        <button
          type="submit"
          className="text-gray-200 mt-4 py-2 font-medium transition-all duration-300 bg-blue-700 hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
