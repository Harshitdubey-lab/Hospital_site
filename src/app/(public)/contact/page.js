'use client';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import styles from './page.module.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }
    } catch (err) {
      alert('Failed to send message');
    }
    setLoading(false);
  };

  return (
    <div className={styles.contactPage}>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1>Contact Us</h1>
          <p>We are here to help and answer any questions you might have.</p>
        </div>
      </div>

      <div className={`container ${styles.mainContent}`}>
        <div className={styles.contactGrid}>
          {/* Contact Info */}
          <div className={styles.infoSection}>
            <h2>Get In Touch</h2>
            <p className={styles.infoDesc}>Feel free to reach out to us for any medical queries or appointment details.</p>
            
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <div className={styles.iconBox}><MapPin size={24} /></div>
                <div>
                  <h4>Our Location</h4>
                  <p>123 Health Avenue, Medical District, NY 10001</p>
                </div>
              </div>
              
              <div className={styles.infoItem}>
                <div className={styles.iconBox}><Phone size={24} /></div>
                <div>
                  <h4>Phone Numbers</h4>
                  <p>Main: +1 (555) 123-4567<br/>Emergency: +1 (555) 911-0000</p>
                </div>
              </div>
              
              <div className={styles.infoItem}>
                <div className={styles.iconBox}><Mail size={24} /></div>
                <div>
                  <h4>Email Address</h4>
                  <p>info@citycare.com<br/>support@citycare.com</p>
                </div>
              </div>
              
              <div className={styles.infoItem}>
                <div className={styles.iconBox}><Clock size={24} /></div>
                <div>
                  <h4>Working Hours</h4>
                  <p>24/7 Emergency Services<br/>OPD: Mon-Sat, 9am - 8pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={styles.formSection}>
            <div className={styles.formCard}>
              <h2>Send a Message</h2>
              {success && (
                <div className={styles.successMessage}>
                  Your message has been sent successfully. We will contact you soon.
                </div>
              )}
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-input" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className={styles.grid2}>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-input" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input type="tel" className="form-input" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input type="text" className="form-input" required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-input" rows="5" required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
