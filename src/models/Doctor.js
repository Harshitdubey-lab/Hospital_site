import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    photo: { type: String },
    specialization: { type: String, required: true },
    department_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    qualification: { type: String },
    experience: { type: String }, // e.g., "10 years"
    bio: { type: String },
    phone: { type: String },
    email: { type: String },
    consultation_fee: { type: Number },
    available_days: [{ type: String }], // e.g., ['Monday', 'Wednesday']
    time_slots: [{ type: String }], // e.g., ['10:00 AM', '11:00 AM']
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  },
  { timestamps: true }
);

export default mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);
