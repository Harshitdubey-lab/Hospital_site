import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema(
  {
    title: { type: String },
    image: { type: String, required: true },
    category: { type: String },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  },
  { timestamps: true }
);

export default mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);
