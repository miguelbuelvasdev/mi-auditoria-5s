

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';
import auditsRouter from './routes/audits.js';

// Variables de entorno
dotenv.config();

// Levantamos la app de Express
const app = express();
const PORT = process.env.PORT || 5000;

// Conectamos a MongoDB
connectDB();

// Middlewares esenciales
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Endpoint básico para chequear que el server está corriendo
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API del backend funcionando correctamente',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Las rutas de auditorías van por aquí
app.use('/api/audits', auditsRouter);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
  });
});

// Arrancamos el servidor
app.listen(PORT, () => {
  console.log(`🚀 Backend API corriendo en http://localhost:${PORT}`);
  console.log(`📍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});
