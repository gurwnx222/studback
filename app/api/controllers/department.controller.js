import connectToDB from "@/dbConfig/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import Department from "@/models/department.model";
import Programme from "@/models/programme.model";
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
    const programmeIds = [];
    for (const prog of programmes) {
      let programme = await Programme.findOne({ name: prog.name });
      if (!programme) {
        const newProgramme = new Programme({
          name: programme.name,
          subjects: [],
        });
        await newProgramme.save();
      }
      programmeIds.push(programme._id);
    }
    // Update existing department with new programmes
    existingDepartment.programmes = [
      ...existingDepartment.programmes,
      ...programmeIds,
    ];
    await existingDepartment.save();
    const populatedDepartment = await Department.findById(
      existingDepartment._id
    ).populate("programmes");

    const response = NextResponse.json(
      {
        message: "Department created successfully",
        department: populatedDepartment,
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
//fetching all departments
export async function GET(NextRequest) {
  try {
    await connectToDB();
    const departments = await Department.find({}).populate("programmes");
    return NextResponse.json(
      { message: "Departments fetched successfully", departments: departments },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
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
