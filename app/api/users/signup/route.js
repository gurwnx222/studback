import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/dbConfig/dbConnection";
import User from "@/models/user.model";
//import bcrypt from "bcrypt";

export async function POST(NextRequest) {
  try {
    await connectToDB();
    const {
      name,
      registrationId,
      school,
      department,
      semester,
      programme,
      password,
    } = await NextRequest.json();

    const existingUser = await User.findOne({ registrationId });
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this registration ID already exists" },
        { status: 400 }
      );
    }
    // const hashedPassword = await bcrypt.hash(password, 10);
    //console.log("hashed passwd", hashedPassword);

    const newUser = new User({
      name,
      registrationId,
      school,
      department,
      semester,
      programme,
      password,
    });
    await newUser.save();
    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
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
