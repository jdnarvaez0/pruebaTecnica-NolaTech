import { Schema, model } from 'mongoose';

const employeeSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);

employeeSchema.index({ firstName: 1 }); 
employeeSchema.index({ lastName: 1 }); 
employeeSchema.index({ department: 1 }); 
employeeSchema.index({ position: 1, department: 1 }); 
employeeSchema.index({ firstName: 'text', lastName: 'text', position: 'text' }); 

const Employee = model('Employee', employeeSchema);

export default Employee;
