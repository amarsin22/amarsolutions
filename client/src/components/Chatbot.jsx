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
      return (
        "I offer: Resume Writing, LinkedIn Optimization, Frontend Web Development, React Projects, Interview Preparation, and Cold Email Writing. " +
        "You can also check the Services and Pricing sections on this page."
      );
    }

    if (text.includes("price") || text.includes("pricing") || text.includes("cost")) {
      return (
        "My pricing is simple: Basic, Standard, and Premium plans. " +
        "You can see details in the Pricing section, or tell me what you need and I’ll suggest a plan."
      );
    }

    if (text.includes("resume") || text.includes("cv")) {
      return (
        "For resumes, I create ATS-friendly, clean resumes suitable for fresher and junior roles. " +
        "You can also send me your current resume via email or WhatsApp after we connect."
      );
    }

    if (text.includes("linkedin")) {
      return (
        "For LinkedIn, I optimize your headline, about section, experience, and add the right keywords to attract recruiters."
      );
    }

    if (text.includes("interview")) {
      return (
        "I can help you with HR and basic tech interview preparation, including mock questions and answer structure."
      );
    }

    if (text.includes("project") || text.includes("react")) {
      return (
        "I can help you build or refine frontend and React projects for your portfolio, with clean UI and proper structure."
      );
    }

    if (text.includes("contact") || text.includes("connect") || text.includes("talk")) {
      return (
        "Sure! I can take your details here. Click on 'Share my details' inside this chat and I’ll save your info so Amar can contact you."
      );
    }

    return (
      "Thanks for your message! I’m a simple AI-style assistant here to help you understand Amar’s services. " +
      "You can ask about services, pricing, resume help, LinkedIn, projects, or interviews. " +
      "If you’d like Amar to contact you personally, click on 'Share my details' below. 😊"
    );
  };

  const handleSend = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    // add user message
    addMessage("user", trimmed);

    // get bot reply
    const reply = getBotReply(trimmed);
    setTimeout(() => {
      addMessage("bot", reply);
    }, 400);

    setInput("");
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!lead.name || !lead.email) {
      alert("Name and email are required.");
      return;
    }

    try {
      setSendingLead(true);
      const res = await fetch("https://amarsolutions-backend.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: lead.name,
          email: lead.email,
          whatsapp: lead.whatsapp,
          service: "Chatbot Lead",
          message:
            "Lead captured from AI Chatbot on AmarSolutions website. User wants help with services.",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send lead");
      }

      addMessage(
        "bot",
        "Thank you! Your details have been shared. Amar will contact you soon on WhatsApp or email. 🙌"
      );
      setLead({ name: "", email: "", whatsapp: "" });
      setLeadMode(false);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setSendingLead(false);
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <motion.button
        onClick={() => setOpen((prev) => !prev)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 z-50 bg-primarySoft text-white px-4 py-3 rounded-full shadow-soft text-sm font-semibold flex items-center gap-2"
      >
        💬 {open ? "Close Chat" : "Chat with AI"}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 left-4 w-80 max-w-[90vw] bg-glass border border-slate-700 rounded-2xl shadow-soft text-sm text-slate-100 flex flex-col overflow-hidden z-50"
          >
            <div className="px-4 py-3 border-b border-slate-700 bg-black/50 flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm">AI Support Bot</p>
                <p className="text-xs text-slate-400">AmarSolutions Assistant</p>
              </div>
              <span className="text-xs text-emerald-400">● Online</span>
            </div>

            {/* Messages */}
            <div className="flex-1 max-h-64 overflow-y-auto px-3 py-2 space-y-2">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    m.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-3 py-2 rounded-2xl max-w-[80%] ${
                      m.from === "user"
                        ? "bg-primarySoft text-white rounded-br-none"
                        : "bg-slate-800 text-slate-100 rounded-bl-none"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Lead capture toggle */}
            <div className="px-3 pb-2 flex justify-between items-center gap-2 border-t border-slate-700 bg-black/40">
              <button
                onClick={() => setLeadMode((prev) => !prev)}
                className="text-xs text-primary hover:underline"
              >
                {leadMode ? "Hide details form" : "Share my details"}
              </button>
              <span className="text-[10px] text-slate-500">
                Quick replies: ask about services, pricing, resume, LinkedIn...
              </span>
            </div>

            {/* Lead form */}
            {leadMode && (
              <form
                onSubmit={handleLeadSubmit}
                className="px-3 pb-2 pt-1 bg-black/40 space-y-2 text-xs"
              >
                <input
                  className="w-full p-1.5 rounded bg-slate-900 border border-slate-700"
                  placeholder="Your Name *"
                  value={lead.name}
                  onChange={(e) =>
                    setLead((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
                <input
                  className="w-full p-1.5 rounded bg-slate-900 border border-slate-700"
                  placeholder="Your Email *"
                  type="email"
                  value={lead.email}
                  onChange={(e) =>
                    setLead((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
                <input
                  className="w-full p-1.5 rounded bg-slate-900 border border-slate-700"
                  placeholder="WhatsApp (optional)"
                  value={lead.whatsapp}
                  onChange={(e) =>
                    setLead((prev) => ({ ...prev, whatsapp: e.target.value }))
                  }
                />
                <button
                  type="submit"
                  disabled={sendingLead}
                  className="w-full bg-primarySoft text-white py-1.5 rounded-full text-xs font-semibold disabled:opacity-60"
                >
                  {sendingLead ? "Sending..." : "Share with Amar"}
                </button>
              </form>
            )}

            {/* Input box */}
            <form
              onSubmit={handleSend}
              className="flex items-center gap-2 px-3 py-2 border-t border-slate-700 bg-black/60"
            >
              <input
                className="flex-1 bg-slate-900 border border-slate-700 rounded-full px-3 py-1.5 text-xs text-slate-100"
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                className="text-xs font-semibold text-primarySoft"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
