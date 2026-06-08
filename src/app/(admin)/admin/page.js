'use client';
import { useState, useEffect } from 'react';
import { Users, Calendar, Building2, Stethoscope } from 'lucide-react';
import styles from './page.module.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalDepartments: 0,
    totalAppointments: 0,
    pendingAppointments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  const statCards = [
    { title: 'Total Doctors', value: stats.totalDoctors, icon: <Stethoscope size={24} />, color: 'var(--primary-color)' },
    { title: 'Departments', value: stats.totalDepartments, icon: <Building2 size={24} />, color: 'var(--secondary-color)' },
    { title: 'Total Appointments', value: stats.totalAppointments, icon: <Calendar size={24} />, color: 'var(--accent-color)' },
    { title: 'Pending Appointments', value: stats.pendingAppointments, icon: <Users size={24} />, color: 'var(--error-color)' },
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.statsGrid}>
        {statCards.map((stat, i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className={styles.statInfo}>
              <p className={styles.statTitle}>{stat.title}</p>
              <h3 className={styles.statValue}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.recentSection}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Quick Actions</h3>
          </div>
          <div className={styles.cardBody}>
            <p>Welcome to the admin dashboard. Use the sidebar to navigate to different management sections.</p>
            <div className={styles.quickActions}>
              <a href="/admin/appointments" className="btn btn-primary">Manage Appointments</a>
              <a href="/admin/doctors" className="btn btn-outline">Manage Doctors</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
