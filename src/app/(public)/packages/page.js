'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Check, ShieldCheck } from 'lucide-react';
import styles from './page.module.css';

export default function PackagesPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/packages')
      .then(res => res.json())
      .then(data => {
        setPackages(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className={styles.packagesPage}>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1>Health Checkup Packages</h1>
          <p>Preventive health checkups designed for your complete well-being.</p>
        </div>
      </div>

      <div className={`container ${styles.mainContent}`}>
        {loading ? (
          <div className={styles.loading}>Loading packages...</div>
        ) : (
          <div className={styles.grid}>
            {packages.map((pkg) => (
              <div key={pkg.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <ShieldCheck size={32} className={styles.icon} />
                  <h3>{pkg.name}</h3>
                  <div className={styles.price}>
                    <span className={styles.currency}>$</span>
                    <span className={styles.amount}>{pkg.price}</span>
                  </div>
                  <p className={styles.description}>{pkg.description}</p>
                </div>
                
                <div className={styles.cardBody}>
                  <h4>Included Tests:</h4>
                  <ul className={styles.testList}>
                    {(pkg.included_tests || []).map((test, i) => (
                      <li key={i}>
                        <Check size={16} className={styles.checkIcon} />
                        <span>{test}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={styles.cardFooter}>
                  <Link href="/appointments" className="btn btn-outline">
                    Book This Package
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
