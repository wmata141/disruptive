import express from 'express';
import cors from "cors";

import welcomeRoutes from './route/welcomeRoutes.js';

const app = express();
app.use(cors());

// Configurar middlewares
app.use(express.json());

// Configurar rutas
app.use('/', welcomeRoutes);


export default app