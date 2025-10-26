import SiteNav from '@/components/SiteNav';

export default function SignupPage() {
  return (
    <div id="app">
      <SiteNav />
      <div className="login-light"></div>
      <div className="C">
        <div className="signup-box" id="register-container">
          <form action="#">
            <input type="checkbox" className="input-check" id="input-check" />
            <label htmlFor="input-check" className="toggle">
              <span className="text off">off</span>
              <span className="text on">on</span>
            </label>
            <div className="light"></div>
            <h2>Sign Up</h2>
            <div className="input-box">
              <span className="icon"><ion-icon name="person"></ion-icon></span>
              <input type="text" required />
              <label>Name</label>
              <div className="input-line"></div>
            </div>
            <div className="input-box">
              <span className="icon"><ion-icon name="mail"></ion-icon></span>
              <input type="email" required />
              <label>Email</label>
              <div className="input-line"></div>
            </div>
            <div className="input-box">
              <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
              <input type="password" required />
              <label>Password</label>
              <div className="input-line"></div>
            </div>
            <div className="input-box">
              <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
              <input type="password" required />
              <label>Confirm Password</label>
              <div className="input-line"></div>
            </div>
            <button type="submit">Sign Up</button>
            <div className="login-link">
              <p>Already have an account? <a href="/login">Login</a></p>
            </div>
          </form>
        </div>
      </div>
      <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
      <script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    </div>
  );
}
