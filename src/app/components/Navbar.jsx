import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  return (
    <div className="fixed top-0 w-full flex justify-between py-4 border-b-[1px] border-b-[rgba(255,255,255,0.2)]">
      <span>
        <span className="absolute top-6 left-7 w-0 h-0 border-[15px] border-transparent border-t-solid border-t-white"></span>
        <h1 className="text-2xl ml-16 font-semibold tracking-wider">
          SellFast
        </h1>
      </span>
      {session ? <SignOutButton /> : <SignInButton />}
    </div>
  );
}
