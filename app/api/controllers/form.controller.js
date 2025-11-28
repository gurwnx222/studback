import connectToDB from "@/dbConfig/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import Form from "@/models/form.model";
import Subject from "@/models/subject.model";

//creating a new form
export async function POST(NextRequest) {
  try {
    await connectToDB();
    const { subjectId, name } = await NextRequest.json();

    let existingForm = await Form.findOne({ name });
    if (!existingForm) {
      existingForm = new Form({ name });
      await existingForm.save();
    }

    // Link form to subject
    if (subjectId) {
      const subjectDoc = await Subject.findById(subjectId);
      if (subjectDoc) {
        const isFormLinked = subjectDoc.forms.includes(existingForm._id);
        if (!isFormLinked) {
          subjectDoc.forms.push(existingForm._id);
          await subjectDoc.save();
        }
      }
    }

    return NextResponse.json(
      { message: "Form updated successfully", form: existingForm },
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
