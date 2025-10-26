import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export default function AboutPage() {
  return (
    <div id="app">
      <SiteNav />

      <section className="about__achievements">
        <div className="container about__achievements-container">
          <div className="about__achievements-left">
            <img src="/about.png" alt="" />
          </div>
          <div className="about__achievements-right">
            <h1>Achievements</h1>
            <p>
              At GIT-TUTOR, we take pride in our journey of empowering learners with quality education. Over the years, we have successfully created an extensive catalog of courses that cater to a diverse audience. Our commitment to excellence has garnered a remarkable community of over 100,000 students who trust us for their learning needs. We are also honored to have received numerous awards, recognizing our innovative teaching methods and dedication to student success. Each achievement reflects our unwavering passion for education and our mission to make learning accessible for everyone.
            </p>
            <div className="achievements__cards">
              <article className="achievement__card">
                <span className="achievement__icon"><i className="uil uil-video"></i></span>
                <h3>450+</h3>
                <p>Courses</p>
              </article>
              <article className="achievement__card">
                <span className="achievement__icon"><i className="uil uil-users-alt"></i></span>
                <h3>1,00,000+</h3>
                <p>Students</p>
              </article>
              <article className="achievement__card">
                <span className="achievement__icon"><i className="uil uil-trophy"></i></span>
                <h3>50+</h3>
                <p>Awards</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="about__mission">
        <div className="container about__mission-container">
          <div className="about__mission-left">
            <h2>About Git-Tutor</h2>
            <p>
              Git-Tutor is a comprehensive learning platform designed to empower developers with practical, hands-on education in version control and collaborative development using Git. Our mission is to bridge the gap between theoretical knowledge and real-world application, making Git mastery accessible to developers of all skill levels.
            </p>
            <p>
              Founded with the vision of creating a community-driven learning environment, Git-Tutor offers interactive courses, real-time collaboration tools, and personalized learning paths that adapt to your pace and learning style. Whether you're a beginner taking your first steps into version control or an experienced developer looking to master advanced Git workflows, our platform provides the tools and guidance you need to succeed.
            </p>
          </div>
          <div className="about__mission-right">
            <div className="mission__features">
              <div className="mission__feature">
                <span className="feature__icon">🎯</span>
                <h3>Interactive Learning</h3>
                <p>Hands-on exercises and real-world scenarios to reinforce Git concepts</p>
              </div>
              <div className="mission__feature">
                <span className="feature__icon">🚀</span>
                <h3>Progressive Skill Building</h3>
                <p>Structured learning paths from basic commits to advanced branching strategies</p>
              </div>
              <div className="mission__feature">
                <span className="feature__icon">👥</span>
                <h3>Community Driven</h3>
                <p>Learn with peers, share knowledge, and contribute to open-source projects</p>
              </div>
              <div className="mission__feature">
                <span className="feature__icon">💼</span>
                <h3>Career Ready</h3>
                <p>Industry-relevant skills that prepare you for collaborative development environments</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about__features">
        <h2>Why Choose Git-Tutor?</h2>
        <div className="container about__features-container">
          <div className="features__grid">
            <div className="feature__card">
              <div className="feature__icon">
                <i className="uil uil-git-branch"></i>
              </div>
              <h3>Comprehensive Git Coverage</h3>
              <p>Master every aspect of Git from basic commits to complex merge strategies and conflict resolution.</p>
            </div>
            <div className="feature__card">
              <div className="feature__icon">
                <i className="uil uil-code-branch"></i>
              </div>
              <h3>Branch Management</h3>
              <p>Learn effective branching workflows used in professional development environments.</p>
            </div>
            <div className="feature__card">
              <div className="feature__icon">
                <i className="uil uil-collaboration"></i>
              </div>
              <h3>Team Collaboration</h3>
              <p>Understand how to work effectively in teams using Git for collaborative development.</p>
            </div>
            <div className="feature__card">
              <div className="feature__icon">
                <i className="uil uil-analytics"></i>
              </div>
              <h3>Performance Optimization</h3>
              <p>Learn to optimize Git repositories and improve development workflow efficiency.</p>
            </div>
            <div className="feature__card">
              <div className="feature__icon">
                <i className="uil uil-shield-check"></i>
              </div>
              <h3>Best Practices</h3>
              <p>Implement industry-standard Git practices for secure and maintainable code.</p>
            </div>
            <div className="feature__card">
              <div className="feature__icon">
                <i className="uil uil-graduation-cap"></i>
              </div>
              <h3>Certification Ready</h3>
              <p>Earn certificates that validate your Git expertise and boost your career prospects.</p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
