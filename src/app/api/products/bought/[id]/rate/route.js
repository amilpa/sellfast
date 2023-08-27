import { getProductById } from "@/models/products";
import { getUser, updateUserRating } from "@/models/user";
import {
  getTransactionByBuyerAndProduct,
  updateProductRating,
} from "@/models/products";

import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { rating, user_id } = await req.json();
  const check = await getTransactionByBuyerAndProduct(user_id, params.id);
  if (check.length === 0) {
    return NextResponse.json(
      { error: "You have not bought this product" },
      { status: 400 }
    );
  }
  const data = await getProductById(params.id);
  if (data.rating) {
    data.rating = (parseInt(data.rating) + parseInt(rating)) / 2;
  } else {
    data.rating = rating;
  }
  const user = await getUser({ id: data.soldby });
  if (user.rating) {
    user.rating = (parseInt(user.rating) + parseInt(rating)) / 2;
    console.log(user.rating);
  } else {
    user.rating = rating;
  }
  await updateUserRating({ rating: user.rating, user_id: data.soldby });
  await updateProductRating({ rating: data.rating, product_id: params.id });
  return NextResponse.json({ message: "Success", data: data });
}
