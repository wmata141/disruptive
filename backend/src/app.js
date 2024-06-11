import express from 'express';
import cors from "cors";

import welcomeRoutes from './routes/welcomeRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import themeRoutes from './routes/themeRoutes.js';
import contentRoutes from './routes/contentRoutes.js';

const app = express();

const corsOptions = {
    origin: "http://localhost:3000" // frontend URI (ReactJS)
}

app.use(cors(corsOptions));

// Enable uploads folder to show on endpoints
app.use('/uploads', express.static('uploads'));

// Configure middlewares
app.use(express.json());

// Configure routes
app.use('/', welcomeRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/category', categoryRoutes);
app.use('/theme', themeRoutes);
app.use('/content', contentRoutes);

export default app