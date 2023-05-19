"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="bg-white text-black mr-6 rounded-md px-5 hover:bg-black hover:text-white hover:shadow-sm hover:shadow-white transition-all"
    >
      Sign out
    </button>
  );
}
