import { NextResponse } from "next/server";
import { getProductsByBuyer } from "@/models/products";

export async function GET(req, { params }) {
  const data = await getProductsByBuyer(params.id);
  return NextResponse.json({ message: "Success", data: data });
}
