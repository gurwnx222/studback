import connectToDB from "@/dbConfig/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import Form from "@/models/form.model";

export async function POST(NextRequest) {
  try {
    await connectToDB();
    const formData = await NextRequest.json();

    // Validate required fields
    const requiredFields = [
      "teacherName",
      "teachingEffectiveness",
      "communicationSkills",
      "subjectKnowledge",
      "punctualityAndAvailability",
      "overallExperience",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json(
          { message: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate ratings are between 1 and 5
    const ratingFields = requiredFields.filter(
      (field) => field !== "teacherName"
    );
    for (const field of ratingFields) {
      if (formData[field] < 1 || formData[field] > 5) {
        return NextResponse.json(
          { message: `${field} must be between 1 and 5` },
          { status: 400 }
        );
      }
    }

    const newForm = new Form(formData);
    await newForm.save();

    return NextResponse.json(
      {
        message: "Form submitted successfully",
        form: newForm,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      { message: "Failed to submit form" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDB();
    const forms = await Form.find({}).sort({ submittedAt: -1 });

    return NextResponse.json(
      {
        message: "Forms fetched successfully",
        forms: forms,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Form fetch error:", error);
    return NextResponse.json(
      { message: "Failed to fetch forms" },
      { status: 500 }
    );
  }
}

export async function DELETE(NextRequest) {
  try {
    await connectToDB();
    const { searchParams } = new URL(NextRequest.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Form ID is required" },
        { status: 400 }
      );
    }

    const deletedForm = await Form.findByIdAndDelete(id);
    if (!deletedForm) {
      return NextResponse.json({ message: "Form not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Form deleted successfully",
        form: deletedForm,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Form deletion error:", error);
    return NextResponse.json(
      { message: "Failed to delete form" },
      { status: 500 }
    );
  }
}
