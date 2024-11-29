import { Schema, model } from 'mongoose';

const evaluationSchema = new Schema({
  period: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^[0-9]{4}-Q[1-4]$/.test(v),
      message: props => `${props.value} no es un período válido. Usa el formato YYYY-QX.`
    }
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    required: true,
    default: 'pending'
  },
  type: { type: String, required: true },
  scores: {
    type: Map,
    of: Number
  }
}, {
  timestamps: true
});

// Índices
evaluationSchema.index({ period: 1 });
evaluationSchema.index({ status: 1 });
evaluationSchema.index({ period: 1, status: 1 }); // Índice compuesto

// Campo virtual
evaluationSchema.virtual('isComplete').get(function () {
  return this.status === 'completed';
});

export default model('Evaluation', evaluationSchema);
