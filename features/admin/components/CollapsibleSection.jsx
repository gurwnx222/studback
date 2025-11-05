"use client";
import React from "react";
import { Plus, ChevronRight, ChevronDown } from "lucide-react";

/**
 * CollapsibleSection Component
 *
 * Purpose: Reusable collapsible container for hierarchical data display
 *
 * Props:
 * - icon: Icon component to display (from lucide-react)
 * - title: Section title/name
 * - count: Number of child items
 * - isOpen: Boolean to control expanded/collapsed state
 * - onToggle: Function to toggle open/close
 * - onAdd: Function to add new item
 * - children: Child content (nested items)
 * - level: Hierarchy level (0-3) for indentation
 *
 * Features:
 * - Click header to expand/collapse
 * - Quick add button without expanding
 * - Visual hierarchy with indentation
 * - Smooth transitions
 * - Hover effects
 *
 * Hierarchy Levels:
 * - Level 0: Schools (no indent)
 * - Level 1: Departments (ml-8)
 * - Level 2: Programmes (ml-16)
 * - Level 3: Years (ml-24)
 */

const CollapsibleSection = ({
  icon: Icon,
  title,
  count,
  isOpen,
  onToggle,
  onAdd,
  children,
  level = 0,
}) => {
  // Calculate indentation based on hierarchy level
  const indentClass =
    level === 0 ? "" : level === 1 ? "ml-8" : level === 2 ? "ml-16" : "ml-24";

  return (
    <div className={`mb-2 ${indentClass}`}>
      <div className="border-2 border-zinc-800 bg-zinc-900 hover:border-zinc-700 transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          {/* Clickable area to toggle */}
          <div
            className="flex items-center gap-3 flex-1 cursor-pointer"
            onClick={onToggle}
          >
            <Icon className="w-5 h-5 text-indigo-400" />
            <div className="flex-1">
              <h3 className="text-sm font-bold text-white tracking-wide">
                {title}
              </h3>
              <span className="text-xs text-zinc-600 tracking-wider">
                {count} ITEMS
              </span>
            </div>
            {/* Expand/Collapse indicator */}
            {isOpen ? (
              <ChevronDown className="w-5 h-5 text-zinc-500" />
            ) : (
              <ChevronRight className="w-5 h-5 text-zinc-500" />
            )}
          </div>

          {/* Add button */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering toggle
              onAdd();
            }}
            className="ml-4 p-2 border border-zinc-700 text-zinc-400 hover:border-indigo-500 hover:text-indigo-400 transition-colors"
            aria-label="Add new item"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Content (only shown when expanded) */}
        {isOpen && children && (
          <div className="border-t border-zinc-800 p-4 bg-zinc-950">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollapsibleSection;
