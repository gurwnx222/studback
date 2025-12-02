"use client";
import React from "react";
import { FileText, Edit2, Trash2 } from "lucide-react";

/**
 * TeacherFormCard Component
 *
 * Purpose: Display teacher/subject feedback form information
 *
 * Props:
 * - form: Object containing teacher form data
 *   - teacherName: Name of the teacher
 *   - subjectName: Name of the subject
 *   - subjectCode: Subject code (e.g., CSE-301)
 *   - credits: Number of credits
 *   - schedule: Class schedule
 * - onEdit: Function to edit the form
 * - onDelete: Function to delete the form
 *
 * Features:
 * - Compact display of all relevant information
 * - Edit and delete actions
 * - Icon representation
 * - Hover effects
 *
 * Usage:
 * This is the leaf node in the hierarchy tree, representing
 * the actual feedback forms that students will fill out
 */

const TeacherFormCard = ({ form, onEdit, onDelete }) => {
  return (
    <div className="border border-zinc-800 bg-zinc-900 p-4 mb-2 hover:border-zinc-700 transition-colors">
      <div className="flex items-center justify-between">
        {/* Form Info */}
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-indigo-400" />
          <div>
            <h5 className="text-sm font-bold text-white">{form.teacherName}</h5>
            <p className="text-xs text-zinc-600">{form.subjectName}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* <button
            onClick={onEdit}
            className="p-2 text-zinc-500 hover:text-indigo-400 transition-colors"
            aria-label="Edit form"
          >
            <Edit2 className="w-4 h-4" />
          </button> */}
          <button
            onClick={onDelete}
            className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
            aria-label="Delete form"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherFormCard;
