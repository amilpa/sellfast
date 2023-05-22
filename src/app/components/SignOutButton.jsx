"use client";
import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="flex justify-start gap-2 items-center w-full pl-3 pt-2 pb-3 transition-all hover:bg-[#1a1a1a] text-[rgba(255,255,255,0.7)] hover:text-[rgba(255,255,255,1)]"
    >
      <BiLogOut className="text-red-500" />
      <span>Logout</span>
    </button>
  );
}
