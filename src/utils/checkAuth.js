import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function checkAuth() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return false
  }
  return session
}