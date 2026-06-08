'use client';
import { useState, useEffect } from 'react';
import styles from '../../admin.module.css';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/contact')
      .then(res => res.json())
      .then(data => {
        setMessages(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className={styles.loading}>Loading messages...</div>;

  return (
    <div className={styles.adminPage}>
      <div className={styles.pageHeader}>
        <h2>Contact Messages</h2>
      </div>

      <div className={styles.card}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Subject</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id}>
                  <td style={{ whiteSpace: 'nowrap' }}>{new Date(msg.createdAt).toLocaleDateString()}</td>
                  <td><strong>{msg.name}</strong></td>
                  <td>
                    {msg.email}<br/>
                    <small>{msg.phone}</small>
                  </td>
                  <td>{msg.subject}</td>
                  <td style={{ maxWidth: '300px', whiteSpace: 'normal', wordBreak: 'break-word' }}>{msg.message}</td>
                </tr>
              ))}
              {messages.length === 0 && (
                <tr><td colSpan="5" className={styles.empty}>No messages found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
