import React, { useState } from "react";
import { BookOpen, ChevronRight, User, Clock, Award } from "lucide-react";
// Subject Card Component
export const SubjectCard = ({ subject, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="border-2 border-zinc-800 bg-zinc-900 p-6 cursor-pointer transition-all duration-300 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 relative group"
    >
      {/* Corner accent */}
      <div
        className={`absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 transition-colors duration-300 ${
          isHovered ? "border-indigo-500" : "border-zinc-800"
        }`}
      ></div>

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 border-2 flex items-center justify-center transition-colors duration-300 ${
              isHovered
                ? "border-indigo-500 bg-indigo-500/10"
                : "border-zinc-700"
            }`}
          >
            <BookOpen
              className={`w-6 h-6 transition-colors duration-300 ${
                isHovered ? "text-indigo-400" : "text-zinc-500"
              }`}
            />
          </div>
        </div>
        <ChevronRight
          className={`w-5 h-5 text-zinc-600 transition-all duration-300 ${
            isHovered ? "text-indigo-400 translate-x-1" : ""
          }`}
        />
      </div>

      <h4 className="text-sm font-bold text-white mb-2 tracking-wide">
        {subject.name}
      </h4>

      <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
        <User className="w-3 h-3" />
        <span className="tracking-wider">{subject.teacherName}</span>
      </div>

      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1 text-zinc-600">
          <Clock className="w-3 h-3" />
          <span>{subject.schedule}</span>
        </div>
        {subject.feedbackStatus === "completed" ? (
          <div className="flex items-center gap-1 text-green-500">
            <Award className="w-3 h-3" />
            <span className="tracking-wider">COMPLETED</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-yellow-500">
            <Award className="w-3 h-3" />
            <span className="tracking-wider">PENDING</span>
          </div>
        )}
      </div>

      {/* Hover effect line */}
      <div
        className={`absolute bottom-0 left-0 h-1 bg-indigo-500 transition-all duration-300 ${
          isHovered ? "w-full" : "w-0"
        }`}
      ></div>
    </div>
  );
};
