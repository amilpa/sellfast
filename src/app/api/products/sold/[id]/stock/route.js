import { NextResponse } from "next/server";
import { updateProductQuantity, getProductById } from "@/models/products";

export async function POST(req, { params }) {
  const { id } = params;
  const { quantity, user_id } = await req.json();
  const product = await getProductById(id);
  if (product.soldby !== user_id)
    return NextResponse.json(
      { message: `You can't update stock of this product` },
      { status: 400 }
    );
  await updateProductQuantity({ quantity, product_id: id });
  return NextResponse.json({ message: `Stock of product ${id} updated` });
}
