import connectToDB from "@/dbConfig/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import School from "@/models/school.model";

//creating a new school
export async function POST(NextRequest) {
  try {
    await connectToDB();
    const { name, department } = await NextRequest.json();
    const existingSchool = await School.findOne({ name });
    if (existingSchool) {
      return NextResponse.json(
        { message: "School already exists" },
        { status: 400 }
      );
    }
    const newSchool = new School({ name, department });
    await newSchool.save();
    const response = NextResponse.json(
      { message: "School created successfully", school: newSchool },
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
//fetching all schools
export async function GET(NextRequest) {
  try {
    await connectToDB();
    const schools = await School.find({});
    /*.populate({
                path: 'departments',
                populate: {
                    path: 'programmes',
                    populate: {
                        path: 'subjects',
                        populate: {
                            path: 'forms'
                        }
                    }
                }
            }); */
    return NextResponse.json(
      { message: "Schools fetched successfully", schools: schools },
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
//deleting a school
export async function DELETE(NextRequest) {
  try {
    await connectToDB();
    const { _id } = await NextRequest.json();
    const deletedSchool = await School.findByIdAndDelete(_id);
    if (!deletedSchool) {
      return NextResponse.json(
        { message: "School not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "School deleted successfully", school: deletedSchool },
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
