import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";
import User from "../models/User.js";

async function run() {
  try {
    await connectDB();

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@prou.local";
    const ADMIN_PASS = process.env.ADMIN_PASS || "Admin@123";
    const ADMIN_NAME = process.env.ADMIN_NAME || "Administrator";


    const exists = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() });

    if (exists) {
      console.log(`Admin already exists with email: ${ADMIN_EMAIL}`);
      process.exit(0);
    }
    const admin = new User({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL.toLowerCase(),
      password: ADMIN_PASS,
      role: "admin",
    });

    await admin.save();

    console.log("Admin account created successfully!");
    console.log("------------------------------------");
    console.log(`Email:    ${ADMIN_EMAIL}`);
    console.log(`Password: ${ADMIN_PASS}`);
    console.log("Role:     admin");
    console.log("------------------------------------");
    console.log("You can now log in using these credentials.");
    process.exit(0);

  } catch (err) {
    console.error("Error creating admin:", err);
    process.exit(1);
  }
}

run();
