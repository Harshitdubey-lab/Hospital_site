'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Activity } from 'lucide-react';
import styles from './page.module.css';

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/departments')
      .then(res => res.json())
      .then(data => {
        setDepartments(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.deptPage}>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1>Medical Departments</h1>
          <p>Explore our specialized medical departments equipped with state-of-the-art facilities.</p>
        </div>
      </div>

      <div className={`container ${styles.mainContent}`}>
        {loading ? (
          <div className={styles.loading}>Loading departments...</div>
        ) : (
          <div className={styles.grid}>
            {departments.map((dept) => (
              <div key={dept._id} className={styles.card}>
                <div className={styles.iconBox}>
                  <Activity size={32} />
                </div>
                <h3>{dept.name}</h3>
                <p>{dept.short_description || 'Specialized medical care.'}</p>
                <Link href={`/departments/${dept.slug}`} className={styles.link}>
                  View Details <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
