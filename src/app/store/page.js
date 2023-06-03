import { getServerSession } from "next-auth";

import SearchBar from "../components/Store/SearchBar";
import GridLayout from "../components/Store/GridLayout";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default function Page() {
  const session = getServerSession(authOptions)
  if (!session) {
    redirect("/login")
  }
  return (
    <div className="w-full absolute top-[17%] px-10 -z-20 text-4xl font-semibold">
      <h1>Store</h1>
      <SearchBar children={<GridLayout />} />
    </div>
  )
}
