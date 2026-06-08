'use client';
import { useState, useEffect } from 'react';
import styles from '../../admin.module.css';

export default function AdminDepartments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '', slug: '', short_description: ''
  });

  useEffect(() => {
    fetch('/api/departments')
      .then(res => res.json())
      .then(data => {
        setDepartments(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/departments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const newDept = await res.json();
        setDepartments([newDept, ...departments]);
        setShowForm(false);
        setFormData({name: '', slug: '', short_description: ''});
      }
    } catch (err) {
      alert('Failed to add department');
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.adminPage}>
      <div className={styles.pageHeader}>
        <h2>Manage Departments</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add New Department'}
        </button>
      </div>

      {showForm && (
        <div className={styles.card} style={{ padding: '24px', marginBottom: '24px' }}>
          <h3>Add New Department</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px', marginTop: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <input type="text" placeholder="Department Name" required className="form-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <input type="text" placeholder="Slug (e.g. general-medicine)" required className="form-input" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
              <input type="text" placeholder="Short Description" className="form-input" style={{ gridColumn: 'span 2' }} value={formData.short_description} onChange={e => setFormData({...formData, short_description: e.target.value})} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ justifySelf: 'start' }}>Save Department</button>
          </form>
        </div>
      )}

      <div className={styles.card}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Department Name</th>
                <th>Slug</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => (
                <tr key={dept._id}>
                  <td><strong>{dept.name}</strong></td>
                  <td>{dept.slug}</td>
                  <td>{dept.short_description}</td>
                  <td><span className={`${styles.badge} ${styles.badgeCompleted}`}>{dept.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
