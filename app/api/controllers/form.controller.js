import connectToDB from "@/dbConfig/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import Form from "@/models/form.model";
import Subject from "@/models/subject.model";

//creating a new feedback form
export async function POST(NextRequest) {
  try {
    await connectToDB();
    const {
      subjectId,
      subjectName,
      teacher,
      ratings,
      suggestion,
      observation,
      status = "completed",
    } = await NextRequest.json();

    if (!subjectId || !Array.isArray(ratings) || ratings.length !== 15) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    const form = new Form({
      subjectId,
      subjectName,
      teacher,
      ratings,
      suggestion,
      observation,
      status,
    });
    await form.save();

    // Optionally link form to subject
    if (subjectId) {
      const subjectDoc = await Subject.findById(subjectId);
      if (subjectDoc) {
        subjectDoc.forms = subjectDoc.forms || [];
        subjectDoc.forms.push(form._id);
        await subjectDoc.save();
      }
    }

    return NextResponse.json(
      { message: "Feedback submitted successfully", form },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
//fetching all forms
export async function GET(NextRequest) {
  try {
    await connectToDB();
    const forms = await Form.find({});
    return NextResponse.json(
      { message: "Forms fetched successfully", forms: forms },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

//deleting a form by id
export async function DELETE(NextRequest) {
  try {
    await connectToDB();
    const { _id } = await NextRequest.json();
    const deletedForm = await Form.findByIdAndDelete(_id);
    if (!deletedForm) {
      return NextResponse.json({ message: "Form not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Form deleted successfully", form: deletedForm },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
