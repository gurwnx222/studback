import connectToDB from "@/dbConfig/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import Subject from "@/models/subject.model";
import Form from "@/models/form.model";
import Semester from "@/models/semester.model";
import School from "@/models/school.model";
import Programme from "@/models/programme.model";
import Department from "@/models/department.model";

//fetching subjects related to a student
export async function POST(request) {
  try {
    await connectToDB();
    const { school, department, programme, semester } = await request.json();

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
    if (!exactDepartment) return "Department not found";

    // Step 3: Find programmes within the exact department
    const departmentData = await Department.findById(
      exactDepartment._id
    ).populate("programmes");

    if (!departmentData) return "Department data not found";

    const exactProgramme = departmentData.programmes.find(
      (prog) => prog.name === programme
    );
    if (!exactProgramme) return "Programme not found";
    // Step 4: Find semesters within the exact programme
    const programmeData = await Programme.findById(exactProgramme._id).populate(
      "semesters"
    );
    if (!programmeData) return "Programme data not found";
    const exactSemester = programmeData.semesters.find(
      (sem) => sem.name === semester
    );
    if (!exactSemester) return "Semester not found";
    // Step 5: Finally, find subjects within the exact semester
    const semesterData = await Semester.findById(exactSemester._id).populate(
      "subjects"
    );
    if (!semesterData) return "Semester data not found";
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
