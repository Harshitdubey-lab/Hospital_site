import { Heart, Users, Award, Clock } from 'lucide-react';
import styles from './page.module.css';

export const metadata = {
  title: 'About Us | Bansal Hospital',
  description: 'Learn about our mission, vision, and the team behind Bansal Hospital.',
};

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <div className={styles.pageHeader}>
        <div className="container">
          <h1>About Bansal Hospital</h1>
          <p>Committed to providing world-class healthcare with a compassionate touch.</p>
        </div>
      </div>

      <div className="container">
        {/* Intro Section */}
        <section className={styles.introSection}>
          <div className={styles.introContent}>
            <span className="section-subtitle">Our Story</span>
            <h2>A Legacy of Healing and Care</h2>
            <p>
              Founded in 1995, Bansal Hospital has grown from a small community clinic into a premier multi-specialty healthcare facility. Our journey has always been guided by a single core belief: that every patient deserves access to high-quality, compassionate medical care.
            </p>
            <p>
              Over the decades, we have continuously upgraded our infrastructure, bringing in the latest medical technologies and attracting some of the finest medical minds in the country. Today, we stand as a beacon of hope and healing for thousands of families.
            </p>
          </div>
          <div className={styles.introImage}>
            <img src="/images/bansal_interior.png" alt="Bansal Hospital Interior" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </section>

        {/* Mission & Vision */}
        <section className={styles.missionVision}>
          <div className={styles.mvCard}>
            <Heart size={40} className={styles.mvIcon} />
            <h3>Our Mission</h3>
            <p>To improve the health and well-being of the communities we serve by providing exceptional, patient-centered care, fostering medical education, and advancing research.</p>
          </div>
          <div className={styles.mvCard}>
            <Award size={40} className={styles.mvIcon} />
            <h3>Our Vision</h3>
            <p>To be the regional leader in clinical excellence, known for our innovative treatments, compassionate staff, and unwavering commitment to patient safety.</p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className={styles.whyChooseUs}>
          <span className="section-subtitle">Why Bansal</span>
          <h2 className="section-title">The Bansal Difference</h2>
          
          <div className={styles.featuresGrid}>
            <div className={styles.featureItem}>
              <Users size={32} />
              <h4>Expert Medical Team</h4>
              <p>Our specialists are recognized leaders in their respective fields.</p>
            </div>
            <div className={styles.featureItem}>
              <Clock size={32} />
              <h4>24/7 Availability</h4>
              <p>Round-the-clock emergency and trauma care services.</p>
            </div>
            <div className={styles.featureItem}>
              <Award size={32} />
              <h4>Accredited Facility</h4>
              <p>Recognized globally for maintaining the highest standards of safety.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
