import connectToDB from "@/dbConfig/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import Programme from "@/models/programme.model";
import Semester from "@/models/semester.model";
import Department from "@/models/department.model";
//creating a new programme

export async function POST(NextRequest) {
  try {
    await connectToDB();
    const { departmentId, name, semesters = [] } = await NextRequest.json();

    let existingProgramme = await Programme.findOne({ name });
    if (!existingProgramme) {
      existingProgramme = new Programme({ name, semesters: [] });
      await existingProgramme.save();
    }

    // Link semesters to the programme
    const semesterIds = [];
    for (const sem of semesters) {
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

    // Link programme to department
    if (departmentId) {
      const departmentDoc = await Department.findById(departmentId);
      if (departmentDoc) {
        const isProgrammeLinked = departmentDoc.programmes.includes(
          existingProgramme._id
        );
        if (!isProgrammeLinked) {
          departmentDoc.programmes.push(existingProgramme._id);
          await departmentDoc.save();
        }
      }
    }

    const populatedProgramme = await Programme.findById(
      existingProgramme._id
    ).populate("semesters");

    return NextResponse.json(
      {
        message: "Programme created successfully",
        programme: populatedProgramme,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
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
