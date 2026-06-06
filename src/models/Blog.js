import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String },
    image: { type: String },
    content: { type: String, required: true },
    author: { type: String },
    status: { type: String, enum: ['Published', 'Draft'], default: 'Draft' },
    published_at: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
