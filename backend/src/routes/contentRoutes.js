import express from 'express';
import multer from 'multer';
import {
    getAllContent,
    getContentById,
    postContent,
    updateContent,
    deleteContent
} from '../controllers/contentController.js';
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

const upload = multer({ storage: storage });

// Routes to obtain and modify content data
router.get('/', getAllContent);
router.get('/:id', getContentById);
router.post('/', upload.array('files', 3), postContent);
router.patch('/:id', upload.array('files', 3), updateContent);
router.delete('/:id', deleteContent);

export default router;