"use client";
import { signIn } from "next-auth/react";
import { BsGoogle } from "react-icons/bs";

export default function GoogleSignIn() {
  const callbackUrl = "http://localhost:3000/dashboard";
  return (
    <button
      onClick={() => signIn("google", callbackUrl)}
      className="w-[300px] text-lg py-[15px] md:py-3 rounded-md flex items-center justify-center gap-3 bg-blue-700 hover:bg-blue-600 transition-all"
    >
      <BsGoogle />
      Continue with Google
    </button>
  );
}
