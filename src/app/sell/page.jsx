"use client";
import InputElement from "../components/InputElement";
import { useState } from "react";

export default function page() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");

  const [nameError, setNameError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [descError, setDescError] = useState(false);

  return (
    <div className="w-full absolute top-[6rem] px-12 pb-8">
      <h1 className="text-3xl font-semibold">Sell a product</h1>
      <form action="" className="flex flex-col gap-6 mt-8">
        <InputElement label="Name" />
        <InputElement label="Price" />
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="desc" className="block">
            Description
          </label>
          <textarea
            name="desc"
            id=""
            cols="30"
            rows="3"
            className="bg-inherit outline-none text-base border-2 border-gray-800 focus:border-gray-600 rounded-sm py-1 pl-3"
          ></textarea>
        </div>
        <div className="relative top-2 flex flex-col gap-2">
          <label htmlFor="fileInput">Upload image</label>
          <input type="file" accept=".png,.jpg,.jpeg" className="" />
        </div>
      </form>
    </div>
  );
}
