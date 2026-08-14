const Footer = () => {
  return (
    <footer className="border-t border-white/10 px-6 md:px-10 py-8">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-4 text-sm text-neutral-500">

        <p>
          © 2026 Ankit Pratap
        </p>

        <div className="flex gap-6">
          <a
            href="#"
            className="hover:text-white transition"
          >
            GitHub
          </a>

          <a
            href="#"
            className="hover:text-white transition"
          >
            LinkedIn
          </a>

          <a
            href="#"
            className="hover:text-white transition"
          >
            Resume
          </a>
        </div>

      </div>

    </footer>
  );
};

export default Footer;