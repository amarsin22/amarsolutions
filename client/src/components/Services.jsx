import { motion } from "framer-motion";

const services = [
  {
    title: "Resume Writing",
    desc: "ATS-friendly, clean resumes tailored for fresher and junior roles.",
  },
  {
    title: "LinkedIn Optimization",
    desc: "Profile revamp, keywords, and headline to attract HRs and recruiters.",
  },
  {
    title: "Frontend Web Development",
    desc: "Responsive websites using HTML, CSS, JavaScript, and React.",
  },
  {
    title: "React Projects",
    desc: "Custom React projects for your portfolio or small business idea.",
  },
  {
    title: "Interview Preparation",
    desc: "HR + basic tech interview practice with structured answers.",
  },
  {
    title: "Cold Email Writing",
    desc: "Professional outreach messages to HRs and clients that get replies.",
  },
];

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Services</h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          These are the skills I use to help you present yourself clearly and
          confidently—online and in interviews.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.08 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, translateY: -4 }}
            className="bg-glass border border-slate-700 rounded-2xl p-5 shadow-soft cursor-pointer"
          >
            <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
            <p className="text-sm text-slate-300">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
