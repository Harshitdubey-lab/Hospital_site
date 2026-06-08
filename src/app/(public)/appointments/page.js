'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Calendar, User, Phone, Mail, FileText, CheckCircle } from 'lucide-react';
import styles from './page.module.css';

function AppointmentsContent() {
  const searchParams = useSearchParams();
  const preSelectedDoctorId = searchParams.get('doctor_id');

  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [appointmentCode, setAppointmentCode] = useState('');

  const [formData, setFormData] = useState({
    patient_name: '',
    phone: '',
    email: '',
    age: '',
    gender: 'Other',
    department_id: '',
    doctor_id: preSelectedDoctorId || '',
    appointment_date: '',
    appointment_time: '10:00 AM',
    appointment_type: 'Offline',
    symptoms: ''
  });

  useEffect(() => {
    // Fetch departments and doctors
    Promise.all([
      fetch('/api/departments').then(res => res.json()),
      fetch('/api/doctors').then(res => res.json())
    ]).then(([depts, docs]) => {
      setDepartments(Array.isArray(depts) ? depts : []);
      setDoctors(Array.isArray(docs) ? docs : []);
      
      if (preSelectedDoctorId && Array.isArray(docs)) {
        const doc = docs.find(d => d._id === preSelectedDoctorId);
        if (doc) {
          setFormData(prev => ({ ...prev, department_id: doc.department_id._id || doc.department_id }));
          setFilteredDoctors([doc]);
        }
      } else {
        setFilteredDoctors(docs);
      }
    });
  }, [preSelectedDoctorId]);

  const handleDeptChange = (e) => {
    const deptId = e.target.value;
    setFormData({ ...formData, department_id: deptId, doctor_id: '' });
    if (deptId) {
      setFilteredDoctors(doctors.filter(d => 
        (d.department_id._id || d.department_id) === deptId
      ));
    } else {
      setFilteredDoctors(doctors);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setAppointmentCode(data.appointment_code);
      } else {
        alert(data.error || 'Something went wrong');
      }
    } catch (error) {
      alert('Failed to book appointment');
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successCard}>
          <CheckCircle size={64} className={styles.successIcon} />
          <h2>Appointment Request Sent!</h2>
          <p>Your appointment has been successfully requested.</p>
          <div className={styles.appointmentCodeBox}>
            <span>Appointment ID:</span>
            <strong>{appointmentCode}</strong>
          </div>
          <p className={styles.successNote}>Please save this ID for future reference. Our staff will contact you shortly to confirm.</p>
          <button className="btn btn-primary" onClick={() => window.location.href = '/'}>
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.appointmentPage}>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1>Book an Appointment</h1>
          <p>Fill out the form below to schedule your visit</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.bookingForm}>
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}><User size={20} /> Patient Details</h3>
              <div className={styles.grid2}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input type="text" name="patient_name" required className="form-input" value={formData.patient_name} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input type="tel" name="phone" required className="form-input" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input type="email" name="email" className="form-input" value={formData.email} onChange={handleChange} />
                </div>
                <div className={styles.grid2}>
                  <div className="form-group">
                    <label className="form-label">Age</label>
                    <input type="number" name="age" className="form-input" value={formData.age} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Gender</label>
                    <select name="gender" className="form-input" value={formData.gender} onChange={handleChange}>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}><Calendar size={20} /> Appointment Details</h3>
              <div className={styles.grid2}>
                <div className="form-group">
                  <label className="form-label">Department *</label>
                  <select name="department_id" required className="form-input" value={formData.department_id} onChange={handleDeptChange}>
                    <option value="">Select Department</option>
                    {departments.map(d => (
                      <option key={d._id} value={d._id}>{d.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Doctor *</label>
                  <select name="doctor_id" required className="form-input" value={formData.doctor_id} onChange={handleChange}>
                    <option value="">Select Doctor</option>
                    {filteredDoctors.map(d => (
                      <option key={d._id} value={d._id}>{d.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Date *</label>
                  <input type="date" name="appointment_date" required className="form-input" value={formData.appointment_date} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Time *</label>
                  <select name="appointment_time" required className="form-input" value={formData.appointment_time} onChange={handleChange}>
                    {['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Consultation Type</label>
                  <select name="appointment_type" className="form-input" value={formData.appointment_type} onChange={handleChange}>
                    <option value="Offline">In-Person (Offline)</option>
                    <option value="Online">Video Consultation (Online)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}><FileText size={20} /> Additional Information</h3>
              <div className="form-group">
                <label className="form-label">Symptoms / Message</label>
                <textarea 
                  name="symptoms" 
                  rows="4" 
                  className="form-input" 
                  placeholder="Briefly describe your symptoms or reason for visit..."
                  value={formData.symptoms} 
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <div className={styles.submitSection}>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Submitting...' : 'Confirm Appointment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AppointmentsPage() {
  return (
    <Suspense fallback={<div className="container" style={{padding: '100px 0', textAlign: 'center'}}>Loading booking form...</div>}>
      <AppointmentsContent />
    </Suspense>
  );
}
