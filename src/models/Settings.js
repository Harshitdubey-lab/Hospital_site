import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema(
  {
    hospital_name: { type: String, default: 'Hospital Management' },
    logo: { type: String },
    address: { type: String },
    phone: { type: String },
    emergency_phone: { type: String },
    email: { type: String },
    opening_hours: { type: String },
    map_link: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    twitter: { type: String },
    linkedin: { type: String },
    footer_text: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
