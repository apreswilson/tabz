import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const con = await dbConnect();
  if (con) {
    return new NextResponse("✓ Connected");
  } else {
    return new NextResponse("Connection Error")
  }
}