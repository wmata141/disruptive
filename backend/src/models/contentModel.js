import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  theme: { type: mongoose.Schema.Types.ObjectId, ref: 'Theme', required: true },
  filenames: [{ type: String }],
  video: { type: String },
  createDate: { type: Date, default: Date.now }
});

const Content = mongoose.model('Content', contentSchema);

export default Content;