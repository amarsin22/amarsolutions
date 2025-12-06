export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="section py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} AmarSolutions · Built by Amar Singh
      </div>
    </footer>
  );
}
