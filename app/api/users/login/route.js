import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/dbConfig/dbConnection";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectToDB();
    const { registerationId, password } = await request.json();

    const existingUser = await User.findOne({ registerationId });
    if (!existingUser) {
      return NextResponse.json(
        { message: "User does not exists" },
        { status: 400 }
      );
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Password is incorrect!!" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Login successful", user: existingUser },
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
