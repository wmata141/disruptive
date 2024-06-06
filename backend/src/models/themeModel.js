import mongoose from 'mongoose';

const objetoSchema = new mongoose.Schema({
  _id: String,
  name: String
});

const themeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String},
  permission: { type: [objetoSchema] },
  createDate: { type: Date, default: Date.now }
});

const Theme = mongoose.model('Theme', themeSchema);

export default Theme;