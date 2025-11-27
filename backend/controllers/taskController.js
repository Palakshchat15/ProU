import Task from "../models/Task.js";
import Employee from "../models/Employee.js";

export async function getTasks(req, res, next) {
  try {
    const { status, employee } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (employee) filter.employee = employee;
    if (req.user?.role !== "admin") {
      if (!req.user?.employee) return res.json([]);
      filter.employee = req.user.employee;
    }

    const tasks = await Task.find(filter).populate("employee").lean();
    res.json(tasks);
  } catch (err) { next(err); }
}


export const createTask = async (req, res) => {
  if (req.body.employee) {
    const emp = await Employee.findById(req.body.employee);
    if (!emp) return res.status(400).json({ message: "Invalid employee ID" });
  }

  const task = await Task.create(req.body);
  const populated = await task.populate("employee");
  res.status(201).json(populated);
};

export const updateTask = async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("employee");
  res.json(updated);
};

export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};
