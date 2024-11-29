import { Schema, model } from 'mongoose';

const FeedbackSchema = new Schema(
  {
    evaluation: {
      type: Schema.Types.ObjectId,
      ref: 'Evaluation',
      required: true,
      index: true, 
    },
    comments: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true, 
    },
    createdFor: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
      index: true, 
    },
    type: {
      type: String,
      enum: ['Peer', 'Supervisor', 'Subordinate', 'Self'], 
      required: true,
      default: 'Peer',
    },
  },
  {
    timestamps: true, 
  }
);

FeedbackSchema.index({ evaluation: 1, createdBy: 1 }); 
FeedbackSchema.index({ createdFor: 1, evaluation: 1 });
FeedbackSchema.index({ createdBy: 1, type: 1 }); 

FeedbackSchema.pre('save', function (next) {
  if (this.rating && (this.rating < 1 || this.rating > 5)) {
    return next(new Error('La calificación debe estar entre 1 y 5.'));
  }
  next();
});

export default model('Feedback', FeedbackSchema);
