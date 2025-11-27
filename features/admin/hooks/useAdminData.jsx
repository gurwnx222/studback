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

  // ...existing code...

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
        const response = await axios.post("/api/routes/department", {
          name: deptData?.name,
          programmes: [], // Initialize with empty programmes array
        });
        if (response.status === 201 || response.status === 200) {
          console.log("Adding new department");
          console.log("New Department added", response.data);
        }
        const returned = response?.data?.department || {};
        const created = response?.data?.school?.departments?.programmes
          ? response?.data?.school?.departments
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
    addYear,
    updateYear,
    deleteYear,
    addForm,
    updateForm,
    deleteForm,
  };
};

export default useAdminData;
