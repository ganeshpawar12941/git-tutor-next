"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

const items = [
  ['001.jpg','Responsive Social Media Website UI Design'],
  ['c.png','Complete C Programming Course'],
  ['datavis.png','Data Visualization in Python'],
  ['ecomerce.jpg','Building an E-Commerce Website'],
  ['hi.webp','Introduction to Machine Learning'],
  ['c++.png','Object-Oriented Programming with C++'],
  ['web.webp','Web Development with JavaScript'],
  ['002.webp','Data Science Fundamentals'],
  ['003.png','Cybersecurity for Beginners'],
  ['004.png','Full-Stack Web Development'],
  ['004.webp','Deep Learning with TensorFlow'],
  ['005.jpg','Algorithms and Data Structures'],
  ['css.jpg','Advanced CSS Techniques'],
  ['cloud.png','Introduction to Cloud Computing'],
  ['blockchain.png','Blockchain for Beginners'],
  ['devops.png','Introduction to DevOps'],
  ['AI.png','Introduction to AI Ethics'],
  ['flutter.webp','Mobile App Development with Flutter'],
  ['sql_banner.jpg','Data Analysis with SQL'],
  ['Challenges-and-Aspects-of-Ethical-Hacking.jpg','Introduction to Ethical Hacking'],
  ['Swift-Development-for-iOS.jpg','iOS App Development with Swift'],
  ['hq720.jpg','Cloud Architecture with AWS'],
  ['Blog@2x--3--1.jpg','Microservices Architecture'],
  ['PWA-development.png','Progressive Web App Development'],
  ['UI.png','UX Design for Web'],
  ['secure-rest-api-in-nodejs.png','Building REST APIs with Node.js'],
  ['download.jpg','Introduction to Kubernetes'],
  ['react.png','Introduction to React'],
  ['The-Internet-of-Things.jpg','Understanding Internet of Things (IoT)'],
  ['chat.png','Creating Chatbots with Python'],
  ['php.jpg','Introduction to PHP and MySQL'],
  ['Mobile-game-development-in-Unity-3d-1.jpg','Mobile Game Development with Unity'],
  ['natural-language-processing-nlp-1024x538.png','Natural Language Processing with Python'],
  ['Agile_Jan_2020.jpg','Agile Project Management'],
  ['Intro-to-data-science-nerdyelectronics.png','Introduction to Data Science'],
];

export default function CoursesPage() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoading, setIsLoading] = useState({});
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const router = useRouter();

  const handleEnrollClick = (courseTitle, courseImage) => {
    setSelectedCourse({ title: courseTitle, image: courseImage });
    setShowEnrollmentModal(true);
  };

  const handleConfirmEnrollment = async () => {
    if (!selectedCourse) return;

    setIsLoading(prev => ({ ...prev, [selectedCourse.title]: true }));
    setShowEnrollmentModal(false);

    // Simulate API call for enrollment
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Add course to enrolled list
      setEnrolledCourses(prev => {
        if (!prev.includes(selectedCourse.title)) {
          return [...prev, selectedCourse.title];
        }
        return prev;
      });

      // Store enrollment in localStorage (simulating backend)
      const currentEnrollments = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
      if (!currentEnrollments.includes(selectedCourse.title)) {
        currentEnrollments.push(selectedCourse.title);
        localStorage.setItem('enrolledCourses', JSON.stringify(currentEnrollments));
      }

      // Redirect to enrollment success page
      router.push(`/enrollment?course=${encodeURIComponent(selectedCourse.title)}&image=${encodeURIComponent(selectedCourse.image)}`);
    } catch (error) {
      alert('Failed to enroll in course. Please try again.');
    } finally {
      setIsLoading(prev => ({ ...prev, [selectedCourse.title]: false }));
      setSelectedCourse(null);
    }
  };

  const handleCancelEnrollment = () => {
    setShowEnrollmentModal(false);
    setSelectedCourse(null);
  };

  return (
    <div id="app">
      <SiteNav />
      <section className="courses">
        <div className="container courses__container">
          {items.map(([img, title], idx) => {
            const isEnrolled = enrolledCourses.includes(title);
            const loading = isLoading[title];

            return (
              <article className="course" key={idx}>
                <div className="course_image">
                  <img src={`/${img}`} alt="" />
                  {isEnrolled && (
                    <div className="enrolled-badge">
                      <span>✓ Enrolled</span>
                    </div>
                  )}
                </div>
                <div className="course__info">
                  <h4>{title}</h4>
                  <p>Learn more about {title.toLowerCase()}.</p>
                  <button
                    className={`btn ${isEnrolled ? 'btn-secondary' : 'btn-primary'}`}
                    onClick={() => handleEnrollClick(title, img)}
                    disabled={loading || isEnrolled}
                  >
                    {loading ? (
                      <span className="loading-text">
                        <i className="uil uil-spinner-alt loading-spinner"></i>
                        Processing...
                      </span>
                    ) : isEnrolled ? (
                      '✓ Enrolled'
                    ) : (
                      'Enroll for Course'
                    )}
                  </button>
                </div>
              </article>
            );
          })}
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
                <img src={`/${selectedCourse.image}`} alt={selectedCourse.title} />
                <div className="course-details">
                  <h4>{selectedCourse.title}</h4>
                  <div className="course-meta">
                    <span className="duration">⏱️ 8-12 weeks</span>
                    <span className="level">🎓 Intermediate</span>
                    <span className="lessons">📚 25+ lessons</span>
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
