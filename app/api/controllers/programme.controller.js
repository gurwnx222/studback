import connectToDB from "@/dbConfig/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import Programme from "@/models/programme.model";
import Semester from "@/models/semester.model";
//creating a new programme
export async function POST(NextRequest) {
  try {
    await connectToDB();
    const { name, semester } = await NextRequest.json();
    const existingProgramme = await Programme.findOne({ name });
    if (existingProgramme) {
      return NextResponse.json(
        { message: "Programme already exists" },
        { status: 400 }
      );
    }
    const semesterIds = [];
    for (const sem of semester) {
      let semInstance = await Semester.findOne({ name: sem.name });
      if (!semInstance) {
        semInstance = new Semester({ name: sem.name, subjects: [] });
        await semInstance.save();
      }
      semesterIds.push(semInstance._id);
    }
    existingProgramme.semesters = [
      ...existingProgramme.semesters,
      ...semesterIds,
    ];
    await existingProgramme.save();
    const populatedProgramme = await Programme.findById(
      existingProgramme._id
    ).populate("semesters");
    const response = NextResponse.json(
      {
        message: "Programme created successfully",
        semester: populatedProgramme,
      },
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
    const programmes = await Programme.find({});
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
    const deletedProgramme = await Programme.findByIdAndDelete(_id);
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
