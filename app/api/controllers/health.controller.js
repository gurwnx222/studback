import { NextRequest, NextResponse } from "next/server";

export async function GET(req) {
  return NextResponse.json(
    { message: "API is working properly" },
    { status: 200 }
  );
}
