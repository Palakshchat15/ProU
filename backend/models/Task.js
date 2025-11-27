import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ["pending", "in-progress", "done"],
    default: "pending"
  },
  dueDate: Date,
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Task", taskSchema);
