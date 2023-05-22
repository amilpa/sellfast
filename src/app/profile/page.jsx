import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import EditCard from "../components/EditCard";
import ProfileIcon from "../components/ProfIleIcon";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="absolute top-[22%] left-1/2 -translate-x-1/2">
      <ProfileIcon session={session} />
      <h1 className="text-2xl font-medium mt-5">{session.user.name}</h1>
      <div>
        <EditCard />
        <EditCard />
      </div>
    </div>
  );
}
