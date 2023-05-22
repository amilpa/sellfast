import { NextResponse } from "next/server";
import { checkUserSignIn, createUserSignUp } from "@/models/user";

export async function POST(req) {
  try {
    const res = await req.json()
    const check = await checkUserSignIn({ email: res.email })
    if (check.length === 0) {
      await createUserSignUp(res)
    }
    return NextResponse.json({ message: "Success" })

  } catch (error) {
    console.log(error.message)
  }
}