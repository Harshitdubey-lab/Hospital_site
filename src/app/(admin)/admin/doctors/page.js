'use client';
import { useState, useEffect } from 'react';
import styles from '../../admin.module.css';

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '', specialization: '', department_id: '',
    qualification: '', experience: '', consultation_fee: ''
  });

  useEffect(() => {
    Promise.all([
      fetch('/api/doctors').then(res => res.json()),
      fetch('/api/departments').then(res => res.json())
    ]).then(([docs, depts]) => {
      setDoctors(Array.isArray(docs) ? docs : []);
      setDepartments(Array.isArray(depts) ? depts : []);
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...formData,
        consultation_fee: parseFloat(formData.consultation_fee) || 0
      };
      const res = await fetch('/api/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit)
      });
      if (res.ok) {
        const newDoc = await res.json();
        const deptName = departments.find(d => d._id === newDoc.department_id)?.name;
        setDoctors([{...newDoc, department_id: {name: deptName}}, ...doctors]);
        setShowForm(false);
        setFormData({name: '', specialization: '', department_id: '', qualification: '', experience: '', consultation_fee: ''});
      }
    } catch (err) {
      alert('Failed to add doctor');
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.adminPage}>
      <div className={styles.pageHeader}>
        <h2>Manage Doctors</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add New Doctor'}
        </button>
      </div>

      {showForm && (
        <div className={styles.card} style={{ padding: '24px', marginBottom: '24px' }}>
          <h3>Add New Doctor</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px', marginTop: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <input type="text" placeholder="Doctor Name" required className="form-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <input type="text" placeholder="Specialization" required className="form-input" value={formData.specialization} onChange={e => setFormData({...formData, specialization: e.target.value})} />
              <select required className="form-input" value={formData.department_id} onChange={e => setFormData({...formData, department_id: e.target.value})}>
                <option value="">Select Department</option>
                {departments.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
              </select>
              <input type="text" placeholder="Qualification" className="form-input" value={formData.qualification} onChange={e => setFormData({...formData, qualification: e.target.value})} />
              <input type="text" placeholder="Experience (e.g. 10 Years)" className="form-input" value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} />
              <input type="number" placeholder="Consultation Fee" className="form-input" value={formData.consultation_fee} onChange={e => setFormData({...formData, consultation_fee: e.target.value})} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ justifySelf: 'start' }}>Save Doctor</button>
          </form>
        </div>
      )}

      <div className={styles.card}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Doctor Name</th>
                <th>Specialization</th>
                <th>Department</th>
                <th>Experience</th>
                <th>Fee</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doc) => (
                <tr key={doc._id}>
                  <td><strong>{doc.name}</strong><br/><small>{doc.qualification}</small></td>
                  <td>{doc.specialization}</td>
                  <td>{doc.department_id?.name}</td>
                  <td>{doc.experience}</td>
                  <td>${doc.consultation_fee}</td>
                  <td><span className={`${styles.badge} ${styles.badgeCompleted}`}>{doc.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
