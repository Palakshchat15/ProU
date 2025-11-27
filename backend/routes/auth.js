import express from "express";
import { register, login } from "../controllers/authController.js";
import { authenticate, authorizeRole } from "../middlewares/auth.js";

const router = express.Router();
router.post("/login", login);
router.post("/register", authenticate, authorizeRole("admin"), register);

export default router;
