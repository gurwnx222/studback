import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/dbConfig/dbConnection";
import { Admin } from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function POST(NextRequest) {
  try {
    await connectToDB();
    const { username, password } = await NextRequest.json();

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return NextResponse.json(
        { message: "Admin with this registration ID already exists" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed passwd", hashedPassword);

    const newAdmin = new Admin({
      username,
      password: hashedPassword,
    });
    await newAdmin.save();
    return NextResponse.json(
      { message: "Admin registered successfully", Admin: newAdmin },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { error: error },
      { status: 500 }
    );
  }
}
