"use client";
import React, { useState, useEffect } from "react";
import {
  User,
  TrendingUp,
  BarChart3,
  CheckCircle,
  Clock,
  Star,
} from "lucide-react";

export default function FeedbackDashboard() {
  const [time, setTime] = useState(new Date());
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  // Mock submitted feedback data
  const submittedFeedbacks = [
    {
      id: 1,
      studentName: "RAJESH KUMAR",
      teacherName: "Dr. Priya Sharma",
      subjectCode: "CSE-301",
      subjectName: "Data Structures & Algorithms",
      submittedDate: "2025-11-20",
      ratings: {
        q1: 5,
        q2: 4,
        q3: 5,
        q4: 4,
        q5: 5,
        q6: 4,
        q7: 3,
        q8: 4,
        q9: 5,
        q10: 4,
        q11: 5,
        q12: 4,
        q13: 5,
        q14: 5,
        q15: 4,
      },
    },
    {
      id: 2,
      studentName: "RAJESH KUMAR",
      teacherName: "Dr. Sandeep Rao",
      subjectCode: "CSE-303",
      subjectName: "Operating Systems",
      submittedDate: "2025-11-20",
      ratings: {
        q1: 4,
        q2: 4,
        q3: 4,
        q4: 5,
        q5: 4,
        q6: 4,
        q7: 3,
        q8: 4,
        q9: 4,
        q10: 4,
        q11: 4,
        q12: 3,
        q13: 4,
        q14: 4,
        q15: 4,
      },
    },
    {
      id: 3,
      studentName: "RAJESH KUMAR",
      teacherName: "Prof. Anjali Mehta",
      subjectCode: "CSE-306",
      subjectName: "Web Technologies",
      submittedDate: "2025-11-20",
      ratings: {
        q1: 5,
        q2: 5,
        q3: 5,
        q4: 5,
        q5: 5,
        q6: 5,
        q7: 4,
        q8: 5,
        q9: 5,
        q10: 5,
        q11: 5,
        q12: 5,
        q13: 5,
        q14: 5,
        q15: 5,
      },
    },
  ];

  // Calculate teacher-wise statistics
  const teacherStats = {};
  submittedFeedbacks.forEach((feedback) => {
    if (!teacherStats[feedback.teacherName]) {
      teacherStats[feedback.teacherName] = {
        totalSubmissions: 0,
        totalRating: 0,
        ratingCount: 0,
        subjects: new Set(),
      };
    }

    teacherStats[feedback.teacherName].totalSubmissions++;
    teacherStats[feedback.teacherName].subjects.add(feedback.subjectName);

    Object.values(feedback.ratings).forEach((rating) => {
      teacherStats[feedback.teacherName].totalRating += rating;
      teacherStats[feedback.teacherName].ratingCount++;
    });
  });

  // Calculate overall statistics
  const calculateOverallStats = () => {
    let excellent = 0,
      veryGood = 0,
      good = 0,
      fair = 0,
      poor = 0;

    submittedFeedbacks.forEach((feedback) => {
      Object.values(feedback.ratings).forEach((rating) => {
        if (rating === 5) excellent++;
        else if (rating === 4) veryGood++;
        else if (rating === 3) good++;
        else if (rating === 2) fair++;
        else if (rating === 1) poor++;
      });
    });

    const total = excellent + veryGood + good + fair + poor;

    return {
      excellent: {
        count: excellent,
        percent: ((excellent / total) * 100).toFixed(1),
      },
      veryGood: {
        count: veryGood,
        percent: ((veryGood / total) * 100).toFixed(1),
      },
      good: { count: good, percent: ((good / total) * 100).toFixed(1) },
      fair: { count: fair, percent: ((fair / total) * 100).toFixed(1) },
      poor: { count: poor, percent: ((poor / total) * 100).toFixed(1) },
    };
  };

  const overallStats = calculateOverallStats();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
            ANALYTICS_DASHBOARD
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
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="border-2 border-zinc-800 bg-zinc-900 p-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-6 h-6 text-indigo-500" />
              <span className="text-xs text-zinc-600 tracking-widest">
                TOTAL
              </span>
            </div>
            <div className="text-3xl font-black text-white mb-1">
              {submittedFeedbacks.length}
            </div>
            <div className="text-xs text-zinc-500">Submitted Forms</div>
          </div>

          <div className="border-2 border-zinc-800 bg-zinc-900 p-6">
            <div className="flex items-center justify-between mb-2">
              <User className="w-6 h-6 text-green-500" />
              <span className="text-xs text-zinc-600 tracking-widest">
                TEACHERS
              </span>
            </div>
            <div className="text-3xl font-black text-white mb-1">
              {Object.keys(teacherStats).length}
            </div>
            <div className="text-xs text-zinc-500">Total Teachers</div>
          </div>

          <div className="border-2 border-zinc-800 bg-zinc-900 p-6">
            <div className="flex items-center justify-between mb-2">
              <Star className="w-6 h-6 text-yellow-500" />
              <span className="text-xs text-zinc-600 tracking-widest">AVG</span>
            </div>
            <div className="text-3xl font-black text-white mb-1">
              {(
                submittedFeedbacks.reduce((acc, f) => {
                  const avg =
                    Object.values(f.ratings).reduce((a, b) => a + b, 0) /
                    Object.values(f.ratings).length;
                  return acc + avg;
                }, 0) / submittedFeedbacks.length
              ).toFixed(1)}
            </div>
            <div className="text-xs text-zinc-500">Average Rating</div>
          </div>

          <div className="border-2 border-zinc-800 bg-zinc-900 p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-6 h-6 text-cyan-500" />
              <span className="text-xs text-zinc-600 tracking-widest">
                RESPONSES
              </span>
            </div>
            <div className="text-3xl font-black text-white mb-1">
              {submittedFeedbacks.reduce(
                (acc, f) => acc + Object.keys(f.ratings).length,
                0
              )}
            </div>
            <div className="text-xs text-zinc-500">Total Responses</div>
          </div>
        </div>

        {/* Overall Rating Distribution */}
        <div className="border-4 border-zinc-800 bg-zinc-900 p-8 mb-12 relative">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-indigo-500 -translate-x-2 -translate-y-2"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-indigo-500 translate-x-2 -translate-y-2"></div>

          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-indigo-500" />
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                RATING_DISTRIBUTION
              </h2>
              <p className="text-xs text-zinc-500 tracking-wider mt-1">
                Overall feedback analysis across all submissions
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Excellent */}
            <div className="border border-zinc-800 p-4 bg-zinc-950/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-green-500 tracking-widest">
                  [5] EXCELLENT
                </span>
                <span className="text-lg font-black text-white">
                  {overallStats.excellent.count} (
                  {overallStats.excellent.percent}%)
                </span>
              </div>
              <div className="w-full bg-zinc-800 h-3 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-500"
                  style={{ width: `${overallStats.excellent.percent}%` }}
                ></div>
              </div>
            </div>

            {/* Very Good */}
            <div className="border border-zinc-800 p-4 bg-zinc-950/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-cyan-500 tracking-widest">
                  [4] VERY_GOOD
                </span>
                <span className="text-lg font-black text-white">
                  {overallStats.veryGood.count} ({overallStats.veryGood.percent}
                  %)
                </span>
              </div>
              <div className="w-full bg-zinc-800 h-3 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-500 transition-all duration-500"
                  style={{ width: `${overallStats.veryGood.percent}%` }}
                ></div>
              </div>
            </div>

            {/* Good */}
            <div className="border border-zinc-800 p-4 bg-zinc-950/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-blue-500 tracking-widest">
                  [3] GOOD
                </span>
                <span className="text-lg font-black text-white">
                  {overallStats.good.count} ({overallStats.good.percent}%)
                </span>
              </div>
              <div className="w-full bg-zinc-800 h-3 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${overallStats.good.percent}%` }}
                ></div>
              </div>
            </div>

            {/* Fair */}
            <div className="border border-zinc-800 p-4 bg-zinc-950/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-yellow-500 tracking-widest">
                  [2] FAIR
                </span>
                <span className="text-lg font-black text-white">
                  {overallStats.fair.count} ({overallStats.fair.percent}%)
                </span>
              </div>
              <div className="w-full bg-zinc-800 h-3 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500 transition-all duration-500"
                  style={{ width: `${overallStats.fair.percent}%` }}
                ></div>
              </div>
            </div>

            {/* Poor */}
            <div className="border border-zinc-800 p-4 bg-zinc-950/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-red-500 tracking-widest">
                  [1] POOR
                </span>
                <span className="text-lg font-black text-white">
                  {overallStats.poor.count} ({overallStats.poor.percent}%)
                </span>
              </div>
              <div className="w-full bg-zinc-800 h-3 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 transition-all duration-500"
                  style={{ width: `${overallStats.poor.percent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Teacher-wise Analysis */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-indigo-500"></div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                TEACHER_ANALYSIS
              </h2>
              <p className="text-xs text-zinc-500 tracking-wider mt-1">
                Performance breakdown by faculty member
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(teacherStats).map(([teacher, stats]) => {
              const avgRating = (stats.totalRating / stats.ratingCount).toFixed(
                2
              );
              const ratingColor =
                avgRating >= 4.5
                  ? "text-green-500"
                  : avgRating >= 3.5
                  ? "text-cyan-500"
                  : avgRating >= 2.5
                  ? "text-yellow-500"
                  : "text-red-500";

              return (
                <div
                  key={teacher}
                  className="border-2 border-zinc-800 bg-zinc-900 p-6 hover:border-indigo-500 transition-colors cursor-pointer"
                  onClick={() => setSelectedTeacher(teacher)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-indigo-500/20 border border-indigo-500 flex items-center justify-center">
                      <User className="w-5 h-5 text-indigo-500" />
                    </div>
                    <span className={`text-2xl font-black ${ratingColor}`}>
                      {avgRating}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                    {teacher}
                  </h3>

                  <div className="space-y-2 text-xs text-zinc-400">
                    <div className="flex justify-between">
                      <span>Submissions:</span>
                      <span className="text-white font-bold">
                        {stats.totalSubmissions}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subjects:</span>
                      <span className="text-white font-bold">
                        {stats.subjects.size}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Responses:</span>
                      <span className="text-white font-bold">
                        {stats.ratingCount}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submitted Forms List */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-indigo-500"></div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                SUBMITTED_FORMS
              </h2>
              <p className="text-xs text-zinc-500 tracking-wider mt-1">
                Complete list of all feedback submissions
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {submittedFeedbacks.map((feedback) => {
              const avgRating = (
                Object.values(feedback.ratings).reduce((a, b) => a + b, 0) /
                Object.values(feedback.ratings).length
              ).toFixed(2);
              const ratingColor =
                avgRating >= 4.5
                  ? "text-green-500"
                  : avgRating >= 3.5
                  ? "text-cyan-500"
                  : avgRating >= 2.5
                  ? "text-yellow-500"
                  : "text-red-500";

              return (
                <div
                  key={feedback.id}
                  className="border border-zinc-800 bg-zinc-900 p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs text-zinc-600 tracking-widest">
                          [FEEDBACK_ID:{" "}
                          {feedback.id.toString().padStart(4, "0")}]
                        </span>
                        <span className="text-xs text-zinc-700">|</span>
                        <span className="text-xs text-zinc-500">
                          {feedback.submittedDate}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-zinc-600 mb-1">
                            SUBJECT
                          </div>
                          <div className="text-sm font-bold text-white">
                            {feedback.subjectCode} - {feedback.subjectName}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-zinc-600 mb-1">
                            TEACHER
                          </div>
                          <div className="text-sm font-bold text-white">
                            {feedback.teacherName}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-zinc-600 mb-1">
                        AVG_RATING
                      </div>
                      <div className={`text-3xl font-black ${ratingColor}`}>
                        {avgRating}
                      </div>
                      <div className="text-xs text-zinc-500 mt-1">/ 5.00</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-20 py-8 mt-12">
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
