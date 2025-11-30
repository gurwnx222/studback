import connectToDB from "@/dbConfig/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import Subject from "@/models/subject.model";
import Form from "@/models/form.model";
import Semester from "@/models/semester.model";
import School from "@/models/school.model";
import Programme from "@/models/programme.model";
import Department from "@/models/department.model";

//fetching subjects related to a student
export async function POST(request) {
  try {
    await connectToDB();
    const { school } = await request.json();

    // Validate required parameters
    if (!school) {
      return NextResponse.json(
        {
          message:
            "Missing required parameters: department, school, semester, and programme are required",
        },
        { status: 400 }
      );
    }

    // Step 1: Find the school by name and populate departments
    const schoolData = await School.findOne({ name: school }).populate(
      "departments"
    );
    if (!schoolData) {
      return NextResponse.json(
        { message: "School not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "School fetched successfully",
        subjects: schoolData,
        count: schoolData.length,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching schools", error: error.message },
      { status: 500 }
    );
  }
}
