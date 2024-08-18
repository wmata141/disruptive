import mongoose from 'mongoose';

// We define a schema for an "object" that will be used within the main schema "themeSchema"
const objetoSchema = new mongoose.Schema({
  _id: String,
  name: String
});

// Defining the schema for the "themeSchema" collection
const themeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String},
  permission: { type: [objetoSchema] },
  createDate: { type: Date, default: Date.now }
});

// Creating the "themeSchema" model based on the defined schema
const Theme = mongoose.model('Theme', themeSchema);

// Exporting the model for use in other parts of the application
export default Theme;