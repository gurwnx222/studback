import React, { useState } from "react";
import { ChevronRight, Award } from "lucide-react";
export const FeedbackForm = ({ subject, onBack }) => {
  const [ratings, setRatings] = useState({
    teaching: 0,
    communication: 0,
    knowledge: 0,
    punctuality: 0,
    overall: 0,
  });
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const categories = [
    { key: "teaching", label: "Teaching Effectiveness" },
    { key: "communication", label: "Communication Skills" },
    { key: "knowledge", label: "Subject Knowledge" },
    { key: "punctuality", label: "Punctuality & Availability" },
    { key: "overall", label: "Overall Experience" },
  ];

  const handleRating = (category, value) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
  };

  const handleSubmit = () => {
    const allRated = Object.values(ratings).every((rating) => rating > 0);
    if (!allRated) {
      alert("Please rate all categories");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      console.log("Feedback submitted:", { subject, ratings, comments });

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
            </div>

            <div className="space-y-6 mb-8">
              {categories.map((category) => (
                <div key={category.key}>
                  <label className="block text-xs text-zinc-500 tracking-widest mb-3 uppercase">
                    {category.label}
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        onClick={() => handleRating(category.key, value)}
                        className={`w-12 h-12 border-2 transition-all duration-200 ${
                          ratings[category.key] >= value
                            ? "border-indigo-500 bg-indigo-500 text-white"
                            : "border-zinc-700 text-zinc-600 hover:border-zinc-600"
                        }`}
                      >
                        <span className="font-bold">{value}</span>
                      </button>
                    ))}
                    <span className="ml-4 text-xs text-zinc-600 tracking-wider">
                      {ratings[category.key] === 0
                        ? "NOT_RATED"
                        : ratings[category.key] === 1
                        ? "POOR"
                        : ratings[category.key] === 2
                        ? "FAIR"
                        : ratings[category.key] === 3
                        ? "GOOD"
                        : ratings[category.key] === 4
                        ? "VERY_GOOD"
                        : "EXCELLENT"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <label className="block text-xs text-zinc-500 tracking-widest mb-3 uppercase">
                Additional Comments (Optional)
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Share your detailed feedback..."
                rows="4"
                className="w-full bg-zinc-900 border-2 border-zinc-800 px-4 py-3 text-white font-mono focus:outline-none focus:border-indigo-500 transition-colors resize-none"
              />
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
    </div>
  );
};
