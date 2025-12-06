import express from "express";
import Lead from "../models/Lead.js";
import { sendEmail } from "../utils/sendEmail.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, whatsapp, service, message } = req.body;

    if (!name || !email || !service) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    // ✅ 1. Save to MongoDB FIRST (FAST)
    const newLead = await Lead.create({
      name,
      email,
      whatsapp,
      service,
      message,
    });

    // ✅ 2. SEND RESPONSE IMMEDIATELY (NO DELAY)
    res.status(201).json({
      success: true,
      message: "Lead saved successfully",
      leadId: newLead._id,
    });

    // ✅ 3. SEND EMAILS IN BACKGROUND (NON-BLOCKING)

    // Admin email
    sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: "🚀 New Contact Form Lead",
      html: `
        <h3>New Lead Received</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>WhatsApp:</b> ${whatsapp || "N/A"}</p>
        <p><b>Service:</b> ${service}</p>
        <p><b>Message:</b> ${message || "N/A"}</p>
      `,
    }).catch((err) =>
      console.log("Admin Email Failed:", err.message)
    );

    // User auto-reply
    sendEmail({
      to: email,
      subject: "✅ We received your request – AmarSolutions",
      html: `
        <h3>Hello ${name},</h3>
        <p>Thank you for contacting <b>AmarSolutions</b>.</p>
        <p>We received your request for <b>${service}</b>.</p>
        <p>We will contact you shortly.</p>
        <br/>
        <p>Regards,<br/><b>Amar Singh</b></p>
      `,
    }).catch((err) =>
      console.log("User Email Failed:", err.message)
    );

  } catch (error) {
    console.error("Contact API Crash:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default router;
