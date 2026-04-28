import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import {
  Heart, TrendingUp, Briefcase, Award, Users, Shield,
  Zap, Star, Target, Play, X, ChevronDown, Check,
  MessageCircle, Phone, MapPin, Mail, ExternalLink,
} from "lucide-react";

// ── BASE URLS ──
const RL = "https://rudralife.com/rudraksha-recommendation/images/";
const LOGO_URL = "https://customer-assets.emergentagent.com/job_spiritual-path-49/artifacts/it9ar00d_image.png";
const HERO_MALA_IMG = "https://customer-assets.emergentagent.com/job_spiritual-path-49/artifacts/7pbng6g5_1920%20x%20720%20Indramala%20website%20Banner%20copy.jpg.jpeg";
const WHATSAPP_NUMBER = "919820302028";

// ── CONSTANTS ──
const EXPERTS_DATA = [
  {
    name: "Dr. Tanay Seetha",
    title: "Founder of Rudralife",
    img: "https://customer-assets.emergentagent.com/job_spiritual-path-49/artifacts/6qw0vi22_image.png",
    desc: "Founder and visionary leader with 25+ years of expertise in Rudraksha research and spiritual guidance.",
    exp: "25+ Years",
  },
  {
    name: "Hemlata Sojitra",
    title: "Director – Operations / Head Panel",
    img: "https://customer-assets.emergentagent.com/job_spiritual-path-49/artifacts/7n5ypemd_image.png",
    desc: "Expert in operations and quality assurance, ensuring authenticity and excellence in every Rudraksha piece.",
    exp: "12+ Years",
  },
  {
    name: "Saumil Seetha",
    title: "Director & Head Panel Expert",
    img: "https://customer-assets.emergentagent.com/job_spiritual-path-49/artifacts/3ri80p5z_image.png",
    desc: "Leading expert in Vedic astrology and Rudraksha consultation with deep knowledge of ancient scriptures.",
    exp: "15+ Years",
  },
  {
    name: "Shruti Sharma",
    title: "Senior Panel Expert",
    img: "https://customer-assets.emergentagent.com/job_spiritual-path-49/artifacts/f6geckg9_image.png",
    desc: "Senior consultant specializing in personalized Rudraksha recommendations based on individual spiritual needs.",
    exp: "10+ Years",
  },
  {
    name: "Shilpa Agarwal",
    title: "Panel Expert",
    img: "https://customer-assets.emergentagent.com/job_spiritual-path-49/artifacts/8xlnt6uc_image.png",
    desc: "Skilled panel expert with expertise in spiritual counseling and Rudraksha therapy for holistic well-being.",
    exp: "8+ Years",
  },
  {
    name: "Madhulika Namboodiri",
    title: "Senior Vedic Consultant",
    img: "https://customer-assets.emergentagent.com/job_spiritual-path-49/artifacts/f8rsnw1s_Madhulika.jpg.jpeg",
    initials: "MN",
    desc: "Expert in Vedic sciences and ancient Indian scriptures, bringing deep scholarly knowledge to every consultation.",
    exp: "10+ Years",
  },
  {
    name: "Dhruv Prakash Sinha",
    title: "Panel Expert & Spiritual Advisor",
    img: "https://customer-assets.emergentagent.com/job_spiritual-path-49/artifacts/fn5icn4z_Dhruv%20Sir.jpg.jpeg",
    initials: "DP",
    desc: "Specialist in numerology and energy alignment with a holistic approach to spiritual well-being guidance.",
    exp: "7+ Years",
  },
];

const PRODUCTS = [
  { name: "Siddha Mala", benefit: "For Overall Growth and Success", img: `${RL}rudraksha/Siddha-Mala-Without-Gold.jpg` },
  { name: "Agya Chakra® in Gold (14 Mukhi)", benefit: "For Sharp Intuition & Decisive Clarity", img: `${RL}rudraksha/14-Mukhi-Rudraksha.jpg` },
  { name: "Gaurishankar Rudraksha in Gold", benefit: "For Harmony, Unity & Strong Relationships", img: `${RL}rudraksha/Gold-Gaurishankar-Rudraksha.jpg` },
  { name: "Shani Kantha", benefit: "For Stability, Protection & Long-Term Success", img: `${RL}rudraksha/Shani-Kantha.jpg` },
  { name: "Surya Power® in Gold (12 Mukhi)", benefit: "For Leadership, Confidence & Inner Strength", img: `${RL}rudraksha/Indramala.jpg` },
  { name: "Kalinetra in Gold (9 Mukhi)", benefit: "For Fearlessness, Energy & Inner Power", img: `${RL}rudraksha/9-Mukhi-Rudraksha.jpg` },
  { name: "1 Mukhi Rudraksha in Gold", benefit: "For Enlightenment, Focus & Supreme Consciousness", img: `${RL}rudraksha/1-Mukhi-Rudraksha.jpg` },
  { name: "Indra Mala", benefit: "For Supreme Power, Prosperity & Divine Abundance", img: `${RL}rudraksha/Indramala.jpg` },
  { name: "21 Mukhi Rudraksha", benefit: "For Generational Wealth & Supreme Prosperity", img: `${RL}rudraksha/21-Mukhi-Rudraksha.jpg` },
  { name: "Trijuti Rudraksha", benefit: "For Absolute Control, Authority & Leadership", img: `${RL}rudraksha/Trijitu-Rudraksha.jpg` },
  { name: "Siddha Mala in Gold", benefit: "For Elevated Growth, Authority & Divine", img: `${RL}rudraksha/Gold-Siddha-Mala.jpg` },
  { name: "Sawar", benefit: "For Property Success & Real Estate Growth", img: `${RL}rudraksha/Sawar-Rudraksha.jpg` },
  { name: "19 Mukhi Rudraksha", benefit: "For Authority, Efficiency & Managerial Excellence", img: `${RL}rudraksha/19-Mukhi-Rudraksha.jpg` },
];

const CLIENTS_ROW1 = [
  { name: "Milind Soman", role: "Model", img: `${RL}clients/5.jpg` },
  { name: "Manoj Bajpayee", role: "Actor", img: `${RL}clients/4.jpg` },
  { name: "Ms. Dimple Kapadia", role: "Actress", img: `${RL}clients/17.jpg` },
  { name: "Shilpa Shetty", role: "Actress", img: `${RL}clients/22.jpg` },
  { name: "Shamita Shetty", role: "Actress", img: `${RL}clients/21.jpg` },
  { name: "Simone Singh", role: "Actress", img: `${RL}clients/23.jpg` },
  { name: "Mr. Shiva", role: "Film Actor", img: `${RL}clients/6.jpg` },
  { name: "Ms. Isha Judd", role: "Spiritual Teacher", img: `${RL}clients/18.jpg` },
  { name: "Ms. Sunanda Shetty", role: "Business Women", img: `${RL}clients/19.jpg` },
];

const CLIENTS_ROW2 = [
  { name: "Mr. Ashok Wadhwa", role: "Group CEO, Ambit Group", img: `${RL}clients/8.jpg` },
  { name: "Mr. Karan Paul", role: "Chairman, Apeejay Surrendra Group", img: `${RL}clients/9.jpg` },
  { name: "Mr. T. S. Krishnamurthy", role: "Ex. Chief Election Commissioner", img: `${RL}clients/15.jpg` },
  { name: "Mr. Rahul Agrawal", role: "Owner, Comesum Group", img: `${RL}clients/11.jpg` },
  { name: "Mr. Sanjay Tanna", role: "Member of Parliament, Uganda", img: `${RL}clients/13.jpg` },
  { name: "Mr. Sanjeev Agrawal", role: "Chairman, Moon Beverages", img: `${RL}clients/14.jpg` },
  { name: "Mr. Prakash C Bisht", role: "CFO, Jubilant Foods", img: `${RL}clients/20.jpg` },
  { name: "Mr. Arun Samarth", role: "Builder", img: `${RL}clients/7.jpg` },
  { name: "kamal agrawal haldiram", role: "Businessman", img: `${RL}clients/3.jpg` },
];

const TESTIMONIALS = [
  { img: `${RL}testamonial-01.jpeg`, url: "https://youtube.com/shorts/z66jiBcpuXE?feature=share" },
  { img: `${RL}testamonial-02.jpeg`, url: "https://youtu.be/0krKhrPS9Lk" },
  { img: `${RL}testamonial-03.jpeg`, url: "https://youtube.com/shorts/NC58jNhiIaI?feature=share" },
  { img: `${RL}testamonial-04.jpeg`, url: "https://youtu.be/o_yEiAp7GHU" },
];

const VIDEOS = [
  {
    title: "Bombay Times Feature",
    outlet: "Bombay Times",
    desc: "Rudralife featured in Bombay Times for pioneering authentic Rudraksha guidance.",
    img: `${RL}bombay-times.jpg`,
    url: "https://youtu.be/58lCjWwCMiQ?si=FqH53Xt2tTY7kBRG",
  },
  {
    title: "Republic Bharat Samwad",
    outlet: "Republic Bharat",
    desc: "Dr. Tanay Seetha discusses 'Rudraksh Ki Shakti' on India's No.1 Hindi news channel.",
    img: `${RL}r-bharat.jpg`,
    url: "https://youtu.be/i9E38ZE8Ve8?si=5yI18rBGo0HxYBFf",
  },
  {
    title: "Swastik Production Podcast",
    outlet: "Swastik Production",
    desc: "An in-depth conversation on Rudraksha science, spirituality and transformation.",
    img: `${RL}Swastik-Production-Podcast.jpeg`,
    url: "https://youtu.be/bWVReX10gr4?si=UUekdd6f4GBWIBFo",
  },
];

const MEDIA_LOGOS = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `${RL}media-logo/${n}-media-logo.jpg`);

const PAYMENT_GATEWAYS = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `${RL}payment-gateway/pg-${n}.jpg`);

const STATS = [
  { label: "Believe Clients", suffix: "+", numericTarget: 500000, display: "5,00,000" },
  { label: "Repeat Customers", suffix: "%", numericTarget: 90, display: "90" },
  { label: "Years of Expertise", suffix: "+", numericTarget: 25, display: "25" },
  { label: "Countries Served", suffix: "+", numericTarget: 52, display: "52" },
];

const HOW_STEPS = [
  { step: "01", title: "Share Your Details", desc: "Tell us your date of birth and what you're seeking: clarity, stability, growth, or protection." },
  { step: "02", title: "Expert Evaluation", desc: "Our Rudraksha experts analyse your details using traditional principles and lived experience." },
  { step: "03", title: "Personalised Match", desc: "You receive a carefully curated Rudraksha recommendation aligned to your energy and goals." },
  { step: "04", title: "Guidance & Support", desc: "We guide you on wearing, energisation, and care — even after delivery." },
];

const FAQS = [
  { q: "How does the Rudraksha recommendation process work?", a: "Our recommendation process combines your birth date, current life goal, and traditional Rudraksha wisdom. Once you submit the form, our experts carefully analyse your information and suggest a Rudraksha or combination that aligns with your energy and intentions." },
  { q: "Do I need prior spiritual knowledge to wear Rudraksha?", a: "Not at all. Rudraksha is for everyone: professionals, entrepreneurs, homemakers, spiritual seekers, and leaders. We provide complete guidance on wearing, energisation, and care, making it simple even for first-time wearers." },
  { q: "Are Rudralife Rudraksha genuine and certified?", a: "Absolutely. Every Rudraksha recommended is 100% authentic, lab-certified, and verified through our in-house testing processes. We do not offer substitutes, replicas, or compromised beads — only genuine Nepal Rudraksha." },
  { q: "What if I'm unsure about which Rudraksha to choose?", a: "That's exactly why this service exists. Instead of guessing or following generic advice, you receive clear, personalised guidance so that you can move forward with confidence and clarity, without confusion or pressure." },
  { q: "Is this only a one-time consultation, or do you offer support later?", a: "Our support continues even after delivery. You receive lifetime guidance on wearing practices, energisation, maintenance, and any questions that arise as your journey evolves." },
  { q: "Am I obligated to purchase after receiving the recommendation?", a: "No. The recommendation is guided, never forced. We explain why a specific Rudraksha is suggested and leave the decision entirely with you — no pressure, no blind selling." },
];

// ── CUSTOM COUNTUP HOOK ──
function useCountUp(target, duration = 2000, active) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let current = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

// ── FLOATING WHATSAPP ──
function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="floating-whatsapp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
      style={{ background: "#25D366", animation: "wa-pulse 2.5s infinite" }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="text-white" size={28} fill="white" />
    </a>
  );
}

// ── EXPERT FLIP CARD ──
function ExpertFlipCard({ expert, index }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      data-testid={`expert-card-${index}`}
      className="relative cursor-pointer h-[360px] sm:h-[390px]"
      style={{ perspective: "1200px" }}
      onClick={() => setFlipped((f) => !f)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        style={{
          position: "relative", width: "100%", height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT */}
        <div
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          className="absolute inset-0 rounded-2xl bg-white border border-[#E8DFD0] shadow-md flex flex-col items-center pt-6 pb-4 px-3 overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent" />
          <div
            className="rounded-full overflow-hidden w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] flex items-center justify-center"
            style={{ border: "2.5px solid #C9A227", boxShadow: "0 4px 20px rgba(201,162,39,0.15)" }}
          >
            {expert.img ? (
              <img src={expert.img} alt={expert.name} className="w-full h-full object-cover" style={{ objectPosition: "center 10%" }} />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FBF5E6] to-[#F0E5C8]">
                <span className="font-serif text-2xl font-semibold text-[#800000]">{expert.initials}</span>
              </div>
            )}
          </div>
          <div className="text-center mt-4 flex-1 flex flex-col justify-center px-1">
            <h3 className="font-serif text-sm sm:text-base font-semibold text-[#2C1E16] mb-1">{expert.name}</h3>
            <p className="text-[#800000] text-xs font-sans leading-snug hidden sm:block">{expert.title}</p>
          </div>
          <span className="text-[#C9A227] text-xs font-sans tracking-widest uppercase">{expert.exp}</span>
          <div className="flex items-center gap-1.5 mt-2 opacity-40">
            <div className="h-px w-4 bg-[#C9A227]" />
            <span className="text-[#C9A227] text-xs font-sans tracking-widest">TAP</span>
            <div className="h-px w-4 bg-[#C9A227]" />
          </div>
        </div>

        {/* BACK */}
        <div
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          className="absolute inset-0 rounded-2xl border border-[#E8DFD0] overflow-hidden flex flex-col p-5"
        >
          <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(160deg, #FDF5F7 0%, #FBF8F0 100%)" }} />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#800000]/40 via-[#800000] to-[#800000]/40" />
          <div className="relative flex flex-col h-full justify-between pt-1">
            <div className="text-center">
              <span className="inline-block bg-[#800000]/8 border border-[#800000]/20 text-[#800000] text-xs font-sans tracking-widest uppercase px-3 py-1 rounded-full">{expert.exp}</span>
            </div>
            <div className="flex items-center gap-2 my-2">
              <div className="h-px flex-1 bg-[#C9A227]/30" />
              <div className="w-1 h-1 rounded-full bg-[#C9A227]/60" />
              <div className="h-px flex-1 bg-[#C9A227]/30" />
            </div>
            <div className="text-center">
              <h3 className="font-serif text-base font-semibold text-[#2C1E16] mb-0.5">{expert.name}</h3>
              <p className="text-[#800000] text-xs font-sans">{expert.title}</p>
            </div>
            <div className="flex items-center gap-2 my-2">
              <div className="h-px flex-1 bg-[#C9A227]/30" />
              <div className="w-1 h-1 rounded-full bg-[#C9A227]/60" />
              <div className="h-px flex-1 bg-[#C9A227]/30" />
            </div>
            <p className="text-[#5C4A42] text-xs leading-relaxed font-sans text-center flex-1">{expert.desc}</p>
            <div className="text-center mt-2">
              <span className="font-serif text-[#C9A227]/25 select-none" style={{ fontSize: "28px" }}>ॐ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── HERO SECTION (DARK FULL-PAGE BANNER) ──
function HeroSection() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-black" data-testid="hero-section">
      {/* ── Background Image ── */}
      <div className="absolute inset-0">
        <img
          src={HERO_MALA_IMG}
          alt="Sacred Rudraksha Mala"
          className="w-full h-full object-cover"
          style={{ objectPosition: "60% center" }}
        />
        {/* Desktop: left dark, right shows mala */}
        <div
          className="absolute inset-0 hidden sm:block"
          style={{
            background:
              "linear-gradient(95deg, rgba(0,0,0,0.93) 0%, rgba(0,0,0,0.85) 38%, rgba(0,0,0,0.48) 62%, rgba(0,0,0,0.12) 100%)",
          }}
        />
        {/* Mobile: stronger overlay so text is always readable */}
        <div
          className="absolute inset-0 sm:hidden"
          style={{ background: "rgba(0,0,0,0.72)" }}
        />
        {/* Top + bottom vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 18%, transparent 80%, rgba(0,0,0,0.45) 100%)",
          }}
        />
      </div>

      {/* ── Navigation Bar ── */}
      <nav className="relative z-30 flex items-center justify-between px-4 sm:px-8 lg:px-12 py-4 sm:py-5">
        {/* Logo — original colors, Rudraksha bead stays brown, white glow for dark bg visibility */}
        <img
          src={LOGO_URL}
          alt="Rudralife"
          className="h-8 sm:h-10 object-contain"
          style={{
            filter: "drop-shadow(0 0 5px rgba(255,255,255,0.9)) drop-shadow(0 0 2px rgba(255,255,255,0.8)) brightness(1.3)",
          }}
        />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7 text-white/70 text-sm font-sans">
          <button onClick={() => scrollTo("how-it-works")} className="hover:text-white transition-colors">Home</button>
          <button onClick={() => scrollTo("product-carousel")} className="hover:text-white transition-colors">Collection</button>
          <button onClick={() => scrollTo("panel-experts")} className="hover:text-white transition-colors">Experts</button>
          <button onClick={() => scrollTo("faq")} className="hover:text-white transition-colors">FAQ</button>
        </div>

        {/* Get Recommendation pill */}
        <button
          onClick={() => navigate("/start")}
          className="hidden md:inline-flex items-center bg-[#C9A227] text-[#1A0A00] font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-[#E0B830] hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-[#C9A227]/30"
        >
          Get Recommendation
        </button>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/80 hover:text-white p-1.5"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-6 bg-current transition-opacity duration-200 ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </nav>

      {/* Mobile nav dropdown */}
      {mobileMenuOpen && (
        <div className="relative z-20 md:hidden bg-black/90 border-t border-white/10 px-5 py-4 flex flex-col gap-3">
          {["how-it-works", "product-carousel", "panel-experts", "faq"].map((id, idx) => (
            <button key={id} onClick={() => scrollTo(id)} className="text-white/70 text-sm font-sans text-left hover:text-[#C9A227] py-1 transition-colors">
              {["Home", "Collection", "Experts", "FAQ"][idx]}
            </button>
          ))}
          <button
            onClick={() => navigate("/start")}
            className="bg-[#C9A227] text-[#1A0A00] font-semibold text-sm px-6 py-3 rounded-full mt-2 text-center"
          >
            Get Recommendation
          </button>
        </div>
      )}

      {/* ── Hero Content ── */}
      <div className="relative z-10 flex items-center min-h-[calc(100vh-64px)] px-4 sm:px-8 lg:px-14 py-8 sm:py-0">
        <div className="w-full max-w-[560px] mx-auto sm:mx-0 text-center sm:text-left">
          {/* Shloka badge */}
          <p className="text-[#C9A227] text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.28em] uppercase font-sans mb-5 sm:mb-7">
            ॐ नमः शिवाय — Sacred Guidance Since 2003
          </p>

          {/* Main Heading */}
          <h1
            className="font-serif font-light text-white mb-0"
            style={{ fontSize: "clamp(40px, 8vw, 96px)", lineHeight: 1.05 }}
          >
            Empower
          </h1>
          <h1
            className="font-serif text-[#C9A227] italic mb-5 sm:mb-7"
            style={{ fontSize: "clamp(40px, 8vw, 96px)", lineHeight: 1.05, fontWeight: 300 }}
          >
            Yourself
          </h1>

          {/* Quote */}
          <p className="text-white/65 text-sm font-sans leading-relaxed mb-7 sm:mb-9 max-w-[400px] italic mx-auto sm:mx-0">
            "Devotion to Rudraksha does not come without reason — you receive it only if it is in your destiny."
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-7 sm:mb-8 items-stretch sm:items-center">
            <button
              data-testid="hero-get-recommendation-btn"
              onClick={() => navigate("/start")}
              className="bg-[#C9A227] text-[#1A0A00] font-semibold text-sm px-9 py-4 rounded-full hover:bg-[#E0B830] hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-[#C9A227]/30 transition-all duration-200 shadow-lg shadow-[#C9A227]/25"
            >
              Get FREE Recommendation
            </button>
            <button
              onClick={() => scrollTo("how-it-works")}
              className="border border-white/35 text-white font-semibold text-sm px-8 py-4 rounded-full hover:bg-white/10 hover:border-white/60 transition-all duration-200"
            >
              Learn More
            </button>
          </div>

          {/* Trust chips */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-white/45 text-xs font-sans justify-center sm:justify-start">
            {["Free Consultation", "Lab-Certified Beads", "No Obligation", "Response in 24 hrs"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Check size={12} className="text-[#C9A227]/80" /> {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-30 animate-bounce">
        <div className="w-px h-6 bg-white" />
        <ChevronDown className="text-white" size={16} />
      </div>
    </section>
  );
}

// ── STATS SECTION (CountUp) ──
function StatsSection() {
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setActive(true); }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const c0 = useCountUp(500000, 2500, active);
  const c1 = useCountUp(90, 2000, active);
  const c2 = useCountUp(25, 1500, active);
  const c3 = useCountUp(52, 1800, active);
  const counts = [c0, c1, c2, c3];

  const formatCount = (idx) => {
    if (idx === 0) {
      const n = counts[0];
      if (n >= 100000) {
        const lakh = Math.floor(n / 100000);
        const rest = Math.floor((n % 100000) / 1000);
        return rest > 0 ? `${lakh},${String(rest).padStart(2, "0")},000` : `${lakh},00,000`;
      }
      return n.toLocaleString("en-IN");
    }
    return counts[idx].toLocaleString();
  };

  return (
    <section ref={ref} className="bg-[#800000] py-10" data-testid="stats-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STATS.map((s, i) => (
            <div key={s.label} className="text-center" data-testid={`stat-item-${i}`}>
              <p className="font-serif text-3xl sm:text-4xl font-semibold text-[#F0C050] mb-1">
                {active ? formatCount(i) : s.display}{s.suffix}
              </p>
              <p className="text-white/75 text-xs sm:text-sm font-sans">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PRODUCT CAROUSEL SECTION ──
function ProductCarouselSection() {
  const navigate = useNavigate();
  return (
    <section className="bg-[#FBF8F2] py-16 md:py-20 overflow-hidden" data-testid="product-carousel-section" id="product-carousel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 md:mb-14 text-center">
        <p className="text-[#800000] text-xs tracking-[0.3em] uppercase font-sans mb-3">Sacred Collection</p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#2C1E16] mb-3">
          Our Rudraksha Collection
        </h2>
        <p className="text-[#5C4A42] text-sm md:text-base font-sans max-w-xl mx-auto leading-relaxed">
          Handpicked, lab-certified Rudraksha for every intention — authentically sourced and expertly curated.
        </p>
      </div>

      <Marquee speed={50} gradient gradientColor={[251, 248, 242]} gradientWidth={80} pauseOnHover>
        {[...PRODUCTS, ...PRODUCTS].map((p, i) => (
          <div
            key={`${p.name}-${i}`}
            className="mx-3 w-[220px] sm:w-[240px] bg-white rounded-2xl overflow-hidden border border-[#E8DFD0] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex-shrink-0"
            onClick={() => navigate("/start")}
          >
            <div className="relative overflow-hidden h-[180px]">
              <img
                src={p.img}
                alt={p.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.target.style.display = "none"; }}
              />
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent" />
            </div>
            <div className="p-3.5">
              <p className="font-serif text-sm font-semibold text-[#2C1E16] leading-snug mb-1">{p.name}</p>
              <p className="text-[#5C4A42] text-xs font-sans leading-relaxed">{p.benefit}</p>
            </div>
          </div>
        ))}
      </Marquee>

      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/start")}
          className="bg-[#800000] text-white font-semibold px-10 py-3.5 rounded-full text-sm hover:bg-[#9B2030] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
          data-testid="product-carousel-cta"
        >
          Get Your Personalised Recommendation
        </button>
      </div>
    </section>
  );
}

// ── QUOTE SECTION ──
function QuoteSection() {
  return (
    <section className="bg-[#F8F4EC] py-16 md:py-20" data-testid="quote-section" id="quote-section">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-[#C9A227] text-sm tracking-[0.4em] uppercase font-sans mb-6">Ancient Vedic Wisdom</p>
        <p className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-[#800000] italic leading-relaxed mb-6">
          "रुद्राक्षं शिवयोर्मध्ये सर्वपापहरं परम्"
        </p>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px bg-[#C9A227]/40 w-16" />
          <div className="w-2 h-2 rounded-full bg-[#C9A227]" />
          <div className="h-px bg-[#C9A227]/40 w-16" />
        </div>
        <p className="font-serif text-lg sm:text-xl text-[#2C1E16] leading-relaxed max-w-2xl mx-auto italic">
          "Devotion to Rudraksha does not come without reason — you receive it only if it is in your destiny or good fortune."
        </p>
        <p className="text-[#5C4A42] text-xs font-sans mt-4 tracking-widest uppercase opacity-60">— Shiva Purana</p>
      </div>
    </section>
  );
}

// ── HOW IT WORKS ──
function HowItWorksSection() {
  const navigate = useNavigate();
  return (
    <section className="bg-[#FBF8F2] py-16 md:py-24" data-testid="how-it-works-section" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[#800000] text-xs tracking-[0.3em] uppercase font-sans mb-3">Simple Process</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#2C1E16]">How Our Recommendation Works</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_STEPS.map((s, i) => (
            <div key={s.step} className="relative bg-white rounded-2xl p-6 border border-[#E8DFD0] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-transparent via-[#C9A227] to-transparent" />
              <div className="w-10 h-10 rounded-full bg-[#800000]/8 border border-[#800000]/15 flex items-center justify-center mb-4">
                <span className="font-serif text-[#800000] font-semibold text-sm">{s.step}</span>
              </div>
              <h3 className="font-serif text-base font-semibold text-[#2C1E16] mb-2">{s.title}</h3>
              <p className="text-[#5C4A42] text-sm leading-relaxed font-sans">{s.desc}</p>
              {i < HOW_STEPS.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/30 items-center justify-center z-10">
                  <span className="text-[#C9A227] text-xs">›</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/start")}
            className="bg-[#800000] text-white font-semibold px-10 py-3.5 rounded-full text-sm hover:bg-[#9B2030] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
          >
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
}

// ── TRUSTED BY SEEKERS (Dual-row) ──
function TrustedBySeekersSection() {
  return (
    <section className="bg-[#F8F4EC] py-16 md:py-20 overflow-hidden" data-testid="trusted-section" id="trusted-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 md:mb-14">
        <p className="text-[#800000] text-xs tracking-[0.3em] uppercase font-sans mb-3">Seekers Worldwide</p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#2C1E16] mb-3">
          Trusted by Seekers Worldwide
        </h2>
        <p className="text-[#5C4A42] text-sm md:text-base font-sans max-w-xl mx-auto">
          From spiritual practitioners to professionals and leaders, Rudralife serves a diverse global community.
        </p>
      </div>

      {/* Row 1: left scroll */}
      <div className="mb-4">
        <Marquee speed={40} gradient gradientColor={[248, 244, 236]} gradientWidth={80} pauseOnHover>
          {[...CLIENTS_ROW1, ...CLIENTS_ROW1].map((c, i) => (
            <ClientCard key={`r1-${i}`} client={c} />
          ))}
        </Marquee>
      </div>

      {/* Row 2: right scroll */}
      <Marquee speed={40} direction="right" gradient gradientColor={[248, 244, 236]} gradientWidth={80} pauseOnHover>
        {[...CLIENTS_ROW2, ...CLIENTS_ROW2].map((c, i) => (
          <ClientCard key={`r2-${i}`} client={c} />
        ))}
      </Marquee>
    </section>
  );
}

function ClientCard({ client }) {
  return (
    <div className="mx-3 flex flex-col items-center w-[150px] sm:w-[170px] flex-shrink-0">
      <div
        className="rounded-full overflow-hidden w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] mb-2 bg-[#E8DFD0]"
        style={{ border: "2px solid #C9A227", boxShadow: "0 2px 12px rgba(201,162,39,0.12)" }}
      >
        <img
          src={client.img}
          alt={client.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = "none"; }}
        />
      </div>
      <p className="font-serif text-xs font-semibold text-[#2C1E16] text-center leading-tight">{client.name}</p>
      <p className="text-[#5C4A42] text-xs font-sans text-center leading-tight mt-0.5 opacity-70">{client.role}</p>
    </div>
  );
}

// ── PANEL EXPERTS SECTION ──
function PanelExpertsSection() {
  return (
    <section className="bg-[#FBF8F2] py-16 md:py-24" data-testid="panel-experts-section" id="panel-experts">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-[#800000] text-xs tracking-[0.3em] uppercase font-sans mb-3">Guided by Masters</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#2C1E16] mb-3">
            Panel Experts Of Rudralife
          </h2>
          <p className="text-[#5C4A42] text-sm md:text-base font-sans max-w-xl mx-auto leading-relaxed">
            Meet the guiding minds behind Rudralife's mission — a panel of Vedic experts bringing together ancient knowledge and deep compassion.
          </p>
          <p className="text-[#C9A227] text-xs font-sans mt-2 opacity-60 tracking-wide">Hover or tap to know more</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 md:gap-5">
          {EXPERTS_DATA.map((e, i) => (
            <ExpertFlipCard key={e.name} expert={e} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── VIDEO TESTIMONIALS SECTION ──
function VideoTestimonialsSection() {
  return (
    <section className="bg-[#F8F4EC] py-16 md:py-20" data-testid="video-testimonials-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-[#800000] text-xs tracking-[0.3em] uppercase font-sans mb-3">Real Stories</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#2C1E16] mb-3">
            What Our Clients Say
          </h2>
          <p className="text-[#5C4A42] text-sm md:text-base font-sans max-w-xl mx-auto">
            Hear from those whose lives have been transformed through authentic Rudraksha guidance.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <a
              key={i}
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`testimonial-card-${i}`}
              className="group relative rounded-2xl overflow-hidden border border-[#E8DFD0] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden bg-[#E8DFD0]">
                <img
                  src={t.img}
                  alt={`Testimonial ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.style.backgroundColor = "#E8DFD0"; e.target.style.display = "none"; }}
                />
              </div>
              <div className="absolute inset-0 bg-[#2C1E16]/20 group-hover:bg-[#2C1E16]/10 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/90 group-hover:bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-200">
                  <Play size={18} className="text-[#800000] ml-0.5" fill="#800000" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FEATURED & RECOGNISED ──
function FeaturedSection() {
  return (
    <section className="bg-[#FBF8F2] py-16 md:py-24" data-testid="featured-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[#800000] text-xs tracking-[0.3em] uppercase font-sans mb-3">In The Media</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#2C1E16] mb-3">
            Featured & Recognised
          </h2>
          <p className="text-[#5C4A42] text-sm md:text-base font-sans max-w-xl mx-auto">
            Rudralife has been featured by renowned personalities and leading media platforms for its authenticity and contribution to spiritual heritage.
          </p>
        </div>

        {/* 3 Video Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
          {VIDEOS.map((video, i) => (
            <a
              key={i}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`video-card-${i}`}
              className="group bg-white rounded-2xl overflow-hidden border border-[#E8DFD0] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden">
                <img
                  src={video.img}
                  alt={video.title}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) => { e.target.style.backgroundColor = "#E8DFD0"; e.target.style.height = "200px"; }}
                />
                <div className="absolute inset-0 bg-[#2C1E16]/30 group-hover:bg-[#2C1E16]/20 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-white/90 group-hover:bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-200">
                    <Play size={22} className="text-[#800000] ml-0.5" fill="#800000" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 bg-[#800000] text-white text-xs font-sans font-semibold px-3 py-1 rounded-full">
                  {video.outlet}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-serif text-base font-semibold text-[#2C1E16] mb-1">{video.title}</h3>
                <p className="text-[#5C4A42] text-xs font-sans leading-relaxed">{video.desc}</p>
                <div className="flex items-center gap-1.5 mt-3 text-[#800000] text-xs font-sans">
                  <ExternalLink size={12} />
                  <span>Watch Now</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Media Logos Marquee */}
        <div className="border-t border-b border-[#E8DFD0] py-8">
          <p className="text-center text-[#5C4A42] text-xs font-sans tracking-widest uppercase mb-6 opacity-60">
            As Featured In
          </p>
          <Marquee speed={45} gradient gradientColor={[251, 248, 242]} gradientWidth={80}>
            {[...MEDIA_LOGOS, ...MEDIA_LOGOS].map((logo, i) => (
              <div key={`logo-${i}`} className="mx-6 flex items-center justify-center" style={{ height: "60px", width: "120px" }}>
                <img
                  src={logo}
                  alt={`Media ${i + 1}`}
                  className="h-10 object-contain opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

// ── FAQ SECTION ──
function FAQSection() {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  return (
    <section className="bg-[#F8F4EC] py-16 md:py-24" data-testid="faq-section" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-[#800000] text-xs tracking-[0.3em] uppercase font-sans mb-3">Clarity First</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#2C1E16]">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              data-testid={`faq-item-${i}`}
              className="bg-white rounded-2xl border border-[#E8DFD0] overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-serif text-sm sm:text-base font-medium text-[#2C1E16] pr-4">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-[#C9A227] flex-shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-4 border-t border-[#E8DFD0]">
                  <p className="text-[#5C4A42] text-sm leading-relaxed font-sans pt-4">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <p className="text-[#5C4A42] text-sm font-sans mb-4">Still have questions? Our experts are here to help.</p>
          <button
            onClick={() => navigate("/start")}
            className="bg-[#C9A227] text-[#2C1E16] font-semibold px-8 py-3 rounded-full text-sm hover:bg-[#E0B830] hover:-translate-y-0.5 transition-all duration-200 shadow-md"
          >
            Talk to an Expert
          </button>
        </div>
      </div>
    </section>
  );
}

// ── CTA BANNER ──
function CTABanner() {
  const navigate = useNavigate();
  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #FFF5E8 0%, #FDE8EC 50%, #FFF5E8 100%)" }}
      data-testid="cta-banner"
    >
      <div className="absolute right-8 top-1/2 -translate-y-1/2 font-serif text-[#800000]/5 select-none pointer-events-none hidden md:block" style={{ fontSize: "260px" }}>ॐ</div>
      <div className="absolute -left-10 top-0 w-64 h-64 rounded-full bg-[#C9A227]/6 blur-3xl" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-[#800000] text-xs tracking-[0.3em] uppercase font-sans mb-4">Begin Your Sacred Journey</p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#2C1E16] mb-4">
          Your Rudraksha Awaits
        </h2>
        <p className="text-[#5C4A42] text-sm md:text-base font-sans mb-8 max-w-lg mx-auto leading-relaxed">
          Take the first step towards aligned living. Our panel of Vedic experts are ready to guide you — personally, authentically, and with full transparency.
        </p>
        <button
          data-testid="cta-get-recommendation-btn"
          onClick={() => navigate("/start")}
          className="bg-[#800000] text-white font-semibold px-10 sm:px-14 py-4 rounded-full text-sm sm:text-base hover:bg-[#9B2030] hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#800000]/20 transition-all duration-200 w-full sm:w-auto"
        >
          Get Your Personalised Recommendation — Free
        </button>
        <p className="text-[#5C4A42]/60 text-xs font-sans mt-4">Free · Authentic · No Obligation · Response within 24 hrs</p>
      </div>
    </section>
  );
}

// ── FOOTER ──
function SiteFooter() {
  const navigate = useNavigate();
  return (
    <footer className="bg-[#2C1E16] text-white" data-testid="footer">
      {/* Main footer */}
      <div className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Logo + message */}
          <div className="text-center mb-10 pb-10 border-b border-white/10">
            <img
              src={`${RL}footer-logo.png`}
              alt="Rudralife Logo"
              className="h-12 mx-auto mb-6"
              onError={(e) => {
                e.target.style.display = "none";
                const fallback = e.target.nextSibling;
                if (fallback) fallback.style.display = "block";
              }}
            />
            <img src={LOGO_URL} alt="Rudralife Logo" className="h-12 mx-auto mb-6 brightness-110" style={{ display: "none" }} />
            <p className="font-serif text-base sm:text-lg font-light text-white/85 leading-relaxed max-w-2xl mx-auto italic">
              "At Rudralife, we believe that Rudraksha is not just a bead — it is a divine connection. For over 25 years, we have guided thousands of seekers on their spiritual journey with authenticity, trust, and sacred knowledge."
            </p>
          </div>

          {/* 3 column info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
            <div>
              <h4 className="font-serif text-sm font-semibold text-[#C9A227] mb-3 tracking-wide">Contact Us</h4>
              <div className="space-y-2">
                <a href="tel:+919820302028" className="flex items-center gap-2 text-white/65 text-sm font-sans hover:text-[#C9A227] transition-colors">
                  <Phone size={14} /> +91 98203 02028
                </a>
                <a href="mailto:info@rudralife.com" className="flex items-center gap-2 text-white/65 text-sm font-sans hover:text-[#C9A227] transition-colors">
                  <Mail size={14} /> info@rudralife.com
                </a>
                <a href="https://rudralife.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/65 text-sm font-sans hover:text-[#C9A227] transition-colors">
                  <ExternalLink size={14} /> www.rudralife.com
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-serif text-sm font-semibold text-[#C9A227] mb-3 tracking-wide">Quick Links</h4>
              <ul className="space-y-2 text-white/65 text-sm font-sans">
                <li><button onClick={() => navigate("/start")} className="hover:text-[#C9A227] transition-colors text-left">Get FREE Recommendation</button></li>
                <li><a href="/#panel-experts" className="hover:text-[#C9A227] transition-colors">Meet Our Experts</a></li>
                <li><a href="/#faq" className="hover:text-[#C9A227] transition-colors">FAQs</a></li>
                <li><a href="https://rudralife.com/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A227] transition-colors">Terms & Conditions</a></li>
                <li><a href="https://rudralife.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A227] transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-sm font-semibold text-[#C9A227] mb-3 tracking-wide">Secure Payments</h4>
              <div className="grid grid-cols-3 gap-1.5 mb-4">
                {PAYMENT_GATEWAYS.slice(0, 9).map((pg, i) => (
                  <div key={i} className="bg-white rounded-md p-1 flex items-center justify-center h-8">
                    <img
                      src={pg}
                      alt={`Payment ${i + 1}`}
                      className="h-5 object-contain"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] text-white text-xs font-sans px-4 py-2 rounded-full hover:bg-[#1DA851] transition-colors"
                >
                  <MessageCircle size={13} /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar + Social Icons */}
          <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
            {/* Social Media Icons */}
            <div className="flex items-center justify-center gap-3">
              <p className="text-white/40 text-xs font-sans mr-1">Follow us:</p>
              {[
                { label: "Facebook", href: "https://www.facebook.com/rudralife", icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                )},
                { label: "Instagram", href: "https://www.instagram.com/rudralife", icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                )},
                { label: "YouTube", href: "https://www.youtube.com/@rudralife", icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon fill="#2C1E16" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
                )},
                { label: "LinkedIn", href: "https://www.linkedin.com/company/rudralife", icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                )},
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  data-testid={`social-${s.label.toLowerCase()}`}
                  className="w-9 h-9 rounded-full bg-white/8 border border-white/15 flex items-center justify-center text-white/60 hover:text-[#C9A227] hover:border-[#C9A227]/50 hover:bg-white/12 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-white/40 text-xs font-sans">
              <p>© {new Date().getFullYear()} Rudralife®. All rights reserved.</p>
              <p>Personalised Rudraksha Recommendation by India's Most Trusted Experts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-[#1A120C] py-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/35 text-xs font-sans leading-relaxed">
            <strong className="text-white/50">Disclaimer:</strong> Wearing Rudraksha is a matter of faith and belief. All information provided is based on the scriptures, published books and individual experiences. Rudralife guarantees the quality of the beads and not the effects. Wearer discretion is advised.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── MAIN EXPORT ──
export default function LandingPage() {
  return (
    <div className="bg-[#F8F4EC]">
      <FloatingWhatsApp />
      <HeroSection />
      <StatsSection />
      <QuoteSection />
      <HowItWorksSection />
      <PanelExpertsSection />
      <ProductCarouselSection />
      <TrustedBySeekersSection />
      <VideoTestimonialsSection />
      <FeaturedSection />
      <FAQSection />
      <CTABanner />
      <SiteFooter />
    </div>
  );
}
