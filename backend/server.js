import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import  connectDB  from "./config/db.js";
import employeeRoutes from "./routes/employees.js";
import taskRoutes from "./routes/tasks.js";
import dashboardRoutes from "./routes/dashboard.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
connectDB();


app.use("/employees", employeeRoutes);
app.use("/tasks", taskRoutes);
app.use("/dashboard", dashboardRoutes);


app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
