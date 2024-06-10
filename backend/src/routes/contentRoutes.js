import express from 'express';
import {
    getAllContent,
    getContentById,
    postContent,
    updateContent,
    deleteContent
} from '../controllers/contentController.js';
// import authenticateToken from '../middlewares/authenticateToken.js';
import { uploadArrayMiddleware } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Routes to obtain and modify content data
router.get('/', getAllContent);
router.get('/:id', getContentById);
router.post('/', uploadArrayMiddleware, postContent);
router.patch('/:id', uploadArrayMiddleware, updateContent);
router.delete('/:id', deleteContent);

export default router;