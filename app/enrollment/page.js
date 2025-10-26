"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export default function EnrollmentConfirmation() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const courseTitle = searchParams.get('course');
    const courseImage = searchParams.get('image');

    if (courseTitle && courseImage) {
      setCourse({
        title: courseTitle,
        image: courseImage,
        enrolledDate: new Date().toLocaleDateString(),
        duration: '8-12 weeks',
        lessons: Math.floor(Math.random() * 50) + 20,
        level: ['Beginner', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)]
      });
    }
  }, [searchParams]);

  if (!course) {
    return (
      <div id="app">
        <SiteNav />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading enrollment details...</p>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div id="app">
      <SiteNav />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12" style={{ paddingTop: '3.5rem' }}>
        <div className="container mx-auto px-4">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">🎉 Enrollment Successful!</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Congratulations! You've successfully enrolled in <span className="font-semibold text-indigo-600">"{course.title}"</span>.
              Get ready to embark on an amazing learning journey!
            </p>
          </div>

          {/* Course Card */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div className="relative">
                <img
                  src={`/${course.image}`}
                  alt={course.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl font-bold text-white mb-2">{course.title}</h2>
                  <div className="flex items-center space-x-4 text-white/90">
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                      </svg>
                      {course.duration}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      {course.lessons} lessons
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                      course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {course.level}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What's Next Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">What's Next?</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <h4 className="text-lg font-semibold mb-2">Start Learning</h4>
                <p className="text-gray-600 mb-4">Begin your first lesson and start building practical skills right away.</p>
                <button
                  onClick={() => router.push(`/course/${encodeURIComponent(course.title)}`)}
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Start First Lesson
                </button>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                </div>
                <h4 className="text-lg font-semibold mb-2">Explore More</h4>
                <p className="text-gray-600 mb-4">Discover other courses that complement your learning journey.</p>
                <button
                  onClick={() => router.push('/courses')}
                  className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Browse More Courses
                </button>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Your Learning Progress</h3>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Enrolled</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">In Progress</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Completed</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-indigo-600 h-2 rounded-full" style={{width: '0%'}}></div>
              </div>
              <p className="text-sm text-gray-600">0% Complete</p>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
