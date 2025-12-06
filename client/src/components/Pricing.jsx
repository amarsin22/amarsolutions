import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "+919889930940"; // <-- PUT YOUR REAL NUMBER HERE

const plans = [
  {
    title: "Basic",
    price: "₹199",
    features: [
      "Resume Review",
      "Basic LinkedIn Tips",
      "Email Support",
      "1 Revision",
    ],
    highlight: false,
  },
  {
    title: "Standard",
    price: "₹499",
    features: [
      "ATS Resume Writing",
      "LinkedIn Optimization",
      "Interview Q&A PDF",
      "WhatsApp Support",
      "3 Revisions",
    ],
    highlight: true,
  },
  {
    title: "Premium",
    price: "₹999",
    features: [
      "ATS Resume Writing",
      "Full LinkedIn Optimization",
      "Mock Interview",
      "Cold Email Templates",
      "Priority WhatsApp Support",
      "Unlimited Revisions",
    ],
    highlight: false,
  },
];

export default function Pricing() {
  const handleWhatsAppRedirect = (planTitle) => {
    const message = `Hi Amar, I am interested in your ${planTitle} plan. Please share the next steps.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <section id="pricing" className="section">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Pricing Plans</h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Simple, transparent pricing designed for freshers and job seekers.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.title}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, translateY: -4 }}
            className={`rounded-2xl p-6 border shadow-soft transition ${
              plan.highlight
                ? "bg-gradient-to-br from-indigo-600 to-blue-500 text-white border-indigo-400"
                : "bg-glass border-slate-700 text-slate-100"
            }`}
          >
            {/* Plan Title */}
            <h3 className="text-xl font-semibold mb-1">{plan.title}</h3>
            <p className="text-3xl font-bold mb-4">{plan.price}</p>

            {/* Features */}
            <ul className="text-sm space-y-2 mb-6">
              {plan.features.map((feature) => (
                <li key={feature}>✅ {feature}</li>
              ))}
            </ul>

            {/* WhatsApp Button */}
            <button
              onClick={() => handleWhatsAppRedirect(plan.title)}
              className={`w-full py-2 rounded-full text-sm font-semibold transition ${
                plan.highlight
                  ? "bg-white text-indigo-600 hover:bg-slate-100"
                  : "bg-primarySoft text-white hover:opacity-90"
              }`}
            >
              Chat on WhatsApp
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
