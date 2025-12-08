import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi, I’m your AI assistant from AmarSolutions 👋 How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [leadMode, setLeadMode] = useState(false);
  const [lead, setLead] = useState({ name: "", email: "", whatsapp: "" });
  const [sendingLead, setSendingLead] = useState(false);

  const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  const addMessage = (from, text) => {
    setMessages((prev) => [...prev, { from, text }]);
  };

  const getBotReply = (userText) => {
    const t = userText.toLowerCase();

    if (t.includes("service"))
      return "I offer Resume Writing, LinkedIn Optimization, Frontend Web Development, React Projects, Interview Preparation, and Cold Email Writing.";

    if (t.includes("price"))
      return "I have Basic, Standard, and Premium pricing plans.";

    if (t.includes("resume")) return "I create ATS-friendly resumes.";
    if (t.includes("linkedin")) return "I optimize LinkedIn profiles.";
    if (t.includes("project")) return "I build and debug frontend & React projects.";
    if (t.includes("interview")) return "I provide interview preparation and mock interviews.";
    if (t.includes("contact")) return "Click on 'Share my details' to connect with Amar.";

    return "Ask me about services, pricing, resume help, LinkedIn optimization, or projects.";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    addMessage("user", input);
    const reply = getBotReply(input);
    setTimeout(() => addMessage("bot", reply), 400);
    setInput("");
  };

  // 🚀 SEND LEAD USING WEB3FORMS (No backend)
  const handleLeadSubmit = async (e) => {
    e.preventDefault();

    if (!lead.name || !lead.email) {
      alert("Name and email are required.");
      return;
    }

    if (sendingLead) return;
    setSendingLead(true);

    const formData = new FormData();
    formData.append("access_key", ACCESS_KEY);
    formData.append("name", lead.name);
    formData.append("email", lead.email);
    formData.append("whatsapp", lead.whatsapp);
    formData.append("service", "Chatbot Lead");
    formData.append("subject", "New Lead from AmarSolutions Chatbot");
    formData.append("message", "Lead captured from AmarSolutions AI Chatbot");
    formData.append("botcheck", "");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await res.json().catch(() => ({ success: false }));

      if (result.success) {
        addMessage(
          "bot",
          "✅ Thank you! Your details have been shared. Amar will contact you soon."
        );

        setLead({ name: "", email: "", whatsapp: "" });
        setLeadMode(false); // hide form
      } else {
        alert("❌ Unable to send lead. Please try again.");
      }
    } catch (err) {
      alert("❌ Network issue. Try again.");
      console.error("Chatbot lead error:", err);
    } finally {
      setSendingLead(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setOpen((p) => !p)}
        className="fixed bottom-6 left-6 z-50 bg-primarySoft text-white px-4 py-3 rounded-full shadow-lg"
      >
        💬 {open ? "Close Chat" : "Chat with AI"}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-20 left-4 w-80 bg-black rounded-xl p-3 text-white shadow-lg"
          >
            {/* CHAT WINDOW */}
            <div className="h-48 overflow-y-auto space-y-2">
              {messages.map((m, i) => (
                <div key={i} className={m.from === "user" ? "text-right" : "text-left"}>
                  <span className="bg-gray-700 px-2 py-1 rounded inline-block">{m.text}</span>
                </div>
              ))}
            </div>

            {/* LEAD FORM */}
            {leadMode && (
              <form onSubmit={handleLeadSubmit} className="space-y-2 mt-2">
                <input
                  placeholder="Name"
                  value={lead.name}
                  onChange={(e) => setLead({ ...lead, name: e.target.value })}
                  className="w-full p-1 text-black rounded"
                />

                <input
                  placeholder="Email"
                  value={lead.email}
                  onChange={(e) => setLead({ ...lead, email: e.target.value })}
                  className="w-full p-1 text-black rounded"
                />

                <input
                  placeholder="WhatsApp"
                  value={lead.whatsapp}
                  onChange={(e) => setLead({ ...lead, whatsapp: e.target.value })}
                  className="w-full p-1 text-black rounded"
                />

                <button
                  type="submit"
                  disabled={sendingLead}
                  className="w-full bg-green-600 py-1 rounded disabled:opacity-60"
                >
                  {sendingLead ? "Sending..." : "Submit"}
                </button>
              </form>
            )}

            {/* USER INPUT */}
            <form onSubmit={handleSend} className="flex gap-2 mt-2">
              <input
                className="flex-1 p-1 text-black rounded"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type…"
              />
              <button className="bg-blue-600 px-3 rounded">Send</button>
            </form>

            {/* CTA: SHARE DETAILS */}
            <button
              onClick={() => setLeadMode((p) => !p)}
              className="text-xs mt-2 underline"
            >
              {leadMode ? "Hide form" : "Share my details"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
