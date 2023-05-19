import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }
  return <div>This is the dashboard</div>;
}
