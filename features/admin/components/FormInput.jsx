"use client";
import React from "react";

/**
 * FormInput Component
 *
 * Purpose: Reusable form input field with consistent styling
 *
 * Props:
 * - label: Input field label
 * - value: Current input value
 * - onChange: Handler function for input changes
 * - placeholder: Placeholder text
 * - required: Boolean to show required asterisk
 * - type: Input type (default: 'text')
 *
 * Features:
 * - Consistent styling across all forms
 * - Required field indicator
 * - Focus state with indigo border
 * - Monospace font for tech aesthetic
 */

const FormInput = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
}) => {
  return (
    <div className="mb-4">
      <label className="block text-xs text-zinc-500 tracking-widest mb-2 uppercase">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-zinc-950 border-2 border-zinc-800 px-4 py-3 text-white font-mono focus:outline-none focus:border-indigo-500 transition-colors"
      />
    </div>
  );
};

export default FormInput;
