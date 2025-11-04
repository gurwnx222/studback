"use client";
import React, { useState, useEffect } from "react";
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

// Password Input Component with Toggle
const PasswordInput = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
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

// Main Login Component
export default function LoginPage() {
  const [time, setTime] = useState(new Date());
  const [formData, setFormData] = useState({
    registrationId: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.registrationId.trim()) {
      newErrors.registrationId = "Registration ID is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setLoginSuccess(true);
      console.log("Login submitted:", { ...formData, rememberMe });

      setTimeout(() => {
        setLoginSuccess(false);
        setFormData({
          registrationId: "",
          password: "",
        });
        setRememberMe(false);
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
                ACCESS_SYSTEM
              </h1>
              <p className="text-sm text-zinc-500 tracking-wider mt-1">
                AUTHENTICATE_USER_CREDENTIALS
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

          {loginSuccess ? (
            <div className="py-12 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-black text-white mb-2">
                ACCESS_GRANTED
              </h2>
              <p className="text-zinc-400 text-sm">Loading dashboard...</p>
            </div>
          ) : (
            <div>
              <div className="mb-8">
                <div className="flex items-center gap-2 text-xs text-zinc-600 mb-4">
                  <span className="tracking-widest">[LOGIN_CREDENTIALS]</span>
                </div>
              </div>

              <FormInput
                label="Registration ID"
                name="registrationId"
                value={formData.registrationId}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                error={errors.registrationId}
                placeholder="Enter your registration ID"
                required
              />

              <PasswordInput
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                error={errors.password}
                placeholder="Enter your password"
              />

              <div className="flex items-center justify-between mb-8">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 border-2 ${
                        rememberMe
                          ? "border-indigo-500 bg-indigo-500"
                          : "border-zinc-700"
                      } transition-colors`}
                    >
                      {rememberMe && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-zinc-500 tracking-wider group-hover:text-zinc-400 transition-colors">
                    REMEMBER_ME
                  </span>
                </label>

                <a
                  href="#"
                  className="text-xs text-indigo-400 hover:text-indigo-300 tracking-wider transition-colors"
                >
                  [FORGOT_PASSWORD?]
                </a>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-4 bg-indigo-600 text-white font-bold tracking-widest hover:bg-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    AUTHENTICATING...
                  </span>
                ) : (
                  <>
                    <span className="relative z-10">[LOGIN]</span>
                    <div className="absolute inset-0 bg-indigo-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200"></div>
                  </>
                )}
              </button>

              <div className="mt-6 text-center">
                <span className="text-xs text-zinc-600">
                  Don&apos;t have an account?{" "}
                </span>
                <a
                  href="#"
                  className="text-xs text-indigo-400 hover:text-indigo-300 tracking-wider"
                >
                  [CREATE_ACCOUNT]
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
              Your credentials are encrypted using 256-bit encryption. For
              security purposes, always logout after completing your session.
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
