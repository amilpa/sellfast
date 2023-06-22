import GoogleSignIn from "../../components/StyledButtons/GoogleSignIn";

import checkAuth from "@/utils/checkAuth";
import { redirect } from "next/navigation";

export default async function Login() {
  const isAuth = await checkAuth();
  if (isAuth) {
    return redirect("/dashboard");
  }

  return (
    <div className="min-h-screen">
      <div className="w-max absolute top-[30%] md:top-[25%] left-1/2 -translate-x-1/2">
        <h1 className="text-center text-3xl font-semibold">
          Log in to SellFast
        </h1>
        <div className="flex flex-col items-center mt-8">
          <GoogleSignIn />
        </div>
      </div>
    </div>
  );
}
