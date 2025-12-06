import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 backdrop-blur bg-black/40 border-b border-white/10"
    >
      <div className="section py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-cyan-400 shadow-soft" />
          <span className="font-semibold text-lg tracking-wide">
            Amar<span className="text-primary">Solutions</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="#services" className="hover:text-primary transition">
            Services
          </a>
          <a href="#how" className="hover:text-primary transition">
            Process
          </a>
          <a href="#contact" className="hover:text-primary transition">
            Contact
          </a>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="md:hidden bg-black/90 border-t border-white/10"
        >
          <div className="px-4 pb-4 flex flex-col gap-3 text-sm">
            <a href="#services" onClick={() => setOpen(false)}>
              Services
            </a>
            <a href="#how" onClick={() => setOpen(false)}>
              Process
            </a>
            <a href="#contact" onClick={() => setOpen(false)}>
              Contact
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
