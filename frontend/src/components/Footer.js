import React from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer data-testid="main-footer" className="bg-[#2A1133] text-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center">
                <span className="text-[#2A1133] font-serif font-bold text-sm">R</span>
              </div>
              <span className="font-serif text-2xl font-semibold text-white">Rudralife</span>
            </div>
            <p className="text-[#F5F1E8]/70 text-sm leading-relaxed max-w-sm font-sans">
              Devotion to Rudraksha does not come without reason. You receive Rudraksha only if it is in your destiny or good fortune.
            </p>
            <div className="flex flex-col gap-3 mt-6">
              <a href="mailto:info@rudralife.com" className="flex items-center gap-2 text-[#D4AF37] text-sm hover:text-[#E5C158] transition-colors">
                <Mail size={16} /> info@rudralife.com
              </a>
              <div className="flex items-center gap-2 text-[#F5F1E8]/60 text-sm">
                <Phone size={16} /> +91 98765 43210
              </div>
              <div className="flex items-center gap-2 text-[#F5F1E8]/60 text-sm">
                <MapPin size={16} /> Mumbai, India
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-5">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Home", path: "/" },
                { label: "Get Recommendation", path: "/recommendation" },
                { label: "Our Collection", path: "/#collection" },
                { label: "How It Works", path: "/#how-it-works" },
                { label: "FAQ", path: "/#faq" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className="text-[#F5F1E8]/70 text-sm text-left hover:text-[#D4AF37] transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold text-white mb-5">Our Promise</h4>
            <div className="flex flex-col gap-3">
              {[
                "Lab-Certified Authenticity",
                "Personalised Guidance",
                "Lifetime Support",
                "No Pressure Buying",
                "Global Delivery",
              ].map((item) => (
                <span key={item} className="text-[#F5F1E8]/70 text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#D4AF37]/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#F5F1E8]/50 text-sm">
            © 2026 Rudralife. All Rights Reserved.
          </p>
          <button
            onClick={() => navigate("/admin/login")}
            className="text-[#F5F1E8]/30 text-xs hover:text-[#D4AF37]/60 transition-colors"
            data-testid="admin-link"
          >
            Admin
          </button>
        </div>
      </div>
    </footer>
  );
}
