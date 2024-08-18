import jwt from 'jsonwebtoken';
import config from '../config.js';
import User from '../models/userModel.js';

const authenticateToken = async (req, res, next) => {
  try {
    // Extract the Authorization header from the HTTP request.
    const authorizationHeader = req.headers.authorization;
    // Gets the access token from the header, assuming it is in the form "Bearer <token>".
    const accessToken = authorizationHeader && authorizationHeader.split(' ')[1];

    // If an access token is not provided, it responds with a 401 (Unauthorized) status.
    if (!accessToken) {
      return res.status(401).json({ message: 'No access token provided' });
    }

    // Verifies the access token against the configured secret key.
    const decodedToken = jwt.verify(accessToken, config.SECRET_KEY);
    // Look up the user in the database using the ID extracted from the decoded token.
    const user = await User.findById(decodedToken.userId);
    // If the user is not found, it responds with a status of 401 (Invalid Token).
    if (!user) {
      return res.status(401).json({ message: 'Invalid access token' });
    }

    // If the user exists, it assigns it to the request object so that it is available in the next middleware.
    req.user = user;
    // Calls the next middleware in the chain.
    next();
  } catch (error) {
    // If an error occurs during user verification or search, it captures the error and prints it to the console.
    console.error(error);
    // Responds with a 500 (Internal Server Error) status and an error message.
    res.status(500).json({ message: 'An error occurred while authenticating the access token' });
  }
};

export default authenticateToken;
