require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const eventoRoutes = require('./routes/eventoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json({ limit: '2kb' }));

// Conectar a la base de datos
connectDB();

// Rutas base
app.use('/api/eventos', eventoRoutes);

// Manejo de errores básicos para rutas inexistentes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Arrancar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
