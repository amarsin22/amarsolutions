import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  // Secure access key from Vercel environment variable
  const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const formData = new FormData(e.target);
    formData.append("access_key", ACCESS_KEY);

    // Email subject + service type
    formData.append("subject", "New Contact Form Message");
    formData.append("service", "Contact Form Submission");

    // Required by Web3Forms anti-bot system
    formData.append("botcheck", "");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json().catch(() => ({ success: false }));

      if (data.success) {
        alert("✅ Message sent successfully!");
        e.target.reset();
      } else {
        alert("❌ Failed to send message. Please try again.");
        console.error("Web3Forms error:", data);
      }
    } catch (err) {
      alert("❌ Network issue. Try again later.");
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-slate-50 text-slate-900 rounded-2xl p-7 shadow-soft space-y-4 max-w-md mx-auto"
      >
        <h2 className="text-xl font-bold text-center mb-2">Contact Me</h2>

        {/* Name */}
        <input
          name="name"
          placeholder="Name"
          className="w-full p-2 border rounded-md text-sm"
          required
        />

        {/* Email */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded-md text-sm"
          required
        />

        {/* WhatsApp */}
        <input
          name="whatsapp"
          placeholder="WhatsApp Number (Optional)"
          className="w-full p-2 border rounded-md text-sm"
        />

        {/* Message */}
        <textarea
          name="message"
          placeholder="Tell me briefly what you need help with..."
          className="w-full p-2 border rounded-md text-sm"
          rows={4}
          required
        ></textarea>

        {/* Hidden necessary fields */}
        <input type="hidden" name="botcheck" value="" />
        <input type="hidden" name="service" value="Contact Form Submission" />

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3 rounded-full text-sm font-semibold shadow-lg hover:opacity-90 transition cursor-pointer disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send Message"}
        </motion.button>
      </motion.form>
    </section>
  );
}
