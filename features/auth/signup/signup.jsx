"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";

// Reusable Input Component
const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="mb-6">
      <label className="block text-xs text-zinc-500 tracking-widest mb-2 uppercase">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={`w-full bg-zinc-900 border-2 ${
          error
            ? "border-red-500"
            : isFocused
            ? "border-indigo-500"
            : "border-zinc-800"
        } px-4 py-3 text-white font-mono focus:outline-none transition-colors`}
      />
      {error && (
        <div className="flex items-center gap-2 mt-2 text-red-500 text-xs">
          <AlertCircle className="w-3 h-3" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

// Reusable Select Component
const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
  placeholder,
  required = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="mb-6">
      <label className="block text-xs text-zinc-500 tracking-widest mb-2 uppercase">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full bg-zinc-900 border-2 ${
          error
            ? "border-red-500"
            : isFocused
            ? "border-indigo-500"
            : "border-zinc-800"
        } px-4 py-3 text-white font-mono focus:outline-none transition-colors cursor-pointer`}
      >
        <option value="" className="bg-zinc-900">
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-zinc-900"
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <div className="flex items-center gap-2 mt-2 text-red-500 text-xs">
          <AlertCircle className="w-3 h-3" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

// Password Input Component with Toggle
const PasswordInput = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  showStrength = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const getPasswordStrength = (pass) => {
    if (!pass) return { strength: 0, label: "", color: "" };
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (pass.length >= 12) strength++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
    if (/\d/.test(pass)) strength++;
    if (/[^a-zA-Z0-9]/.test(pass)) strength++;

    const levels = [
      { strength: 1, label: "WEAK", color: "bg-red-500" },
      { strength: 2, label: "FAIR", color: "bg-orange-500" },
      { strength: 3, label: "GOOD", color: "bg-yellow-500" },
      { strength: 4, label: "STRONG", color: "bg-green-500" },
      { strength: 5, label: "VERY_STRONG", color: "bg-green-400" },
    ];

    return levels[strength - 1] || levels[0];
  };

  const strength = showStrength ? getPasswordStrength(value) : null;

  return (
    <div className="mb-6">
      <label className="block text-xs text-zinc-500 tracking-widest mb-2 uppercase">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`w-full bg-zinc-900 border-2 ${
            error
              ? "border-red-500"
              : isFocused
              ? "border-indigo-500"
              : "border-zinc-800"
          } px-4 py-3 pr-12 text-white font-mono focus:outline-none transition-colors`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>

      {showStrength && value && strength && (
        <div className="mt-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex-1 h-1 bg-zinc-800">
              <div
                className={`h-full ${strength.color} transition-all duration-300`}
                style={{ width: `${(strength.strength / 5) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-zinc-500 tracking-wider">
              {strength.label}
            </span>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 mt-2 text-red-500 text-xs">
          <AlertCircle className="w-3 h-3" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

// Main Sign Up Component
export default function SignUpPage() {
  const [time, setTime] = useState(new Date());
  const [formData, setFormData] = useState({
    name: "",
    registrationId: "",
    school: "",
    department: "",
    year: "",
    programme: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Form options
  const schools = [
    { value: "SOE", label: "School of Engineering" },
    { value: "SOM", label: "School of Management" },
    { value: "SOS", label: "School of Sciences" },
    { value: "SOH", label: "School of Humanities" },
    { value: "SOL", label: "School of Law" },
    { value: "SOD", label: "School of Design" },
  ];
  const departments = [
    { value: "CSE", label: "Computer Science & Engineering" },
    { value: "ECE", label: "Electronics & Communication" },
    { value: "ME", label: "Mechanical Engineering" },
    { value: "CE", label: "Civil Engineering" },
    { value: "EE", label: "Electrical Engineering" },
    { value: "IT", label: "Information Technology" },
    { value: "BBA", label: "Business Administration" },
    { value: "MBA", label: "Master of Business Administration" },
  ];

  const years = [
    { value: "1", label: "First Year" },
    { value: "2", label: "Second Year" },
    { value: "3", label: "Third Year" },
    { value: "4", label: "Fourth Year" },
  ];

  const programmes = [
    { value: "BTECH", label: "B.Tech" },
    { value: "MTECH", label: "M.Tech" },
    { value: "BBA", label: "BBA" },
    { value: "MBA", label: "MBA" },
    { value: "BSC", label: "B.Sc" },
    { value: "MSC", label: "M.Sc" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = "Your name is required";
    }
    if (!formData.school) {
      newErrors.school = "Please select a school";
    }
    if (!formData.registrationId.trim()) {
      newErrors.registrationId = "Registration ID is required";
    } else if (formData.registrationId.length < 5) {
      newErrors.registrationId =
        "Registration ID must be at least 5 characters";
    }

    if (!formData.department) {
      newErrors.department = "Please select a department";
    }

    if (!formData.year) {
      newErrors.year = "Please select your year";
    }

    if (!formData.programme) {
      newErrors.programme = "Please select your programme";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "/api/users/signup",
        {
          name: formData.name,
          registrationId: formData.registrationId,
          school: formData.school,
          department: formData.department,
          year: formData.year,
          programme: formData.programme,
          password: formData.password,
        },
        { withCredentials: true }
      );

      if (response.status === 201 || response.status === 200) {
        setSubmitSuccess(true);
        console.log("Registration successful:", response.data);

        // Show success message for 2 seconds then redirect
        setTimeout(() => {
          setSubmitSuccess(false);
          router.push("/main-screen"); // Redirect to main screen
        }, 2000);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      setErrors((prev) => ({
        ...prev,
        submit: errorMessage,
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

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
              SECURE_CONNECTION
            </span>
          </div>
          <span className="text-xs text-zinc-600">
            {time.toLocaleTimeString()}
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-8 py-16">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-12 bg-indigo-500"></div>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight">
                CREATE_ACCOUNT
              </h1>
              <p className="text-sm text-zinc-500 tracking-wider mt-1">
                INITIALIZE_NEW_USER_PROTOCOL
              </p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="border-4 border-zinc-800 bg-zinc-900 p-8 relative">
          {/* Decorative corner brackets */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-indigo-500 -translate-x-2 -translate-y-2"></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-indigo-500 translate-x-2 -translate-y-2"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-indigo-500 -translate-x-2 translate-y-2"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-indigo-500 translate-x-2 translate-y-2"></div>

          {submitSuccess ? (
            <div className="py-12 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-black text-white mb-2">
                ACCOUNT_CREATED
              </h2>
              <p className="text-zinc-400 text-sm">
                Redirecting to system dashboard...
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-8">
                <div className="flex items-center gap-2 text-xs text-zinc-600 mb-4">
                  <span className="tracking-widest">[USER_CREDENTIALS]</span>
                </div>
              </div>
              <FormInput
                label="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Enter your name"
                required
              />
              <FormInput
                label="Registration ID"
                name="registrationId"
                value={formData.registrationId}
                onChange={handleChange}
                error={errors.registrationId}
                placeholder="Enter your registration ID"
                required
              />
              <FormSelect
                label="School"
                name="school"
                value={formData.school}
                onChange={handleChange}
                options={schools}
                error={errors.school}
                placeholder="Select school"
                required
              />
              <FormSelect
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                options={departments}
                error={errors.department}
                placeholder="Select department"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <FormSelect
                  label="Year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  options={years}
                  error={errors.year}
                  placeholder="Select year"
                  required
                />

                <FormSelect
                  label="Programme"
                  name="programme"
                  value={formData.programme}
                  onChange={handleChange}
                  options={programmes}
                  error={errors.programme}
                  placeholder="Select programme"
                  required
                />
              </div>

              <div className="my-8 h-px bg-zinc-800"></div>

              <div className="mb-8">
                <div className="flex items-center gap-2 text-xs text-zinc-600 mb-4">
                  <span className="tracking-widest">[SECURITY_SETUP]</span>
                </div>
              </div>

              <PasswordInput
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="Create a strong password"
                showStrength
              />

              <PasswordInput
                label="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                placeholder="Re-enter your password"
              />

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-4 bg-indigo-600 text-white font-bold tracking-widest hover:bg-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-8 relative overflow-hidden group"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    PROCESSING...
                  </span>
                ) : (
                  <>
                    <span className="relative z-10">[INITIALIZE_ACCOUNT]</span>
                    <div className="absolute inset-0 bg-indigo-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200"></div>
                  </>
                )}
              </button>

              <div className="mt-6 text-center">
                <span className="text-xs text-zinc-600">
                  Already have an account?{" "}
                </span>
                <a
                  href="#"
                  className="text-xs text-indigo-400 hover:text-indigo-300 tracking-wider"
                >
                  [LOGIN_HERE]
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 border border-zinc-800 bg-zinc-900/50 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-indigo-400 mt-0.5" />
            <div className="text-xs text-zinc-500 leading-relaxed">
              <span className="text-zinc-400 font-bold">SECURITY_NOTE:</span>{" "}
              Your registration ID and credentials are encrypted using 256-bit
              encryption. All feedback submissions remain anonymous.
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
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
