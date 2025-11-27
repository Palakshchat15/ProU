import Employee from "../models/Employee.js";
import Task from "../models/Task.js";

export const getEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};

export const createEmployee = async (req, res) => {
  const emp = await Employee.create(req.body);
  res.status(201).json(emp);
};

export const updateEmployee = async (req, res) => {
  const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteEmployee = async (req, res) => {
  await Task.updateMany({ employee: req.params.id }, { $unset: { employee: "" } });
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Employee deleted" });
};
