import SearchBar from "../components/Store/SearchBar";
import GridLayout from "../components/Store/GridLayout";

export default function Page() {
  return (
    <div className="w-full absolute top-[17%] px-10 -z-20 text-4xl font-semibold">
      <h1>Store</h1>
      <SearchBar children={<GridLayout />} />
    </div>
  )
}
