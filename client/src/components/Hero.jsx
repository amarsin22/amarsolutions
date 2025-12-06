import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="section min-h-[80vh] flex items-center">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left content */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.2em] uppercase text-slate-400 mb-3">
            Portfolio & Services
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Turn Your{" "}
            <span className="text-primary drop-shadow">
              Skills
            </span>{" "}
            Into Real Opportunities.
          </h1>

          <p className="text-slate-300 text-sm md:text-base max-w-xl mb-6">
            I’m Amar Singh, a fresher full-stack developer. I help students and
            professionals with ATS-ready resumes, LinkedIn optimization, clean
            frontend UIs, React projects, interview prep, and cold email writing
            that actually gets replies.
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full bg-primarySoft text-white text-sm font-semibold shadow-soft"
            >
              Hire Me
            </motion.a>
            <motion.a
              href="#services"
              whileHover={{ scale: 1.02 }}
              className="px-6 py-3 rounded-full border border-slate-600 text-sm"
            >
              View Services
            </motion.a>
          </div>
        </motion.div>

        {/* Right content */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="hidden md:flex justify-center"
        >
          <div className="relative w-full max-w-sm">
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-primary/30 blur-2xl" />
            <div className="absolute -bottom-6 -right-8 w-24 h-24 rounded-full bg-cyan-400/30 blur-2xl" />

            <div className="relative bg-glass border border-white/10 rounded-3xl shadow-soft p-6">
              <p className="text-xs text-slate-400 mb-2">Trusted by Freshers</p>
              <p className="text-sm text-slate-100 mb-4">
                Clean resumes, optimized profiles, and confident interview
                answers tailored for freshers and junior developers.
              </p>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Live one–one guidance</span>
                <span className="text-primary">AI + Human</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
