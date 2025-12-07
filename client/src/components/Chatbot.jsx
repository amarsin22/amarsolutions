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
  const [lead, setLead] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });
  const [sendingLead, setSendingLead] = useState(false);

  const addMessage = (from, text) => {
    setMessages((prev) => [...prev, { from, text }]);
  };

  const getBotReply = (userText) => {
    const text = userText.toLowerCase();

    if (text.includes("service") || text.includes("offer")) {
      return "I offer Resume Writing, LinkedIn Optimization, Frontend Web Development, React Projects, Interview Preparation, and Cold Email Writing.";
    }

    if (text.includes("price") || text.includes("pricing")) {
      return "I have Basic, Standard, and Premium pricing plans. You can check the Pricing section for details.";
    }

    if (text.includes("resume")) return "I create ATS-friendly professional resumes.";
    if (text.includes("linkedin")) return "I optimize LinkedIn profiles for recruiters.";
    if (text.includes("interview")) return "I provide interview preparation with mock questions.";
    if (text.includes("project")) return "I help with frontend and React projects.";
    if (text.includes("contact")) return "Click on 'Share my details' to connect with Amar.";

    return "You can ask me about services, pricing, resume, LinkedIn, projects, or interviews.";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    addMessage("user", input);

    const reply = getBotReply(input);
    setTimeout(() => {
      addMessage("bot", reply);
    }, 400);

    setInput("");
  };

  // ✅ FAST, NON-HANGING SUBMIT
  const handleLeadSubmit = async (e) => {
    e.preventDefault();

    if (!lead.name || !lead.email) {
      alert("Name and email are required.");
      return;
    }

    if (sendingLead) return; // ✅ prevent double clicks

    try {
      setSendingLead(true);

      const res = await fetch(
        "https://amarsolutions-2.onrender.com/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: lead.name,
            email: lead.email,
            whatsapp: lead.whatsapp,
            service: "Chatbot Lead",
            message:
              "Lead captured from AI Chatbot on AmarSolutions website.",
          }),
        }
      );

      // ✅ Safe JSON read (prevents UI freeze)
      const data = await res.json().catch(() => ({
        message: "Invalid server response",
      }));

      if (!res.ok) {
        console.error("Backend Error:", data);
        alert(data.message || "Failed to submit lead");
        return;
      }

      // ✅ Instant UI feedback
      addMessage(
        "bot",
        "✅ Thank you! Your details have been shared. Amar will contact you soon."
      );

      setLead({ name: "", email: "", whatsapp: "" });
      setLeadMode(false);
      setOpen(false);
    } catch (error) {
      console.error("Frontend Error:", error.message);
      alert("❌ Server is slow. Please try again.");
    } finally {
      setSendingLead(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 left-6 z-50 bg-primarySoft text-white px-4 py-3 rounded-full"
      >
        💬 {open ? "Close Chat" : "Chat with AI"}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 left-4 w-80 bg-black rounded-xl p-3 text-white"
          >
            <div className="h-48 overflow-y-auto space-y-2">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={m.from === "user" ? "text-right" : "text-left"}
                >
                  <span className="bg-gray-700 px-2 py-1 rounded">
                    {m.text}
                  </span>
                </div>
              ))}
            </div>

            {leadMode && (
              <form onSubmit={handleLeadSubmit} className="space-y-2 mt-2">
                <input
                  placeholder="Name"
                  value={lead.name}
                  onChange={(e) =>
                    setLead({ ...lead, name: e.target.value })
                  }
                  className="w-full p-1 text-black"
                />
                <input
                  placeholder="Email"
                  value={lead.email}
                  onChange={(e) =>
                    setLead({ ...lead, email: e.target.value })
                  }
                  className="w-full p-1 text-black"
                />
                <input
                  placeholder="WhatsApp"
                  value={lead.whatsapp}
                  onChange={(e) =>
                    setLead({ ...lead, whatsapp: e.target.value })
                  }
                  className="w-full p-1 text-black"
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

            <form onSubmit={handleSend} className="flex gap-2 mt-2">
              <input
                className="flex-1 p-1 text-black"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type..."
              />
              <button className="bg-blue-600 px-3">Send</button>
            </form>

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
