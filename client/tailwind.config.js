export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        primarySoft: "#4f46e5",
        dark: "#020617",
        darkSoft: "#030712",
        glass: "rgba(15,23,42,0.85)",
      },
      boxShadow: {
        soft: "0 18px 45px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at 0% 0%, #4f46e5 0, transparent 45%), radial-gradient(circle at 100% 100%, #22d3ee 0, transparent 45%)",
      },
    },
  },
  plugins: [],
};
