import ProductCard from "./ProductCard";

export default async function GridLayout({ search }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/`, {
    method: "GET",
  })
    .then((data) => data.json())
    .catch((error) => console.log(error.message));
  const data = res.data;
  return (
    <div>
      {data.map((value) => {
        return <ProductCard />;
      })}
    </div>
  );
}
