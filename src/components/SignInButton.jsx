"use client";

import { signIn } from "next-auth/react";
import { useEffect, useRef } from "react";

export default function SignInButton() {
  const callbackUrl = useRef("");

  useEffect(() => {
    callbackUrl.current = window.location.href;
  }, []);

  return (
    <button
      onClick={() => signIn("google", { callbackUrl: callbackUrl.current })}
      className="bg-white text-black mr-4 md:mr-6 rounded-md px-5 hover:bg-black hover:text-white font-medium hover:shadow-sm hover:shadow-white transition-all"
    >
      Sign In
    </button>
  );
}
