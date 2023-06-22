import checkAuth from "@/utils/checkAuth";

import { redirect } from "next/navigation";
import Display from "../../components/Store/Display";

export default async function Page() {
  const isAuth = await checkAuth()
  if (!isAuth) {
    redirect("/login")
  }

  return (
    <div className="w-full absolute top-24 md:top-[17%] px-10 -z-20 text-4xl font-semibold">
      <h1 className="font-medium">Store</h1>
      <Display />
    </div >
  )
}
