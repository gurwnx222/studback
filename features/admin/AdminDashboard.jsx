"use client";
import React, { useState, useEffect } from "react";
import {
  Building2,
  GraduationCap,
  BookOpen,
  Users,
  Plus,
  Save,
} from "lucide-react";

// Component imports
import AdminHeader from "./components/AdminHeader";
import { StatsDashboard } from "./components/StatsCard";
import Modal from "./components/Modal";
import FormInput from "./components/FormInput";
import CollapsibleSection from "./components/CollapsibleSection";
import TeacherFormCard from "./components/TeacherFormCard";
import useAdminData from "./hooks/useAdminData";

/**
 * AdminDashboard - Main Component
 *
 * Purpose: Central dashboard for university management system
 *
 * Architecture:
 * - Uses custom hook (useAdminData) for data management
 * - Modular components for reusability
 * - Single modal for all CRUD operations
 * - Hierarchical data display with collapsible sections
 *
 * Data Flow:
 * 1. useAdminData hook manages all data operations
 * 2. Component maintains UI state (modal, collapse states)
 * 3. User actions trigger hook functions
 * 4. Hook updates data, component re-renders
 *
 * Features:
 * - Create/Read/Update/Delete operations for all entities
 * - Hierarchical organization (School → Dept → Prog → Year → Forms)
 * - Visual statistics dashboard
 * - Collapsible sections for better navigation
 * - Responsive modal system
 */

export default function AdminDashboard() {
  const [time, setTime] = useState(new Date());

  // Collapse states for each hierarchy level
  const [openSchools, setOpenSchools] = useState({});
  const [openDepartments, setOpenDepartments] = useState({});
  const [openProgrammes, setOpenProgrammes] = useState({});
  const [openYears, setOpenYears] = useState({});

  // Modal state management
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null, // 'school', 'department', 'programme', 'year', 'form'
    mode: "add", // 'add' or 'edit'
    data: null, // Current entity data (for edit mode)
    parentId: null, // Parent entity ID (for nested additions)
  });

  // Form data for modal inputs
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    teacherName: "",
    subjectName: "",
    subjectCode: "",
    credits: "",
    schedule: "",
  });

  // Get data management functions from custom hook
  const {
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
  } = useAdminData();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Modal management functions
  const openModal = (type, mode = "add", data = null, parentId = null) => {
    setModalState({ isOpen: true, type, mode, data, parentId });
    if (mode === "edit" && data) {
      setFormData(data);
    } else {
      resetFormData();
    }
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: null,
      mode: "add",
      data: null,
      parentId: null,
    });
    resetFormData();
  };

  const resetFormData = () => {
    setFormData({
      name: "",
      code: "",
      teacherName: "",
      subjectName: "",
      subjectCode: "",
      credits: "",
      schedule: "",
    });
  };

  // Save handler - routes to appropriate function based on type and mode
  const handleSave = () => {
    const { type, mode, parentId, data } = modalState;

    switch (type) {
      case "school":
        mode === "add" ? addSchool(formData) : updateSchool(data.id, formData);
        break;
      case "department":
        mode === "add"
          ? addDepartment(parentId, formData)
          : updateDepartment(data.id, formData);
        break;
      case "programme":
        mode === "add"
          ? addProgramme(parentId, formData)
          : updateProgramme(data.id, formData);
        break;
      case "year":
        mode === "add"
          ? addYear(parentId, formData)
          : updateYear(data.id, formData);
        break;
      case "form":
        mode === "add"
          ? addForm(parentId, formData)
          : updateForm(data.id, formData);
        break;
    }

    closeModal();
  };

  // Toggle functions for collapsible sections
  const toggleSchool = (id) =>
    setOpenSchools((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleDepartment = (id) =>
    setOpenDepartments((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleProgramme = (id) =>
    setOpenProgrammes((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleYear = (id) =>
    setOpenYears((prev) => ({ ...prev, [id]: !prev[id] }));

  // Generate modal title dynamically
  const getModalTitle = () => {
    const { type, mode } = modalState;
    const action = mode === "add" ? "ADD" : "EDIT";
    return `${action}_${type?.toUpperCase()}`;
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // Add logout logic here
  };

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden font-mono">
      {/* Grid background pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      ></div>

      {/* Header */}
      <AdminHeader time={time} onLogout={handleLogout} />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-12">
        {/* Admin Info & Stats */}
        <div className="border-4 border-zinc-800 bg-zinc-900 p-8 mb-12 relative">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-indigo-500 -translate-x-2 -translate-y-2"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-indigo-500 translate-x-2 -translate-y-2"></div>

          <div className="flex items-center gap-2 text-xs text-zinc-600 mb-3">
            <span className="tracking-widest">[ADMIN_DASHBOARD]</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">
            UNIVERSITY_MANAGEMENT_SYSTEM
          </h1>
          <p className="text-sm text-zinc-500">
            Manage schools, departments, programmes, years, and teacher feedback
            forms
          </p>

          <StatsDashboard schools={schools} />
        </div>

        {/* Hierarchy Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-indigo-500"></div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                ORGANIZATION_HIERARCHY
              </h2>
            </div>
            <button
              onClick={() => openModal("school", "add")}
              className="flex items-center gap-2 px-4 py-3 bg-indigo-600 text-white font-bold tracking-widest hover:bg-indigo-500 transition-colors text-xs"
            >
              <Plus className="w-4 h-4" />
              [ADD_SCHOOL]
            </button>
          </div>

          {/* Schools Hierarchy */}
          <div className="space-y-2">
            {schools.map((school) => (
              <CollapsibleSection
                key={school.id}
                icon={Building2}
                title={`${school.name} (${school.code})`}
                count={school.departments.length}
                isOpen={openSchools[school.id]}
                onToggle={() => toggleSchool(school.id)}
                onAdd={() => openModal("department", "add", null, school.id)}
                level={0}
              >
                {/* School Actions */}
                <div className="flex items-center justify-end gap-2 mb-4">
                  <button
                    onClick={() => openModal("school", "edit", school)}
                    className="text-xs px-3 py-1 border border-zinc-700 text-zinc-400 hover:border-indigo-500 hover:text-indigo-400 transition-colors"
                  >
                    EDIT_SCHOOL
                  </button>
                  <button
                    onClick={() => deleteSchool(school.id)}
                    className="text-xs px-3 py-1 border border-zinc-700 text-zinc-400 hover:border-red-500 hover:text-red-400 transition-colors"
                  >
                    DELETE_SCHOOL
                  </button>
                </div>

                {/* Departments */}
                {school.departments.map((dept) => (
                  <CollapsibleSection
                    key={dept.id}
                    icon={GraduationCap}
                    title={`${dept.name} (${dept.code})`}
                    count={dept.programmes.length}
                    isOpen={openDepartments[dept.id]}
                    onToggle={() => toggleDepartment(dept.id)}
                    onAdd={() => openModal("programme", "add", null, dept.id)}
                    level={1}
                  >
                    {/* Department Actions */}
                    <div className="flex items-center justify-end gap-2 mb-4">
                      <button
                        onClick={() =>
                          openModal("department", "edit", dept, school.id)
                        }
                        className="text-xs px-3 py-1 border border-zinc-700 text-zinc-400 hover:border-indigo-500 hover:text-indigo-400 transition-colors"
                      >
                        EDIT_DEPT
                      </button>
                      <button
                        onClick={() => deleteDepartment(dept.id)}
                        className="text-xs px-3 py-1 border border-zinc-700 text-zinc-400 hover:border-red-500 hover:text-red-400 transition-colors"
                      >
                        DELETE_DEPT
                      </button>
                    </div>

                    {/* Programmes */}
                    {dept.programmes.map((prog) => (
                      <CollapsibleSection
                        key={prog.id}
                        icon={BookOpen}
                        title={`${prog.name} (${prog.code})`}
                        count={prog.years.length}
                        isOpen={openProgrammes[prog.id]}
                        onToggle={() => toggleProgramme(prog.id)}
                        onAdd={() => openModal("year", "add", null, prog.id)}
                        level={2}
                      >
                        {/* Programme Actions */}
                        <div className="flex items-center justify-end gap-2 mb-4">
                          <button
                            onClick={() =>
                              openModal("programme", "edit", prog, dept.id)
                            }
                            className="text-xs px-3 py-1 border border-zinc-700 text-zinc-400 hover:border-indigo-500 hover:text-indigo-400 transition-colors"
                          >
                            EDIT_PROG
                          </button>
                          <button
                            onClick={() => deleteProgramme(prog.id)}
                            className="text-xs px-3 py-1 border border-zinc-700 text-zinc-400 hover:border-red-500 hover:text-red-400 transition-colors"
                          >
                            DELETE_PROG
                          </button>
                        </div>

                        {/* Years */}
                        {prog.years.map((year) => (
                          <CollapsibleSection
                            key={year.id}
                            icon={Users}
                            title={`${year.name} (${year.code})`}
                            count={year.forms.length}
                            isOpen={openYears[year.id]}
                            onToggle={() => toggleYear(year.id)}
                            onAdd={() =>
                              openModal("form", "add", null, year.id)
                            }
                            level={3}
                          >
                            {/* Year Actions */}
                            <div className="flex items-center justify-end gap-2 mb-4">
                              <button
                                onClick={() =>
                                  openModal("year", "edit", year, prog.id)
                                }
                                className="text-xs px-3 py-1 border border-zinc-700 text-zinc-400 hover:border-indigo-500 hover:text-indigo-400 transition-colors"
                              >
                                EDIT_YEAR
                              </button>
                              <button
                                onClick={() => deleteYear(year.id)}
                                className="text-xs px-3 py-1 border border-zinc-700 text-zinc-400 hover:border-red-500 hover:text-red-400 transition-colors"
                              >
                                DELETE_YEAR
                              </button>
                            </div>

                            {/* Teacher Forms */}
                            {year.forms.length > 0 ? (
                              year.forms.map((form) => (
                                <TeacherFormCard
                                  key={form.id}
                                  form={form}
                                  onEdit={() =>
                                    openModal("form", "edit", form, year.id)
                                  }
                                  onDelete={() => deleteForm(form.id)}
                                />
                              ))
                            ) : (
                              <div className="text-center py-8 text-zinc-600 text-xs">
                                NO_TEACHER_FORMS_CREATED
                              </div>
                            )}
                          </CollapsibleSection>
                        ))}
                      </CollapsibleSection>
                    ))}
                  </CollapsibleSection>
                ))}
              </CollapsibleSection>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit Operations */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={getModalTitle()}
      >
        {/* Conditional form fields based on entity type */}
        {modalState.type === "form" ? (
          // Teacher Form fields
          <>
            <FormInput
              label="Teacher Name"
              value={formData.teacherName}
              onChange={(e) =>
                setFormData({ ...formData, teacherName: e.target.value })
              }
              placeholder="e.g., Dr. John Smith"
              required
            />
            <FormInput
              label="Subject Name"
              value={formData.subjectName}
              onChange={(e) =>
                setFormData({ ...formData, subjectName: e.target.value })
              }
              placeholder="e.g., Data Structures & Algorithms"
              required
            />
            <FormInput
              label="Subject Code"
              value={formData.subjectCode}
              onChange={(e) =>
                setFormData({ ...formData, subjectCode: e.target.value })
              }
              placeholder="e.g., CSE-301"
              required
            />
            <FormInput
              label="Credits"
              value={formData.credits}
              onChange={(e) =>
                setFormData({ ...formData, credits: e.target.value })
              }
              placeholder="e.g., 4"
              required
            />
            <FormInput
              label="Schedule"
              value={formData.schedule}
              onChange={(e) =>
                setFormData({ ...formData, schedule: e.target.value })
              }
              placeholder="e.g., Mon, Wed, Fri - 9:00 AM"
              required
            />
          </>
        ) : (
          // Standard entity fields (School/Dept/Programme/Year)
          <>
            <FormInput
              label="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder={`Enter ${modalState.type} name`}
              required
            />
            <FormInput
              label="Code"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
              placeholder={`Enter ${modalState.type} code`}
              required
            />
          </>
        )}

        {/* Modal Actions */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={handleSave}
            className="flex-1 py-3 bg-indigo-600 text-white font-bold tracking-widest hover:bg-indigo-500 transition-colors text-xs"
          >
            <span className="flex items-center justify-center gap-2">
              <Save className="w-4 h-4" />
              [SAVE]
            </span>
          </button>
          <button
            onClick={closeModal}
            className="flex-1 py-3 border-2 border-zinc-700 text-zinc-400 hover:border-zinc-600 transition-colors font-bold tracking-widest text-xs"
          >
            [CANCEL]
          </button>
        </div>
      </Modal>

      {/* Footer */}
      <div className="relative z-20 py-8">
        <div className="text-center">
          <div className="inline-block border border-zinc-800 px-6 py-2 bg-zinc-950">
            <span className="text-xs text-zinc-600 tracking-widest">
              A Gurwinder Singh&apos;s productions
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
