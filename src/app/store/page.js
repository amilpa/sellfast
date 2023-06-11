
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Display from "../components/Store/Display";

export default function Page() {
  const session = getServerSession(authOptions)
  if (!session) {
    redirect("/login")
  }

  return (
    <div className="w-full absolute top-24 md:top-[17%] px-10 -z-20 text-4xl font-semibold">
      <h1 className="font-medium">Store</h1>
      <Display />
    </div >
  )
}
