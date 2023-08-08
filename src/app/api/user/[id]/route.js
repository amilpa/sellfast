import { getUser } from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const user = await getUser({ id: params.id })
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}