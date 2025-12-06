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

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // ✅ prevent double submit

    if (!form.name || !form.email) {
      alert("Name and Email are required!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://amarsolutions-1.onrender.com/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            service: form.service || "Resume Writing", // ✅ always send service
          }),
        }
      );

      let data;
      try {
        data = await res.json(); // ✅ safe JSON read
      } catch {
        data = { message: "Invalid server response" };
      }

      if (!res.ok) {
        console.error("Backend Error:", data);
        alert(data.message || "Server rejected the request");
        return;
      }

      alert("✅ Message sent successfully!");

      setForm({
        name: "",
        email: "",
        whatsapp: "",
        service: "Resume Writing",
        message: "",
      });
    } catch (error) {
      console.error("Network Error:", error);
      alert("❌ Server is not responding. Please try again.");
    } finally {
      setLoading(false);
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
        <h2 className="text-xl font-bold text-center mb-2">Contact Me</h2>

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
