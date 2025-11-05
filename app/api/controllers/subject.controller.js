import connectToDB from "@/dbConfig/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import Subject from "@/models/subject.model";

//creating a new subject
export async function POST(NextRequest) {
  try {
    await connectToDB();
    const { name, teacher, semester, form } = await NextRequest.json();
    const existingSubject = await Subject.findOne({ name, semester });
    if (existingSubject) {
      return NextResponse.json(
        { message: "Subject already exists" },
        { status: 400 }
      );
    }
    const newSubject = new Subject({ name, teacher, semester, form });
    await newSubject.save();
    const response = NextResponse.json(
      { message: "Subject created successfully", subject: newSubject },
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
