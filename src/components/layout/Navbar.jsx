'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Phone, MapPin, Clock, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className="container">
          <div className={styles.topBarContent}>
            <div className={styles.infoGroup}>
              <Clock size={14} /> <span>24/7 Emergency Service Available</span>
            </div>
            <div className={styles.infoGroup}>
              <MapPin size={14} /> <span>123 Health Avenue, Medical District, NY</span>
            </div>
            <div className={styles.infoGroup}>
              <Phone size={14} /> <strong>+1 (555) 911-0000</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={styles.navbar}>
        <div className={`container ${styles.navContainer}`}>
          <Link href="/" className={styles.logo}>
            Bansal<span>Hospital</span>
          </Link>

          <div className={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </div>

          <ul className={`${styles.navLinks} ${isMenuOpen ? styles.active : ''}`}>
            <li><Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link href="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link></li>
            <li><Link href="/departments" onClick={() => setIsMenuOpen(false)}>Departments</Link></li>
            <li><Link href="/doctors" onClick={() => setIsMenuOpen(false)}>Doctors</Link></li>
            <li><Link href="/services" onClick={() => setIsMenuOpen(false)}>Services</Link></li>
            <li><Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
            <li className={styles.mobileAction}>
              <Link href="/appointments" className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>
                Book Appointment
              </Link>
            </li>
          </ul>

          <div className={styles.navActions}>
            <Link href="/appointments" className="btn btn-primary">
              Book Appointment
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
