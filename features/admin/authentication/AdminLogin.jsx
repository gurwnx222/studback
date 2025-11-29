"use client";
import React, { useState, useEffect } from "react";
import { Eye, EyeOff, AlertCircle, CheckCircle, Shield } from "lucide-react";

/**
 * Admin Login Page
 *
 * Purpose: Secure authentication page for admin users
 *
 * Features:
 * - Username and password authentication
 * - Password visibility toggle
 * - Form validation
 * - Loading states
 * - Success animation
 * - Security indicator
 * - Invalid credentials error display
 * - Matches studback design aesthetic
 *
 * Security Note: In production, implement proper backend authentication,
 * JWT tokens, rate limiting, and HTTPS
 */

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
  onKeyPress,
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
        onKeyPress={onKeyPress}
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

// Password Input Component with Toggle
const PasswordInput = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  onKeyPress,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

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
          onKeyPress={onKeyPress}
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

      {error && (
        <div className="flex items-center gap-2 mt-2 text-red-500 text-xs">
          <AlertCircle className="w-3 h-3" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

// Main Admin Login Component
export default function AdminLoginPage() {
  const [time, setTime] = useState(new Date());
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    // Clear general error when user types
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate authentication API call
    setTimeout(() => {
      // Check credentials
      if (
        formData.username !== "super.admin.studback@R.P.Singh" ||
        formData.password !== "Studback@Admin.R.P.Singh"
      ) {
        setIsSubmitting(false);
        setErrors({
          general:
            "Invalid admin credentials. Please check your username and password.",
        });
        return;
      }

      // Success
      setIsSubmitting(false);
      setLoginSuccess(true);

      setTimeout(() => {
        // In production, redirect to admin dashboard
        setLoginSuccess(false);
        setFormData({
          username: "",
          password: "",
        });
      }, 3000);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
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
            ADMIN_PANEL_v0.0.1
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
        {/* Admin Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-3 border-2 border-indigo-500 bg-indigo-500/10 px-6 py-3">
            <Shield className="w-6 h-6 text-indigo-400" />
            <span className="text-indigo-400 text-sm font-bold tracking-widest">
              ADMINISTRATOR_ACCESS
            </span>
          </div>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-12 bg-indigo-500"></div>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight">
                ADMIN_LOGIN
              </h1>
              <p className="text-sm text-zinc-500 tracking-wider mt-1">
                AUTHENTICATE_ADMINISTRATOR_CREDENTIALS
              </p>
            </div>
          </div>
        </div>

        {/* General Error Alert */}
        {errors.general && (
          <div className="mb-6 border-2 border-red-500 bg-red-950/30 p-4 animate-shake">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
              <div>
                <div className="text-red-500 font-bold text-sm tracking-wider mb-1">
                  ACCESS_DENIED
                </div>
                <div className="text-red-400 text-xs leading-relaxed">
                  {errors.general}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="border-4 border-zinc-800 bg-zinc-900 p-8 relative">
          {/* Decorative corner brackets */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-indigo-500 -translate-x-2 -translate-y-2"></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-indigo-500 translate-x-2 -translate-y-2"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-indigo-500 -translate-x-2 translate-y-2"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-indigo-500 translate-x-2 translate-y-2"></div>

          {loginSuccess ? (
            <div className="py-12 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-black text-white mb-2">
                ACCESS_GRANTED
              </h2>
              <p className="text-zinc-400 text-sm">
                Loading admin dashboard...
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-8">
                <div className="flex items-center gap-2 text-xs text-zinc-600 mb-4">
                  <span className="tracking-widest">[ADMIN_CREDENTIALS]</span>
                </div>
              </div>

              <FormInput
                label="Admin Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                error={errors.username}
                placeholder="Enter administrator username"
                required
              />

              <PasswordInput
                label="Admin Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                error={errors.password}
                placeholder="Enter administrator password"
              />

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-4 bg-indigo-600 text-white font-bold tracking-widest hover:bg-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group mt-4"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    AUTHENTICATING...
                  </span>
                ) : (
                  <>
                    <span className="relative z-10">[ADMIN_LOGIN]</span>
                    <div className="absolute inset-0 bg-indigo-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200"></div>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Security Info Box */}
        <div className="mt-8 border border-zinc-800 bg-zinc-900/50 p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-indigo-400 mt-0.5" />
            <div className="text-xs text-zinc-500 leading-relaxed">
              <span className="text-zinc-400 font-bold">SECURITY_NOTICE:</span>{" "}
              This is a restricted area. All login attempts are monitored and
              logged. Unauthorized access attempts will be reported to system
              administrators.
            </div>
          </div>
        </div>

        {/* Warning Box */}
        <div className="mt-4 border-2 border-yellow-900/50 bg-yellow-950/20 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
            <div className="text-xs text-yellow-600 leading-relaxed">
              <span className="text-yellow-500 font-bold">ADMIN_ONLY:</span>{" "}
              Only authorized administrators with valid credentials should
              access this portal. Ensure you are on a secure network before
              proceeding.
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-10 left-0 right-0 z-20">
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
