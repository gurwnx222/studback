import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/dbConfig/dbConnection";

export async function GET(NextRequest) {
  try {
    await connectToDB();
    const response = NextResponse.json(
      { message: "Logout Successful" },
      { status: 200 }
    );
    response.cookies.set("token", "", {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 0,
      expires: new Date(0),
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { error: error },
      { status: 500 }
    );
  }
}
