import { getUser } from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  const user = await getUser({ id: context.params.id })
  return NextResponse.json(user.rows)
}