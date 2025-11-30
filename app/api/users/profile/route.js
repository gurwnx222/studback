import { NextRequest, NextResponse } from "next/server";
import getTokenData from "@/utils/getTokenData";
import User from "@/models/user.model";
import connectToDB from "@/dbConfig/dbConnection";

export async function GET(NextRequest) {
  try {
    await connectToDB();

    // Get user ID from token
    const userId = getTokenData(NextRequest);
    console.log("User ID from token:", userId);
    // Fetch user data
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User found", data: user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
