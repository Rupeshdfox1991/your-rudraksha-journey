import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_spiritual-path-49/artifacts/it9ar00d_image.png";

const NAV_LINKS = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Our Experts", href: "/#panel-experts" },
  { label: "In The Media", href: "/#featured" },
  { label: "FAQ", href: "/#faq" },
];

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F8F4EC]/95 backdrop-blur-md shadow-sm border-b border-[#E8DFD0]"
          : "bg-[#F8F4EC]/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img src={LOGO_URL} alt="Rudralife" className="h-9 object-contain" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#5C4A42] text-sm font-sans hover:text-[#800000] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + mobile menu */}
          <div className="flex items-center gap-3">
            <button
              data-testid="header-cta-btn"
              onClick={() => navigate("/recommendation")}
              className="bg-[#800000] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#9B2030] transition-all duration-200 shadow-sm hidden sm:block"
            >
              Get FREE Recommendation
            </button>
            <button
              data-testid="header-cta-btn-sm"
              onClick={() => navigate("/recommendation")}
              className="bg-[#800000] text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-[#9B2030] transition-all duration-200 sm:hidden"
            >
              Get Started
            </button>
            <button
              className="md:hidden p-1.5 text-[#5C4A42] hover:text-[#800000] transition-colors"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#F8F4EC] border-t border-[#E8DFD0] px-4 pt-3 pb-5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2.5 text-[#5C4A42] text-sm font-sans border-b border-[#E8DFD0] hover:text-[#800000] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => { navigate("/recommendation"); setMenuOpen(false); }}
            className="w-full mt-4 bg-[#800000] text-white font-semibold text-sm py-3 rounded-full hover:bg-[#9B2030] transition-colors"
          >
            Get FREE Recommendation
          </button>
        </div>
      )}
    </header>
  );
}
