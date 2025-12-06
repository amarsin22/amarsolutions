import express from "express";
import Lead from "../models/Lead.js";
import { sendEmail } from "../utils/sendEmail.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, whatsapp, service, message } = req.body;

    if (!name || !email || !service) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // ✅ 1. Save to MongoDB
    const newLead = await Lead.create({
      name,
      email,
      whatsapp,
      service,
      message,
    });

    // ✅ 2. Send Email to Admin (SAFE)
    try {
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: "🚀 New Contact Form Lead",
        html: `
          <h3>New Lead Received</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>WhatsApp:</b> ${whatsapp || "N/A"}</p>
          <p><b>Service:</b> ${service}</p>
          <p><b>Message:</b> ${message || "N/A"}</p>
          <p><b>Date:</b> ${new Date().toLocaleString()}</p>
        `,
      });
    } catch (mailError) {
      console.error("Admin Email Failed:", mailError.message);
    }

    // ✅ 3. Auto-reply to User (SAFE)
    try {
      await sendEmail({
        to: email,
        subject: "✅ We received your request – AmarSolutions",
        html: `
          <h3>Hello ${name},</h3>
          <p>Thank you for contacting <b>AmarSolutions</b>.</p>
          <p>We have received your request for <b>${service}</b>.</p>
          <p>I will contact you shortly.</p>
          <br/>
          <p>Regards,<br/><b>Amar Singh</b></p>
        `,
      });
    } catch (userMailError) {
      console.error("User Email Failed:", userMailError.message);
    }

    // ✅ Always return success if DB save worked
    res.status(201).json({
      success: true,
      message: "Lead saved successfully",
      lead: newLead,
    });
  } catch (error) {
    console.error("Contact API Crash:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
