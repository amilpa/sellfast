import { NextResponse } from "next/server";
import { checkUserSignIn, createUserSignUp } from "@/models/user";

export async function POST(req) {
  try {
    const check = await checkUserSignIn(req.body.email)
    if (!check) {
      await createUserSignUp(req.body)
    }
    return NextResponse.status(200).json({ message: "Success" })

  } catch (error) {
    console.log(error.message)
    console.log(JSON.parse(req.body))
  }
}