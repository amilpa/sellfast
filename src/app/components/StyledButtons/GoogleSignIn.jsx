"use client";
import { signIn } from "next-auth/react";
import { BsGoogle } from "react-icons/bs";

export default function GoogleSignIn() {
  const callbackUrl = "http://localhost:3000/dashboard";
  return (
    <button
      onClick={() => signIn("google", callbackUrl)}
      className="w-[250px] text-lg py-2 rounded-md flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 transition-all"
    >
      <BsGoogle />
      Continue with Google
    </button>
  );
}
