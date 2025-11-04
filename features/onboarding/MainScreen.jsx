"use client";
import React, { useState, useEffect } from "react";
import { User, LogOut } from "lucide-react";
import { SubjectCard } from "@/features/components/SubjectCard";
import { FeedbackForm } from "@/features/components/FeedbackForm";
<SubjectCard />;
// Feedback Form Component
<FeedbackForm />;
// Main Home Component
export default function MainPage() {
  const [time, setTime] = useState(new Date());
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Mock student data
  const studentData = {
    name: "RAJESH KUMAR",
    registrationId: "CSE2021-12345",
    department: "Computer Science & Engineering",
    year: "3rd Year",
    semester: "VI",
  };

  // Mock subjects data
  const subjects = [
    {
      code: "CSE-301",
      name: "Data Structures & Algorithms",
      teacher: "Dr. Priya Sharma",
      credits: 4,
      schedule: "Mon, Wed, Fri - 9:00 AM",
      feedbackStatus: "pending",
    },
    {
      code: "CSE-302",
      name: "Database Management Systems",
      teacher: "Prof. Amit Verma",
      credits: 3,
      schedule: "Tue, Thu - 11:00 AM",
      feedbackStatus: "pending",
    },
    {
      code: "CSE-303",
      name: "Operating Systems",
      teacher: "Dr. Sandeep Rao",
      credits: 4,
      schedule: "Mon, Wed, Fri - 2:00 PM",
      feedbackStatus: "completed",
    },
    {
      code: "CSE-304",
      name: "Computer Networks",
      teacher: "Prof. Neha Gupta",
      credits: 3,
      schedule: "Tue, Thu - 9:00 AM",
      feedbackStatus: "pending",
    },
    {
      code: "CSE-305",
      name: "Software Engineering",
      teacher: "Dr. Vikram Singh",
      credits: 3,
      schedule: "Wed, Fri - 11:00 AM",
      feedbackStatus: "pending",
    },
    {
      code: "CSE-306",
      name: "Web Technologies",
      teacher: "Prof. Anjali Mehta",
      credits: 3,
      schedule: "Mon, Thu - 3:00 PM",
      feedbackStatus: "completed",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
    // Add logout logic here
  };

  const pendingFeedbacks = subjects.filter(
    (s) => s.feedbackStatus === "pending"
  ).length;
  const completedFeedbacks = subjects.filter(
    (s) => s.feedbackStatus === "completed"
  ).length;

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden font-mono">
      {/* Grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      ></div>

      {/* Header */}
      <nav className="relative z-20 px-8 py-8 flex items-start justify-between border-b border-zinc-800">
        <div className="flex flex-col">
          <span className="text-4xl font-black text-white tracking-tighter">
            studback
          </span>
          <span className="text-xs text-indigo-400 tracking-widest mt-1">
            v0.0.1
          </span>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-500 text-xs tracking-widest">
              ONLINE
            </span>
          </div>
          <span className="text-xs text-zinc-600">
            {time.toLocaleTimeString()}
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-12">
        {selectedSubject ? (
          <FeedbackForm
            subject={selectedSubject}
            onBack={() => setSelectedSubject(null)}
          />
        ) : (
          <>
            {/* Student Info Card */}
            <div className="border-4 border-zinc-800 bg-zinc-900 p-8 mb-12 relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-indigo-500 -translate-x-2 -translate-y-2"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-indigo-500 translate-x-2 -translate-y-2"></div>

              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-zinc-600 mb-3">
                    <span className="tracking-widest">[STUDENT_PROFILE]</span>
                  </div>
                  <h1 className="text-3xl font-black text-white tracking-tight mb-2">
                    {studentData.name}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-zinc-400">
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {studentData.registrationId}
                    </span>
                    <span className="text-zinc-700">|</span>
                    <span>{studentData.department}</span>
                    <span className="text-zinc-700">|</span>
                    <span>{studentData.year}</span>
                    <span className="text-zinc-700">|</span>
                    <span>Semester {studentData.semester}</span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-zinc-700 text-zinc-400 hover:border-red-500 hover:text-red-500 transition-colors text-xs tracking-wider"
                >
                  <LogOut className="w-4 h-4" />
                  [LOGOUT]
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="border border-zinc-800 p-4 bg-zinc-950/50">
                  <div className="text-2xl font-black text-white mb-1">
                    {subjects.length}
                  </div>
                  <div className="text-xs text-zinc-600 tracking-widest">
                    TOTAL_SUBJECTS
                  </div>
                </div>
                <div className="border border-zinc-800 p-4 bg-zinc-950/50">
                  <div className="text-2xl font-black text-yellow-500 mb-1">
                    {pendingFeedbacks}
                  </div>
                  <div className="text-xs text-zinc-600 tracking-widest">
                    PENDING_FEEDBACK
                  </div>
                </div>
                <div className="border border-zinc-800 p-4 bg-zinc-950/50">
                  <div className="text-2xl font-black text-green-500 mb-1">
                    {completedFeedbacks}
                  </div>
                  <div className="text-xs text-zinc-600 tracking-widest">
                    COMPLETED
                  </div>
                </div>
              </div>
            </div>

            {/* Subjects Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-indigo-500"></div>
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">
                    YOUR_SUBJECTS
                  </h2>
                  <p className="text-xs text-zinc-500 tracking-wider mt-1">
                    Click on a subject card to provide feedback
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map((subject) => (
                  <SubjectCard
                    key={subject.code}
                    subject={subject}
                    onClick={() => setSelectedSubject(subject)}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

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
