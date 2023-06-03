import { NextResponse } from "next/server";
import { UploadImage } from "@/utils/upload";

export async function POST(req) {
  try {
    const data = await req.formData()
    const uploadData = new FormData()
    uploadData.append('file', data.get("File"))
    uploadData.append('fileName', "File")
    uploadData.append('folder', '/sellfast/products/')
    await UploadImage(uploadData)
    return NextResponse.json({ message: "Successful" })
  } catch (error) {
    return NextResponse.json({ message: error.message })
  }
}