import { NextResponse } from "next/server";
// import checkAuth from "./utils/checkAuth";

export default async function middleware(req) {
  // const url = new URL(req.url)
  // if (!session) {
  //   if (url.pathname.includes("/api") && !url.pathname.includes("auth"))
  // return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  // }
  // return NextResponse.json({ message: "Sucessful" })
}

// match everything except /api/auth
export const config = {
  matcher: '/api/user/:path*'
};
