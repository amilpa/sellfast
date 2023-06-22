"use client";
import ProductCard from "./ProductCard";
import useFetch from "@/hooks/useFetch";

const fetchOptions = {
  method: "GET",
};

export default function GridLayout({ search }) {
  const { data, loading, error } = useFetch(
    `api/products?search=${search}`,
    fetchOptions
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    // Handle error state accordingly
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-12 md:gap-0 md:grid-cols-4 place-items-center mt-12 md:mt-6">
      {data.map((value) => (
        <ProductCard key={value.product_id} data={value} />
      ))}
    </div>
  );
}
