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

// ✅ Safe CORS (works for dev + production)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://amarsolutions.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

/* =========================
   ROUTES
   ========================= */

app.get("/", (req, res) => {
  res.send("✅ AmarSolutions Backend Running");
});

app.use("/api/contact", contactRoutes);   // Contact + Email + MongoDB
app.use("/api/admin", adminRoutes);       // Admin Dashboard APIs

/* =========================
   DATABASE + SERVER
   ========================= */

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });
