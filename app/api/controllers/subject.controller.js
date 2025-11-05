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
//fetching all subjects
export async function GET(NextRequest) {
  try {
    await connectToDB();
    const subjects = await Subject.find({});
    return NextResponse.json(
      { message: "Subjects fetched successfully", subjects: subjects },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
//fetching subjects by semester
export async function GET_BY_SEMESTER(NextRequest, { params }) {
  try {
    await connectToDB();
    const { semester } = params;
    const subjects = await Subject.find({ semester: semester });
    return NextResponse.json(
      { message: "Subjects fetched successfully", subjects: subjects },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
//deleting a subject by id
export async function DELETE(NextRequest, { params }) {
  try {
    await connectToDB();
    const { id } = params;
    const deletedSubject = await Subject.findByIdAndDelete(id);
    if (!deletedSubject) {
      return NextResponse.json(
        { message: "Subject not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Subject deleted successfully", subject: deletedSubject },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
