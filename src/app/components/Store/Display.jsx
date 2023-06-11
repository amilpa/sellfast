"use client";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import GridLayout from "./GridLayout";

export default function Display() {
  const [search, setSearch] = useState("");
  return (
    <>
      <SearchBar setSearch={setSearch} />
      <GridLayout search={search} />
    </>
  );
}
