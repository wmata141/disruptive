import mongoose from 'mongoose';

// Defining the schema for the "Content" collection
const contentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  theme: { type: mongoose.Schema.Types.ObjectId, ref: 'Theme', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  filenames: [{ type: String }],
  video: { type: String },
  createDate: { type: Date, default: Date.now }
});

// Creating the "Content" model based on the defined schema
const Content = mongoose.model('Content', contentSchema);

// Exporting the model for use in other parts of the application
export default Content;
