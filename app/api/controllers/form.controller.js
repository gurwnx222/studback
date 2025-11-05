import connectToDB from "@/dbConfig/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import Form from "@/models/form.model";

//creating a new Form
export async function POST(NextRequest) {
  try {
    await connectToDB();
    const {
      name,
      teachingEffectiveness,
      communicationSkills,
      FormKnowledge,
      punctualityAndAvailability,
      overallExperience,
    } = await NextRequest.json();
    const existingForm = await Form.findOne({ name });
    if (existingForm) {
      return NextResponse.json(
        { message: "Form already exists" },
        { status: 400 }
      );
    }
    const newForm = new Form({
      name,
      teachingEffectiveness,
      communicationSkills,
      FormKnowledge,
      punctualityAndAvailability,
      overallExperience,
    });
    await newForm.save();
    const response = NextResponse.json(
      { message: "Form created successfully", Form: newForm },
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
//get all Forms
export async function GET() {
  try {
    await connectToDB();
    const Forms = await Form.find({});
    return NextResponse.json({ Forms: Forms }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { error: error },
      { status: 500 }
    );
  }
}
