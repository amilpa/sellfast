import checkAuth from "@/utils/checkAuth";
import { redirect } from "next/navigation";

import EditCard from "../../components/Cards/EditCard";
import ProfileIcon from "../../components/ProfIleIcon";
import RatingCard from "../../components/Cards/RatingCard";
import ShowProducts from "@/components/ShowProducts";

export default async function Page() {
  const session = await checkAuth();
  if (!session) {
    redirect("/login");
  }

  const user = await fetch(
    `${process.env.API_URL}/api/user/${session.user.id}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return (
    <div className="w-max absolute top-16 md:top-[17%] left-1/2 -translate-x-1/2 -z-20">
      <div className="mt-14 flex flex-col md:flex-row items-center gap-8 md:gap-24 px-8 pb-12 border-b-[1px] border-b-[rgba(255,255,255,0.5)]">
        <div>
          <ProfileIcon session={session} />
          <h1 className="text-2xl text-center font-medium mt-5">
            {session.user.name}
          </h1>
        </div>
        <EditCard userId={user.user_id} point={user.balance} />
        <RatingCard point={user.rating} />
      </div>
      <ShowProducts userId={user.user_id} />
    </div>
  );
}
