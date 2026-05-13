import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart, TrendingUp, Briefcase, Award, Users, Shield,
  Zap, Star, Target, Check, ChevronLeft, ChevronRight,
  Lock, ChevronDown, ArrowLeft,
} from "lucide-react";

const API_URL = process.env.REACT_APP_BACKEND_URL;
const LOGO_URL = "https://customer-assets.emergentagent.com/job_spiritual-path-49/artifacts/it9ar00d_image.png";
const HERO_MALA_IMG = "https://customer-assets.emergentagent.com/job_spiritual-path-49/artifacts/7pbng6g5_1920%20x%20720%20Indramala%20website%20Banner%20copy.jpg.jpeg";
const WHATSAPP = "919820302028";

const EXPERT_FACES = [
  { name: "Dr. Tanay Seetha", img: "https://customer-assets.emergentagent.com/job_spiritual-path-49/artifacts/6qw0vi22_image.png" },
  { name: "Hemlata Sojitra", img: "https://customer-assets.emergentagent.com/job_spiritual-path-49/artifacts/7n5ypemd_image.png" },
  { name: "Saumil Seetha", img: "https://customer-assets.emergentagent.com/job_spiritual-path-49/artifacts/3ri80p5z_image.png" },
  { name: "Shruti Sharma", img: "https://customer-assets.emergentagent.com/job_spiritual-path-49/artifacts/f6geckg9_image.png" },
  { name: "Shilpa Agarwal", img: "https://customer-assets.emergentagent.com/job_spiritual-path-49/artifacts/8xlnt6uc_image.png" },
  { name: "Madhulika", img: "https://customer-assets.emergentagent.com/job_spiritual-path-49/artifacts/f8rsnw1s_Madhulika.jpg.jpeg" },
  { name: "Dhruv Sir", img: "https://customer-assets.emergentagent.com/job_spiritual-path-49/artifacts/fn5icn4z_Dhruv%20Sir.jpg.jpeg" },
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

const ALL_COUNTRIES = [
  "India","Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda",
  "Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain",
  "Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia",
  "Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso",
  "Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic",
  "Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica","Croatia","Cuba",
  "Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic",
  "Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini",
  "Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana",
  "Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras",
  "Hungary","Iceland","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica",
  "Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos",
  "Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania",
  "Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta",
  "Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco",
  "Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal",
  "Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea",
  "North Macedonia","Norway","Oman","Pakistan","Palau","Palestine","Panama",
  "Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar",
  "Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia",
  "Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe",
  "Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia",
  "Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan",
  "Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan",
  "Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga",
  "Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine",
  "United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan",
  "Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe",
];

const MONTHS = [
  { val: "01", label: "01 — January" },
  { val: "02", label: "02 — February" },
  { val: "03", label: "03 — March" },
  { val: "04", label: "04 — April" },
  { val: "05", label: "05 — May" },
  { val: "06", label: "06 — June" },
  { val: "07", label: "07 — July" },
  { val: "08", label: "08 — August" },
  { val: "09", label: "09 — September" },
  { val: "10", label: "10 — October" },
  { val: "11", label: "11 — November" },
  { val: "12", label: "12 — December" },
];

const STEPS_META = [
  { label: "Name", step: 1 },
  { label: "Contact", step: 2 },
  { label: "Personal", step: 3 },
  { label: "Location", step: 4 },
  { label: "Story", step: 5 },
];

const TRUST_POINTS = [
  { icon: Check, text: "Free personalised consultation — no hidden charges" },
  { icon: Shield, text: "100% authentic, lab-certified Rudraksha beads" },
  { icon: Users, text: "Guided by 7 dedicated panel experts" },
  { icon: Star, text: "Response within 24 hours via WhatsApp or call" },
];

const STATS = [
  { num: "5,00,000+", label: "Believe Clients" },
  { num: "90%", label: "Repeat Customers" },
  { num: "25+", label: "Years Experience" },
  { num: "52+", label: "Countries" },
];

// ── WhatsApp SVG ──
function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

// ── Left Trust Panel ──
function TrustPanel({ navigate }) {
  return (
    <div className="relative lg:w-[44%] lg:min-h-screen bg-black overflow-hidden flex-shrink-0">
      <img src={HERO_MALA_IMG} alt="Sacred Rudraksha"
        className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "55% center" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.80) 50%, rgba(0,0,0,0.92) 100%)" }} />
      <div className="relative z-10 flex flex-col h-full min-h-[320px] lg:min-h-screen p-6 lg:p-10">
        {/* Logo */}
        <div className="mb-6">
          <button onClick={() => navigate("/")} className="cursor-pointer">
            <img src={LOGO_URL} alt="Rudralife" className="h-10 object-contain filter brightness-0 invert" />
          </button>
        </div>
        {/* Headline */}
        <div className="mb-6">
          <p className="font-serif text-2xl lg:text-3xl text-white font-light leading-snug mb-1">
            Your Sacred Journey<br />Begins Here
          </p>
          <p className="text-[#C9A227] text-xs font-sans tracking-widest uppercase mt-2">
            Personalised Rudraksha Recommendation
          </p>
        </div>
        {/* Trust points */}
        <div className="space-y-3 mb-6">
          {TRUST_POINTS.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#C9A227]/20 border border-[#C9A227]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon size={10} className="text-[#C9A227]" />
              </div>
              <p className="text-white/70 text-xs font-sans leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
        {/* Experts */}
        <div className="mb-6">
          <p className="text-white/40 text-[10px] font-sans uppercase tracking-widest mb-3">Our Expert Panel</p>
          <div className="flex gap-2 flex-wrap">
            {EXPERT_FACES.map((e) => (
              <div key={e.name} className="flex flex-col items-center gap-1">
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#C9A227]/50">
                  <img src={e.img} alt={e.name} className="w-full h-full object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {STATS.map((s) => (
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
          <p className="text-[#C9A227]/60 text-xs font-sans mt-1">— Shiva Purana</p>
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
      <button type="button" onClick={() => setOpen(!open)}
        className="flex items-center gap-1 h-full px-2.5 bg-[#F0EAE0] border border-[#E8DFD0] rounded-l-xl border-r-0 text-sm text-[#2C1E16] font-sans whitespace-nowrap hover:bg-[#EAE0D0] transition-colors min-w-[64px] justify-between">
        <span className="font-medium text-xs">{sel.code.replace(" CA", "")}</span>
        <ChevronDown size={12} className={`text-[#9B8070] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 z-50 mt-1 bg-white border border-[#E8DFD0] rounded-xl shadow-2xl overflow-y-auto" style={{ maxHeight: "220px", minWidth: "190px" }}>
          {COUNTRY_CODES.map((c) => (
            <button key={c.code + c.name} type="button"
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-sans text-[#2C1E16] hover:bg-[#F8F4EC] transition-colors text-left"
              onClick={() => { onChange(c.code); setOpen(false); }}>
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
  const TOTAL = 5;
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
        <div className="h-full bg-gradient-to-r from-[#800000] to-[#C9A227] rounded-full transition-all duration-500"
          style={{ width: `${Math.round(((step - 1) / (TOTAL - 1)) * 100)}%` }} />
      </div>
    </div>
  );
}

const inputClass = "w-full border border-[#E8DFD0] bg-white rounded-xl px-4 py-3 text-[#2C1E16] text-sm font-sans placeholder-[#B0A090] focus:outline-none focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227] transition-all";
const selectClass = "w-full border border-[#E8DFD0] bg-white rounded-xl px-4 py-3 text-[#2C1E16] text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227] transition-all cursor-pointer appearance-none";

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
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    gender: "",
    profession: "",
    city: "",
    country: "India",
    story: "",
  });

  const set = (key, val) => {
    setForm((p) => ({ ...p, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
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
      if (!form.dobDay || !form.dobMonth || !form.dobYear) e.dateOfBirth = "Date of birth is required";
      if (!form.gender) e.gender = "Please select gender";
    }
    if (step === 4 && !form.city.trim()) e.city = "City is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate()) setStep((s) => s + 1); };
  const back = () => { setStep((s) => s - 1); setErrors({}); };

  const submit = async () => {
    if (!validate()) return;
    setLoading(true);
    const dateOfBirth = form.dobDay && form.dobMonth && form.dobYear
      ? `${form.dobDay}-${form.dobMonth}-${form.dobYear}`
      : "";
    try {
      const resp = await fetch(`${API_URL}/api/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          phoneNumber: `${form.countryCode.replace(" CA", "")} ${form.phoneNumber}`,
          email: form.email,
          dateOfBirth,
          gender: form.gender,
          profession: form.profession,
          city: form.city,
          country: form.country,
          countryCode: form.countryCode.replace(" CA", ""),
          story: form.story,
          goals: [],
          primaryGoal: "",
          mainChallenge: form.story,
        }),
      });
      if (resp.ok) setStep(6);
      else {
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
  if (step === 6) {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row" data-testid="getstarted-success">
        <TrustPanel navigate={navigate} />
        <div className="flex-1 bg-[#F8F4EC] flex items-center justify-center p-6 lg:p-10">
          <div className="w-full max-w-md">
            {/* Check icon */}
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center">
                <Check size={30} className="text-green-600" strokeWidth={2.5} />
              </div>
            </div>

            {/* Namaste + Name */}
            <div className="text-center mb-5">
              <p className="font-serif text-3xl font-light text-[#800000] mb-1">Namaste,</p>
              <h2 className="font-serif text-2xl font-semibold text-[#2C1E16]">{form.fullName}!</h2>
              <div className="flex items-center gap-3 my-4">
                <div className="h-px flex-1 bg-[#C9A227]/30" />
                <span className="text-[#C9A227] font-serif text-xl">ॐ</span>
                <div className="h-px flex-1 bg-[#C9A227]/30" />
              </div>
            </div>

            {/* WhatsApp line above box */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <p className="font-semibold text-[#1a5c36] text-sm font-sans text-center leading-snug">
                Our Rudraksha Experts Will Contact You Shortly Via WhatsApp
              </p>
              <div className="w-4 h-4 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                <WhatsAppIcon size={9} />
              </div>
            </div>

            {/* Email box */}
            <div className="bg-white border-2 border-[#25D366]/40 rounded-xl px-4 py-3 mb-5 text-center">
              <p className="text-[#5C4A42] text-xs font-sans leading-relaxed">
                If you're not on WhatsApp, reach out to us at{" "}
                <a
                  href="mailto:info@rudralife.com"
                  className="text-[#800000] font-bold underline underline-offset-2 hover:text-[#9B2030] transition-colors"
                >
                  info@rudralife.com
                </a>
              </p>
            </div>

            {/* What happens next */}
            <div className="bg-white rounded-2xl border border-[#E8DFD0] p-5 mb-6">
              <p className="text-[#800000] text-xs font-sans tracking-widest uppercase mb-3">What happens next</p>
              {[
                "Our expert reviews your birth details and goals",
                "We identify the most aligned Rudraksha for you",
                "You receive a personalised recommendation",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 mb-2 last:mb-0">
                  <Check size={13} className="text-[#C9A227] mt-0.5 flex-shrink-0" />
                  <p className="text-[#5C4A42] text-xs font-sans">{item}</p>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="whatsapp-btn"
                className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold text-sm py-3.5 rounded-full hover:bg-[#1DA851] transition-colors"
              >
                <WhatsAppIcon size={16} />
                Chat on WhatsApp
              </a>
              <button
                data-testid="back-home-btn"
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
      <TrustPanel navigate={navigate} />

      <div className="flex-1 bg-[#F8F4EC] flex items-start lg:items-center justify-center overflow-y-auto">
        <div className="w-full max-w-xl px-4 sm:px-6 py-8 lg:py-10">

          {/* Back link */}
          <button onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-[#9B8070] text-xs font-sans hover:text-[#800000] transition-colors mb-6"
            data-testid="getstarted-back-home">
            <ArrowLeft size={14} /> Back to Home
          </button>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-lg border border-[#E8DFD0] overflow-hidden" data-testid="getstarted-form-card">
            <div className="h-1 bg-gradient-to-r from-[#800000] via-[#C9A227] to-[#800000]" />

            <div className="px-5 sm:px-7 pt-6 pb-4 border-b border-[#F0EAE0]">
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-serif text-base font-semibold text-[#2C1E16]">
                  {step === 1 && "Full Name"}
                  {step === 2 && "Contact Details"}
                  {step === 3 && "Personal Details"}
                  {step === 4 && "Your Location"}
                  {step === 5 && "Your Story"}
                </h2>
                <span className="text-[#B0A090] text-xs font-sans">Step {step} / 5</span>
              </div>
              <ProgressBar step={step} />
            </div>

            <div className="px-5 sm:px-7 pt-4">
              <div className="flex items-center gap-2 bg-green-50 border border-green-100 text-green-800 text-xs font-sans px-3.5 py-2.5 rounded-xl">
                <Lock size={12} className="text-green-500 flex-shrink-0" />
                <span><strong>We keep your information</strong> secure and completely confidential.</span>
              </div>
            </div>

            <div className="px-5 sm:px-7 py-5">

              {/* ── STEP 1: Full Name ── */}
              {step === 1 && (
                <div data-testid="gs-step-1">
                  <p className="text-[#5C4A42] text-sm font-sans mb-5">Welcome! Let's begin your sacred journey. What is your name?</p>
                  <FieldLabel label="Full Name" required error={errors.fullName}>
                    <input data-testid="gs-input-name" className={inputClass}
                      placeholder="Enter your full name"
                      value={form.fullName} onChange={(e) => set("fullName", e.target.value)} autoFocus />
                  </FieldLabel>
                </div>
              )}

              {/* ── STEP 2: Contact ── */}
              {step === 2 && (
                <div data-testid="gs-step-2">
                  <p className="text-[#5C4A42] text-sm font-sans mb-5">Our experts will use this to share your recommendation.</p>
                  <FieldLabel label="Mobile No" required error={errors.phoneNumber}>
                    <div className="flex rounded-xl overflow-visible border border-[#E8DFD0] bg-white focus-within:ring-2 focus-within:ring-[#C9A227]/50 focus-within:border-[#C9A227] transition-all relative">
                      <CountryCodeSelect value={form.countryCode} onChange={(v) => set("countryCode", v)} />
                      <div className="w-px bg-[#E8DFD0] self-stretch" />
                      <input data-testid="gs-input-phone"
                        className="flex-1 px-3 py-3 text-[#2C1E16] text-sm font-sans placeholder-[#B0A090] focus:outline-none bg-transparent rounded-r-xl"
                        placeholder="Mobile number" value={form.phoneNumber}
                        onChange={(e) => set("phoneNumber", e.target.value.replace(/[^\d\s]/g, ""))} type="tel" />
                    </div>
                  </FieldLabel>
                  <FieldLabel label="Email Id" required error={errors.email}>
                    <input data-testid="gs-input-email" className={inputClass}
                      placeholder="your@email.com" type="email"
                      value={form.email} onChange={(e) => set("email", e.target.value)} />
                  </FieldLabel>
                </div>
              )}

              {/* ── STEP 3: Personal ── */}
              {step === 3 && (
                <div data-testid="gs-step-3">
                  <p className="text-[#5C4A42] text-sm font-sans mb-5">This helps us align your cosmic energy profile.</p>

                  {/* DOB: DD - MM - YYYY dropdowns */}
                  <FieldLabel label="Date of Birth" required error={errors.dateOfBirth}>
                    <div className="grid grid-cols-3 gap-2" data-testid="gs-dob-selects">
                      {/* Day */}
                      <div className="relative">
                        <select data-testid="gs-dob-day" value={form.dobDay}
                          onChange={(e) => set("dobDay", e.target.value)}
                          className={selectClass}>
                          <option value="">DD</option>
                          {Array.from({ length: 31 }, (_, i) => {
                            const d = String(i + 1).padStart(2, "0");
                            return <option key={d} value={d}>{d}</option>;
                          })}
                        </select>
                        <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9B8070] pointer-events-none" />
                      </div>
                      {/* Month */}
                      <div className="relative">
                        <select data-testid="gs-dob-month" value={form.dobMonth}
                          onChange={(e) => set("dobMonth", e.target.value)}
                          className={selectClass}>
                          <option value="">MM</option>
                          {MONTHS.map((m) => (
                            <option key={m.val} value={m.val}>{m.label}</option>
                          ))}
                        </select>
                        <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9B8070] pointer-events-none" />
                      </div>
                      {/* Year */}
                      <div className="relative">
                        <select data-testid="gs-dob-year" value={form.dobYear}
                          onChange={(e) => set("dobYear", e.target.value)}
                          className={selectClass}>
                          <option value="">YYYY</option>
                          {Array.from({ length: 2026 - 1920 + 1 }, (_, i) => {
                            const y = 2026 - i;
                            return <option key={y} value={y}>{y}</option>;
                          })}
                        </select>
                        <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9B8070] pointer-events-none" />
                      </div>
                    </div>
                    {form.dobDay && form.dobMonth && form.dobYear && (
                      <p className="text-[#9B7A1A] text-xs font-sans mt-1.5">
                        Selected: {form.dobDay}-{form.dobMonth}-{form.dobYear}
                      </p>
                    )}
                  </FieldLabel>

                  {/* Gender */}
                  <FieldLabel label="Gender" required error={errors.gender}>
                    <div className="flex gap-3" data-testid="gs-gender-options">
                      {["Male", "Female", "Other"].map((g) => (
                        <button key={g} type="button" onClick={() => set("gender", g)}
                          className={`flex-1 py-3 rounded-xl text-sm font-sans border transition-all duration-200 ${
                            form.gender === g
                              ? "bg-[#800000] text-white border-[#800000]"
                              : "bg-white border-[#E8DFD0] text-[#5C4A42] hover:border-[#C9A227]"
                          }`}>{g}</button>
                      ))}
                    </div>
                  </FieldLabel>

                  {/* Profession */}
                  <FieldLabel label="Profession">
                    <input data-testid="gs-input-profession" className={inputClass}
                      placeholder="e.g. Doctor, Engineer, Business Owner, Homemaker..."
                      value={form.profession}
                      onChange={(e) => set("profession", e.target.value)} />
                  </FieldLabel>
                </div>
              )}

              {/* ── STEP 4: Location ── */}
              {step === 4 && (
                <div data-testid="gs-step-4">
                  <p className="text-[#5C4A42] text-sm font-sans mb-5">We serve seekers from 52+ countries worldwide.</p>
                  <FieldLabel label="City" required error={errors.city}>
                    <input data-testid="gs-input-city" className={inputClass}
                      placeholder="Your city"
                      value={form.city} onChange={(e) => set("city", e.target.value)} />
                  </FieldLabel>
                  <FieldLabel label="Country">
                    <div className="relative">
                      <select data-testid="gs-input-country" value={form.country}
                        onChange={(e) => set("country", e.target.value)}
                        className={selectClass}>
                        {ALL_COUNTRIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9B8070] pointer-events-none" />
                    </div>
                  </FieldLabel>
                </div>
              )}

              {/* ── STEP 5: Story ── */}
              {step === 5 && (
                <div data-testid="gs-step-5">
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

              {/* ── Navigation ── */}
              <div className="flex gap-3 mt-5">
                {step > 1 && (
                  <button data-testid="gs-btn-back" onClick={back}
                    className="flex items-center gap-1.5 border border-[#E8DFD0] text-[#5C4A42] text-sm font-sans px-5 py-3 rounded-full hover:bg-[#F0EAE0] transition-colors">
                    <ChevronLeft size={15} /> Back
                  </button>
                )}
                {step < 5 ? (
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

          <p className="text-center text-[#B0A090] text-xs font-sans mt-5">
            Free · No obligation · Response within 24 hours
          </p>
        </div>
      </div>
    </div>
  );
}
