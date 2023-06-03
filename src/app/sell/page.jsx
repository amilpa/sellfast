"use client";
import InputElement from "../components/InputElement";
import { useEffect, useRef, useState } from "react";

export default function page() {
  const formData = useRef(new FormData());

  const [nameError, setNameError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [imageerr, setImageerr] = useState(false);

  function onChange(event) {
    if (event.target.name === "name") {
      formData.current.set("name", event.target.value);
    } else if (event.target.name === "price") {
      formData.current.set("price", event.target.value);
    } else if (event.target.name === "desc") {
      formData.current.set("desc", event.target.value);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData.current);
  }

  return (
    <div className="w-full absolute top-[6rem] px-12 pb-8">
      <h1 className="text-3xl font-semibold">Sell a product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-8">
        <InputElement label="Name" onChange={onChange} />
        <InputElement label="Price" onChange={onChange} />
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
            onChange={onChange}
          ></textarea>
        </div>
        <div className="relative top-2 flex flex-col gap-2">
          <label htmlFor="fileInput">Upload image</label>
          <input
            name="image"
            type="file"
            accept=".png,.jpg,.jpeg"
            className=""
            onChange={onChange}
          />
        </div>
        <button type="submit" className="text-white">
          Submit
        </button>
      </form>
    </div>
  );
}
