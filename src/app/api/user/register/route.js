import { NextResponse } from "next/server";
import { checkUserRegister, createUserSignUp } from "@/models/user";

export async function POST(req) {
  try {
    const res = await req.json()
    const check = await checkUserRegister({ email: res.email })
    if (!check) {
      await createUserSignUp(res)
    }
    return NextResponse.json({ message: "Success" })

  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 })
  }
}