"use client";
import Link from 'next/link';

export default function SiteNav() {
  return (
    <nav className="navbar">
      <div className="container nav__container">
        <Link href="/" className="logo-container">
          <img src="/logo.png" alt="Logo" className="logo" />
          <h4>GIT-TUTOR</h4>
        </Link>
        <ul className="nav__menu" id="nav-menu">
          <li><Link href="/" className="nav-link">Home</Link></li>
          <li><Link href="/about" className="nav-link">About</Link></li>
          <li><Link href="/courses" className="nav-link">Courses</Link></li>
          <li><Link href="/contact" className="nav-link">Contact</Link></li>
          <li><Link href="/login" className="nav-link">Login</Link></li>
          <li><Link href="/profile" className="nav-link"><i className="fa-solid fa-user"></i></Link></li>
        </ul>
        <button id="open-menu-btn" className="menu-btn"><i className="fa-solid fa-bars"></i></button>
        <button id="close-menu-btn" className="menu-btn"><i className="fa-solid fa-xmark"></i></button>
      </div>
    </nav>
  );
}
