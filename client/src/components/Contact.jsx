import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    service: "Resume Writing",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email) {
      alert("Name and Email are required!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Message sent successfully!");
        setForm({
          name: "",
          email: "",
          whatsapp: "",
          service: "Resume Writing",
          message: "",
        });
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      alert("Server error. Try again later.");
    }
  };

  return (
    <section id="contact" className="section">
      <motion.form
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        onSubmit={handleSubmit}
        className="bg-slate-50 text-slate-900 rounded-2xl p-7 shadow-soft space-y-4 max-w-md mx-auto"
      >
        <h2 className="text-xl font-bold text-center mb-2">
          Contact Me
        </h2>

        <input
          placeholder="Name"
          className="w-full p-2 border rounded-md text-sm"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          placeholder="Email"
          type="email"
          className="w-full p-2 border rounded-md text-sm"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          placeholder="WhatsApp"
          className="w-full p-2 border rounded-md text-sm"
          value={form.whatsapp}
          onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
        />

        <textarea
          placeholder="Tell me briefly what you need help with..."
          className="w-full p-2 border rounded-md text-sm"
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />

        {/* ✅ SUBMIT BUTTON (FIXED & VISIBLE) */}
        <motion.button
  type="submit"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3 rounded-full text-sm font-semibold shadow-lg hover:opacity-90 transition cursor-pointer"
>
  Send Message
</motion.button>

      </motion.form>
    </section>
  );
}
