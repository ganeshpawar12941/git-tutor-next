import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export default function SummaryPage() {
  return (
    <div id="app">
      <SiteNav />
      <main id="course-summary" className="course-summary">
        <div className="course-image">
          <img src="/web.webp" alt="Course Image" />
        </div>
        <div className="course-details" id="course-details">
          <h1>Advanced Web Development</h1>
          <h3>Instructor: <span className="instructor-name">Prof. Seena Kalghatgi</span></h3>
          <div className="teacher-info" id="instructor">
            <img src="/Screenshot 2024-10-11 194047.png" alt="Teacher Image" className="teacher-image" />
            <div className="teacher-details">
              <p>Prof. Seena Kalghatgi is an experienced web developer with over 10 years of teaching experience. He specializes in modern frameworks and best practices.</p>
            </div>
          </div>
          <h3>Course Description</h3>
          <p className="course-description">
            This course covers advanced topics in web development, including modern frameworks, best practices, and deployment techniques.
          </p>
          <h3>Course Details</h3>
          <ul className="course-info">
            <li><strong>Duration:</strong> 10 Weeks</li>
            <li><strong>Level:</strong> Intermediate to Advanced</li>
            <li><strong>Prerequisites:</strong> Basic knowledge of HTML, CSS, and JavaScript</li>
            <li><strong>Price:</strong> $199</li>
          </ul>
          <h3>What You'll Learn</h3>
          <ul className="course-topics">
            <li>Advanced CSS Techniques</li>
            <li>JavaScript Frameworks (React, Angular)</li>
            <li>RESTful APIs and Backend Integration</li>
            <li>Deployment and DevOps Practices</li>
          </ul>
          <a href="/courses" className="buy-button">Enroll in this course</a>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
