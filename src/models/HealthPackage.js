import mongoose from 'mongoose';

const HealthPackageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    included_tests: [{ type: String }],
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  },
  { timestamps: true }
);

export default mongoose.models.HealthPackage || mongoose.model('HealthPackage', HealthPackageSchema);
