import { NextResponse } from "next/server";
import { imagekit } from "@/config/imagekit";

export async function POST(req) {
  try {
    const data = await req.formData()
    const file = data.get('File')
    imagekit.upload({
    })
    return NextResponse.json({ message: "Successful" })
  } catch (error) {
    return NextResponse.json({ message: error.message })
  }
}