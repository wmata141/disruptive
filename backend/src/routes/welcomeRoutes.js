import express from 'express';
import config from '../config.js';

const router = express.Router();
const port = config.PORT || 8000

// Welcome route
router.get("/", (req, res) => {
    try {
        res.status(200).json({ "Welcome to port:": port });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener el welcome' });
    }
})

export default router;
