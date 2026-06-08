'use client';
import { useState, useEffect } from 'react';
import styles from '../../admin.module.css';

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/appointments')
      .then(res => res.json())
      .then(data => {
        setAppointments(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch('/api/appointments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      if (res.ok) {
        const updated = appointments.map(a => a._id === id ? { ...a, status } : a);
        setAppointments(updated);
        alert('Status updated successfully');
      } else {
        alert('Failed to update status');
      }
    } catch (err) {
      alert('Error updating status');
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.adminPage}>
      <div className={styles.pageHeader}>
        <h2>Manage Appointments</h2>
      </div>

      <div className={styles.card}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient Name</th>
                <th>Doctor</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((apt) => (
                <tr key={apt._id}>
                  <td>{apt.appointment_code}</td>
                  <td>
                    <strong>{apt.patient_name}</strong>
                    <br/><small>{apt.phone}</small>
                  </td>
                  <td>{apt.doctor_id?.name}</td>
                  <td>
                    {new Date(apt.appointment_date).toLocaleDateString()}
                    <br/><small>{apt.appointment_time}</small>
                  </td>
                  <td>
                    <span className={`${styles.badge} ${styles['badge' + apt.status]}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td>
                    <select 
                      className="form-input" 
                      value={apt.status} 
                      onChange={(e) => updateStatus(apt._id, e.target.value)}
                      style={{ padding: '4px', fontSize: '12px' }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
              {appointments.length === 0 && (
                <tr>
                  <td colSpan="6" className={styles.empty}>No appointments found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
