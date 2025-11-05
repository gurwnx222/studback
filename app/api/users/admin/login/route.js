import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/dbConfig/dbConnection";
import { Admin } from "@/models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(NextRequest) {
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
    const tokenPayload = {
      id: existingUser._id,
    };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    const response = NextResponse.json(
      { message: "Login Successful", token: token, user: existingUser },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60,
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
