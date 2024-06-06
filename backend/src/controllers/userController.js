import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

export const getAllUser = async (req, res) => {
  try {
    // Get all users from the database
    const users = await User.find();

    // Send a response to the client
    res.status(200).json(users);
  } catch (error) {    
    res.status(500).json({ message: 'An error occurred while obtaining users' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Search a user by id in the database
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send a response to the client
    res.status(200).json(user);
  } catch (error) {    
    res.status(500).json({ message: 'An error occurred while obtaining the user' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, type } = req.body;

    // Search a user by id in the database
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user data
    if (name) user.name = name;
    if (email) user.email = email;
    if (type) user.type = type;
    if (password) user.password = await bcrypt.hash(password, 10);
    await user.save();

    // Send a response to the client
    res.status(200).json(user);
  } catch (error) {    
    res.status(500).json({ message: 'An error occurred while updating the user' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Search for a user by their ID in the database
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete user from database
    await user.deleteOne();

    // Send a response to the client
    res.status(200).json(user);
  } catch (error) {    
    res.status(500).json({ message: 'An error occurred while deleting the user' });
  }
};
