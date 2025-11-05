import { NextRequest, NextResponse } from "next/server";
import getTokenData from "@/utils/getTokenData";
import User from "@/models/userModel";

export async function POST(NextRequest) {
  try {
    const userId = await getTokenData(NextRequest);
    const profileData = User.findOne({ _id: userId }).select("-password -__v");
    return NextResponse.json(
      { message: "User profile fetched successfully", data: profileData },
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
