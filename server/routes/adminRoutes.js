import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Lead from "../models/Lead.js";

const router = express.Router();

/* =========================
   ADMIN LOGIN
   ========================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET || "SECRET123",
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token,
      admin: { id: admin._id, email: admin.email },
    });
  } catch (error) {
    console.error("Admin Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   GET ALL LEADS
   ========================= */
router.get("/leads", async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    console.error("Fetch Leads Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   DELETE LEAD
   ========================= */
router.delete("/leads/:id", async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Lead deleted successfully" });
  } catch (error) {
    console.error("Delete Lead Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
