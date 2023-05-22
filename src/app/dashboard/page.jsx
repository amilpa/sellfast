import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import CardButton from "../components/CardButton";
import { MdSell } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }
  return (
    <div className="absolute top-[12%] md:top-[20%] -z-20 inset-0 ">
      <h1 className="mb-8 md:mb-14 text-center text-4xl font-semibold">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-16 md:gap-8">
        <CardButton
          title="Sell new Product"
          content="Sell anything and everything you want and leave everything else to us."
          children={<MdSell className="text-3xl" href="/sell" />}
        />
        <CardButton
          title="Go to store"
          content="Buy fast and safe.We have a wide variety of goods available this week."
          children={<AiOutlineShoppingCart className="text-3xl" />}
          href="/store"
        />
        <CardButton
          title="Profile"
          content="Buy fast and safe.We have a wide variety of goods available this week."
          children={<CgProfile className="text-3xl" />}
          href="/profile"
        />
      </div>
    </div>
  );
}
