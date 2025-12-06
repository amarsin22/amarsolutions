import { motion } from "framer-motion";

const steps = [
  "You contact me with your requirement (resume, LinkedIn, project, etc.).",
  "I review your current profile and share a clear plan with pricing.",
  "We finalize details on WhatsApp or email and I start the work.",
  "You receive the final result + small revisions if needed.",
];

export default function HowItWorks() {
  return (
    <section id="how" className="section">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">How It Works</h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Simple, transparent steps so you always know what is happening.
        </p>
      </div>

      <div className="space-y-4 max-w-3xl mx-auto">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ x: i % 2 === 0 ? -60 : 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-glass border border-slate-700 rounded-2xl p-4 text-sm text-slate-200"
          >
            <span className="font-semibold text-primary mr-2">
              Step {i + 1}.
            </span>
            {step}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
