import mongoose, { Document, Schema } from "mongoose";

export interface IEmployee extends Document {
  name: string;
  email: string;
  mobile: number;
  designation: "HR" | "Manager" | "Sales";
  gender: "Male" | "Female";
  course: string[];
  // image: string;
  userId: mongoose.Types.ObjectId;
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
    courses: { type: [String], required: true },
    // image: { type: String, required: false },
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);


const Employee = mongoose.model<IEmployee>("Employee", employeeSchema);

export default Employee;
