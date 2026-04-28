import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart, TrendingUp, Briefcase, Award, Users, Shield,
  Zap, Star, Target, Check, ChevronLeft, ChevronRight, Lock, ChevronDown
} from "lucide-react";
const API_URL = process.env.REACT_APP_BACKEND_URL;

// ── CONSTANTS ──
const LOGO_URL = "https://customer-assets.emergentagent.com/job_spiritual-path-49/artifacts/it9ar00d_image.png";

// Country dial codes (top countries prioritized)
const COUNTRY_CODES = [
  { name: "India", code: "+91", flag: "IN" },
  { name: "United States", code: "+1", flag: "US" },
  { name: "United Arab Emirates", code: "+971", flag: "AE" },
  { name: "United Kingdom", code: "+44", flag: "GB" },
  { name: "Canada", code: "+1 CA", flag: "CA" },
  { name: "Australia", code: "+61", flag: "AU" },
  { name: "Singapore", code: "+65", flag: "SG" },
  { name: "Germany", code: "+49", flag: "DE" },
  { name: "France", code: "+33", flag: "FR" },
  { name: "Saudi Arabia", code: "+966", flag: "SA" },
  { name: "Kuwait", code: "+965", flag: "KW" },
  { name: "Bahrain", code: "+973", flag: "BH" },
  { name: "Qatar", code: "+974", flag: "QA" },
  { name: "Oman", code: "+968", flag: "OM" },
  { name: "Nepal", code: "+977", flag: "NP" },
  { name: "Sri Lanka", code: "+94", flag: "LK" },
  { name: "Bangladesh", code: "+880", flag: "BD" },
  { name: "Pakistan", code: "+92", flag: "PK" },
  { name: "Malaysia", code: "+60", flag: "MY" },
  { name: "South Africa", code: "+27", flag: "ZA" },
  { name: "Kenya", code: "+254", flag: "KE" },
  { name: "Uganda", code: "+256", flag: "UG" },
  { name: "New Zealand", code: "+64", flag: "NZ" },
  { name: "Switzerland", code: "+41", flag: "CH" },
  { name: "Netherlands", code: "+31", flag: "NL" },
  { name: "Italy", code: "+39", flag: "IT" },
  { name: "Spain", code: "+34", flag: "ES" },
  { name: "Japan", code: "+81", flag: "JP" },
  { name: "China", code: "+86", flag: "CN" },
  { name: "Brazil", code: "+55", flag: "BR" },
  { name: "Mexico", code: "+52", flag: "MX" },
  { name: "Indonesia", code: "+62", flag: "ID" },
  { name: "Thailand", code: "+66", flag: "TH" },
  { name: "Philippines", code: "+63", flag: "PH" },
  { name: "Russia", code: "+7", flag: "RU" },
  { name: "Ireland", code: "+353", flag: "IE" },
  { name: "Sweden", code: "+46", flag: "SE" },
  { name: "Norway", code: "+47", flag: "NO" },
  { name: "Denmark", code: "+45", flag: "DK" },
  { name: "Israel", code: "+972", flag: "IL" },
  { name: "Hong Kong", code: "+852", flag: "HK" },
  { name: "Nigeria", code: "+234", flag: "NG" },
  { name: "Ghana", code: "+233", flag: "GH" },
  { name: "Tanzania", code: "+255", flag: "TZ" },
  { name: "Zimbabwe", code: "+263", flag: "ZW" },
  { name: "Mauritius", code: "+230", flag: "MU" },
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

const STEPS_META = [
  { label: "Name", step: 1 },
  { label: "Contact", step: 2 },
  { label: "Personal", step: 3 },
  { label: "Location", step: 4 },
  { label: "Goals", step: 5 },
  { label: "Story", step: 6 },
];

// ── TRUST BAR ──
function TrustBar() {
  return (
    <div className="flex items-center justify-center gap-2 bg-[#F0FDF4] border border-green-200 text-green-800 text-xs font-sans px-4 py-2.5 rounded-xl">
      <Lock size={13} className="text-green-600 flex-shrink-0" />
      <span><strong>We keep your information</strong> secure and completely confidential.</span>
    </div>
  );
}

// ── PROGRESS BAR ──
function ProgressBar({ step, total }) {
  const pct = Math.round(((step - 1) / total) * 100);
  return (
    <div className="mb-2">
      <div className="flex justify-between items-center mb-2">
        {STEPS_META.map((s) => (
          <div key={s.step} className="flex flex-col items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                s.step < step
                  ? "bg-[#800000] text-white"
                  : s.step === step
                  ? "bg-[#800000] text-white ring-2 ring-[#800000]/30"
                  : "bg-[#E8DFD0] text-[#9B8070]"
              }`}
            >
              {s.step < step ? <Check size={12} /> : s.step}
            </div>
            <span className={`text-xs font-sans mt-1 hidden sm:block ${s.step <= step ? "text-[#800000]" : "text-[#9B8070]"}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
      <div className="h-1.5 bg-[#E8DFD0] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#800000] to-[#C9A227] rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ── INPUT COMPONENT ──
function FormInput({ label, required, error, children }) {
  return (
    <div className="mb-4">
      <label className="block font-serif text-sm font-medium text-[#2C1E16] mb-1.5">
        {label} {required && <span className="text-[#800000]">*</span>}
      </label>
      {children}
      {error && <p className="text-red-600 text-xs mt-1 font-sans">{error}</p>}
    </div>
  );
}

const inputClass = "w-full border border-[#E8DFD0] bg-white rounded-xl px-4 py-3 text-[#2C1E16] text-sm font-sans placeholder-[#B0A090] focus:outline-none focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227] transition-all";

// ── COUNTRY CODE SELECT ──
function CountryCodeSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const selected = COUNTRY_CODES.find((c) => c.code === value) || COUNTRY_CODES[0];

  return (
    <div className="relative">
      <button
        type="button"
        data-testid="country-code-btn"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 h-full px-3 bg-[#F8F4EC] border border-[#E8DFD0] rounded-l-xl border-r-0 text-sm text-[#2C1E16] font-sans whitespace-nowrap hover:bg-[#F0EAE0] transition-colors min-w-[72px] justify-between"
        style={{ borderRight: "none" }}
      >
        <span className="font-medium">{selected.code.replace(" CA", "")}</span>
        <ChevronDown size={14} className={`text-[#9B8070] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div
          className="absolute top-full left-0 z-50 mt-1 bg-white border border-[#E8DFD0] rounded-xl shadow-xl overflow-y-auto"
          style={{ maxHeight: "240px", minWidth: "200px" }}
        >
          {COUNTRY_CODES.map((c) => (
            <button
              key={c.code + c.name}
              type="button"
              className="w-full flex items-center gap-2 px-3 py-2 text-sm font-sans text-[#2C1E16] hover:bg-[#F8F4EC] transition-colors text-left"
              onClick={() => { onChange(c.code); setOpen(false); }}
            >
              <span className="text-[#800000] font-medium min-w-[40px]">{c.code.replace(" CA", "")}</span>
              <span className="text-[#5C4A42] truncate">{c.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── MAIN FORM ──
export default function RecommendationForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
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
    setFormData((p) => ({ ...p, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const toggleGoal = (label) => {
    setFormData((p) => ({
      ...p,
      goals: p.goals.includes(label)
        ? p.goals.filter((g) => g !== label)
        : [...p.goals, label],
    }));
    setErrors((e) => ({ ...e, goals: "" }));
  };

  // ── VALIDATION ──
  const validate = () => {
    const e = {};
    if (step === 1 && !formData.fullName.trim()) e.fullName = "Name is required";
    if (step === 2) {
      if (!formData.phoneNumber.trim()) e.phoneNumber = "Mobile number is required";
      else if (!/^\d{7,15}$/.test(formData.phoneNumber.replace(/\s/g, ""))) e.phoneNumber = "Enter a valid mobile number";
      if (!formData.email.trim()) e.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Enter a valid email";
    }
    if (step === 3) {
      if (!formData.dateOfBirth) e.dateOfBirth = "Date of birth is required";
      if (!formData.gender) e.gender = "Please select gender";
    }
    if (step === 4) {
      if (!formData.city.trim()) e.city = "City is required";
    }
    if (step === 5 && formData.goals.length === 0) e.goals = "Please select at least one area";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validate()) setStep((s) => s + 1);
  };
  const back = () => { setStep((s) => s - 1); setErrors({}); };

  const submit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const resp = await fetch(`${API_URL}/api/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          phoneNumber: `${formData.countryCode.replace(" CA", "")} ${formData.phoneNumber}`,
          email: formData.email,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          city: formData.city,
          country: formData.country,
          countryCode: formData.countryCode.replace(" CA", ""),
          primaryGoal: formData.goals.join(", "),
          mainChallenge: formData.story,
          goals: formData.goals,
          story: formData.story,
        }),
      });
      if (resp.ok) {
        setSubmitted(true);
        setStep(7);
      } else {
        const err = await resp.json().catch(() => ({}));
        alert(err.detail || "Something went wrong. Please try again.");
      }
    } catch {
      alert("Could not connect. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // ── SUCCESS SCREEN ──
  if (step === 7) {
    return (
      <div className="min-h-screen bg-[#F8F4EC] flex items-center justify-center px-4 py-12">
        <div
          data-testid="success-screen"
          className="relative bg-white rounded-3xl shadow-2xl border border-[#E8DFD0] max-w-lg w-full p-8 sm:p-12 text-center"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#800000] via-[#C9A227] to-[#800000] rounded-t-3xl" />

          <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-6">
            <Check size={36} className="text-green-600" strokeWidth={2.5} />
          </div>

          <p className="font-serif text-3xl sm:text-4xl font-light text-[#800000] mb-2">Namaste</p>
          <h2 className="font-serif text-xl font-semibold text-[#2C1E16] mb-4">{formData.fullName}</h2>

          <div className="flex items-center gap-3 my-5">
            <div className="h-px flex-1 bg-[#C9A227]/30" />
            <span className="text-[#C9A227] font-serif text-sm">ॐ</span>
            <div className="h-px flex-1 bg-[#C9A227]/30" />
          </div>

          <p className="text-[#5C4A42] text-base leading-relaxed font-sans mb-8">
            Your details have been received. One of our Rudraksha experts will contact you within{" "}
            <strong className="text-[#800000]">24 hours</strong> with your personalised recommendation.
          </p>

          <div className="bg-[#FBF8F2] rounded-2xl border border-[#E8DFD0] p-5 mb-8 text-left">
            <p className="text-[#800000] text-xs font-sans tracking-widest uppercase mb-3">What happens next</p>
            {[
              "Our expert reviews your profile & birth details",
              "We identify the most aligned Rudraksha for you",
              "You receive a detailed recommendation with guidance",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 mb-2 last:mb-0">
                <Check size={14} className="text-[#C9A227] mt-0.5 flex-shrink-0" />
                <p className="text-[#5C4A42] text-sm font-sans">{item}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/919820302028"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="whatsapp-btn"
              className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold text-sm py-3.5 rounded-full hover:bg-[#1DA851] transition-colors"
            >
              Chat on WhatsApp
            </a>
            <button
              onClick={() => navigate("/")}
              data-testid="back-home-btn"
              className="flex-1 border border-[#C9A227] text-[#9B7A1A] font-semibold text-sm py-3.5 rounded-full hover:bg-[#C9A227]/8 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center py-8 px-3 sm:px-4"
      style={{ background: "linear-gradient(135deg, #F5EFE6 0%, #EDE0D4 40%, #F0E8DC 100%)" }}
    >
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "radial-gradient(circle at 20% 50%, #C9A227 1px, transparent 1px), radial-gradient(circle at 80% 50%, #800000 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <div
        data-testid="recommendation-form-container"
        className="relative w-full max-w-xl bg-[#F8F4EC] rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Gold accent top bar */}
        <div className="h-1 bg-gradient-to-r from-[#800000] via-[#C9A227] to-[#800000]" />

        {/* Header */}
        <div className="px-5 sm:px-8 pt-6 pb-4 border-b border-[#E8DFD0]">
          <div className="flex items-center justify-between mb-4">
            <img src={LOGO_URL} alt="Rudralife" className="h-8 object-contain" />
            <button
              onClick={() => navigate("/")}
              className="text-[#9B8070] hover:text-[#800000] text-xs font-sans transition-colors"
            >
              Exit ×
            </button>
          </div>
          <ProgressBar step={step} total={6} />
          <p className="text-[#5C4A42] text-xs font-sans mt-2">Step {step} of 6</p>
        </div>

        {/* Trust bar */}
        <div className="px-5 sm:px-8 pt-4">
          <TrustBar />
        </div>

        {/* Form body */}
        <div className="px-5 sm:px-8 py-6">

          {/* ── STEP 1: Name ── */}
          {step === 1 && (
            <div data-testid="step-1" className="animate-fadeInUp">
              <h2 className="font-serif text-2xl font-light text-[#2C1E16] mb-1">Hello, Seeker</h2>
              <p className="text-[#5C4A42] text-sm font-sans mb-6">Let's begin your sacred journey. What's your name?</p>
              <FormInput label="Full Name" required error={errors.fullName}>
                <input
                  data-testid="input-fullName"
                  className={inputClass}
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => set("fullName", e.target.value)}
                  autoFocus
                />
              </FormInput>
            </div>
          )}

          {/* ── STEP 2: Contact (with Country Code) ── */}
          {step === 2 && (
            <div data-testid="step-2" className="animate-fadeInUp">
              <h2 className="font-serif text-2xl font-light text-[#2C1E16] mb-1">Contact Details</h2>
              <p className="text-[#5C4A42] text-sm font-sans mb-6">Our experts will use this to share your recommendation.</p>

              <FormInput label="Mobile Number" required error={errors.phoneNumber}>
                <div className="flex rounded-xl overflow-visible border border-[#E8DFD0] bg-white focus-within:ring-2 focus-within:ring-[#C9A227]/50 focus-within:border-[#C9A227] transition-all relative">
                  <CountryCodeSelect
                    value={formData.countryCode}
                    onChange={(val) => set("countryCode", val)}
                  />
                  <div className="w-px bg-[#E8DFD0] self-stretch" />
                  <input
                    data-testid="input-phone"
                    className="flex-1 px-3 py-3 text-[#2C1E16] text-sm font-sans placeholder-[#B0A090] focus:outline-none bg-transparent rounded-r-xl"
                    placeholder="Enter mobile number"
                    value={formData.phoneNumber}
                    onChange={(e) => set("phoneNumber", e.target.value.replace(/[^\d\s]/g, ""))}
                    type="tel"
                  />
                </div>
              </FormInput>

              <FormInput label="Email ID" required error={errors.email}>
                <input
                  data-testid="input-email"
                  className={inputClass}
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => set("email", e.target.value)}
                  type="email"
                />
              </FormInput>
            </div>
          )}

          {/* ── STEP 3: DOB + Gender ── */}
          {step === 3 && (
            <div data-testid="step-3" className="animate-fadeInUp">
              <h2 className="font-serif text-2xl font-light text-[#2C1E16] mb-1">Personal Details</h2>
              <p className="text-[#5C4A42] text-sm font-sans mb-6">This helps us align your cosmic energy profile.</p>
              <FormInput label="Date of Birth" required error={errors.dateOfBirth}>
                <input
                  data-testid="input-dob"
                  className={inputClass}
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => set("dateOfBirth", e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                />
              </FormInput>
              <FormInput label="Gender" required error={errors.gender}>
                <div className="flex gap-3" data-testid="gender-options">
                  {["Male", "Female", "Other"].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => set("gender", g)}
                      className={`flex-1 py-3 rounded-xl text-sm font-sans border transition-all duration-200 ${
                        formData.gender === g
                          ? "bg-[#800000] text-white border-[#800000]"
                          : "bg-white border-[#E8DFD0] text-[#5C4A42] hover:border-[#C9A227]"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </FormInput>
            </div>
          )}

          {/* ── STEP 4: Location (No State field) ── */}
          {step === 4 && (
            <div data-testid="step-4" className="animate-fadeInUp">
              <h2 className="font-serif text-2xl font-light text-[#2C1E16] mb-1">Where Are You From?</h2>
              <p className="text-[#5C4A42] text-sm font-sans mb-6">We serve seekers across 52+ countries.</p>
              <FormInput label="City" required error={errors.city}>
                <input
                  data-testid="input-city"
                  className={inputClass}
                  placeholder="Your city"
                  value={formData.city}
                  onChange={(e) => set("city", e.target.value)}
                />
              </FormInput>
              <FormInput label="Country">
                <input
                  data-testid="input-country"
                  className={inputClass}
                  value={formData.country}
                  onChange={(e) => set("country", e.target.value)}
                  placeholder="India"
                />
              </FormInput>
            </div>
          )}

          {/* ── STEP 5: What Are You Seeking? ── */}
          {step === 5 && (
            <div data-testid="step-5" className="animate-fadeInUp">
              <h2 className="font-serif text-2xl font-light text-[#2C1E16] mb-1">What Are You Seeking?</h2>
              <p className="text-[#5C4A42] text-sm font-sans mb-1">Choose the area where you most need guidance.</p>
              <p className="text-[#9B8070] text-xs font-sans mb-5">Pick one or more</p>
              {errors.goals && <p className="text-red-600 text-xs mb-3 font-sans">{errors.goals}</p>}
              <div className="grid grid-cols-3 gap-2" data-testid="goals-grid">
                {GOALS.map(({ label, icon: Icon, color }) => {
                  const selected = formData.goals.includes(label);
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => toggleGoal(label)}
                      className={`relative flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl text-center border transition-all duration-200 ${
                        selected
                          ? "border-[#C9A227] bg-[#FFF8E8] shadow-md scale-[1.02]"
                          : "border-[#E8DFD0] bg-white hover:border-[#C9A227]/50 hover:shadow-sm"
                      }`}
                    >
                      {selected && (
                        <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#C9A227] rounded-full flex items-center justify-center">
                          <Check size={9} className="text-white" strokeWidth={3} />
                        </div>
                      )}
                      <Icon size={20} style={{ color }} />
                      <span className="text-[#2C1E16] text-xs font-sans leading-tight">{label}</span>
                    </button>
                  );
                })}
              </div>
              {formData.goals.length > 0 && (
                <p className="text-[#800000] text-xs font-sans mt-3 text-center">
                  {formData.goals.length} area{formData.goals.length > 1 ? "s" : ""} selected
                </p>
              )}
            </div>
          )}

          {/* ── STEP 6: Story ── */}
          {step === 6 && (
            <div data-testid="step-6" className="animate-fadeInUp">
              <h2 className="font-serif text-2xl font-light text-[#2C1E16] mb-1">Tell Us Your Story</h2>
              <p className="text-[#5C4A42] text-sm font-sans mb-6">
                A sentence or two about your current situation, challenges, or what drew you to Rudraksha.
              </p>
              <FormInput label="Your Story (optional)">
                <textarea
                  data-testid="input-story"
                  className={`${inputClass} resize-none min-h-[140px]`}
                  placeholder="E.g. I've been going through a difficult phase at work and feel disconnected from myself. A friend suggested Rudraksha and I want to explore its benefits..."
                  value={formData.story}
                  onChange={(e) => set("story", e.target.value)}
                  rows={5}
                />
              </FormInput>
              <div className="bg-[#FFF8E8] border border-[#C9A227]/30 rounded-xl p-4">
                <div className="flex items-start gap-2">
                  <Lock size={13} className="text-[#C9A227] mt-0.5 flex-shrink-0" />
                  <p className="text-[#9B7A1A] text-xs font-sans leading-relaxed">
                    <strong>Privacy Guarantee:</strong> Your story is confidential and shared only with our expert panel for the purpose of your recommendation. We never share your data with anyone.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── NAV BUTTONS ── */}
          <div className="flex gap-3 mt-6">
            {step > 1 && (
              <button
                data-testid="btn-back"
                onClick={back}
                className="flex items-center gap-1.5 border border-[#E8DFD0] text-[#5C4A42] text-sm font-sans px-5 py-3 rounded-full hover:bg-[#F0EAE0] transition-colors"
              >
                <ChevronLeft size={16} /> Back
              </button>
            )}
            {step < 6 ? (
              <button
                data-testid="btn-next"
                onClick={next}
                className="flex-1 flex items-center justify-center gap-1.5 bg-[#800000] text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-[#9B2030] transition-all duration-200 shadow-md shadow-[#800000]/20"
              >
                Continue <ChevronRight size={16} />
              </button>
            ) : (
              <button
                data-testid="btn-submit"
                onClick={submit}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 bg-[#800000] text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-[#9B2030] disabled:opacity-60 transition-all duration-200 shadow-md shadow-[#800000]/20"
              >
                {loading ? (
                  <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</span>
                ) : (
                  <><Check size={16} /> Get My Recommendation</>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
