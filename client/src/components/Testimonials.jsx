import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Rahul Verma",
    role: "Fresher Developer",
    review:
      "Amar helped me completely transform my resume and LinkedIn profile. Within two weeks, I started getting interview calls. Highly recommended!",
  },
  {
    name: "Pooja Singh",
    role: "B.Tech Student",
    review:
      "The interview preparation sessions were extremely helpful. I felt much more confident during my HR round. Thank you so much!",
  },
  {
    name: "Amit Kumar",
    role: "Junior Frontend Developer",
    review:
      "My portfolio website and React project were built perfectly. The UI looks premium and professional. Great experience!",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">What Clients Say</h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Real feedback from students and developers I have worked with.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.15 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="bg-glass border border-slate-700 rounded-2xl p-6 shadow-soft"
          >
            <p className="text-sm text-slate-200 mb-4 leading-relaxed">
              “{t.review}”
            </p>

            <div className="border-t border-slate-600 pt-4">
              <p className="font-semibold">{t.name}</p>
              <p className="text-xs text-slate-400">{t.role}</p>

              <div className="mt-2 text-yellow-400 text-sm">
                ★ ★ ★ ★ ★
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
