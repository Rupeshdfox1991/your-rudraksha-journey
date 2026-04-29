import React from "react";
import { useNavigate } from "react-router-dom";
import { Check, Shield, Users, Star } from "lucide-react";

const LOCAL_IMAGE_BASE = `${process.env.PUBLIC_URL}/images`;
const LOGO_URL = `${LOCAL_IMAGE_BASE}/logo.png`;
const HERO_MALA_IMG = `${LOCAL_IMAGE_BASE}/hero-banner.jpeg`;
const WHATSAPP = "917208819922";

const EXPERT_FACES = [
    { name: "Dr. Tanay Seetha", img: `${LOCAL_IMAGE_BASE}/speaker-1.png` },
    { name: "Hemlata Sojitra", img: `${LOCAL_IMAGE_BASE}/speaker-2.png` },
    { name: "Shruti Sharma", img: `${LOCAL_IMAGE_BASE}/speaker-5.jpg` },
    { name: "Shilpa Agarwal", img: `${LOCAL_IMAGE_BASE}/speaker-3.jpg` },
    { name: "Madhulika", img: `${LOCAL_IMAGE_BASE}/speaker-7.jpeg` },
    { name: "Dhruv Sir", img: `${LOCAL_IMAGE_BASE}/speaker-6.jpeg` },
    { name: "Saumil Seetha", img: `${LOCAL_IMAGE_BASE}/speaker-4.jpg` }
];

const TRUST_POINTS = [
  { icon: Check, text: "Free personalised consultation - no hidden charges" },
  { icon: Shield, text: "100% authentic, lab-certified Rudraksha beads" },
  { icon: Users, text: "Guided by 7 dedicated panel experts" },
  { icon: Star, text: "Response within 24 hours via WhatsApp or call" },
];

function TrustPanel({ navigate }) {
  return (
    <div className="relative lg:w-[44%] lg:min-h-screen bg-black overflow-hidden flex-shrink-0">
      <img
        src={HERO_MALA_IMG}
        alt="Sacred Rudraksha"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "55% center" }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.80) 50%, rgba(0,0,0,0.92) 100%)" }} />

      <div className="relative z-10 flex flex-col h-full p-6 sm:p-8 lg:p-10 min-h-screen lg:min-h-0">
        <div className="mb-8 lg:mb-10">
          <img
            src={LOGO_URL}
            alt="Rudralife"
            className="h-9 object-contain cursor-pointer"
            style={{ filter: "drop-shadow(0 0 5px rgba(255,255,255,0.9)) drop-shadow(0 0 2px rgba(255,255,255,0.8)) brightness(1.3)" }}
            onClick={() => navigate("/")}
          />
        </div>

        <div className="mb-6">
          <p className="text-[#C9A227] text-[10px] tracking-[0.3em] uppercase font-sans mb-3">
            Om Namah Shivaya - Sacred Guidance
          </p>
          <h1 className="font-serif font-light text-white leading-tight mb-3" style={{ fontSize: "clamp(26px, 3.5vw, 42px)" }}>
            Get Your
            <br />
            <span className="text-[#C9A227] italic">Sacred</span>
            <br />
            Rudraksha
          </h1>
          <p className="text-white/60 text-sm font-sans leading-relaxed max-w-sm">
            Personalised guidance from India's most trusted Rudraksha experts, rooted in 25 years of Vedic tradition.
          </p>
        </div>

        <div className="space-y-2.5 mb-7">
          {TRUST_POINTS.map((pt, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-[#C9A227]/20 border border-[#C9A227]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check size={11} className="text-[#C9A227]" />
              </div>
              <p className="text-white/70 text-xs font-sans leading-relaxed">{pt.text}</p>
            </div>
          ))}
        </div>

        <div className="mb-7">
          <p className="text-white/40 text-xs font-sans tracking-widest uppercase mb-3">OUR PANEL EXPERTS AND OTHER'S</p>
          <div className="flex items-center gap-1.5 flex-wrap">
            {EXPERT_FACES.map((expert, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#C9A227]/60 flex-shrink-0"
                title={expert.name}
              >
                <img
                  src={expert.img}
                  alt={expert.name}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 10%" }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-7">
          {[
            { num: "5,00,000+", label: "Believer Clients" },
            { num: "25+", label: "Years Expertise" },
            { num: "52+", label: "Countries Served" },
            { num: "100%", label: "Lab Certified" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5">
              <p className="font-serif text-[#C9A227] text-lg font-semibold leading-none">{stat.num}</p>
              <p className="text-white/50 text-xs font-sans mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-5 mt-auto">
          <p className="text-white/55 text-xs font-sans italic leading-relaxed">
            "Devotion to Rudraksha does not come without reason - you receive it only if it is in your destiny."
          </p>
          <p className="text-[#C9A227]/60 text-xs font-sans mt-1">- Shrimad Devi Bhagvatam</p>
        </div>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  const navigate = useNavigate();
  const name = localStorage.getItem("rudra_name") || "Guest";

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" data-testid="getstarted-success">
      <TrustPanel navigate={navigate} />

      <div className="flex-1 bg-[#F8F4EC] flex items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-6">
            <Check size={36} className="text-green-600" strokeWidth={2.5} />
          </div>
          <p className="font-serif text-3xl font-light text-[#800000] mb-1">Namaste</p>
          <h2 className="font-serif text-xl font-semibold text-[#2C1E16] mb-2">{name}</h2>
          <div className="flex items-center gap-3 my-4">
            <div className="h-px flex-1 bg-[#C9A227]/30" />
            <span className="text-[#C9A227] font-serif">Om</span>
            <div className="h-px flex-1 bg-[#C9A227]/30" />
          </div>
          <p className="text-[#5C4A42] text-sm leading-relaxed font-sans mb-7">
            Your details have been received. One of our Rudraksha experts will contact you within{" "}
            <strong className="text-[#800000]">24 hours</strong> with your personalised recommendation.
          </p>
          <div className="bg-white rounded-2xl border border-[#E8DFD0] p-5 mb-7 text-left">
            <p className="text-[#800000] text-xs font-sans tracking-widest uppercase mb-3">What happens next</p>
            {["Our expert reviews your birth details and goals", "We identify the most aligned Rudraksha for you", "You receive a personalised recommendation"].map((item, i) => (
              <div key={i} className="flex items-start gap-2 mb-2 last:mb-0">
                <Check size={13} className="text-[#C9A227] mt-0.5 flex-shrink-0" />
                <p className="text-[#5C4A42] text-xs font-sans">{item}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold text-sm py-3.5 rounded-full hover:bg-[#1DA851] transition-colors"
            >
              Chat on WhatsApp
            </a>
            <button
              onClick={() => navigate("/")}
              className="flex-1 border border-[#C9A227] text-[#9B7A1A] font-semibold text-sm py-3.5 rounded-full hover:bg-[#C9A227]/8 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
