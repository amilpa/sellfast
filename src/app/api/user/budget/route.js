import { updateUserBalance } from "@/models/user";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    const body = await req.json()
    await updateUserBalance({ balance: parseInt(body.balance), user_id: body.userId })
    return NextResponse.json({ message: "Success" })

  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}