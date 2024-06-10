import express from 'express';
import {
    getAllCategory,
    getCategoryById,
    postCategory,
    updateCategory,
    deleteCategory
} from '../controllers/categoryController.js';
// import authenticateToken from '../middlewares/authenticateToken.js';
import { uploadSingleMiddleware } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Routes to obtain and modify category data
router.get('/', getAllCategory);
router.get('/:id', getCategoryById);
router.post('/', uploadSingleMiddleware, postCategory);
router.patch('/:id', uploadSingleMiddleware, updateCategory);
router.delete('/:id', deleteCategory);

export default router;