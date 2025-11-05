import { useState } from "react";

/**
 * useAdminData Hook
 *
 * Purpose: Custom hook to manage all admin dashboard data and operations
 *
 * Returns:
 * - schools: Current schools data array
 * - addSchool: Function to add new school
 * - updateSchool: Function to update existing school
 * - deleteSchool: Function to delete school
 * - addDepartment: Function to add department to a school
 * - updateDepartment: Function to update department
 * - deleteDepartment: Function to delete department
 * - addProgramme: Function to add programme to a department
 * - updateProgramme: Function to update programme
 * - deleteProgramme: Function to delete programme
 * - addYear: Function to add year to a programme
 * - updateYear: Function to update year
 * - deleteYear: Function to delete year
 * - addForm: Function to add teacher form to a year
 * - updateForm: Function to update teacher form
 * - deleteForm: Function to delete teacher form
 *
 * Benefits:
 * - Separates data logic from UI components
 * - Reusable across different components
 * - Easier to test
 * - Cleaner component code
 *
 * Note: This uses local state. In production, you would:
 * - Replace with API calls
 * - Add loading/error states
 * - Implement optimistic updates
 * - Add data validation
 */

const useAdminData = () => {
  // Initial mock data
  const [schools, setSchools] = useState([
    {
      id: "s1",
      name: "School of Engineering",
      code: "SOE",
      departments: [
        {
          id: "d1",
          name: "Computer Science & Engineering",
          code: "CSE",
          programmes: [
            {
              id: "p1",
              name: "B.Tech",
              code: "BTECH",
              years: [
                {
                  id: "y1",
                  name: "Third Year",
                  code: "Y3",
                  forms: [
                    {
                      id: "f1",
                      teacherName: "Dr. Priya Sharma",
                      subjectName: "Data Structures & Algorithms",
                      subjectCode: "CSE-301",
                      credits: "4",
                      schedule: "Mon, Wed, Fri - 9:00 AM",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  // School operations
  const addSchool = (schoolData) => {
    const newSchool = {
      id: "s" + Date.now(),
      ...schoolData,
      departments: [],
    };
    setSchools([...schools, newSchool]);
  };

  const updateSchool = (schoolId, schoolData) => {
    setSchools(
      schools.map((school) =>
        school.id === schoolId ? { ...school, ...schoolData } : school
      )
    );
  };

  const deleteSchool = (schoolId) => {
    if (confirm("Are you sure you want to delete this school?")) {
      setSchools(schools.filter((school) => school.id !== schoolId));
    }
  };

  // Department operations
  const addDepartment = (schoolId, deptData) => {
    setSchools(
      schools.map((school) => {
        if (school.id === schoolId) {
          return {
            ...school,
            departments: [
              ...school.departments,
              {
                id: "d" + Date.now(),
                ...deptData,
                programmes: [],
              },
            ],
          };
        }
        return school;
      })
    );
  };

  const updateDepartment = (deptId, deptData) => {
    setSchools(
      schools.map((school) => ({
        ...school,
        departments: school.departments.map((dept) =>
          dept.id === deptId ? { ...dept, ...deptData } : dept
        ),
      }))
    );
  };

  const deleteDepartment = (deptId) => {
    if (confirm("Are you sure you want to delete this department?")) {
      setSchools(
        schools.map((school) => ({
          ...school,
          departments: school.departments.filter((dept) => dept.id !== deptId),
        }))
      );
    }
  };

  // Programme operations
  const addProgramme = (deptId, progData) => {
    setSchools(
      schools.map((school) => ({
        ...school,
        departments: school.departments.map((dept) => {
          if (dept.id === deptId) {
            return {
              ...dept,
              programmes: [
                ...dept.programmes,
                {
                  id: "p" + Date.now(),
                  ...progData,
                  years: [],
                },
              ],
            };
          }
          return dept;
        }),
      }))
    );
  };

  const updateProgramme = (progId, progData) => {
    setSchools(
      schools.map((school) => ({
        ...school,
        departments: school.departments.map((dept) => ({
          ...dept,
          programmes: dept.programmes.map((prog) =>
            prog.id === progId ? { ...prog, ...progData } : prog
          ),
        })),
      }))
    );
  };

  const deleteProgramme = (progId) => {
    if (confirm("Are you sure you want to delete this programme?")) {
      setSchools(
        schools.map((school) => ({
          ...school,
          departments: school.departments.map((dept) => ({
            ...dept,
            programmes: dept.programmes.filter((prog) => prog.id !== progId),
          })),
        }))
      );
    }
  };

  // Year operations
  const addYear = (progId, yearData) => {
    setSchools(
      schools.map((school) => ({
        ...school,
        departments: school.departments.map((dept) => ({
          ...dept,
          programmes: dept.programmes.map((prog) => {
            if (prog.id === progId) {
              return {
                ...prog,
                years: [
                  ...prog.years,
                  {
                    id: "y" + Date.now(),
                    ...yearData,
                    forms: [],
                  },
                ],
              };
            }
            return prog;
          }),
        })),
      }))
    );
  };

  const updateYear = (yearId, yearData) => {
    setSchools(
      schools.map((school) => ({
        ...school,
        departments: school.departments.map((dept) => ({
          ...dept,
          programmes: dept.programmes.map((prog) => ({
            ...prog,
            years: prog.years.map((year) =>
              year.id === yearId ? { ...year, ...yearData } : year
            ),
          })),
        })),
      }))
    );
  };

  const deleteYear = (yearId) => {
    if (confirm("Are you sure you want to delete this year?")) {
      setSchools(
        schools.map((school) => ({
          ...school,
          departments: school.departments.map((dept) => ({
            ...dept,
            programmes: dept.programmes.map((prog) => ({
              ...prog,
              years: prog.years.filter((year) => year.id !== yearId),
            })),
          })),
        }))
      );
    }
  };

  // Teacher Form operations
  const addForm = (yearId, formData) => {
    setSchools(
      schools.map((school) => ({
        ...school,
        departments: school.departments.map((dept) => ({
          ...dept,
          programmes: dept.programmes.map((prog) => ({
            ...prog,
            years: prog.years.map((year) => {
              if (year.id === yearId) {
                return {
                  ...year,
                  forms: [
                    ...year.forms,
                    {
                      id: "f" + Date.now(),
                      ...formData,
                    },
                  ],
                };
              }
              return year;
            }),
          })),
        })),
      }))
    );
  };

  const updateForm = (formId, formData) => {
    setSchools(
      schools.map((school) => ({
        ...school,
        departments: school.departments.map((dept) => ({
          ...dept,
          programmes: dept.programmes.map((prog) => ({
            ...prog,
            years: prog.years.map((year) => ({
              ...year,
              forms: year.forms.map((form) =>
                form.id === formId ? { ...form, ...formData } : form
              ),
            })),
          })),
        })),
      }))
    );
  };

  const deleteForm = (formId) => {
    if (confirm("Are you sure you want to delete this teacher form?")) {
      setSchools(
        schools.map((school) => ({
          ...school,
          departments: school.departments.map((dept) => ({
            ...dept,
            programmes: dept.programmes.map((prog) => ({
              ...prog,
              years: prog.years.map((year) => ({
                ...year,
                forms: year.forms.filter((form) => form.id !== formId),
              })),
            })),
          })),
        }))
      );
    }
  };

  return {
    schools,
    addSchool,
    updateSchool,
    deleteSchool,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    addProgramme,
    updateProgramme,
    deleteProgramme,
    addYear,
    updateYear,
    deleteYear,
    addForm,
    updateForm,
    deleteForm,
  };
};

export default useAdminData;
