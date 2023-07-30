import { NextResponse } from "next/server";
import { getUser, updateUserBalance } from "@/models/user";
import { updateProductBoughtBy } from "@/models/products";

export async function POST(req, context) {
  const { params } = context
  const { id, price, soldBy } = await req.json()
  const user = await getUser({ id })
  if (id === soldBy) {
    return NextResponse.json({ error: "You can't buy your own product" }, { status: 400 })
  }
  if (user.balance < price) {
    return NextResponse.json({ error: "Insufficient funds" }, { status: 400 })
  }
  await updateUserBalance({ balance: user.balance - price, user_id: id })
  await updateProductBoughtBy({ id: params.id, boughtBy: id })
  return NextResponse.json({ messages: "Successful" })
}