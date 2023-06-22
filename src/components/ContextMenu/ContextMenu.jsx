import Link from "next/link";
import { AiFillShopping } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdOutlineDashboard } from "react-icons/md";
import SignOutButton from "../SignOutButton";

export default function ContextMenu() {
  return (
    <div className="w-[150px] absolute top-[40px] right-4 flex flex-col gap-3 bg-black border-[1px] border-[rgba(255,255,255,0.3)] rounded-md">
      <Link
        href="/dashboard"
        className="flex justify-start gap-2 items-center w-full pl-3 pb-2 pt-3 transition-all text-[rgba(255,255,255,0.7)] hover:text-[rgba(255,255,255,1)] hover:bg-[#1a1a1a]"
      >
        <MdOutlineDashboard className="text-md" />
        <span>Dashboard</span>
      </Link>
      <Link
        href="/store"
        className="flex justify-start gap-2 items-center w-full pl-3 py-2 transition-all text-[rgba(255,255,255,0.7)] hover:text-[rgba(255,255,255,1)] hover:bg-[#1a1a1a]"
      >
        <AiFillShopping className="text-md" />
        <span>Store</span>
      </Link>
      <Link
        href="/profile"
        className="flex justify-start gap-2 items-center w-full pl-3 py-2 transition-all text-[rgba(255,255,255,0.7)] hover:text-[rgba(255,255,255,1)] hover:bg-[#1a1a1a]"
      >
        <CgProfile />
        <span>Profile</span>
      </Link>
      <SignOutButton />
    </div>
  );
}
