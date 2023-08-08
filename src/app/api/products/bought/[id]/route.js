import { NextResponse } from "next/server";
import { getProductsByBuyer } from "@/models/products";

export async function GET(req, context) {
  const data = await getProductsByBuyer(context.params.id);
  return NextResponse.json({ message: "Success", data })
}