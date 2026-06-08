'use client';
import { useState, useEffect } from 'react';
import styles from '../../admin.module.css';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '', slug: '', short_description: ''
  });

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        setServices(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const newService = await res.json();
        setServices([newService, ...services]);
        setShowForm(false);
        setFormData({title: '', slug: '', short_description: ''});
      }
    } catch (err) {
      alert('Failed to add service');
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.adminPage}>
      <div className={styles.pageHeader}>
        <h2>Manage Services</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add New Service'}
        </button>
      </div>

      {showForm && (
        <div className={styles.card} style={{ padding: '24px', marginBottom: '24px' }}>
          <h3>Add New Service</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px', marginTop: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <input type="text" placeholder="Service Title" required className="form-input" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              <input type="text" placeholder="Slug (e.g. 24-7-ambulance)" required className="form-input" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
              <input type="text" placeholder="Short Description" className="form-input" style={{ gridColumn: 'span 2' }} value={formData.short_description} onChange={e => setFormData({...formData, short_description: e.target.value})} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ justifySelf: 'start' }}>Save Service</button>
          </form>
        </div>
      )}

      <div className={styles.card}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Service Title</th>
                <th>Slug</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {services.map((srv) => (
                <tr key={srv.id}>
                  <td><strong>{srv.title}</strong></td>
                  <td>{srv.slug}</td>
                  <td>{srv.short_description}</td>
                  <td><span className={`${styles.badge} ${styles.badgeCompleted}`}>{srv.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
