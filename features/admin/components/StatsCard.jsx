"use client";
import React from "react";

/**
 * StatsCard Component
 *
 * Purpose: Display statistical information in a card format
 *
 * Props:
 * - value: Numeric value to display
 * - label: Description label
 * - color: Text color class for the value (default: 'text-white')
 *
 * Features:
 * - Large, prominent number display
 * - Color-coded for different metrics
 * - Consistent card styling
 *
 * Usage Example:
 * <StatsCard value={5} label="SCHOOLS" color="text-white" />
 * <StatsCard value={12} label="DEPARTMENTS" color="text-indigo-400" />
 */

const StatsCard = ({ value, label, color = "text-white" }) => {
  return (
    <div className="border border-zinc-800 p-4 bg-zinc-950/50">
      <div className={`text-2xl font-black ${color} mb-1`}>{value}</div>
      <div className="text-xs text-zinc-600 tracking-widest">{label}</div>
    </div>
  );
};

/**
 * StatsDashboard Component
 *
 * Purpose: Display overview statistics for the admin dashboard
 *
 * Props:
 * - schools: Array of school objects
 *
 * Features:
 * - Calculates and displays totals automatically
 * - 4-column grid layout
 * - Color-coded metrics
 *
 * Calculated Metrics:
 * - Total Schools
 * - Total Departments (across all schools)
 * - Total Programmes (across all departments)
 * - Total Teacher Forms (across all years)
 */

export const StatsDashboard = ({ schools }) => {
  // Calculate totals
  const totalSchools = schools.length;

  const totalDepartments = schools.reduce(
    (acc, school) => acc + school.departments.length,
    0
  );

  const totalProgrammes = schools.reduce(
    (acc, school) =>
      acc +
      school.departments.reduce((a, dept) => a + dept.programmes.length, 0),
    0
  );

  const totalForms = schools.reduce(
    (acc, school) =>
      acc +
      school.departments.reduce(
        (a, dept) =>
          a +
          dept.programmes.reduce(
            (b, prog) =>
              b + prog.years.reduce((c, year) => c + year.forms.length, 0),
            0
          ),
        0
      ),
    0
  );

  return (
    <div className="grid grid-cols-4 gap-4 mt-8">
      <StatsCard value={totalSchools} label="SCHOOLS" color="text-white" />
      <StatsCard
        value={totalDepartments}
        label="DEPARTMENTS"
        color="text-indigo-400"
      />
      <StatsCard
        value={totalProgrammes}
        label="PROGRAMMES"
        color="text-green-400"
      />
      <StatsCard
        value={totalForms}
        label="TEACHER_FORMS"
        color="text-yellow-400"
      />
    </div>
  );
};

export default StatsCard;
