import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema(
  {
    appointment_code: { type: String, required: true, unique: true },
    patient_name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    age: { type: Number },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    department_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    appointment_date: { type: Date, required: true },
    appointment_time: { type: String, required: true },
    appointment_type: { type: String, enum: ['Online', 'Offline'], default: 'Offline' },
    symptoms: { type: String },
    status: { 
      type: String, 
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], 
      default: 'Pending' 
    },
    admin_notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);
