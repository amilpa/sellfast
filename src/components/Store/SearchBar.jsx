"use client";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBar({ setSearch }) {
  function handleSubmit(e) {
    e.preventDefault();
    setSearch(e.target.search.value);
  }
  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center w-full mt-4"
        >
          <input
            type="text"
            name="search"
            placeholder="Search..."
            className="text-base transition-all text-gray-200 font-medium outline-none flex-grow pl-1 py-1 bg-inherit border-2 border-gray-800 focus:border-gray-600 rounded-md"
          />
          <button type="submit" className="absolute right-2 cursor-pointer">
            <AiOutlineSearch className="text-base" />
          </button>
        </form>
      </div>
    </>
  );
}
