import { NextResponse } from "next/server";
import { getBoughtProducts } from "@/models/products";

export async function GET(req, { params }) {
  const data = await getBoughtProducts(params.id);
  return NextResponse.json({ message: "Success", data: data });
}
