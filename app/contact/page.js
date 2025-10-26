import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export default function ContactPage() {
  return (
    <div id="app">
      <SiteNav />
      <section className="contact">
        <div className="container contact__container">
          <aside className="contact__aside">
            <div className="aside__image"><img src="/contact.png" alt="Contact" /></div>
            <h2>Contact Us</h2>
            <p>
              The harsher pardons, or pains to be assumed, are resolved by flattery, the pains which are the pleasures, the consequences of life.
            </p>
            <ul className="contact__details">
              <li><i className="uil uil-phone-times"></i><h5>+2335523456789</h5></li>
              <li><i className="uil uil-envelope"></i><h5>support@egattor.com</h5></li>
              <li><i className="uil uil-location-point"></i><h5>Accra, Ghana</h5></li>
            </ul>
            <ul className="contact__socials">
              <li><a href="https://facebook.com"><i className="uil uil-facebook-f"></i></a></li>
              <li><a href="https://instagram.com"><i className="uil uil-instagram"></i></a></li>
              <li><a href="https://twitter.com"><i className="uil uil-twitter"></i></a></li>
              <li><a href="https://linkedin.com"><i className="uil uil-linkedin-alt"></i></a></li>
            </ul>
          </aside>

          <form action="https://formspree.io/f/xjkvyyja" method="post" className="contact__form">
            <div className="form__name">
              <input type="text" name="First Name" placeholder="First Name" required />
              <input type="text" name="Last Name" placeholder="Last Name" required />
            </div>
            <input type="email" name="Email Address" placeholder="Your Email Address" required />
            <textarea name="Message" rows={7} placeholder="Message" required />
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
