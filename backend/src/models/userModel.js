import mongoose from 'mongoose';

// Defining the schema for the "User" collection
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, enum: ['admin', 'reader', 'creator']}
});

// Creating the "User" model based on the defined schema
const User = mongoose.model('User', userSchema);

// Exporting the model for use in other parts of the application
export default User;
