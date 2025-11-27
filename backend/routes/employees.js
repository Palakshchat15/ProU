import express from "express";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from "../controllers/employeeController.js";
import { authenticate, authorizeRole } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", authenticate, authorizeRole("admin"), getEmployees);
router.post("/", authenticate, authorizeRole("admin"), createEmployee);
router.put("/:id", authenticate, authorizeRole("admin"), updateEmployee);
router.delete("/:id", authenticate, authorizeRole("admin"), deleteEmployee);

export default router;
