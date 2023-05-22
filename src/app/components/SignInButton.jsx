"use client";

import { signIn } from "next-auth/react";

export default function SignInButton() {
  const callbackUrl = "http://localhost:3000";

  return (
    <button
      onClick={() => signIn("google", { callbackUrl })}
      className="bg-white text-black mr-4 md:mr-6 rounded-md px-5 hover:bg-black hover:text-white font-medium hover:shadow-sm hover:shadow-white transition-all"
    >
      Sign In
    </button>
  );
}
