import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2, Eye, EyeOff } from "lucide-react";

const API = process.env.REACT_APP_BACKEND_URL + "/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError("Please enter email and password"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${API}/auth/login`, { email, password });
      localStorage.setItem("rudralife_admin_token", res.data.token);
      localStorage.setItem("rudralife_admin_email", res.data.email);
      navigate("/admin");
    } catch (err) {
      const detail = err.response?.data?.detail;
      setError(typeof detail === "string" ? detail : "Invalid credentials. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center p-4">
      <div data-testid="admin-login-container" className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center mx-auto mb-4">
            <span className="text-[#2A1133] font-serif font-bold text-xl">R</span>
          </div>
          <h1 className="font-serif text-3xl font-semibold text-[#2A1133]">Admin Portal</h1>
          <p className="text-[#6B5A74] text-sm font-sans mt-2">Rudralife Dashboard Access</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white border border-[#D4AF37]/25 rounded-2xl p-8 shadow-sm"
        >
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[#2A1133]/70 uppercase tracking-[0.15em] mb-2 font-sans">
                Email Address
              </label>
              <input
                data-testid="admin-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@rudralife.com"
                className="w-full bg-white border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm text-[#2A1133] font-sans outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37] transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#2A1133]/70 uppercase tracking-[0.15em] mb-2 font-sans">
                Password
              </label>
              <div className="relative">
                <input
                  data-testid="admin-password-input"
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-[#D4AF37]/30 rounded-xl px-4 py-3 pr-12 text-sm text-[#2A1133] font-sans outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B5A74] hover:text-[#2A1133] transition-colors"
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div data-testid="admin-login-error" className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3">
              <p className="text-red-600 text-sm font-sans">{error}</p>
            </div>
          )}

          <button
            data-testid="admin-login-submit-btn"
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-[#2A1133] text-white font-semibold text-sm py-3 rounded-xl hover:bg-[#4A235A] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 size={16} className="animate-spin" /> Signing in...</> : "Sign In"}
          </button>

          <p className="text-center text-xs text-[#6B5A74] font-sans mt-4">
            Access restricted to authorized personnel only.
          </p>
        </form>

        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full text-center text-[#6B5A74] text-sm font-sans hover:text-[#2A1133] transition-colors"
        >
          ← Back to Rudralife
        </button>
      </div>
    </div>
  );
}
