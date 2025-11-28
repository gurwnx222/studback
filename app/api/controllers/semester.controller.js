import connectToDB from "@/dbConfig/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import Semester from "@/models/semester.model";
import Subject from "@/models/subject.model";
import Programme from "@/models/programme.model";

export async function POST(NextRequest) {
  try {
    await connectToDB();
    const { programmeId, name, subjects = [] } = await NextRequest.json();

    let existingSemester = await Semester.findOne({ name });
    if (!existingSemester) {
      existingSemester = new Semester({ name, subjects: [] });
      await existingSemester.save();
    }

    const subjectIds = [];
    for (const sub of subjects) {
      let subject = await Subject.findOne({ name: sub.name });
      if (!subject) {
        subject = new Subject({
          name: sub.name,
          forms: [],
        });
        await subject.save();
      }
      subjectIds.push(subject._id);
    }

    // Update existing semester with new subjects
    existingSemester.subjects = [...existingSemester.subjects, ...subjectIds];
    await existingSemester.save();

    // Link semester to programme
    if (programmeId) {
      const programmeDoc = await Programme.findById(programmeId);
      if (programmeDoc) {
        const isSemesterLinked = programmeDoc.semesters.includes(
          existingSemester._id
        );
        if (!isSemesterLinked) {
          programmeDoc.semesters.push(existingSemester._id);
          await programmeDoc.save();
        }
      }
    }

    const populatedSemester = await Semester.findById(
      existingSemester._id
    ).populate("subjects");

    return NextResponse.json(
      {
        message: "Semester updated successfully",
        semester: populatedSemester,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(NextRequest) {
  try {
    await connectToDB();
    const semesters = await Semester.find({}).populate("subjects");
    return NextResponse.json(
      {
        message: "Semesters fetched successfully",
        semesters: semesters,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(NextRequest) {
  try {
    await connectToDB();
    const { _id } = await NextRequest.json();
    const deletedSemester = await Semester.findByIdAndDelete(_id);
    if (!deletedSemester) {
      return NextResponse.json(
        { message: "Semester not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        message: "Semester deleted successfully",
        semester: deletedSemester,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
