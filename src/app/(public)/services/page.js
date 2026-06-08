'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Stethoscope, Clock, ShieldPlus } from 'lucide-react';
import styles from './page.module.css';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        setServices(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className={styles.servicesPage}>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1>Medical Services</h1>
          <p>Comprehensive healthcare services round the clock.</p>
        </div>
      </div>

      <div className={`container ${styles.mainContent}`}>
        {loading ? (
          <div className={styles.loading}>Loading services...</div>
        ) : (
          <div className={styles.grid}>
            {services.map((service) => (
              <div key={service.id} className={styles.card}>
                <div className={styles.iconBox}>
                  <ShieldPlus size={32} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.short_description}</p>
                <Link href="/contact" className={styles.link}>Enquire Now</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
