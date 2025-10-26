"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export default function StudentProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState({
    name: 'God Ganesh',
    email: 'gptech45@gmail.com',
    avatar: '/api/placeholder/80/80',
    level: 'Advanced',
    joinDate: 'January 2024'
  });
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      // Get enrolled courses from localStorage (simulating backend)
      const storedCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');

      setEnrolledCourses(storedCourses);
      setLoading(false);
    };

    fetchStudentData();
  }, []);

  const handleStartLearning = (courseTitle) => {
    // Navigate to course videos page
    router.push(`/course/${encodeURIComponent(courseTitle)}`);
  };

  if (loading) {
    return (
      <div id="app">
        <SiteNav />
        <div className="min-h-screen flex items-center justify-center" style={{ paddingTop: '3.5rem' }}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div id="app">
      <SiteNav />
      <div className="min-h-screen bg-gray-50 py-8" style={{ paddingTop: '3.5rem' }}>
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Profile</h1>
            <p className="text-gray-600">Your learning profile and enrolled courses</p>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <img
                  src={student.avatar}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover mr-6"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{student.name}</h2>
                  <p className="text-gray-600 mb-2">{student.level} Learner</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="text-gray-600">
                      <strong>Email:</strong> {student.email}
                    </span>
                    <span className="text-gray-600">
                      <strong>Member Since:</strong> {student.joinDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Enrolled Courses</h3>
                    <p className="text-gray-600">
                      You have enrolled in {enrolledCourses.length} course{enrolledCourses.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-indigo-600 mb-1">
                      {enrolledCourses.length}
                    </div>
                    <div className="text-sm text-gray-500">courses</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enrolled Courses List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                My Enrolled Courses ({enrolledCourses.length})
              </h3>
            </div>
            <div className="p-6">
              {enrolledCourses.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No courses enrolled yet</h4>
                  <p className="text-gray-600 mb-4">Start your learning journey by enrolling in your first course!</p>
                  <a href="/courses" className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Browse Courses
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {enrolledCourses.map((courseTitle, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{courseTitle}</h4>
                          <p className="text-sm text-gray-600">Enrolled course</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleStartLearning(courseTitle)}
                        className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Start Learning
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
