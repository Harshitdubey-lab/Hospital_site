import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.footerSection}>
          <Link href="/" className={styles.logo}>
            Bansal<span>Hospital</span>
          </Link>
          <p className={styles.description}>
            Providing world-class healthcare services with advanced medical technology and compassionate care.
          </p>
          <div className={styles.socialLinks}>
            <a href="#">FB</a>
            <a href="#">IG</a>
            <a href="#">IN</a>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Quick Links</h3>
          <ul className={styles.footerLinks}>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/departments">Departments</Link></li>
            <li><Link href="/doctors">Find a Doctor</Link></li>
            <li><Link href="/appointments">Book Appointment</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Departments</h3>
          <ul className={styles.footerLinks}>
            <li><Link href="/departments/cardiology">Cardiology</Link></li>
            <li><Link href="/departments/neurology">Neurology</Link></li>
            <li><Link href="/departments/orthopedics">Orthopedics</Link></li>
            <li><Link href="/departments/pediatrics">Pediatrics</Link></li>
            <li><Link href="/departments">View All</Link></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Contact Info</h3>
          <ul className={styles.contactList}>
            <li>
              <MapPin size={18} />
              <span>123 Health Avenue, Medical District, NY 10001</span>
            </li>
            <li>
              <Phone size={18} />
              <span>+1 (555) 123-4567</span>
            </li>
            <li>
              <Phone size={18} />
              <span>Emergency: +1 (555) 911-0000</span>
            </li>
            <li>
              <Mail size={18} />
              <span>info@citycare.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Bansal Hospital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
