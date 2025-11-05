"use client";
import React from "react";
import { X } from "lucide-react";

/**
 * Modal Component
 *
 * Purpose: Reusable modal dialog for all CRUD operations
 *
 * Props:
 * - isOpen: Boolean to control modal visibility
 * - onClose: Function to close the modal
 * - title: Modal header title
 * - children: Modal content (form fields)
 *
 * Features:
 * - Backdrop click to close
 * - Escape key support (can be added)
 * - Decorative corner brackets matching design system
 * - Scrollable content for long forms
 */

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80" onClick={onClose}></div>

      {/* Modal Container */}
      <div className="relative bg-zinc-900 border-4 border-zinc-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Decorative corner brackets */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-indigo-500 -translate-x-2 -translate-y-2"></div>
        <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-indigo-500 translate-x-2 -translate-y-2"></div>

        {/* Modal Content */}
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-white tracking-tight">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-zinc-500 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
