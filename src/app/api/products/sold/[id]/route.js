import { NextResponse } from "next/server";
import { getProductsBySeller } from "@/models/products";

export async function GET(req, { params }) {
  const data = await getProductsBySeller(params.id);
  console.log(data);
  return NextResponse.json({ message: "Success", data: data });
}
