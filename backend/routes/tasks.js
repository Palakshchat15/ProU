import express from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/taskController.js";
import { authenticate, authorizeRole } from "../middlewares/auth.js";

const router = express.Router();
router.get("/", authenticate, getTasks);
router.post("/", authenticate, authorizeRole("admin"), createTask);
router.put("/:id", authenticate, authorizeRole("admin"), updateTask);
router.delete("/:id", authenticate, authorizeRole("admin"), deleteTask);

export default router;
