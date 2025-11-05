import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/dbConfig/dbConnection";
import jwt from "jsonwebtoken";

export async function POST(NextRequest) {
  try {
    await connectToDB();
    const tokenData = jwt.verify(
      NextRequest.cookies.get("token")?.value || "",
      process.env.JWT_SECRET
    );
    return NextResponse.json(
      { message: "Token is valid", data: tokenData.id },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { error: error },
      { status: 500 }
    );
  }
}
