import { NextResponse } from "next/server";
import { getAllProducts } from "@/models/products";

export async function GET(req) {
  const products = await getAllProducts()
  return NextResponse.json({ data: products, nBHits: products.length })
}
