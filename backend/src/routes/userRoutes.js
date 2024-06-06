import express from 'express';
import authenticateToken from '../middlewares/authenticateToken.js';
import { getAllUser, getUserById, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// Routes to obtain and modify user data
router.get('/', getAllUser);
router.get('/:id', getUserById);
router.patch('/:id', updateUser);
router.delete('/:id', authenticateToken, deleteUser);

export default router;
