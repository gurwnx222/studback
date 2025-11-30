import connectToDB from "@/dbConfig/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import Subject from "@/models/subject.model";
import Form from "@/models/form.model";
import Semester from "@/models/semester.model";
import School from "@/models/school.model";
import Programme from "@/models/programme.model";
import Department from "@/models/department.model";

//fetching subjects related to a student
export async function POST(NextRequest) {
  try {
    await connectToDB();
    const { school, department, programme, semester } =
      await NextRequest.json();

    console.log("Received Data: ", {
      school,
      department,
      programme,
      semester,
    });
    // Validate required parameters
    if (!school) {
      return NextResponse.json(
        {
          message:
            "Missing required parameters: department, school, semester, and programme are required",
        },
        { status: 400 }
      );
    }

    // Step 1: Find the school by name and populate departments
    const schoolData = await School.findOne({ name: school }).populate(
      "departments"
    );
    console.log("School Data: ", schoolData);

    if (!schoolData) {
      return NextResponse.json(
        { message: "School not found" },
        { status: 404 }
      );
    }
    // Step 2: Extract particular department ID from the populated departments
    const exactDepartment = schoolData.departments.find(
      (dep) => dep.name === department
    );
    if (!exactDepartment) console.log("Department not found");

    // Step 3: Find programmes within the exact department
    const departmentData = await Department.findById(
      exactDepartment._id
    ).populate("programmes");

    if (!departmentData) console.log("Department data not found");

    const exactProgramme = departmentData.programmes.find(
      (prog) => prog.name === programme
    );
    if (!exactProgramme) console.log("Programme not found");
    // Step 4: Find semesters within the exact programme
    const programmeData = await Programme.findById(exactProgramme._id).populate(
      "semesters"
    );
    if (!programmeData) console.log("Programme data not found");
    const exactSemester = programmeData.semesters.find(
      (sem) => sem.name === semester
    );
    if (!exactSemester) console.log("Semester not found");
    // Step 5: Finally, find subjects within the exact semester
    const semesterData = await Semester.findById(exactSemester._id).populate(
      "subjects"
    );
    if (!semesterData) console.log("Semester data not found");
    const subjects = [];
    subjects.push(semesterData.subjects);
    return NextResponse.json(
      {
        message: "School fetched successfully",
        subjects: subjects.flat(),
        count: subjects.length,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching schools", error: error.message },
      { status: 500 }
    );
  }
}
