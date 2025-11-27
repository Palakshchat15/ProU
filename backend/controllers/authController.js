import User from "../models/User.js";
import Employee from "../models/Employee.js";
import jwt from "jsonwebtoken";

const signToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, employee: user.employee || null, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role = "user", employee } = req.body;
    if (employee) {
      const emp = await Employee.findById(employee);
      if (!emp) return res.status(400).json({ message: "Invalid employee id" });
    }
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "User exists" });

    const user = await User.create({ name, email, password, role, employee });
    const token = signToken(user);
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, employee: user.employee }});
  } catch (err) { next(err); }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, employee: user.employee }});
  } catch (err) { next(err); }
};
