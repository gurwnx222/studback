import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/dbConfig/dbConnection";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(NextRequest) {
  try {
    await connectToDB();
    const { registerationId, password } = await NextRequest.json();

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
