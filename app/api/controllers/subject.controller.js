import connectToDB from "@/dbConfig/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import Subject from "@/models/subject.model";
import Form from "@/models/form.model";
import Semester from "@/models/semester.model"; // Add this import

//creating a new subject
export async function POST(NextRequest) {
  try {
    await connectToDB();
    const { semesterId, name, forms = [] } = await NextRequest.json();

    let existingSubject = await Subject.findOne({ name });
    if (!existingSubject) {
      existingSubject = new Subject({ name, forms: [] });
      await existingSubject.save();
    }

    const formIds = [];
    for (const frm of forms) {
      let form = await Form.findOne({ name: frm.name });
      if (!form) {
        form = new Form({
          name: frm.name,
        });
        await form.save();
      }
      formIds.push(form._id);
    }

    existingSubject.forms = [...existingSubject.forms, ...formIds];
    await existingSubject.save();

    // Link subject to semester
    if (semesterId) {
      const semesterDoc = await Semester.findById(semesterId);
      if (semesterDoc) {
        const isSubjectLinked = semesterDoc.subjects.includes(
          existingSubject._id
        );
        if (!isSubjectLinked) {
          semesterDoc.subjects.push(existingSubject._id);
          await semesterDoc.save();
        }
      }
    }

    const populatedSubject = await Subject.findById(
      existingSubject._id
    ).populate("forms");

    return NextResponse.json(
      { message: "Subject updated successfully", subject: populatedSubject },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
//fetching all subjects
export async function GET(NextRequest) {
  try {
    await connectToDB();
    const subjects = await Subject.find({}).populate("forms");
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
    const { _id } = await NextRequest.json();
    const deletedSubject = await Subject.findByIdAndDelete(_id);
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
