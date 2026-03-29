const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv")
const path = require("path");
const Admin = require("../models/adminmodel.js");


dotenv.config()

// // Path fix
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("Failed to connect DB:", err);
    process.exit(1);
  }
};

const seedAdmin = async () => {
  try {
    await connectDB()
    const existingAdmin = await Admin.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await Admin.create({
      username: "Milzo admin",
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });
    console.log("Admin created successfully");
    process.exit();

  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
