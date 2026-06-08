'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Calendar, Clock, MapPin } from 'lucide-react';
import styles from './page.module.css';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');

  useEffect(() => {
    // Fetch departments for filter
    fetch('/api/departments')
      .then(res => res.json())
      .then(data => setDepartments(Array.isArray(data) ? data : []));
      
    fetchDoctors();
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, [search, deptFilter]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (search) query.append('search', search);
      if (deptFilter) query.append('department_id', deptFilter);
      
      const res = await fetch(`/api/doctors?${query.toString()}`);
      const data = await res.json();
      setDoctors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    }
    setLoading(false);
  };

  return (
    <div className={styles.doctorsPage}>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1>Find a Doctor</h1>
          <p>Book an appointment with our expert medical professionals.</p>
        </div>
      </div>

      <div className={`container ${styles.mainContent}`}>
        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.searchBox}>
            <Search className={styles.searchIcon} size={20} />
            <input 
              type="text" 
              placeholder="Search doctor by name..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.filterBox}>
            <select 
              value={deptFilter} 
              onChange={(e) => setDeptFilter(e.target.value)}
              className={styles.selectInput}
            >
              <option value="">All Departments</option>
              {departments.map(d => (
                <option key={d._id} value={d._id}>{d.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Doctor List */}
        {loading ? (
          <div className={styles.loading}>Loading doctors...</div>
        ) : doctors.length === 0 ? (
          <div className={styles.noResults}>No doctors found matching your criteria.</div>
        ) : (
          <div className={styles.doctorsGrid}>
            {doctors.map(doctor => (
              <div key={doctor._id} className={styles.doctorCard}>
                <div className={styles.doctorImagePlaceholder}>
                  {doctor.photo ? <img src={doctor.photo} alt={doctor.name} /> : <span>{doctor.name.charAt(0)}</span>}
                </div>
                <div className={styles.doctorInfo}>
                  <h3>{doctor.name}</h3>
                  <p className={styles.specialization}>{doctor.specialization}</p>
                  
                  <div className={styles.doctorDetails}>
                    <div className={styles.detailRow}>
                      <MapPin size={16} /> <span>{doctor.department_id?.name || 'General'}</span>
                    </div>
                    <div className={styles.detailRow}>
                      <Calendar size={16} /> <span>{doctor.available_days?.join(', ') || 'Mon-Fri'}</span>
                    </div>
                    <div className={styles.detailRow}>
                      <Clock size={16} /> <span>{doctor.time_slots?.[0] || '10:00 AM'} - {doctor.time_slots?.[doctor.time_slots?.length - 1] || '05:00 PM'}</span>
                    </div>
                  </div>
                  
                  <Link href={`/appointments?doctor_id=${doctor._id}`} className={`btn btn-primary ${styles.bookBtn}`}>
                    Book Appointment
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
