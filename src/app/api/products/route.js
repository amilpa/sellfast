import { NextResponse } from "next/server";
import { getAllProducts, getProductsByName } from "@/models/products";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");
  const products = await getProductsByName(search);
  return NextResponse.json({ data: products, nBHits: products.length });
}
