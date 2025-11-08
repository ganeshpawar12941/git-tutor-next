"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Script from "next/script";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { login, register } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userRole, setUserRole] = useState('student'); // student, teacher, admin
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    signin: { email: "", password: "" },
    signup: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      adminKey: "",
      terms: false
    },
  });

  const [errors, setErrors] = useState({});

  // Backend validation rules
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please provide a valid email address.";
    }

    if (userRole === 'student' && !email.endsWith('@students.git.edu')) {
      return "Student registration requires a @students.git.edu email address.";
    }

    if (userRole === 'teacher' && !email.endsWith('@git.edu')) {
      return "Teacher registration requires a @git.edu email address.";
    }

    return null;
  };

  const validateForm = (type) => {
    const newErrors = {};

    if (type === "signin") {
      if (!formData.signin.email) newErrors.signinEmail = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.signin.email)) {
        newErrors.signinEmail = "Please enter a valid email";
      }
      if (!formData.signin.password) newErrors.signinPassword = "Password is required";
    }

    if (type === "signup") {
      if (!formData.signup.name) newErrors.signupName = "Name is required";

      if (!formData.signup.email) newErrors.signupEmail = "Email is required";
      else {
        const emailError = validateEmail(formData.signup.email);
        if (emailError) newErrors.signupEmail = emailError;
      }

      const minPasswordLength = userRole === 'admin' ? 8 : 6;
      if (!formData.signup.password) newErrors.signupPassword = "Password is required";
      else if (formData.signup.password.length < minPasswordLength) {
        newErrors.signupPassword = `Password must be at least ${minPasswordLength} characters`;
      }

      if (!formData.signup.confirmPassword) newErrors.signupConfirmPassword = "Please confirm your password";
      else if (formData.signup.password !== formData.signup.confirmPassword) {
        newErrors.signupConfirmPassword = "Passwords do not match";
      }

      if (userRole === 'admin' && !formData.signup.adminKey) {
        newErrors.signupAdminKey = "Admin key is required";
      }

      if (!formData.signup.terms) newErrors.signupTerms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (type, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [type]: { ...prev[type], [field]: value }
    }));

    // Clear error for this field
    const errorKey = `${type}${field.charAt(0).toUpperCase() + field.slice(1)}`;
    if (errors[errorKey]) {
      setErrors((prev) => ({ ...prev, [errorKey]: "" }));
    }

    // Clear message
    if (message.text) setMessage({ type: '', text: '' });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateForm("signin")) return;

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await login({
        email: formData.signin.email,
        password: formData.signin.password
      });

      setMessage({ type: 'success', text: 'Login successful! Redirecting...' });

      // Redirect based on user role
      setTimeout(() => {
        if (response.user.role === 'admin') {
          router.push('/admin');
        } else if (response.user.role === 'teacher') {
          router.push('/teacher');
        } else {
          router.push('/courses');
        }
      }, 1000);

    } catch (error) {
      console.error('Login error:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Login failed. Please check your credentials.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm("signup")) return;

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const registerData = {
        name: formData.signup.name,
        email: formData.signup.email,
        password: formData.signup.password,
        role: userRole
      };

      if (userRole === 'admin') {
        registerData.adminKey = formData.signup.adminKey;
      }

      const response = await register(registerData);

      if (userRole === 'teacher') {
        setMessage({
          type: 'success',
          text: response.message + ' Please check your email to verify your account.'
        });
      } else {
        setMessage({
          type: 'success',
          text: response.message + ' You can now log in.'
        });
        // Auto-login for students and admins
        if (response.token) {
          setTimeout(() => {
            if (userRole === 'admin') {
              router.push('/admin');
            } else {
              router.push('/courses');
            }
          }, 2000);
        }
      }

    } catch (error) {
      console.error('Registration error:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Registration failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SiteNav />
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 relative overflow-hidden" style={{ paddingTop: "3.5rem" }}>
        {/* background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        <div className="relative z-10 flex min-h-screen">
          {/* Left panel (branding) */}
          <div className="hidden lg:flex lg:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
            <div className="relative z-10 flex flex-col justify-center items-center p-12 text-center">
              <div className="mb-12">
                <div className="relative mb-8">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 w-24 h-24 mx-auto bg-gradient-to-br from-indigo-400/50 to-pink-400/50 rounded-3xl blur-xl" />
                </div>

                <h1 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">Git-Tutor</h1>
                <p className="text-xl text-slate-300 mb-8 leading-relaxed">Master version control and advance your development journey with our comprehensive Git courses</p>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-12">
                <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="text-3xl font-bold text-white mb-2">1000+</div>
                  <div className="text-slate-300">Courses</div>
                </div>
                <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="text-3xl font-bold text-white mb-2">50k+</div>
                  <div className="text-slate-300">Students</div>
                </div>
                <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="text-3xl font-bold text-white mb-2">95%</div>
                  <div className="text-slate-300">Success Rate</div>
                </div>
                <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="text-3xl font-bold text-white mb-2">24/7</div>
                  <div className="text-slate-300">Support</div>
                </div>
              </div>

              <div className="text-left space-y-4">
                <div className="flex items-center space-x-3 text-slate-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Interactive Git simulations</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300" />
                  <span>Real-world projects</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-500" />
                  <span>Expert instructors</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel (forms) */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
            <div className="w-full max-w-lg">
              <div className="flex bg-slate-800/60 backdrop-blur-sm p-2 rounded-2xl mb-8 border border-white/10 shadow-xl">
                <button
                  onClick={() => setIsSignUp(false)}
                  disabled={isLoading}
                  className={!isSignUp ? "flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105" : "flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 text-slate-400 hover:text-white hover:bg-white/10"}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsSignUp(true)}
                  disabled={isLoading}
                  className={isSignUp ? "flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105" : "flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 text-slate-400 hover:text-white hover:bg-white/10"}
                >
                  Sign Up
                </button>
              </div>

              {/* Message Display */}
              {message.text && (
                <div className={`mb-6 p-4 rounded-xl border ${
                  message.type === 'success'
                    ? 'bg-green-500/10 border-green-500/20 text-green-400'
                    : 'bg-red-500/10 border-red-500/20 text-red-400'
                }`}>
                  {message.text}
                </div>
              )}

              <div className="bg-slate-800/60 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/10">
                {/* SIGN IN */}
                <div className={isSignUp ? "hidden" : ""}>
                  <div className="space-y-8">
                    <div className="text-center">
                      <h2 className="text-3xl font-bold text-white mb-3">Welcome back!</h2>
                      <p className="text-slate-400">Continue your learning journey</p>
                    </div>

                    <form onSubmit={handleSignIn} className="space-y-6">
                      <div>
                        <label htmlFor="signin-email" className="block text-sm font-medium text-slate-300 mb-2">Email address</label>
                        <input
                          id="signin-email"
                          type="email"
                          value={formData.signin.email}
                          onChange={(e) => handleInputChange("signin", "email", e.target.value)}
                          className={"w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 " + (errors.signinEmail ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-indigo-500 focus:border-indigo-500")}
                          placeholder="you@students.git.edu"
                        />
                        {errors.signinEmail && <p className="mt-2 text-sm text-red-400">{errors.signinEmail}</p>}
                      </div>

                      <div>
                        <label htmlFor="signin-password" className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                        <input
                          id="signin-password"
                          type="password"
                          value={formData.signin.password}
                          onChange={(e) => handleInputChange("signin", "password", e.target.value)}
                          className={"w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 " + (errors.signinPassword ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-indigo-500 focus:border-indigo-500")}
                          placeholder="••••••••"
                        />
                        {errors.signinPassword && <p className="mt-2 text-sm text-red-400">{errors.signinPassword}</p>}
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-white/20 bg-white/10 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0" />
                          <span className="ml-3 text-sm text-slate-400">Remember me</span>
                        </label>
                        <Link href="/forgot-password" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">Forgot password?</Link>
                      </div>

                      <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                        {isLoading ? (
                          <>
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Signing in...
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </button>
                    </form>
                  </div>
                </div>

                {/* SIGN UP */}
                <div className={isSignUp ? "" : "hidden"}>
                  <div className="space-y-8">
                    <div className="text-center">
                      <h2 className="text-3xl font-bold text-white mb-3">Join Git-Tutor</h2>
                      <p className="text-slate-400">Start your development journey today</p>
                    </div>

                    {/* User Role Selection */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-3">I am a:</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { value: 'student', label: 'Student', desc: '@students.git.edu' },
                          { value: 'teacher', label: 'Teacher', desc: '@git.edu' },
                          { value: 'admin', label: 'Admin', desc: 'Admin Key Required' }
                        ].map((role) => (
                          <button
                            key={role.value}
                            type="button"
                            onClick={() => setUserRole(role.value)}
                            className={`p-3 rounded-xl border-2 transition-all duration-300 text-left ${
                              userRole === role.value
                                ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                                : 'border-white/20 text-slate-400 hover:border-white/40 hover:text-white'
                            }`}
                          >
                            <div className="font-medium">{role.label}</div>
                            <div className="text-xs opacity-75">{role.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <form onSubmit={handleSignUp} className="space-y-6">
                      <div>
                        <label htmlFor="signup-name" className="block text-sm font-medium text-slate-300 mb-2">
                          Full Name
                        </label>
                        <input
                          id="signup-name"
                          type="text"
                          value={formData.signup.name}
                          onChange={(e) => handleInputChange("signup", "name", e.target.value)}
                          className={"w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 " + (errors.signupName ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-indigo-500 focus:border-indigo-500")}
                          placeholder="John Doe"
                        />
                        {errors.signupName && <p className="mt-2 text-sm text-red-400">{errors.signupName}</p>}
                      </div>

                      <div>
                        <label htmlFor="signup-email" className="block text-sm font-medium text-slate-300 mb-2">
                          Email address
                        </label>
                        <input
                          id="signup-email"
                          type="email"
                          value={formData.signup.email}
                          onChange={(e) => handleInputChange("signup", "email", e.target.value)}
                          className={"w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 " + (errors.signupEmail ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-indigo-500 focus:border-indigo-500")}
                          placeholder={userRole === 'student' ? 'you@students.git.edu' : userRole === 'teacher' ? 'you@git.edu' : 'admin@git.edu'}
                        />
                        {errors.signupEmail && <p className="mt-2 text-sm text-red-400">{errors.signupEmail}</p>}
                      </div>

                      <div>
                        <label htmlFor="signup-password" className="block text-sm font-medium text-slate-300 mb-2">
                          Password
                        </label>
                        <input
                          id="signup-password"
                          type="password"
                          value={formData.signup.password}
                          onChange={(e) => handleInputChange("signup", "password", e.target.value)}
                          className={"w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 " + (errors.signupPassword ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-indigo-500 focus:border-indigo-500")}
                          placeholder={`•••••••• (${userRole === 'admin' ? '8' : '6'} characters minimum)`}
                        />
                        {errors.signupPassword && <p className="mt-2 text-sm text-red-400">{errors.signupPassword}</p>}
                      </div>

                      <div>
                        <label htmlFor="signup-confirm" className="block text-sm font-medium text-slate-300 mb-2">
                          Confirm password
                        </label>
                        <input
                          id="signup-confirm"
                          type="password"
                          value={formData.signup.confirmPassword}
                          onChange={(e) => handleInputChange("signup", "confirmPassword", e.target.value)}
                          className={"w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 " + (errors.signupConfirmPassword ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-indigo-500 focus:border-indigo-500")}
                          placeholder="••••••••"
                        />
                        {errors.signupConfirmPassword && <p className="mt-2 text-sm text-red-400">{errors.signupConfirmPassword}</p>}
                      </div>

                      {userRole === 'admin' && (
                        <div>
                          <label htmlFor="signup-admin-key" className="block text-sm font-medium text-slate-300 mb-2">
                            Admin Key
                          </label>
                          <input
                            id="signup-admin-key"
                            type="password"
                            value={formData.signup.adminKey}
                            onChange={(e) => handleInputChange("signup", "adminKey", e.target.value)}
                            className={"w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 " + (errors.signupAdminKey ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-indigo-500 focus:border-indigo-500")}
                            placeholder="Enter admin key"
                          />
                          {errors.signupAdminKey && <p className="mt-2 text-sm text-red-400">{errors.signupAdminKey}</p>}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <label className="flex items-center">
                          <input
                            id="signup-terms"
                            type="checkbox"
                            checked={formData.signup.terms}
                            onChange={(e) => handleInputChange("signup", "terms", e.target.checked)}
                            className={"rounded border-white/20 bg-white/10 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 " + (errors.signupTerms ? "border-red-500" : "")}
                          />
                          <span className="ml-3 text-sm text-slate-400">I agree to the Terms</span>
                        </label>
                        <Link href="/terms" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">View Terms</Link>
                      </div>
                      {errors.signupTerms && <p className="text-sm text-red-400">{errors.signupTerms}</p>}

                      <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                        {isLoading ? (
                          <>
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Creating account...
                          </>
                        ) : (
                          `Create ${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Account`
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/js/all.min.js" strategy="afterInteractive" />
    </>
  );
}
