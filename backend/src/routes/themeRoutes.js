import express from 'express';
import {
    getAllTheme,
    getThemeById,
    postTheme,
    updateTheme,
    deleteTheme
} from '../controllers/themeController.js';
// import authenticateToken from '../middlewares/authenticateToken.js';

const router = express.Router();

// Routes to obtain and modify theme data
router.get('/', getAllTheme);
router.get('/:id', getThemeById);
router.post('/', postTheme);
router.patch('/:id', updateTheme);
router.delete('/:id', deleteTheme);

export default router;