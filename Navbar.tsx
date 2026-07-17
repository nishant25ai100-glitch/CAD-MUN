import { useState, useEffect } from "react";
import { Menu, X, Landmark, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onOpenRegister: () => void;
}

export default function Navbar({ onOpenRegister }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active link tracker
      const sections = ["home", "about", "committees", "schedule", "team"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About", href: "#about", id: "about" },
    { name: "Committees", href: "#committees", id: "committees" },
    { name: "Schedule", href: "#schedule", id: "schedule" },
    { name: "Team", href: "#team", id: "team" }
  ];

  return (
    <>
      <nav
        id="cda-navbar"
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] px-6 lg:px-12 flex items-center justify-between border-b transition-all duration-300 ${
          scrolled
            ? "border-brand-border bg-brand-bg/90 backdrop-blur-md shadow-lg"
            : "border-transparent bg-transparent"
        }`}
      >
        <a href="#home" className="flex items-center gap-2 group font-syne font-extrabold text-xl tracking-wider text-brand-gold">
          <Landmark className="w-5 h-5 text-brand-gold group-hover:rotate-12 transition-transform duration-300" />
          CDA<span className="text-brand-text">MUN</span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 font-sans font-medium text-[13px] tracking-widest text-brand-muted uppercase">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className={`relative py-2 transition-colors duration-200 hover:text-brand-gold ${
                  activeSection === link.id ? "text-brand-gold" : "text-brand-muted"
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="navbar-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Register Button */}
        <div className="hidden md:flex items-center">
          <button
            id="nav-register-btn"
            onClick={onOpenRegister}
            className="flex items-center gap-2 bg-brand-gold hover:bg-brand-gold2 text-black px-5 py-2 rounded font-syne font-bold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-lg hover:shadow-brand-gold/10 hover:-translate-y-0.5"
          >
            <Award className="w-3.5 h-3.5" />
            Register
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-brand-text focus:outline-none focus:ring-1 focus:ring-brand-gold rounded"
          aria-label="Toggle menu"
          id="mobile-menu-toggle"
        >
          {isOpen ? <X className="w-6 h-6 text-brand-gold" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-0 right-0 z-40 border-b border-brand-border bg-brand-bg/95 backdrop-blur-xl px-6 py-6 md:hidden flex flex-col gap-4 shadow-2xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`font-syne font-semibold py-3 text-lg border-b border-brand-border/40 transition-colors uppercase tracking-wider ${
                  activeSection === link.id ? "text-brand-gold" : "text-brand-muted"
                }`}
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenRegister();
              }}
              className="mt-4 w-full text-center bg-brand-gold hover:bg-brand-gold2 text-black py-4 rounded font-syne font-bold font-semibold uppercase tracking-widest text-sm transition-colors duration-200"
            >
              Register Now →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
