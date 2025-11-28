import { useState, useEffect } from "react";
//adding backend deps
import axios from "axios";
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
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all schools with related data on mount

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/routes/school");
        console.log("Fetched schools:", response.data);

        // Normalise server response: handle { schools: [...] } shape and map _id -> id
        const payload = response.data;
        const arr = Array.isArray(payload) ? payload : payload?.schools || [];

        const normalize = (item) => {
          if (!item || typeof item !== "object") return item;
          const { _id, id, departments, programmes, years, forms, ...rest } =
            item;
          const normalized = {
            id: _id || id || `local_${Date.now()}`,
            ...rest,
          };
          if (Array.isArray(departments))
            normalized.departments = departments.map(normalize);
          if (Array.isArray(programmes))
            normalized.programmes = programmes.map(normalize);
          if (Array.isArray(years)) normalized.years = years.map(normalize);
          if (Array.isArray(forms)) normalized.forms = forms.map(normalize);
          return normalized;
        };

        setSchools(arr.map(normalize));
        setError(null);
      } catch (err) {
        console.error(
          "Failed to fetch schools:",
          err?.response?.data || err?.message
        );
        setError(err?.message);
        setSchools([]); // Fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  const addSchool = async (schoolData) => {
    //writing backend logic to add school
    const addNewSchool = async () => {
      try {
        // using post request via axios
        const response = await axios.post("/api/routes/school", {
          name: schoolData?.name,
          departments: [], // Initialize with empty departments array
        });
        if (response.status === 201 || response.status === 200) {
          // <-- use server _id mapped to id
          const returned = response?.data?.school || {};
          const created = response?.data?.school?.departments
            ? response.data.school
            : { departments: [] };
          const newSchool = {
            id: returned._id || returned.id || `local_${Date.now()}`,
            ...schoolData,
            departments: Array.isArray(created.departments)
              ? created.departments.map((d) =>
                  typeof d === "object"
                    ? { id: d._id || d.id, name: d.name }
                    : d
                )
              : [],
          };
          console.log("Adding new school");
          console.log("New School added", response.data);
          setSchools((prev) => [...prev, newSchool]);
        }
      } catch (err) {
        console.error(
          "Adding new school failed:",
          err?.response?.data || err?.message
        );
        return;
      }
    };
    addNewSchool();
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
    const addNewDepartment = async () => {
      try {
        // Pass schoolId to backend so department is linked to the correct school
        const response = await axios.post("/api/routes/department", {
          name: deptData?.name,
          programmes: [], // Initialize with empty programmes array
          schoolId, // <-- Pass schoolId to backend
        });
        if (response.status === 201 || response.status === 200) {
          console.log("Adding new department");
          console.log("New Department added", response.data);
        }
        const returned = response?.data?.department || {};
        const created = response?.data?.department?.programmes
          ? response?.data?.department
          : { programmes: [] };
        const serverSchool = response?.data?.school || null;
        const newDepartment = {
          id: returned._id || returned.id || `local_${Date.now()}`,
          ...deptData,
          programmes: Array.isArray(created.programmes)
            ? created.programmes.map((p) =>
                typeof p === "object" ? { id: p._id || p.id, name: p.name } : p
              )
            : [],
        };
        console.log("New Department to add:", newDepartment);
        setSchools((prev) =>
          prev.map((s) => {
            if (s.id !== schoolId) return s;

            // If server returned the full updated school, use its departments (normalized)
            if (serverSchool && Array.isArray(serverSchool.departments)) {
              return {
                ...s,
                departments: serverSchool.departments.map((d) => ({
                  id: d._id || d.id || `d_${Date.now()}`,
                  ...d,
                  programmes: Array.isArray(d.programmes)
                    ? d.programmes.map((p) => ({
                        id: p._id || p.id || `p_${Date.now()}`,
                        ...p,
                      }))
                    : [],
                })),
              };
            }

            return {
              ...s,
              departments: [...(s.departments || []), newDepartment],
            };
          })
        );
      } catch (err) {
        console.error(
          "Adding new department failed:",
          err?.response?.data || err?.message
        );
        return;
      }
    };
    addNewDepartment();
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
    const addNewProgramme = async () => {
      try {
        // Pass deptId to backend so programme is linked to the correct department
        const response = await axios.post("/api/routes/programme", {
          name: progData?.name,
          semesters: [], // Initialize with empty semesters array
          departmentId: deptId,
        });
        if (response.status === 201 || response.status === 200) {
          console.log("Adding new programme");
          console.log("New Programme added", response.data);
        }
        const returned = response?.data?.programme || {};
        const created = response?.data?.programme?.semesters
          ? response?.data?.programme
          : { semesters: [] };
        const serverDepartment = response?.data?.department || null;
        const newProgramme = {
          id: returned._id || returned.id || `local_${Date.now()}`,
          ...progData,
          semesters: Array.isArray(created.semesters)
            ? created.semesters.map((s) =>
                typeof s === "object" ? { id: s._id || s.id, name: s.name } : s
              )
            : [],
        };

        setSchools((prevSchools) =>
          prevSchools.map((school) => ({
            ...school,
            departments: school.departments.map((dept) => {
              if (dept.id === deptId) {
                // If server returned the full updated department, use its programmes (normalized)
                if (
                  serverDepartment &&
                  Array.isArray(serverDepartment.programmes)
                ) {
                  return {
                    ...dept,
                    programmes: serverDepartment.programmes.map((p) => ({
                      id: p._id || p.id || `p_${Date.now()}`,
                      ...p,
                      semesters: Array.isArray(p.semesters)
                        ? p.semesters.map((s) => ({
                            id: s._id || s.id || `s_${Date.now()}`,
                            ...s,
                          }))
                        : [],
                    })),
                  };
                }
                // Otherwise, just add the new programme locally
                return {
                  ...dept,
                  programmes: [...(dept.programmes || []), newProgramme],
                };
              }
              return dept;
            }),
          }))
        );
      } catch (err) {
        console.error(
          "Adding new programme failed:",
          err?.response?.data || err?.message
        );
        return;
      }
    };
    addNewProgramme();
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

  // Semester operations
  const addSemester = (progId, semesterData) => {
    const addNewSemester = async () => {
      try {
        // Pass deptId to backend so programme is linked to the correct department
        const response = await axios.post("/api/routes/semester", {
          name: semesterData?.name,
          subjects: [], // Initialize with empty semesters array
          programmeId: progId,
        });

        if (response.status === 201 || response.status === 200) {
          console.log("Adding new semester");
          console.log("New Semester added", response.data);
        }
        const returned = response?.data?.semester || {};
        const created = response?.data?.semester?.subjects
          ? response?.data?.semester
          : { subjects: [] };
        const serverSemester = response?.data?.semester || null;
        const newProgramme = {
          id: returned._id || returned.id || `local_${Date.now()}`,
          ...semesterData,
          subjects: Array.isArray(created.subjects)
            ? created.subjects.map((s) =>
                typeof s === "object" ? { id: s._id || s.id, name: s.name } : s
              )
            : [],
        };

        setSchools((prevSchools) =>
          prevSchools.map((school) => ({
            ...school,
            departments: school.departments.map((dept) => ({
              ...dept,
              programmes: dept.programmes.map((prog) => {
                if (prog.id === progId) {
                  // If server returned the full updated programme, use its semesters (normalized)
                  if (
                    serverSemester &&
                    Array.isArray(serverSemester.semesters)
                  ) {
                    return {
                      ...prog,
                      semesters: serverSemester.semesters.map((s) => ({
                        id: s._id || s.id || `s_${Date.now()}`,
                        ...s,
                      })),
                    };
                  }
                  // Otherwise, just add the new semester locally
                  return {
                    ...prog,
                    semesters: [...(prog.semesters || []), newProgramme],
                  };
                }
                return prog;
              }),
            })),
          }))
        );
      } catch (err) {
        console.error(
          "Adding new semester failed:",
          err?.response?.data || err?.message
        );
        return;
      }
    };
    addNewSemester();
  };

  const updateSemester = (semesterId, semesterData) => {
    setSchools(
      schools.map((school) => ({
        ...school,
        departments: school.departments.map((dept) => ({
          ...dept,
          programmes: dept.programmes.map((prog) => ({
            ...prog,
            semesters: (prog.semesters || []).map((semester) =>
              semester.id === semesterId
                ? { ...semester, ...semesterData }
                : semester
            ),
          })),
        })),
      }))
    );
  };

  const deleteSemester = (semesterId) => {
    if (confirm("Are you sure you want to delete this semester?")) {
      setSchools(
        schools.map((school) => ({
          ...school,
          departments: school.departments.map((dept) => ({
            ...dept,
            programmes: dept.programmes.map((prog) => ({
              ...prog,
              semesters: (prog.semesters || []).filter(
                (semester) => semester.id !== semesterId
              ),
            })),
          })),
        }))
      );
    }
  };

  // Teacher Form operations (now under semesters)
  const addForm = (semesterId, formData) => {
    const addNewForm = async () => {
      try {
        // Pass deptId to backend so programme is linked to the correct department
        const response = await axios.post("/api/routes/form", {
          name: formData?.name,
          semesterId: semesterId,
        });
        if (response.status === 201 || response.status === 200) {
          console.log("Adding new form");
          console.log("New form added", response.data);
        }
        const returned = response?.data?.form || {};
        const created = response?.data?.subject?.forms
          ? response?.data?.subject
          : { forms: [] };
        const serverSubject = response?.data?.form || null;
        const newProgramme = {
          id: returned._id || returned.id || `local_${Date.now()}`,
          ...formData,
          forms: Array.isArray(created.forms)
            ? created.forms.map((f) =>
                typeof f === "object" ? { id: f._id || f.id, name: f.name } : f
              )
            : [],
        };

        setSchools((prevSchools) =>
          prevSchools.map((school) => ({
            ...school,
            departments: school.departments.map((dept) => ({
              ...dept,
              programmes: dept.programmes.map((prog) => ({
                ...prog,
                semesters: (prog.semesters || []).map((semester) => {
                  if (semester.id === semesterId) {
                    // If server returned the full updated semester, use its forms (normalized)
                    if (serverSubject && Array.isArray(serverSubject.forms)) {
                      return {
                        ...semester,
                        forms: serverSubject.forms.map((f) => ({
                          id: f._id || f.id || `f_${Date.now()}`,
                          ...f,
                        })),
                      };
                    }
                    // Otherwise, just add the new form locally
                    return {
                      ...semester,
                      forms: [...(semester.forms || []), newProgramme],
                    };
                  }
                  return semester;
                }),
              })),
            })),
          }))
        );
      } catch (err) {
        console.error(
          "Adding new  failed:",
          err?.response?.data || err?.message
        );
        return;
      }
    };
    addNewForm();
  };

  const updateForm = (formId, formData) => {
    setSchools(
      schools.map((school) => ({
        ...school,
        departments: school.departments.map((dept) => ({
          ...dept,
          programmes: dept.programmes.map((prog) => ({
            ...prog,
            semesters: (prog.semesters || []).map((semester) => ({
              ...semester,
              forms: (semester.forms || []).map((form) =>
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
              semesters: (prog.semesters || []).map((semester) => ({
                ...semester,
                forms: (semester.forms || []).filter(
                  (form) => form.id !== formId
                ),
              })),
            })),
          })),
        }))
      );
    }
  };

  return {
    schools,
    loading,
    error,
    addSchool,
    updateSchool,
    deleteSchool,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    addProgramme,
    updateProgramme,
    deleteProgramme,
    addSemester, // <-- Add this line
    updateSemester,
    deleteSemester,
    addForm,
    updateForm,
    deleteForm,
  };
};

export default useAdminData;
