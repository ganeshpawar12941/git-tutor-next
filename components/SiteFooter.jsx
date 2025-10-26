export default function SiteFooter() {
  return (
    <footer>
      <div className="container footer__container">
        <div className="footer__1">
          <a href="/" className="footer__logo"><h4>GIT-TUTOR</h4></a>
          <p>
            Welcome to GIT-TUTOR, your go-to platform for learning Git and version control. Enhance your
            skills and take your career to the next level!
          </p>
        </div>
        <div className="footer__2">
          <h4>Permalinks</h4>
          <ul className="permalinks">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer__3">
          <h4>Primacy</h4>
          <ul className="privacy">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms and conditions</a></li>
            <li><a href="#">Refund Policy</a></li>
          </ul>
        </div>
        <div className="footer__4">
          <h4>Contact Us</h4>
          <div>
            <p>+91 9449117075</p>
            <p>gptech45@gmail.com</p>
          </div>
          <ul className="footer__socials">
            <li><a href="#"><i className="uil uil-facebook-f"></i></a></li>
            <li><a href="#"><i className="uil uil-instagram-alt"></i></a></li>
            <li><a href="#"><i className="uil uil-twitter"></i></a></li>
            <li><a href="#"><i className="uil uil-linkedin-alt"></i></a></li>
          </ul>
        </div>
      </div>
      <div className="footer__copyright">
        <small>Copyright &copy; GIT College</small>
      </div>
    </footer>
  );
}
