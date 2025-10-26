"use client";
import React, { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    signin: { email: "", password: "", remember: false },
    signup: { firstName: "", lastName: "", email: "", password: "", confirmPassword: "", terms: false },
  });
  const [errors, setErrors] = useState({});

  const validateForm = (type) => {
    const newErrors = {};

    if (type === "signin") {
      if (!formData.signin.email) newErrors.signinEmail = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.signin.email)) newErrors.signinEmail = "Please enter a valid email";
      if (!formData.signin.password) newErrors.signinPassword = "Password is required";
      else if (formData.signin.password.length < 6) newErrors.signinPassword = "Password must be at least 6 characters";
    }

    if (type === "signup") {
      if (!formData.signup.firstName) newErrors.signupFirstName = "First name is required";
      if (!formData.signup.lastName) newErrors.signupLastName = "Last name is required";
      if (!formData.signup.email) newErrors.signupEmail = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.signup.email)) newErrors.signupEmail = "Please enter a valid email";
      if (!formData.signup.password) newErrors.signupPassword = "Password is required";
      else if (formData.signup.password.length < 8) newErrors.signupPassword = "Password must be at least 8 characters";
      if (!formData.signup.confirmPassword) newErrors.signupConfirmPassword = "Please confirm your password";
      else if (formData.signup.password !== formData.signup.confirmPassword) newErrors.signupConfirmPassword = "Passwords do not match";
      if (!formData.signup.terms) newErrors.signupTerms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (type, field, value) => {
    setFormData((prev) => ({ ...prev, [type]: { ...prev[type], [field]: value } }));
    const key = `${type}${field.charAt(0).toUpperCase() + field.slice(1)}`;
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = async (type, e) => {
    e.preventDefault();
    if (!validateForm(type)) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    window.location.href = "/courses";
    setIsLoading(false);
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
                <button onClick={() => setIsSignUp(false)} disabled={isLoading} className={!isSignUp ? "flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105" : "flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 text-slate-400 hover:text-white hover:bg-white/10"}>Sign In</button>
                <button onClick={() => setIsSignUp(true)} disabled={isLoading} className={isSignUp ? "flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105" : "flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 text-slate-400 hover:text-white hover:bg-white/10"}>Sign Up</button>
              </div>

              <div className="bg-slate-800/60 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/10">
                {/* SIGN IN */}
                <div className={isSignUp ? "hidden" : ""}>
                  <div className="space-y-8">
                    <div className="text-center">
                      <h2 className="text-3xl font-bold text-white mb-3">Welcome back!</h2>
                      <p className="text-slate-400">Continue your learning journey</p>
                    </div>

                    <form onSubmit={(e) => handleSubmit("signin", e)} className="space-y-6">
                      <div>
                        <label htmlFor="signin-email" className="block text-sm font-medium text-slate-300 mb-2">Email address</label>
                        <input
                          id="signin-email"
                          type="email"
                          value={formData.signin.email}
                          onChange={(e) => handleInputChange("signin", "email", e.target.value)}
                          className={"w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 " + (errors.signinEmail ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-indigo-500 focus:border-indigo-500")}
                          placeholder="you@example.com"
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
                          <input type="checkbox" checked={formData.signin.remember} onChange={(e) => handleInputChange("signin", "remember", e.target.checked)} className="rounded border-white/20 bg-white/10 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0" />
                          <span className="ml-3 text-sm text-slate-400">Remember me</span>
                        </label>
                        <Link href="#" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">Forgot password?</Link>
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

                    <form onSubmit={(e) => handleSubmit("signup", e)} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="signup-first" className="block text-sm font-medium text-slate-300 mb-2">First name</label>
                          <input id="signup-first" type="text" value={formData.signup.firstName} onChange={(e) => handleInputChange("signup", "firstName", e.target.value)} className={"w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 " + (errors.signupFirstName ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-indigo-500 focus:border-indigo-500")} placeholder="John" />
                          {errors.signupFirstName && <p className="mt-2 text-sm text-red-400">{errors.signupFirstName}</p>}
                        </div>

                        <div>
                          <label htmlFor="signup-last" className="block text-sm font-medium text-slate-300 mb-2">Last name</label>
                          <input id="signup-last" type="text" value={formData.signup.lastName} onChange={(e) => handleInputChange("signup", "lastName", e.target.value)} className={"w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 " + (errors.signupLastName ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-indigo-500 focus:border-indigo-500")} placeholder="Doe" />
                          {errors.signupLastName && <p className="mt-2 text-sm text-red-400">{errors.signupLastName}</p>}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="signup-email" className="block text-sm font-medium text-slate-300 mb-2">Email address</label>
                        <input id="signup-email" type="email" value={formData.signup.email} onChange={(e) => handleInputChange("signup", "email", e.target.value)} className={"w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 " + (errors.signupEmail ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-indigo-500 focus:border-indigo-500")} placeholder="you@example.com" />
                        {errors.signupEmail && <p className="mt-2 text-sm text-red-400">{errors.signupEmail}</p>}
                      </div>

                      <div>
                        <label htmlFor="signup-password" className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                        <input id="signup-password" type="password" value={formData.signup.password} onChange={(e) => handleInputChange("signup", "password", e.target.value)} className={"w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 " + (errors.signupPassword ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-indigo-500 focus:border-indigo-500")} placeholder="••••••••" />
                        {errors.signupPassword && <p className="mt-2 text-sm text-red-400">{errors.signupPassword}</p>}
                      </div>

                      <div>
                        <label htmlFor="signup-confirm" className="block text-sm font-medium text-slate-300 mb-2">Confirm password</label>
                        <input id="signup-confirm" type="password" value={formData.signup.confirmPassword} onChange={(e) => handleInputChange("signup", "confirmPassword", e.target.value)} className={"w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 " + (errors.signupConfirmPassword ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-indigo-500 focus:border-indigo-500")} placeholder="••••••••" />
                        {errors.signupConfirmPassword && <p className="mt-2 text-sm text-red-400">{errors.signupConfirmPassword}</p>}
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center">
                          <input id="signup-terms" type="checkbox" checked={formData.signup.terms} onChange={(e) => handleInputChange("signup", "terms", e.target.checked)} className={"rounded border-white/20 bg-white/10 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 " + (errors.signupTerms ? "border-red-500" : "")} />
                          <span className="ml-3 text-sm text-slate-400">I agree to the Terms</span>
                        </label>
                        <Link href="#" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">View Terms</Link>
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
                          "Create Account"
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
