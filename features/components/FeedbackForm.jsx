import React, { useState } from "react";
import { ChevronRight, Award } from "lucide-react";

export default function FeedbackForm({ subject, onBack }) {
  const [ratings, setRatings] = useState({});
  const [textInputs, setTextInputs] = useState({
    q16: "",
    q17: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const questions = [
    {
      id: 1,
      text: "Express how well the scheme and curriculum of the course are planned.",
    },
    {
      id: 2,
      text: "Indicate the extent to which the syllabus was covered in class.",
    },
    {
      id: 3,
      text: "What is the level of course delivery by the faculty member, particularly their communication skills.",
    },
    {
      id: 4,
      text: "Comment on the faculty member's guidance and counseling in academic and non-academic matters.",
    },
    {
      id: 5,
      text: "Rate the use of teaching aids (PPTs, handouts, web resources, ICT tools) by the faculty to facilitate teaching.",
    },
    {
      id: 6,
      text: "How do you rate the fairness of the assessment and evaluation process (assignments, quizzes, sessional tests/end-term exams, etc.).",
    },
    {
      id: 7,
      text: "Express the level of opportunities available for internships, field visits, hackathons, creativity and critical-thinking activities, etc.",
    },
    {
      id: 8,
      text: "What is the level of learning experiences through extra academic activities like expert lectures, seminars, workshops, conferences, value-added courses, MOOC courses, etc.",
    },
    {
      id: 9,
      text: "How would you rate the faculty member's punctuality in the class.",
    },
    {
      id: 10,
      text: "Rate the quality and appropriateness of the assignments and quizzes given by the faculty.",
    },
    {
      id: 11,
      text: "Express how well the timely communication is provided regarding important information such as attendance, examination schedules, and other university activities.",
    },
    {
      id: 12,
      text: "Indicate how well the course scheme and syllabus support employability or help in securing a suitable job.",
    },
    {
      id: 13,
      text: "Rate whether the experiments performed in the labs are well-designed and aligned with the theoretical content of the subject.",
    },
    {
      id: 14,
      text: "Indicate whether proper guidance was provided by the faculty during the experiments.",
    },
    {
      id: 15,
      text: "State your level of satisfaction with the experiments conducted during the semester.",
    },
  ];

  const ratingLabels = {
    5: "EXCELLENT",
    4: "VERY_GOOD",
    3: "GOOD",
    2: "FAIR",
    1: "POOR",
    0: "NOT_RATED",
  };

  const handleRating = (questionId, value) => {
    setRatings((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleTextInput = (field, value) => {
    setTextInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const allRated = questions.every((q) => ratings[q.id] > 0);
    if (!allRated) {
      alert("Please rate all questions before submitting");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      console.log("Feedback submitted:", {
        subject: subject,
        ratings,
        textInputs,
      });

      // Return to dashboard after 2 seconds
      setTimeout(() => {
        onBack();
      }, 2000);
    }, 2000);
  };

  return (
    <div className="animate-fadeIn">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-zinc-500 hover:text-indigo-400 transition-colors mb-8 text-sm tracking-wider"
      >
        <ChevronRight className="w-4 h-4 rotate-180" />
        [BACK_TO_SUBJECTS]
      </button>

      <div className="border-4 border-zinc-800 bg-zinc-900 p-8 relative">
        {/* Decorative corner brackets */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-indigo-500 -translate-x-2 -translate-y-2"></div>
        <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-indigo-500 translate-x-2 -translate-y-2"></div>
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-indigo-500 -translate-x-2 translate-y-2"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-indigo-500 translate-x-2 translate-y-2"></div>

        {submitSuccess ? (
          <div className="py-12 text-center">
            <Award className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-white mb-2">
              FEEDBACK_SUBMITTED
            </h2>
            <p className="text-zinc-400 text-sm">
              Thank you for your valuable feedback
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="flex items-center gap-2 text-xs text-zinc-600 mb-4">
                <span className="tracking-widest">[FEEDBACK_FORM]</span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                {subject.name}
              </h2>
              <p className="text-sm text-zinc-500 mt-1">
                Professor: {subject.teacher}
              </p>
              <p className="text-xs text-zinc-600 mt-1">{subject.code}</p>
              <p className="text-xs text-zinc-500 mt-1">{subject.schedule}</p>
            </div>

            <div className="max-h-[60vh] overflow-y-auto pr-4 space-y-8 mb-8 custom-scrollbar">
              {questions.map((question, index) => (
                <div
                  key={question.id}
                  className="border-b border-zinc-800 pb-6 last:border-b-0"
                >
                  <label className="block text-sm text-zinc-400 mb-4 leading-relaxed">
                    <span className="text-indigo-500 font-bold mr-2">
                      {index + 1}.
                    </span>
                    {question.text}
                  </label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        onClick={() => handleRating(question.id, value)}
                        className={`w-12 h-12 border-2 transition-all duration-200 ${
                          ratings[question.id] >= value
                            ? "border-indigo-500 bg-indigo-500 text-white"
                            : "border-zinc-700 text-zinc-600 hover:border-zinc-600"
                        }`}
                      >
                        <span className="font-bold">{value}</span>
                      </button>
                    ))}
                    <span className="ml-4 text-xs text-zinc-600 tracking-wider">
                      {ratingLabels[ratings[question.id] || 0]}
                    </span>
                  </div>
                </div>
              ))}

              {/* Question 16 - Text Input */}
              <div className="border-b border-zinc-800 pb-6">
                <label className="block text-sm text-zinc-400 mb-4 leading-relaxed">
                  <span className="text-indigo-500 font-bold mr-2">16.</span>
                  Suggest any specific subject or skill that should be added to
                  the current program syllabus—either in theory or practical
                  areas.
                </label>
                <textarea
                  value={textInputs.q16}
                  onChange={(e) => handleTextInput("q16", e.target.value)}
                  placeholder="Your suggestions..."
                  rows="3"
                  className="w-full bg-zinc-900 border-2 border-zinc-800 px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                />
              </div>

              {/* Question 17 - Text Input */}
              <div>
                <label className="block text-sm text-zinc-400 mb-4 leading-relaxed">
                  <span className="text-indigo-500 font-bold mr-2">17.</span>
                  Provide any additional observations regarding academic content
                  or teaching delivery.
                </label>
                <textarea
                  value={textInputs.q17}
                  onChange={(e) => handleTextInput("q17", e.target.value)}
                  placeholder="Your observations..."
                  rows="3"
                  className="w-full bg-zinc-900 border-2 border-zinc-800 px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-4 bg-indigo-600 text-white font-bold tracking-widest hover:bg-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  SUBMITTING...
                </span>
              ) : (
                <>
                  <span className="relative z-10">[SUBMIT_FEEDBACK]</span>
                  <div className="absolute inset-0 bg-indigo-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200"></div>
                </>
              )}
            </button>
          </>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #18181b;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3f3f46;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #52525b;
        }
      `}</style>
    </div>
  );
}
