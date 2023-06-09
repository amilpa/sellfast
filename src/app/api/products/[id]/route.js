import { NextResponse } from "next/server";
import { getProductById } from "@/models/products";

export async function GET(request, context) {
  try {
    const product = await getProductById(context.params.id)
    return NextResponse.json({ data: product })
  } catch (error) {
    return NextResponse.json({ data: error.message })
  }
}
