import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  position: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Employee", employeeSchema);

