import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import User from '../models/userModel.js';

// Validate whether an email address format is correct.
const verifyEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

export const register = async (req, res) => {
  try {
    const { name, email, password, type } = req.body;

    // Check if the email is valid
    if (!verifyEmail(email)) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    // Check if a user with the same email already exists
    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      return res.status(400).json({ message: 'A user with the same email already exists' });
    }

    // Check if a user with the same name already exists
    const existingUserName = await User.findOne({ name });
    if (existingUserName) {
      return res.status(400).json({ message: 'A user with the same name already exists' });
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, type });
    await user.save();

    // Generate an access token
    const accessToken = jwt.sign({ userId: user._id }, config.SECRET_KEY);

    // Send a response to the client
    res.status(201).json({ user, accessToken });
  } catch (error) {    
    res.status(500).json({ message: 'An error occurred while registering the user' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email are correct
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'This email does not exist' });
    }

    // Check if password are correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate an access token
    const accessToken = jwt.sign({ userId: user._id }, config.SECRET_KEY);

    // Send a response to the client
    res.status(200).json({ user, accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while logging in' });
  }
};
