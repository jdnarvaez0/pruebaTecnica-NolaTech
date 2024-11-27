import { connect } from 'mongoose';
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error de conexión a MongoDB: ${error.message}`);
    // Salir del proceso en caso de error de conexión
    process.exit(1);
  }
};

export default connectDB;