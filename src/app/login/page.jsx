import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import GoogleSignIn from "../components/StyledButtons/GoogleSignIn";
import { getServerSession } from "next-auth";

export default async function Login() {
  const session = await getServerSession(authOptions);
  if (session) {
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
