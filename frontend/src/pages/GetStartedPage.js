import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart, TrendingUp, Briefcase, Award, Users, Shield,
  Zap, Star, Target, Check, ChevronLeft, ChevronRight,
  Lock, ChevronDown, ArrowLeft,
} from "lucide-react";

const API_URL = process.env.REACT_APP_BACKEND_URL;
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

const GOALS = [
  { label: "Health & Wellness", icon: Heart, color: "#E05C6A" },
  { label: "Wealth & Abundance", icon: TrendingUp, color: "#2D8C5A" },
  { label: "Business Growth", icon: Briefcase, color: "#2563EB" },
  { label: "Career Advancement", icon: Award, color: "#D97706" },
  { label: "Relationships", icon: Users, color: "#DB2777" },
  { label: "Protection & Positivity", icon: Shield, color: "#7C3AED" },
  { label: "Clarity & Focus", icon: Zap, color: "#CA8A04" },
  { label: "Spiritual Growth", icon: Star, color: "#EA580C" },
  { label: "Leadership & Power", icon: Target, color: "#4F46E5" },
];

const COUNTRY_CODES = [
  { name: "India", code: "+91" }, { name: "United States", code: "+1" },
  { name: "United Arab Emirates", code: "+971" }, { name: "United Kingdom", code: "+44" },
  { name: "Canada", code: "+1 CA" }, { name: "Australia", code: "+61" },
  { name: "Singapore", code: "+65" }, { name: "Saudi Arabia", code: "+966" },
  { name: "Kuwait", code: "+965" }, { name: "Qatar", code: "+974" },
  { name: "Bahrain", code: "+973" }, { name: "Oman", code: "+968" },
  { name: "Nepal", code: "+977" }, { name: "Sri Lanka", code: "+94" },
  { name: "Bangladesh", code: "+880" }, { name: "Malaysia", code: "+60" },
  { name: "South Africa", code: "+27" }, { name: "Germany", code: "+49" },
  { name: "France", code: "+33" }, { name: "Netherlands", code: "+31" },
  { name: "New Zealand", code: "+64" }, { name: "Switzerland", code: "+41" },
  { name: "Sweden", code: "+46" }, { name: "Norway", code: "+47" },
  { name: "Mauritius", code: "+230" }, { name: "Kenya", code: "+254" },
  { name: "Nigeria", code: "+234" }, { name: "Hong Kong", code: "+852" },
  { name: "Japan", code: "+81" }, { name: "Indonesia", code: "+62" },
  { name: "Philippines", code: "+63" }, { name: "Thailand", code: "+66" },
  { name: "Brazil", code: "+55" }, { name: "Mexico", code: "+52" },
];

const COUNTRY_OPTIONS = Array.from(new Set(COUNTRY_CODES.map((item) => item.name)));

const STEPS_META = [
  { label: "Name", step: 1 }, { label: "Contact", step: 2 },
  { label: "Personal", step: 3 }, { label: "Location", step: 4 },
  { label: "Goals", step: 5 }, { label: "Story", step: 6 },
];

const TRUST_POINTS = [
  { icon: Check, text: "Free personalised consultation — no hidden charges" },
  { icon: Shield, text: "100% authentic, lab-certified Rudraksha beads" },
  { icon: Users, text: "Guided by 7 dedicated panel experts" },
  { icon: Star, text: "Response within 24 hours via WhatsApp or call" },
];

// ── Left Trust Panel ──
function TrustPanel({ navigate }) {
  return (
    <div className="relative lg:w-[44%] lg:min-h-screen bg-black overflow-hidden flex-shrink-0">
      {/* Background */}
      <img
        src={HERO_MALA_IMG}
        alt="Sacred Rudraksha"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "55% center" }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.80) 50%, rgba(0,0,0,0.92) 100%)" }} />

      <div className="relative z-10 flex flex-col h-full p-6 sm:p-8 lg:p-10 min-h-screen lg:min-h-0">
        {/* Logo */}
        <div className="mb-8 lg:mb-10">
          <img
            src={LOGO_URL}
            alt="Rudralife"
            className="h-9 object-contain cursor-pointer"
            style={{ filter: "drop-shadow(0 0 5px rgba(255,255,255,0.9)) drop-shadow(0 0 2px rgba(255,255,255,0.8)) brightness(1.3)" }}
            onClick={() => navigate("/")}
          />
        </div>

        {/* Main heading */}
        <div className="mb-6">
          <p className="text-[#C9A227] text-[10px] tracking-[0.3em] uppercase font-sans mb-3">
            ॐ नमः शिवाय — Sacred Guidance
          </p>
          <h1 className="font-serif font-light text-white leading-tight mb-3" style={{ fontSize: "clamp(26px, 3.5vw, 42px)" }}>
            Get Your<br />
            <span className="text-[#C9A227] italic">Sacred</span><br />
            Rudraksha
          </h1>
          <p className="text-white/60 text-sm font-sans leading-relaxed max-w-sm">
            Personalised guidance from India's most trusted Rudraksha experts, rooted in 25 years of Vedic tradition.
          </p>
        </div>

        {/* Trust bullets */}
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

        {/* Expert faces */}
        <div className="mb-7">
          <p className="text-white/40 text-xs font-sans tracking-widest uppercase mb-3">OUR PANEL EXPERTS AND OTHER'S</p>
          <div className="flex items-center gap-1.5 flex-wrap">
            {EXPERT_FACES.map((e, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#C9A227]/60 flex-shrink-0"
                title={e.name}
              >
                <img
                  src={e.img}
                  alt={e.name}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 10%" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3 mb-7">
          {[
            { num: "5,00,000+", label: "Believer Clients" },
            { num: "25+", label: "Years Expertise" },
            { num: "52+", label: "Countries Served" },
            { num: "100%", label: "Lab Certified" },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5">
              <p className="font-serif text-[#C9A227] text-lg font-semibold leading-none">{s.num}</p>
              <p className="text-white/50 text-xs font-sans mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="border-t border-white/10 pt-5 mt-auto">
          <p className="text-white/55 text-xs font-sans italic leading-relaxed">
            "Devotion to Rudraksha does not come without reason — you receive it only if it is in your destiny."
          </p>
          <p className="text-[#C9A227]/60 text-xs font-sans mt-1">— Shrimad Devi Bhagvatam</p>
        </div>
      </div>
    </div>
  );
}

// ── Country Code Selector ──
function CountryCodeSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const sel = COUNTRY_CODES.find((c) => c.code === value) || COUNTRY_CODES[0];
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 h-full px-2.5 bg-[#F0EAE0] border border-[#E8DFD0] rounded-l-xl border-r-0 text-sm text-[#2C1E16] font-sans whitespace-nowrap hover:bg-[#EAE0D0] transition-colors min-w-[64px] justify-between"
      >
        <span className="font-medium text-xs">{sel.code.replace(" CA", "")}</span>
        <ChevronDown size={12} className={`text-[#9B8070] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 z-50 mt-1 bg-white border border-[#E8DFD0] rounded-xl shadow-2xl overflow-y-auto" style={{ maxHeight: "220px", minWidth: "190px" }}>
          {COUNTRY_CODES.map((c) => (
            <button key={c.code + c.name} type="button"
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-sans text-[#2C1E16] hover:bg-[#F8F4EC] transition-colors text-left"
              onClick={() => { onChange(c.code); setOpen(false); }}
            >
              <span className="text-[#800000] font-semibold min-w-[38px]">{c.code.replace(" CA", "")}</span>
              <span className="text-[#5C4A42] truncate">{c.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Progress Bar ──
function ProgressBar({ step }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-start mb-2.5">
        {STEPS_META.map((s) => (
          <div key={s.step} className="flex flex-col items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
              s.step < step ? "bg-[#800000] text-white" :
              s.step === step ? "bg-[#800000] text-white ring-2 ring-[#800000]/25 ring-offset-1" :
              "bg-[#E8DFD0] text-[#9B8070]"}`}>
              {s.step < step ? <Check size={11} /> : s.step}
            </div>
            <span className={`text-[10px] font-sans mt-1 hidden sm:block ${s.step <= step ? "text-[#800000]" : "text-[#B0A090]"}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
      <div className="h-1 bg-[#E8DFD0] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#800000] to-[#C9A227] rounded-full transition-all duration-500"
          style={{ width: `${Math.round(((step - 1) / 6) * 100)}%` }}
        />
      </div>
    </div>
  );
}

const inputClass = "w-full border border-[#E8DFD0] bg-white rounded-xl px-4 py-3 text-[#2C1E16] text-sm font-sans placeholder-[#B0A090] focus:outline-none focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227] transition-all";

function FieldLabel({ label, required, error, children }) {
  return (
    <div className="mb-4">
      <label className="block font-serif text-sm font-medium text-[#2C1E16] mb-1.5">
        {label}{required && <span className="text-[#800000]"> *</span>}
      </label>
      {children}
      {error && <p className="text-red-600 text-xs mt-1 font-sans">{error}</p>}
    </div>
  );
}

function getCountryFromCode(code) {
  const match = COUNTRY_CODES.find((item) => item.code === code);
  return match ? match.name : "India";
}

// ── Main Page ──
export default function GetStartedPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    fullName: "",
    countryCode: "+91",
    phoneNumber: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    city: "",
    country: "India",
    goals: [],
    story: "",
  });

  const set = (key, val) => {
    setForm((p) => ({
      ...p,
      [key]: val,
      ...(key === "countryCode" ? { country: getCountryFromCode(val) } : {}),
    }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const toggleGoal = (label) => {
    setForm((p) => ({
      ...p,
      goals: p.goals.includes(label) ? p.goals.filter((g) => g !== label) : [...p.goals, label],
    }));
    setErrors((e) => ({ ...e, goals: "" }));
  };

  const validate = () => {
    const e = {};
    if (step === 1 && !form.fullName.trim()) e.fullName = "Name is required";
    if (step === 2) {
      if (!form.phoneNumber.trim()) e.phoneNumber = "Mobile number is required";
      else if (!/^\d{7,15}$/.test(form.phoneNumber.replace(/\s/g, ""))) e.phoneNumber = "Enter a valid mobile number";
      if (!form.email.trim()) e.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    }
    if (step === 3) {
      if (!form.dateOfBirth) e.dateOfBirth = "Date of birth is required";
      if (!form.gender) e.gender = "Please select gender";
    }
    if (step === 4 && !form.city.trim()) e.city = "City is required";
    if (step === 5 && form.goals.length === 0) e.goals = "Please select at least one area";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate()) setStep((s) => s + 1); };
  const back = () => { setStep((s) => s - 1); setErrors({}); };

  const submit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const resp = await fetch(`${API_URL}/api/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          phoneNumber: `${form.countryCode.replace(" CA", "")} ${form.phoneNumber}`,
          email: form.email,
          dateOfBirth: form.dateOfBirth,
          gender: form.gender,
          city: form.city,
          country: form.country,
          countryCode: form.countryCode.replace(" CA", ""),
          primaryGoal: form.goals.join(", "),
          mainChallenge: form.story,
          goals: form.goals,
          story: form.story,
        }),
      });
      if (resp.ok) {
        localStorage.setItem("rudra_name", form.fullName);
        navigate("/thankyou");
        window.location.reload(); // force reload
      } else {
        const err = await resp.json().catch(() => ({}));
        alert(err.detail || "Something went wrong. Please try again.");
      }
    } catch {
      alert("Could not connect. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Success Screen ──
  if (step === 7) {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row" data-testid="getstarted-success">
        <TrustPanel navigate={navigate} />
        <div className="flex-1 bg-[#F8F4EC] flex items-center justify-center p-6 lg:p-10">
          <div className="w-full max-w-md text-center">
            <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-6">
              <Check size={36} className="text-green-600" strokeWidth={2.5} />
            </div>
            <p className="font-serif text-3xl font-light text-[#800000] mb-1">Namaste</p>
            <h2 className="font-serif text-xl font-semibold text-[#2C1E16] mb-2">{form.fullName}</h2>
            <div className="flex items-center gap-3 my-4">
              <div className="h-px flex-1 bg-[#C9A227]/30" />
              <span className="text-[#C9A227] font-serif">ॐ</span>
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

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" data-testid="getstarted-page">
      {/* ── LEFT: Trust Panel ── */}
      <TrustPanel navigate={navigate} />

      {/* ── RIGHT: Form Panel ── */}
      <div className="flex-1 bg-[#F8F4EC] flex items-start lg:items-center justify-center overflow-y-auto">
        <div className="w-full max-w-xl px-4 sm:px-6 py-8 lg:py-10">

          {/* Back link */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-[#9B8070] text-xs font-sans hover:text-[#800000] transition-colors mb-6"
            data-testid="getstarted-back-home"
          >
            <ArrowLeft size={14} /> Back to Home
          </button>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-lg border border-[#E8DFD0] overflow-hidden" data-testid="getstarted-form-card">
            {/* Gold top bar */}
            <div className="h-1 bg-gradient-to-r from-[#800000] via-[#C9A227] to-[#800000]" />

            <div className="px-5 sm:px-7 pt-6 pb-4 border-b border-[#F0EAE0]">
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-serif text-base font-semibold text-[#2C1E16]">
                  {step === 1 && "Tell Us Your Name"}
                  {step === 2 && "Contact Details"}
                  {step === 3 && "Personal Details"}
                  {step === 4 && "Your Location"}
                  {step === 5 && "What Are You Seeking?"}
                  {step === 6 && "Your Story"}
                </h2>
                <span className="text-[#B0A090] text-xs font-sans">Step {step} / 6</span>
              </div>
              <ProgressBar step={step} />
            </div>

            {/* Privacy bar */}
            <div className="px-5 sm:px-7 pt-4">
              <div className="flex items-center gap-2 bg-green-50 border border-green-100 text-green-800 text-xs font-sans px-3.5 py-2.5 rounded-xl">
                <Lock size={12} className="text-green-500 flex-shrink-0" />
                <span>We are committed to protecting your data and maintaining your privacy.</span>
              </div>
            </div>

            {/* Form body */}
            <div className="px-5 sm:px-7 py-5">

              {/* ── STEP 1 ── */}
              {step === 1 && (
                <div data-testid="gs-step-1">
                  <p className="text-[#5C4A42] text-sm font-sans mb-5">Welcome! Let's begin your sacred journey. What is your name?</p>
                  <FieldLabel label="Full Name" required error={errors.fullName}>
                    <input data-testid="gs-input-name" className={inputClass} placeholder="Enter your full name"
                      value={form.fullName} onChange={(e) => set("fullName", e.target.value)} autoFocus />
                  </FieldLabel>
                </div>
              )}

              {/* ── STEP 2 ── */}
              {step === 2 && (
                <div data-testid="gs-step-2">
                  <p className="text-[#5C4A42] text-sm font-sans mb-5">Our experts will use this to share your recommendation.</p>
                  <FieldLabel label="Mobile Number" required error={errors.phoneNumber}>
                    <div className="flex rounded-xl overflow-visible border border-[#E8DFD0] bg-white focus-within:ring-2 focus-within:ring-[#C9A227]/50 focus-within:border-[#C9A227] transition-all relative">
                      <CountryCodeSelect value={form.countryCode} onChange={(v) => set("countryCode", v)} />
                      <div className="w-px bg-[#E8DFD0] self-stretch" />
                      <input data-testid="gs-input-phone" className="flex-1 px-3 py-3 text-[#2C1E16] text-sm font-sans placeholder-[#B0A090] focus:outline-none bg-transparent rounded-r-xl"
                        placeholder="Mobile number" value={form.phoneNumber}
                        onChange={(e) => set("phoneNumber", e.target.value.replace(/[^\d\s]/g, ""))} type="tel" />
                    </div>
                  </FieldLabel>
                  <FieldLabel label="Email Address" required error={errors.email}>
                    <input data-testid="gs-input-email" className={inputClass} placeholder="your@email.com" type="email"
                      value={form.email} onChange={(e) => set("email", e.target.value)} />
                  </FieldLabel>
                </div>
              )}

              {/* ── STEP 3 ── */}
              {step === 3 && (
                <div data-testid="gs-step-3">
                  <p className="text-[#5C4A42] text-sm font-sans mb-5">This helps us align your cosmic energy profile.</p>
                  <FieldLabel label="Date of Birth" required error={errors.dateOfBirth}>
                    <input data-testid="gs-input-dob" className={inputClass} type="date" value={form.dateOfBirth}
                      onChange={(e) => set("dateOfBirth", e.target.value)} max={new Date().toISOString().split("T")[0]} />
                  </FieldLabel>
                  <FieldLabel label="Gender" required error={errors.gender}>
                    <div className="flex gap-3" data-testid="gs-gender-options">
                      {["Male", "Female", "Other"].map((g) => (
                        <button key={g} type="button" onClick={() => set("gender", g)}
                          className={`flex-1 py-3 rounded-xl text-sm font-sans border transition-all duration-200 ${
                            form.gender === g ? "bg-[#800000] text-white border-[#800000]" : "bg-white border-[#E8DFD0] text-[#5C4A42] hover:border-[#C9A227]"
                          }`}>{g}</button>
                      ))}
                    </div>
                  </FieldLabel>
                </div>
              )}

              {/* ── STEP 4 ── */}
              {step === 4 && (
                <div data-testid="gs-step-4">
                  <p className="text-[#5C4A42] text-sm font-sans mb-5">We serve seekers from 52+ countries worldwide.</p>
                  <FieldLabel label="City" required error={errors.city}>
                    <input data-testid="gs-input-city" className={inputClass} placeholder="Your city"
                      value={form.city} onChange={(e) => set("city", e.target.value)} />
                  </FieldLabel>
                  <FieldLabel label="Country">
                    <select
                      data-testid="gs-input-country"
                      className={inputClass}
                      value={form.country}
                      onChange={(e) => set("country", e.target.value)}
                    >
                      {COUNTRY_OPTIONS.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </FieldLabel>
                </div>
              )}

              {/* ── STEP 5 ── */}
              {step === 5 && (
                <div data-testid="gs-step-5">
                  <p className="text-[#5C4A42] text-sm font-sans mb-1">Choose the areas where you seek alignment and growth.</p>
                  <p className="text-[#B0A090] text-xs font-sans mb-4">Pick one or more</p>
                  {errors.goals && <p className="text-red-600 text-xs mb-3 font-sans">{errors.goals}</p>}
                  <div className="grid grid-cols-3 gap-2" data-testid="gs-goals-grid">
                    {GOALS.map(({ label, icon: Icon, color }) => {
                      const sel = form.goals.includes(label);
                      return (
                        <button key={label} type="button" onClick={() => toggleGoal(label)}
                          className={`relative flex flex-col items-center justify-center gap-1.5 p-2.5 sm:p-3 rounded-xl text-center border transition-all duration-200 ${
                            sel ? "border-[#C9A227] bg-[#FFF8E8] shadow-md scale-[1.02]" : "border-[#E8DFD0] bg-white hover:border-[#C9A227]/50"
                          }`}>
                          {sel && (
                            <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#C9A227] rounded-full flex items-center justify-center">
                              <Check size={9} className="text-white" strokeWidth={3} />
                            </div>
                          )}
                          <Icon size={18} style={{ color }} />
                          <span className="text-[#2C1E16] text-[10px] sm:text-xs font-sans leading-tight">{label}</span>
                        </button>
                      );
                    })}
                  </div>
                  {form.goals.length > 0 && (
                    <p className="text-[#800000] text-xs font-sans mt-3 text-center">
                      {form.goals.length} area{form.goals.length > 1 ? "s" : ""} selected
                    </p>
                  )}
                </div>
              )}

              {/* ── STEP 6 ── */}
              {step === 6 && (
                <div data-testid="gs-step-6">
                  <p className="text-[#5C4A42] text-sm font-sans mb-5">
                    A few lines about your current situation or what drew you to Rudraksha.
                  </p>
                  <FieldLabel label="Your Story (optional)">
                    <textarea data-testid="gs-input-story"
                      className={`${inputClass} resize-none min-h-[120px]`}
                      placeholder="E.g. I've been going through a difficult phase and feel disconnected. A friend suggested Rudraksha..."
                      value={form.story} onChange={(e) => set("story", e.target.value)} rows={4} />
                  </FieldLabel>
                  <div className="bg-[#FFF8E8] border border-[#C9A227]/25 rounded-xl p-3.5">
                    <div className="flex items-start gap-2">
                      <Lock size={12} className="text-[#C9A227] mt-0.5 flex-shrink-0" />
                      <p className="text-[#9B7A1A] text-xs font-sans leading-relaxed">
                        <strong>Privacy Guarantee:</strong> Your story is confidential and shared only with our expert panel for recommendation purposes. We never share your data.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Navigation Buttons ── */}
              <div className="flex gap-3 mt-5">
                {step > 1 && (
                  <button data-testid="gs-btn-back" onClick={back}
                    className="flex items-center gap-1.5 border border-[#E8DFD0] text-[#5C4A42] text-sm font-sans px-5 py-3 rounded-full hover:bg-[#F0EAE0] transition-colors">
                    <ChevronLeft size={15} /> Back
                  </button>
                )}
                {step < 6 ? (
                  <button data-testid="gs-btn-next" onClick={next}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#800000] text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-[#9B2030] transition-all duration-200 shadow-md shadow-[#800000]/20">
                    Continue <ChevronRight size={15} />
                  </button>
                ) : (
                  <button data-testid="gs-btn-submit" onClick={submit} disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#800000] text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-[#9B2030] disabled:opacity-60 transition-all duration-200 shadow-md shadow-[#800000]/20">
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...
                      </span>
                    ) : (
                      <><Check size={15} /> Get My Recommendation</>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Bottom trust note */}
          <p className="text-center text-[#B0A090] text-xs font-sans mt-5">
            Free · No obligation · Response within 24 hours
          </p>
        </div>
      </div>
    </div>
  );
}
