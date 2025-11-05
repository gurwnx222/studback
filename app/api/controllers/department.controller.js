import connectToDB from "@/dbConfig/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import Department from "@/models/department.model";

//creating a new department
export async function POST(NextRequest) {
  try {
    await connectToDB();
    const { name, programmes } = await NextRequest.json();
    const existingDepartment = await Department.findOne({ name });
    if (existingDepartment) {
      return NextResponse.json(
        { message: "Department already exists" },
        { status: 400 }
      );
    }
    const newDepartment = new Department({ name, programmes });
    await newDepartment.save();
    const response = NextResponse.json(
      { message: "Department created successfully", department: newDepartment },
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
//fetching all departments
export async function GET(NextRequest) {
  try {
    await connectToDB();
    const departments = await Department.find({});
    return NextResponse.json(
      { message: "Departments fetched successfully", departments: departments },
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
//deleting a department
export async function DELETE(NextRequest) {
  try {
    await connectToDB();
    const { _id } = await NextRequest.json();
    const deletedDepartment = await Department.findByIdAndDelete(_id);
    if (!deletedDepartment) {
      return NextResponse.json(
        { message: "Department not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Department deleted successfully",
        department: deletedDepartment,
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
