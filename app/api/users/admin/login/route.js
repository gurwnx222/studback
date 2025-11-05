import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/dbConfig/dbConnection";
import { Admin } from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectToDB();
    const { username, password } = await request.json();

    const existingAdmin = await Admin.findOne({ username });
    if (!existingAdmin) {
      return NextResponse.json(
        { message: "User does not exists" },
        { status: 400 }
      );
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingAdmin.password
    );
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Password is incorrect!!" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Login successful", user: existingAdmin },
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
