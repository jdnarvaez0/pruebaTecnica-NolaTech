import express from 'express';
import connectDB from './config/database';
require('dotenv').config();

const app = express();

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});