// authController.test.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const { register, login } = require('../controllers/authController.js');

jest.mock('../models/userModel');  // Simula el modelo User
jest.mock('bcrypt');  // Simula bcrypt
jest.mock('jsonwebtoken');  // Simula jwt

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};

describe('Auth Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        type: 'user',
      },
    };
    res = mockResponse();
  });

  describe('register', () => {
    it('should return 400 if email is invalid', async () => {
      req.body.email = 'invalid-email';
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email' });
    });

    it('should return 400 if user already exists with the same email', async () => {
      User.findOne.mockResolvedValueOnce(true); // Simula que se encuentra un usuario
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'A user with the same email already exists' });
    });

    it('should create a new user and return a token', async () => {
      User.findOne.mockResolvedValueOnce(null); // Simula que no hay usuario existente
      bcrypt.hash.mockResolvedValueOnce('hashedpassword'); // Simula el hashing
      User.prototype.save.mockResolvedValueOnce(); // Simula el guardado del usuario
      jwt.sign.mockReturnValue('generatedToken'); // Simula la generación del token

      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        user: expect.objectContaining({
          name: 'Test User',
          email: 'test@example.com',
          type: 'user',
        }),
        accessToken: 'generatedToken',
      }));
    });
  });

  describe('login', () => {
    it('should return 401 if email does not exist', async () => {
      User.findOne.mockResolvedValueOnce(null); // Simula que no se encuentra el usuario
      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'This email does not exist' });
    });

    it('should return 401 if password is invalid', async () => {
      User.findOne.mockResolvedValueOnce({ password: 'hashedpassword' }); // Simula un usuario encontrado
      bcrypt.compare.mockResolvedValueOnce(false); // Simula que la contraseña no coincide
      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });

    it('should login and return a token', async () => {
      User.findOne.mockResolvedValueOnce({ _id: 'userId', password: 'hashedpassword' });
      bcrypt.compare.mockResolvedValueOnce(true); // Simula que la contraseña es correcta
      jwt.sign.mockReturnValue('generatedToken'); // Simula la generación del token

      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        user: expect.objectContaining({
          _id: 'userId',
        }),
        accessToken: 'generatedToken',
      }));
    });
  });
});
