import connectToDB from "@/dbConfig/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import Department from "@/models/department.model";
import School from "@/models/school.model";

//creating a new department
export async function POST(NextRequest) {
  try {
    await connectToDB();
    const {
      schoolId,
      name,
      programmes: [],
    } = await NextRequest.json();

    let existingDepartment = await Department.findOne({ name });
    if (!existingDepartment) {
      existingDepartment = new Department({ name, programmes: [] });
      await existingDepartment.save();
    }
    // Important: Linking department to school
    if (schoolId) {
      const schoolDoc = await School.findById(schoolId);
      if (schoolDoc) {
        const isDepartmentLinked = schoolDoc.departments.includes(
          existingDepartment._id
        );
        if (!isDepartmentLinked) {
          schoolDoc.departments.push(existingDepartment._id);
          await schoolDoc.save();
        }
      }
    }
    const populatedDepartment = await Department.findById(
      existingDepartment._id
    );
    return NextResponse.json(
      {
        message: "Department updated successfully",
        department: populatedDepartment,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
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
