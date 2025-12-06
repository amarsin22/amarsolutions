import { motion } from "framer-motion";

export default function WhatsAppFloat() {
  const WHATSAPP_NUMBER = "+919889930940"; // <-- PUT YOUR REAL NUMBER HERE

  const message = "Hi Amar, I found your website and want to know about your services.";

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2
                 bg-green-500 hover:bg-green-600 text-white
                 px-4 py-3 rounded-full shadow-soft
                 text-sm font-semibold"
    >
      📱 <span className="hidden sm:inline">Chat on WhatsApp</span>
    </motion.a>
  );
}
