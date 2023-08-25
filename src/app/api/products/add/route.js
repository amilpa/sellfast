import { NextResponse } from "next/server";
import { UploadImage } from "@/utils/upload";
import { addProduct } from "@/models/products";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const data = await req.formData();
    const uploadData = new FormData();
    uploadData.append("file", data.get("image"));
    uploadData.append("fileName", "File");
    uploadData.append("folder", "/sellfast/products/");
    const upload = await UploadImage(uploadData);
    if (typeof upload.message == undefined) {
      return NextResponse.json({ message: "Upload Failed" });
    } else {
      await addProduct({
        product_id: uuidv4(),
        name: data.get("name"),
        description: data.get("desc"),
        imageurl: upload.url,
        price: data.get("price"),
        quantity: data.get("quantity"),
        soldBy: data.get("soldBy"),
      });
    }
    return NextResponse.json({ message: "Successful" });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
