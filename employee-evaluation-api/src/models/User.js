import { Schema, model } from 'mongoose';

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ['Admin', 'Manager', 'Employee'],
    default: 'Employee'
  }
}, {
  timestamps: true
});

export default model('Usuario', UsuarioSchema);