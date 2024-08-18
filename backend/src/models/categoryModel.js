import mongoose from 'mongoose';

// Defining the schema for the "Category" collection
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String},
  filename: { type: String},
  createDate: { type: Date, default: Date.now }
});

// Creating the "Category" model based on the defined schema
const Category = mongoose.model('Category', categorySchema);

// Exporting the model for use elsewhere in the application
export default Category;