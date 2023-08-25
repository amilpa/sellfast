import { NextResponse } from "next/server";
import { getUser, updateUserBalance } from "@/models/user";
import {
  addNewTransaction,
  updateProductQuantity,
  getTransactionByBuyer,
} from "@/models/products";

export async function POST(req, context) {
  const { params } = context;
  const { id, price, soldBy, quantity } = await req.json();
  const user = await getUser({ id });
  const check = await getTransactionByBuyerAndProduct(id, params.id);
  if (check.length > 0) {
    return NextResponse.json(
      { error: "You have already bought this product" },
      { status: 400 }
    );
  }
  if (id === soldBy) {
    return NextResponse.json(
      { error: "You can't buy your own product" },
      { status: 400 }
    );
  }
  if (quantity === 0) {
    return NextResponse.json(
      { error: "Product is out of stock" },
      { status: 400 }
    );
  }
  if (user.balance < price) {
    return NextResponse.json({ error: "Insufficient funds" }, { status: 400 });
  }
  await updateUserBalance({ balance: user.balance - price, user_id: id });
  await addNewTransaction({ id: params.id, buyer: id, amount: price });
  await updateProductQuantity({
    quantity: quantity - 1,
    product_id: params.id,
  });
  return NextResponse.json({ messages: "Successful" });
}
