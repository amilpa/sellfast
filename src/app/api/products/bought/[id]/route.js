import { NextResponse } from "next/server";
import { getUniqueProductsByBuyer } from "@/models/products";

export async function GET(req, { params }) {
  const data = await getUniqueProductsByBuyer(params.id);
  return NextResponse.json({ message: "Success", data: data });
}
