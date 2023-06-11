import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import EditCard from "../components/Cards/EditCard";
import ProfileIcon from "../components/ProfIleIcon";
import RatingCard from "../components/Cards/RatingCard";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const user = await fetch("/api/user/${session.user.id}", {
    method: "GET",
  })
    .then((data) => data.json())
    .then((data) => data[0])
    .catch((error) => console.log(error.message));
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
    </div>
  );
}
