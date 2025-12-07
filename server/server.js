import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Routes
import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(express.json());

// ⭐ MOST STABLE CORS FOR RENDER FREE TIER ⭐
app.use(
  cors({
    origin: [
      "https://amarsolutions.vercel.app",
      "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ⭐ Fix for Node 22 + Render preflight requests
app.options("*", cors());

/* =========================
   ROUTES
========================= */

app.get("/", (req, res) => {
  res.send("✅ AmarSolutions Backend Running on Render");
});

app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

/* =========================
   ERROR HANDLER
========================= */

app.use((err, req, res, next) => {
  console.error("🔥 INTERNAL ERROR:", err.message);
  res.status(500).json({ success: false, message: "Server Error" });
});

/* =========================
   DATABASE + SERVER
========================= */

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });
