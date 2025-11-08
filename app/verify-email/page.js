"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setMessage({
          type: 'error',
          text: 'Verification token is missing. Please check your email for the correct verification link.'
        });
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email/${token}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Verification failed');
        }

        const data = await response.json();
        setIsVerified(true);
        setMessage({
          type: 'success',
          text: data.message || 'Email verified successfully! You can now log in with your credentials.'
        });

        // Auto-redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/login');
        }, 3000);

      } catch (error) {
        console.error('Verification error:', error);
        setMessage({
          type: 'error',
          text: error.message || 'An error occurred while verifying your email. Please try again later.'
        });
      } finally {
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [token, router]);

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

        <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
          <div className="w-full max-w-lg">
            <div className="bg-slate-800/60 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/10 text-center">
              {/* Logo */}
              <div className="mb-8">
                <div className="relative inline-block">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-br from-indigo-400/50 to-pink-400/50 rounded-3xl blur-xl" />
                </div>
              </div>

              {/* Content */}
              {isLoading ? (
                <div className="space-y-6">
                  <h1 className="text-3xl font-bold text-white mb-4">Verifying Your Email</h1>
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-6 w-6 text-indigo-400" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span className="text-slate-300">Please wait while we verify your email...</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                    message.type === 'success'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {message.type === 'success' ? (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>

                  <div>
                    <h1 className="text-3xl font-bold text-white mb-4">
                      {message.type === 'success' ? 'Email Verified!' : 'Verification Failed'}
                    </h1>
                    <p className={`text-lg ${
                      message.type === 'success' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {message.text}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {message.type === 'success' ? (
                      <div className="text-slate-400">
                        <p>You will be redirected to the login page in a few seconds...</p>
                        <div className="mt-4">
                          <Link
                            href="/login"
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                          >
                            Go to Login
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-slate-400">
                          Don't worry! You can try again or request a new verification email.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Link
                            href="/signup"
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                          >
                            Back to Sign Up
                          </Link>
                          <Link
                            href="/login"
                            className="inline-flex items-center px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                          >
                            Go to Login
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/js/all.min.js" strategy="afterInteractive" />
    </>
  );
}
