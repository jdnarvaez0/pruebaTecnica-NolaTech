import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/evaluaciones_360_db';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Conexión exitosa a MongoDB');
})
.catch((error) => {
  console.error('❌ Error al conectar a MongoDB:', error);
});

app.get('/', (req, res) => {
  res.json({
    message: 'API de Evaluaciones 360 está funcionando',
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'Conectada' : 'Desconectada'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

mongoose.connection.on('error', (err) => {
  console.error('Error de conexión de Mongoose:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Desconectado de MongoDB');
});

export default app;