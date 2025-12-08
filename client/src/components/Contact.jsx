import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const formData = new FormData(e.target);
    formData.append("access_key", ACCESS_KEY);
    formData.append("service", "Contact Form Submission");

    // Anti-bot protection (required by Web3Forms)
    formData.append("botcheck", "");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => ({ success: false }));

      if (data.success) {
        alert("✅ Message sent successfully!");
        e.target.reset();
      } else {
        alert("❌ Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("❌ Network issue. Please try again.");
      console.error("Submit Error:", error);
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

        <input
          name="name"
          placeholder="Name"
          className="w-full p-2 border rounded-md text-sm"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded-md text-sm"
          required
        />

        <input
          name="whatsapp"
          placeholder="WhatsApp"
          className="w-full p-2 border rounded-md text-sm"
        />

        <textarea
          name="message"
          placeholder="Tell me briefly what you need help with..."
          className="w-full p-2 border rounded-md text-sm"
          rows={4}
        ></textarea>

        {/* Web3Forms required hidden inputs */}
        <input type="hidden" name="botcheck" />
        <input type="hidden" name="service" value="Contact Form Submission" />

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
