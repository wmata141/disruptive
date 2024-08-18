import jwt from 'jsonwebtoken';
import config from '../config.js';
import User from '../models/userModel.js';

const authenticateToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const accessToken = authorizationHeader && authorizationHeader.split(' ')[1];
    
    if (!accessToken) {
      return res.status(401).json({ message: 'No access token provided' });
    }

    const decodedToken = jwt.verify(accessToken, config.SECRET_KEY);
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(401).json({ message: 'Invalid access token' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while authenticating the access token' });
  }
};

export default authenticateToken;
