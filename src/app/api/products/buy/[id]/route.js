import { NextResponse } from "next/server";
import { getUser } from "@/models/user";

export async function POST(req, context) {
  const { params } = context
  const { id, price } = await req.json()
  const user = await getUser({ id })
  return NextResponse.json({ hello: "world" })
}