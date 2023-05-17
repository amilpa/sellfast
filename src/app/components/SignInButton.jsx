"use client";

import { signIn } from "next-auth/react";

export default function SignInButton() {
  const callbackUrl = "http://localhost:3000";

  return (
    <button onClick={() => signIn("google", { callbackUrl })}>
      SignInButton
    </button>
  );
}
