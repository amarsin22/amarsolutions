import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    whatsapp: String,
    service: String,
    message: String,
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
