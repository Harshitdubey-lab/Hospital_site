import Link from 'next/link';
import { ArrowRight, Activity, Heart, Stethoscope, ShieldPlus } from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.homeWrapper}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <span className={styles.heroSubtitle}>Your Health, Our Priority</span>
            <h1 className={styles.heroTitle}>
              Advanced Medical Care With a Compassionate Touch
            </h1>
            <p className={styles.heroText}>
              We are a multi-specialty hospital dedicated to providing world-class healthcare services. Book an appointment with our expert doctors today.
            </p>
            <div className={styles.heroButtons}>
              <Link href="/appointments" className="btn btn-primary">
                Book Appointment
              </Link>
              <Link href="/doctors" className="btn btn-outline">
                Find a Doctor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={`container ${styles.featuresGrid}`}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><Stethoscope size={32} /></div>
            <h3>Expert Doctors</h3>
            <p>Our team comprises highly qualified and experienced medical professionals.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><Activity size={32} /></div>
            <h3>Advanced Technology</h3>
            <p>We use state-of-the-art medical equipment for accurate diagnosis.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><ShieldPlus size={32} /></div>
            <h3>24/7 Emergency</h3>
            <p>Round-the-clock emergency services available for critical care.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><Heart size={32} /></div>
            <h3>Quality Care</h3>
            <p>We prioritize patient comfort and deliver personalized healthcare.</p>
          </div>
        </div>
      </section>

      {/* Departments Preview */}
      <section className={styles.departmentsSection}>
        <div className="container">
          <span className="section-subtitle">Our Specialties</span>
          <h2 className="section-title">Medical Departments</h2>
          
          <div className={styles.departmentsGrid}>
            {[
              { name: 'Cardiology', desc: 'Heart care and surgery', icon: '❤️' },
              { name: 'Neurology', desc: 'Brain and nervous system', icon: '🧠' },
              { name: 'Orthopedics', desc: 'Bone and joint care', icon: '🦴' },
              { name: 'Pediatrics', desc: 'Child healthcare', icon: '👶' },
            ].map((dept, i) => (
              <Link href={`/departments`} key={i} className={styles.deptCard}>
                <div className={styles.deptIcon}>{dept.icon}</div>
                <h3>{dept.name}</h3>
                <p>{dept.desc}</p>
                <span className={styles.readMore}>Learn More <ArrowRight size={16} /></span>
              </Link>
            ))}
          </div>
          
          <div className={styles.centerAction}>
            <Link href="/departments" className="btn btn-outline">View All Departments</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={`container ${styles.ctaContainer}`}>
          <div className={styles.ctaContent}>
            <h2>Need a Health Checkup?</h2>
            <p>Explore our comprehensive health packages designed for your well-being.</p>
            <Link href="/packages" className="btn btn-primary">View Health Packages</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
