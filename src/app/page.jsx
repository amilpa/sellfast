import SignInButton from "../components/SignInButton";
import SignOutButton from "../components/SignOutButton";

import { redirect } from "next/navigation";
import checkAuth from "@/utils/checkAuth";

export default async function Home() {
  const isAuth = await checkAuth();
  if (isAuth) {
    return redirect("/dashboard");
  }
  return redirect("/login");
}
