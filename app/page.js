import ClientBehaviors from '@/components/ClientBehaviors';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export default function HomePage() {
  return (
    <div id="app">
      <SiteNav />

      <header>
        <div className="container header__container">
          <div className="header__left">
            <h1>Grow your skills to advance your career path</h1>
            <p></p>
            <a href="/login" className="btn btn-primary">Get Started</a>
          </div>
          <div className="header__right">
            <div className="header__right-image">
              <img src="/s2.png" alt="Header Image" />
            </div>
          </div>
        </div>
      </header>

      <section className="categories">
        <div className="container categories__container">
          <div className="categories__left">
            <h1>Categories</h1>
            <p>
              Explore a variety of subjects and develop new skills across different domains. Whether you're
              interested in cutting-edge technology, creative arts, or business strategies, these categories
              will help you grow and succeed in your field of interest.
            </p>
            <a href="/login" className="btn">Learn More</a>
          </div>
          <div className="categories__right">
            <article className="category">
              <span className="category__icon"><i className="uil uil-bitcoin-circle"></i></span>
              <h5>Blockchain</h5>
              <p>Understand the basics of blockchain technology and its impact on industries like finance and healthcare.</p>
            </article>
            <article className="category">
              <span className="category__icon"><i className="uil uil-palette"></i></span>
              <h5>Graphics Design</h5>
              <p>Learn essential design principles and create engaging visuals for digital and print media.</p>
            </article>
            <article className="category">
              <span className="category__icon"><i className="uil uil-chart-line"></i></span>
              <h5>Finance</h5>
              <p>Improve your financial knowledge and discover smart investment strategies for personal and business finance.</p>
            </article>
            <article className="category">
              <span className="category__icon"><i className="uil uil-megaphone"></i></span>
              <h5>Marketing</h5>
              <p>Master marketing strategies like SEO, social media, and branding to grow your business or personal brand.</p>
            </article>
            <article className="category">
              <span className="category__icon"><i className="uil uil-music"></i></span>
              <h5>Music</h5>
              <p>Learn music theory, production, and performance to unlock your musical creativity.</p>
            </article>
            <article className="category">
              <span className="category__icon"><i className="uil uil-briefcase"></i></span>
              <h5>Business</h5>
              <p>Gain practical insights into entrepreneurship, leadership, and business management.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="courses">
        <h2>Our Popular Courses</h2>
        <div className="container courses__container">
          <article className="course">
            <div className="course_image"><img src="/web.webp" alt="" /></div>
            <div className="course__info">
              <h4>Responsive Social Media Website UI Design</h4>
              <p>Learn how to create a fully responsive social media website from scratch.</p>
              <a href="/login" className="btn btn-primary">Learn More</a>
            </div>
          </article>
          <article className="course">
            <div className="course_image"><img src="/datavis.png" alt="" /></div>
            <div className="course__info">
              <h4>Data Visualization in Python</h4>
              <p>Master the art of visualizing data using libraries like Matplotlib and Seaborn.</p>
              <a href="/login" className="btn btn-primary">Learn More</a>
            </div>
          </article>
          <article className="course">
            <div className="course_image"><img src="/c.png" alt="" /></div>
            <div className="course__info">
              <h4>Complete C Programming Course</h4>
              <p>Understand C programming, from basic syntax to advanced functions.</p>
              <a href="/login" className="btn btn-primary">Learn More</a>
            </div>
          </article>
        </div>
      </section>

      <section className="faqs">
        <h2 style={{color: 'black'}}>Frequently Asked Questions</h2>
        <div className="container faqs__container">
          {[
            ['How do I enroll in a course?','To enroll, visit the course page, click on "Enroll Now," and follow the instructions for registration and payment.'],
            ['Are there any prerequisites for the courses?','Some courses may have prerequisites, which are mentioned on the course page. However, many are suitable for beginners.'],
            ['What is the duration of the courses?','The duration varies by course. Most courses are designed to be completed in 4-6 weeks, but you can learn at your own pace.'],
            ['Do I get a certificate after completing a course?','Yes, a digital certificate is awarded after successful completion of the course, which you can share on your resume or social profiles.'],
            ['How do I know the right courses for me?','Identify your goals and interests, then explore our course offerings to find the best fit for your needs.'],
            ['What if I need help during the course?','You can reach out through community forums or directly to the instructor for assistance during the course.'],
            ['Are the courses self-paced?','Yes, most courses are self-paced, allowing you to complete them according to your schedule.'],
            ['What payment methods do you accept?','We accept various payment methods, including credit/debit cards, PayPal, and other online payment gateways.'],
            ['Is there a refund policy?','Yes, we offer a refund policy. You can request a refund within 14 days of enrollment, provided less than 25% of the course content has been completed.'],
            ['How can I contact support?','You can contact our support team via email or through the support section on our website.'],
          ].map(([q,a],idx)=> (
            <article className="faq" key={idx}>
              <div className="faq__icon"><i className="uil uil-plus"></i></div>
              <div className="question__answer"><h4>{q}</h4><p>{a}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="container testimonials__container mySwiper">
        <h2>Students' Reviews</h2>
        <div className="swiper-wrapper">
          {[
            {img:'/dhruv.jpeg', name:'Dhruv belgaonkar', role:'Student', body:'"GIT-TUTOR has helped me understand complex concepts with ease. The courses are well-structured, and the instructors provide clear explanations. I highly recommend it for anyone looking to boost their skills!"'},
            {img:'/amit.jpeg', name:'Amit sutakatti', role:'Student', body:'"The tutorials are beginner-friendly yet comprehensive. I’ve been able to advance my career thanks to the detailed lessons on GIT-TUTOR. A fantastic platform for students and professionals alike."'},
            {img:'/paarth.jpeg', name:'paarth juvali', role:'Student', body:'"I love how GIT-TUTOR breaks down difficult topics into manageable chunks. The interactive interface and practical projects make learning so much more engaging and fun!"'},
            {img:'/darshu.jpeg', name:'Darshan Desai', role:'Student', body:'This website is a great resource! The lessons are straightforward, and the projects helped me apply what I learned immediately. GIT-TUTOR is definitely one of the best learning platforms for Git and version control."'},
            {img:'/aptu.jpeg', name:'Atharva aptekar', role:'Student', body:'"GIT-TUTOR is the perfect platform for both students and professionals. The content is engaging, and I learned a lot faster than I expected. The real-world examples made it even more practical."'},
          ].map((t, idx)=> (
            <article className="testimonial swiper-slide" key={idx}>
              <div className="avatar"><img src={t.img} alt="" /></div>
              <div className="testimonial__info"><h5>{t.name}</h5><small>{t.role}</small></div>
              <div className="testimonial__body"><p>{t.body}</p></div>
            </article>
          ))}
        </div>
        <div className="swiper-pagination"></div>
      </section>

      <SiteFooter />

      <ClientBehaviors />
    </div>
  );
}
