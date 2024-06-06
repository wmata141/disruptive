import express from 'express';
import multer from 'multer';
import {
    getAllCategory,
    getCategoryById,
    postCategory,
    updateCategory,
    deleteCategory
} from '../controllers/categoryController.js';
// import authenticateToken from '../middlewares/authenticateToken.js';

const router = express.Router();

// Configure Multer to store uploaded files on the server's file system.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop()
        cb(null, `${Date.now()}.${ext}`)
    }
});

const upload = multer({ storage });

// Routes to obtain and modify category data
router.get('/', getAllCategory);
router.get('/:id', getCategoryById);
router.post('/', upload.single('file'), postCategory);
router.patch('/:id', upload.single('file'), updateCategory);
router.delete('/:id', deleteCategory);

export default router;