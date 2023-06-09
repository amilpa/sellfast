import ProductCard from "./ProductCard";

export default async function GridLayout({ search }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/`, {
    method: "GET",
  })
    .then((data) => data.json())
    .catch((error) => console.log(error.message));
  const data = res.data;
  return (
    <div className="grid grid-cols-1 gap-12 md:gap-0 md:grid-cols-4 place-items-center mt-6">
      {data.map((value) => {
        return <ProductCard key={value.product_id} data={value} />;
      })}
    </div>
  );
}
