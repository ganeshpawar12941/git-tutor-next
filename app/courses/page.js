"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { useAuth } from '@/lib/auth-context';
import { coursesAPI, videosAPI, enrollmentAPI } from '@/lib/api';

export default function CoursesPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [courses, setCourses] = useState([]);
  const [teacherCourses, setTeacherCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState({});
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);

      try {
        // Fetch all available courses
        const allCourses = await coursesAPI.getAll();
        setCourses(allCourses.data || allCourses);

        // If user is logged in, fetch their enrolled courses and teacher courses
        if (isAuthenticated && user) {
          // Fetch enrolled courses (using localStorage for now - would need enrollment API)
          const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
          setEnrolledCourses(enrolled);

          // Fetch courses where user is the teacher
          if (user.role === 'teacher' || user.role === 'admin') {
            const teacherCoursesData = (allCourses.data || allCourses).filter(
              course => course.teacher && course.teacher._id === user.id
            );
            setTeacherCourses(teacherCoursesData);
          }
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        // Fallback to empty arrays if API fails
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [isAuthenticated, user]);

  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
    setShowEnrollmentModal(true);
  };

  const handleConfirmEnrollment = async () => {
    if (!selectedCourse) return;

    setLoadingCourses(prev => ({ ...prev, [selectedCourse._id]: true }));
    setShowEnrollmentModal(false);

    try {
      // Call enrollment API using the enrollmentAPI function
      await enrollmentAPI.enroll(selectedCourse._id);

      // Add course to enrolled list
      setEnrolledCourses(prev => {
        if (!prev.includes(selectedCourse._id)) {
          return [...prev, selectedCourse._id];
        }
        return prev;
      });

      // Store enrollment in localStorage (backup)
      const currentEnrollments = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
      if (!currentEnrollments.includes(selectedCourse._id)) {
        currentEnrollments.push(selectedCourse._id);
        localStorage.setItem('enrolledCourses', JSON.stringify(currentEnrollments));
      }

      // Redirect to course page
      router.push(`/course/${selectedCourse._id}`);
    } catch (error) {
      console.error('Enrollment error:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to enroll in course. Please try again.'
      });
    } finally {
      setLoadingCourses(prev => ({ ...prev, [selectedCourse._id]: false }));
      setSelectedCourse(null);
    }
  };

  const handleCancelEnrollment = () => {
    setShowEnrollmentModal(false);
    setSelectedCourse(null);
  };

  const handleCourseClick = (course) => {
    if (enrolledCourses.includes(course._id)) {
      router.push(`/course/${course._id}`);
    } else {
      handleEnrollClick(course);
    }
  };

  const renderCourseCard = (course) => {
    const isEnrolled = enrolledCourses.includes(course._id);
    const isTeacherCourse = teacherCourses.some(tc => tc._id === course._id);
    const loading = loadingCourses[course._id];

    return (
      <article className="course" key={course._id}>
        <div className="course_image">
          <img
            src={course.thumbnail || '/api/placeholder/400/250'}
            alt={course.title}
            className="w-full h-48 object-cover"
          />
          {isEnrolled && (
            <div className="enrolled-badge">
              <span>✓ Enrolled</span>
            </div>
          )}
          {isTeacherCourse && (
            <div className="teacher-badge">
              <span>👨‍🏫 Your Course</span>
            </div>
          )}
        </div>
        <div className="course__info">
          <h4>{course.title}</h4>
          <p>{course.description}</p>
          <div className="course-meta">
            <span className="instructor">Instructor: {course.teacher?.name || 'Unknown'}</span>
            {course.code && <span className="code">Code: {course.code}</span>}
          </div>
          <button
            className={`btn ${isEnrolled ? 'btn-secondary' : 'btn-primary'}`}
            onClick={() => isEnrolled ? router.push(`/course/${course._id}`) : handleEnrollClick(course)}
            disabled={loading}
          >
            {loading ? (
              <span className="loading-text">
                <i className="uil uil-spinner-alt loading-spinner"></i>
                Processing...
              </span>
            ) : isEnrolled ? (
              'Continue Learning'
            ) : (
              'Enroll for Course'
            )}
          </button>
          {isTeacherCourse && (
            <div className="mt-2">
              <Link
                href={`/course/${course._id}`}
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                Manage Videos →
              </Link>
            </div>
          )}
        </div>
      </article>
    );
  };

  const renderTeacherCourses = () => (
    <div className="teacher-courses-section">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Courses</h2>
        <p className="text-gray-600">Manage your courses and upload videos for students</p>
      </div>

      {teacherCourses.length > 0 ? (
        <div className="courses-grid">
          {teacherCourses.map(renderCourseCard)}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses yet</h3>
          <p className="text-gray-600 mb-6">Create your first course to start teaching</p>
          <Link
            href="/create-course"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
          >
            Create Course
          </Link>
        </div>
      )}
    </div>
  );

  const renderBrowseCourses = () => (
    <div className="browse-courses-section">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Browse Courses</h2>
        <p className="text-gray-600">Discover courses and start learning</p>
      </div>

      {courses.length > 0 ? (
        <div className="courses-grid">
          {courses.map(renderCourseCard)}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses available</h3>
          <p className="text-gray-600">Check back later for new courses</p>
        </div>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div id="app">
        <SiteNav />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center" style={{ paddingTop: '3.5rem' }}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading courses...</p>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div id="app">
      <SiteNav />

      <section className="courses">
        <div className="container courses__container">
          {/* Message Display */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-100 border border-green-400 text-green-700'
                : 'bg-red-100 border border-red-400 text-red-700'
            }`}>
              {message.text}
            </div>
          )}
          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
              <button
                onClick={() => setActiveTab('browse')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'browse'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Browse Courses
              </button>
              {isAuthenticated && (
                <>
                  <button
                    onClick={() => setActiveTab('my-courses')}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                      activeTab === 'my-courses'
                        ? 'bg-white text-indigo-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    My Courses ({enrolledCourses.length})
                  </button>
                  {(user?.role === 'teacher' || user?.role === 'admin') && (
                    <button
                      onClick={() => setActiveTab('teach')}
                      className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                        activeTab === 'teach'
                          ? 'bg-white text-indigo-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      My Teaching ({teacherCourses.length})
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'browse' && renderBrowseCourses()}
          {activeTab === 'my-courses' && (
            <div className="my-courses-section">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">My Enrolled Courses</h2>
                <p className="text-gray-600">Continue your learning journey</p>
              </div>

              {enrolledCourses.length > 0 ? (
                <div className="courses-grid">
                  {courses
                    .filter(course => enrolledCourses.includes(course._id))
                    .map(renderCourseCard)}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No enrolled courses</h3>
                  <p className="text-gray-600 mb-6">Browse and enroll in courses to start learning</p>
                  <button
                    onClick={() => setActiveTab('browse')}
                    className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
                  >
                    Browse Courses
                  </button>
                </div>
              )}
            </div>
          )}
          {activeTab === 'teach' && renderTeacherCourses()}
        </div>
      </section>

      {/* Enrollment Confirmation Modal */}
      {showEnrollmentModal && selectedCourse && (
        <div className="enrollment-modal-overlay">
          <div className="enrollment-modal">
            <div className="modal-header">
              <h3>Confirm Enrollment</h3>
              <button className="modal-close" onClick={handleCancelEnrollment}>
                <i className="uil uil-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="course-preview">
                <img src={selectedCourse.thumbnail || '/api/placeholder/400/250'} alt={selectedCourse.title} />
                <div className="course-details">
                  <h4>{selectedCourse.title}</h4>
                  <div className="course-meta">
                    <span className="instructor">Instructor: {selectedCourse.teacher?.name || 'Unknown'}</span>
                    {selectedCourse.code && <span className="code">Code: {selectedCourse.code}</span>}
                  </div>
                </div>
              </div>
              <div className="enrollment-benefits">
                <h5>What you'll get:</h5>
                <ul>
                  <li>✓ Full lifetime access</li>
                  <li>✓ Certificate of completion</li>
                  <li>✓ Mobile and TV access</li>
                  <li>✓ Community support</li>
                  <li>✓ Downloadable resources</li>
                </ul>
              </div>
              <div className="enrollment-warning">
                <p><strong>Note:</strong> Enrollment is free. No payment required.</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleCancelEnrollment}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleConfirmEnrollment}>
                Confirm Enrollment
              </button>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
