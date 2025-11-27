import Task from "../models/Task.js";
import Employee from "../models/Employee.js";

export const getDashboard = async (req, res) => {
  const totalEmployees = await Employee.countDocuments();
  const totalTasks = await Task.countDocuments();
  const completedTasks = await Task.countDocuments({ status: "done" });

  res.json({
    totalEmployees,
    totalTasks,
    completedTasks,
    completionRate: totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)
  });
};
