import mongoose, { Document, Schema } from "mongoose";

export interface IEmployee extends Document {
  name: string;
  email: string;
  mobile: number;
  designation: "HR" | "Manager" | "Sales";
  gender: "Male" | "Female";
  course: "MCA" | "BCA" | "BSC";
  image: string; // Path to the uploaded image
  userId: mongoose.Types.ObjectId; // Reference to the user who created the employee
  createdAt: string;
}

const employeeSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: Number, required: true },
    designation: {
      type: String,
      enum: ["HR", "Manager", "Sales"],
      required: true,
    },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    course: { type: String, enum: ["MCA", "BCA", "BSC"], required: true },
    image: { type: String, required: true }, // Store image path
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true }, // Reference to the user
  },
  { timestamps: true }
);

const Employee = mongoose.model<IEmployee>("Employee", employeeSchema);

export default Employee;
