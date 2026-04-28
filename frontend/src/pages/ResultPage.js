import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, MessageCircle, ExternalLink, Loader2, CheckCircle } from "lucide-react";

const API = process.env.REACT_APP_BACKEND_URL + "/api";
const RESULT_BG = "https://static.prod-images.emergentagent.com/jobs/487e77ea-1a09-49e8-92a5-ba077b054a4a/images/701b9c0fe1a96a5d7acde9062b8d2f807c9efba37f390d882ad63bf1b2ae3d33.png";
const WA_NUMBER = "91XXXXXXXXXX"; // Replace with actual number

export default function ResultPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`${API}/form/result/${id}`)
      .then((res) => { setResult(res.data); setLoading(false); })
      .catch(() => { setError("Submission not found."); setLoading(false); });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#1a0a0a" }} data-testid="result-loading">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin mx-auto mb-5" />
          <p className="text-[#D4AF37]/70 font-serif text-xl">Preparing your journey...</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center p-8" data-testid="result-error">
        <div className="text-center">
          <p className="font-serif text-3xl text-[#2A1133] mb-3">Not Found</p>
          <p className="text-[#6B5A74] font-sans text-sm mb-6">{error}</p>
          <button onClick={() => navigate("/recommendation")} className="bg-[#D4AF37] text-[#2A1133] font-semibold px-8 py-3 rounded-full">
            Start Again
          </button>
        </div>
      </div>
    );
  }

  const waMessage = encodeURIComponent(
    `Namaste Rudralife! 🙏\n\nMera naam ${result.name} hai. Maine aapke website pe form submit kiya hai. Main apne Rudraksha recommendation ke baare mein guidance lena chahta/chahti hoon.\n\nCity: ${result.city}, ${result.country}\nGoal: ${result.primary_goal?.replace(/_/g, " ")}\n\nKripya mujhe guide karein.`
  );

  return (
    <div
      data-testid="result-page"
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${RESULT_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Warm cream overlay matching wooden/beige background tones */}
      <div
        className="min-h-screen"
        style={{ background: "linear-gradient(135deg, rgba(245,241,232,0.92) 0%, rgba(235,228,213,0.88) 50%, rgba(245,241,232,0.92) 100%)" }}
      >
        <div className="max-w-2xl mx-auto px-4 py-12">

          {/* Back button */}
          <button
            data-testid="result-back-btn"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-[#6B5A74] text-sm font-sans mb-10 hover:text-[#2A1133] transition-colors"
          >
            <ArrowLeft size={16} /> Back to Rudralife
          </button>

          {/* ── MAIN THANK YOU CARD ── */}
          <div
            data-testid="thankyou-card"
            className="bg-white/70 backdrop-blur-sm border border-[#D4AF37]/25 rounded-3xl shadow-xl overflow-hidden"
          >
            {/* Top accent bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37]" />

            <div className="px-8 py-12 text-center">
              {/* Om Symbol */}
              <div
                className="font-serif text-[#D4AF37] mb-5 leading-none select-none"
                style={{ fontSize: "52px", textShadow: "0 2px 12px rgba(212,175,55,0.25)" }}
              >
                ॐ
              </div>

              {/* Submitted indicator */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <CheckCircle size={18} className="text-[#D4AF37]" />
                <span className="text-[#D4AF37] text-xs tracking-[0.25em] uppercase font-sans font-semibold">
                  Form Successfully Submitted
                </span>
              </div>

              {/* Main heading */}
              <h1
                className="font-serif font-light text-[#2A1133] leading-tight tracking-tight mb-4"
                style={{ fontSize: "clamp(32px, 5vw, 44px)" }}
              >
                Namaste,{" "}
                <span className="italic text-[#4A235A]">{result.name}</span>
              </h1>

              {/* Decorative divider */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px bg-[#D4AF37]/40 w-16" />
                <div className="w-2 h-2 rounded-full bg-[#D4AF37]/50" />
                <div className="h-px bg-[#D4AF37]/40 w-16" />
              </div>

              {/* Main thank you message */}
              <p className="font-serif text-xl sm:text-2xl text-[#2A1133]/80 leading-relaxed mb-5 font-light">
                Thank you for reaching out to <strong className="font-semibold text-[#2A1133]">Rudralife®</strong>
              </p>

              <p className="text-[#6B5A74] text-base leading-relaxed font-sans mb-6 max-w-lg mx-auto">
                Your details have been carefully received. Our panel of Rudraksha experts will personally review your submission and reach out to you with a thoughtful, traditional recommendation crafted just for you.
              </p>

              {/* Info boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                {[
                  { icon: "🕐", title: "Response Time", desc: "Within 24–48 hours" },
                  { icon: "🔮", title: "Expert Review", desc: "Personal panel evaluation" },
                  { icon: "🛡️", title: "No Obligation", desc: "Zero pressure. Pure guidance." },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="bg-[#F5F1E8]/80 border border-[#D4AF37]/20 rounded-2xl px-4 py-5"
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <p className="font-serif text-sm font-semibold text-[#2A1133] mb-1">{item.title}</p>
                    <p className="text-[#6B5A74] text-xs font-sans">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* WhatsApp Section */}
              <div className="bg-[#2A1133] rounded-2xl px-6 py-8 mb-6">
                <p className="font-serif text-xl font-semibold text-white mb-2">
                  Connect with Our Experts
                </p>
                <p className="text-white/60 text-sm font-sans mb-6 max-w-sm mx-auto">
                  For immediate guidance or any questions, our Rudraksha experts are available on WhatsApp.
                </p>
                <a
                  data-testid="whatsapp-cta-btn"
                  href={`https://wa.me/${WA_NUMBER}?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] text-white font-semibold text-sm px-8 py-4 rounded-full hover:bg-[#20BA5A] hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
                >
                  <MessageCircle size={20} />
                  Chat on WhatsApp
                  <ExternalLink size={14} />
                </a>
                <p className="text-white/30 text-xs font-sans mt-4">
                  Free consultation · No purchase required
                </p>
              </div>

              {/* Quote */}
              <p className="font-serif text-sm italic text-[#6B5A74] leading-relaxed mt-4">
                "Devotion to Rudraksha does not come without reason. You receive Rudraksha only if it is in your destiny or good fortune."
              </p>
            </div>

            {/* Bottom accent */}
            <div className="px-8 py-5 border-t border-[#D4AF37]/15 text-center bg-[#F5F1E8]/40">
              <p className="text-[#6B5A74]/50 text-xs font-sans">
                info@rudralife.com · © 2026 Rudralife®. All Rights Reserved.
              </p>
            </div>
          </div>

          {/* Footer actions */}
          <div className="text-center mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              data-testid="result-home-btn"
              onClick={() => navigate("/")}
              className="text-[#6B5A74] font-sans text-sm hover:text-[#2A1133] transition-colors border border-[#D4AF37]/30 px-6 py-2.5 rounded-full"
            >
              Back to Rudralife
            </button>
            <button
              data-testid="result-new-recommendation-btn"
              onClick={() => navigate("/recommendation")}
              className="text-[#D4AF37] font-sans text-sm hover:underline border border-[#D4AF37]/40 px-6 py-2.5 rounded-full"
            >
              Submit Another Query
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
