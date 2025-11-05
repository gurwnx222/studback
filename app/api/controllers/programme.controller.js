import connectToDB from "@/dbConfig/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import programme from "@/models/programme.model";

//creating a new programme
export async function POST(NextRequest) {
  try {
    await connectToDB();
    const { name, year } = await NextRequest.json();
    const existingProgramme = await programme.findOne({ name });
    if (existingProgramme) {
      return NextResponse.json(
        { message: "Programme already exists" },
        { status: 400 }
      );
    }
    const newProgramme = new programme({ name, year });
    await newProgramme.save();
    const response = NextResponse.json(
      { message: "Programme created successfully", programme: newProgramme },
      { status: 201 }
    );
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { error: error },
      { status: 500 }
    );
  }
}
//fetching all programmes
export async function GET(NextRequest) {
  try {
    await connectToDB();
    const programmes = await programme.find({});
    return NextResponse.json(
      { message: "Programmes fetched successfully", programmes: programmes },
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
//deleting a programme
export async function DELETE(NextRequest) {
  try {
    await connectToDB();
    const { _id } = await NextRequest.json();
    const deletedProgramme = await programme.findByIdAndDelete(_id);
    if (!deletedProgramme) {
      return NextResponse.json(
        { message: "Programme not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Programme deleted successfully",
        programme: deletedProgramme,
      },
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
