import mongoose from 'mongoose';

const DepartmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    short_description: { type: String },
    full_description: { type: String },
    image: { type: String }, // URL or path
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  },
  { timestamps: true }
);

export default mongoose.models.Department || mongoose.model('Department', DepartmentSchema);
