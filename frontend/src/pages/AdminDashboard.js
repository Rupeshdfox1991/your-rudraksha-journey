import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";
import {
  LogOut, Users, Clock, TrendingUp,
  ChevronLeft, ChevronRight, Eye, X,
  Download, Filter, Calendar, RefreshCw,
} from "lucide-react";

const API = process.env.REACT_APP_BACKEND_URL + "/api";

// Map goal keys → readable labels
const GOALS_MAP = {
  wealth_prosperity: "Wealth & Prosperity",
  health_healing: "Health & Healing",
  spiritual_growth: "Spiritual Growth",
  mental_clarity_focus: "Mental Clarity & Focus",
  confidence_leadership: "Confidence & Leadership",
  protection_security: "Protection & Security",
  peace_stability: "Peace & Stability",
  better_relationships: "Better Relationships",
  career_growth: "Career Growth",
};

const GENDER_OPTIONS = ["", "Male", "Female", "Other"];
const LIMIT = 20;

function authHeader() {
  return { headers: { Authorization: `Bearer ${localStorage.getItem("rudralife_admin_token")}` } };
}

function formatDate(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  } catch { return iso; }
}

function formatDateTime(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("en-IN", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  } catch { return iso; }
}

function resolveGoals(s) {
  const arr = Array.isArray(s.goals) && s.goals.length > 0 ? s.goals : [];
  if (arr.length > 0) return arr.map(g => GOALS_MAP[g] || g).join(", ");
  if (s.primary_goal) return GOALS_MAP[s.primary_goal] || s.primary_goal;
  return "—";
}

// ── Stat Card ──
function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div data-testid={`stat-card-${label.replace(/\s+/g, "-").toLowerCase()}`}
      className="bg-white border border-[#D4AF37]/20 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-[#6B5A74] font-sans uppercase tracking-wide">{label}</span>
        <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center`}>
          <Icon size={16} className="text-white" />
        </div>
      </div>
      <div className="font-serif text-4xl font-light text-[#2A1133]">{value}</div>
    </div>
  );
}

// ── Detail Modal ──
function DetailModal({ submission: s, onClose }) {
  if (!s) return null;
  const rows = [
    ["Full Name", s.name],
    ["Mobile Number", s.phone],
    ["Email Address", s.email],
    ["Date of Birth", s.dob],
    ["Gender", s.gender],
    ["City", s.city],
    ["Country", s.country],
    ["Choose the areas where you seek alignment and growth", resolveGoals(s)],
    ["Your Story (optional)", s.story],
    ["Submitted At", formatDateTime(s.submitted_at)],
    ["Status", s.status],
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" data-testid="detail-modal">
      <div className="absolute inset-0 bg-[#2A1133]/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#F5F1E8] rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#2A1133] px-6 py-4 rounded-t-2xl flex items-center justify-between z-10">
          <h3 className="font-serif text-lg text-white">Lead Details</h3>
          <button onClick={onClose} data-testid="close-modal-btn"
            className="text-white/60 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          {rows.map(([label, val]) => val ? (
            <div key={label}>
              <span className="text-[#6B5A74] text-xs font-sans uppercase tracking-wide block mb-1">{label}</span>
              <span className="text-[#2A1133] font-sans text-sm break-words">{val}</span>
            </div>
          ) : null)}
        </div>
      </div>
    </div>
  );
}

// ── Main Dashboard ──
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [selected, setSelected] = useState(null);
  const [adminEmail] = useState(localStorage.getItem("rudralife_admin_email") || "Admin");

  // Filters
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [gender, setGender] = useState("");
  // Applied filters (only applied when user clicks Apply)
  const [applied, setApplied] = useState({ fromDate: "", toDate: "", gender: "" });

  const filterParams = useCallback(() => {
    const p = {};
    if (applied.fromDate) p.from_date = applied.fromDate;
    if (applied.toDate) p.to_date = applied.toDate;
    if (applied.gender) p.gender = applied.gender;
    return p;
  }, [applied]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: LIMIT, ...filterParams() };
      const [statsRes, subRes] = await Promise.all([
        axios.get(`${API}/admin/stats`, authHeader()),
        axios.get(`${API}/admin/submissions`, { ...authHeader(), params }),
      ]);
      setStats(statsRes.data);
      setSubmissions(subRes.data.submissions);
      setTotal(subRes.data.total);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("rudralife_admin_token");
        navigate("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  }, [page, filterParams, navigate]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const applyFilters = () => {
    setPage(1);
    setApplied({ fromDate, toDate, gender });
  };

  const clearFilters = () => {
    setFromDate(""); setToDate(""); setGender("");
    setPage(1);
    setApplied({ fromDate: "", toDate: "", gender: "" });
  };

  const hasFilters = fromDate || toDate || gender;

  const logout = () => {
    localStorage.removeItem("rudralife_admin_token");
    localStorage.removeItem("rudralife_admin_email");
    navigate("/admin/login");
  };

  // Export ALL filtered data to Excel
  const exportExcel = async () => {
    setExporting(true);
    try {
      const params = filterParams();
      const res = await axios.get(`${API}/admin/submissions/export`, { ...authHeader(), params });
      const rows = res.data.submissions.map((s) => ({
        "Full Name": s.name || "",
        "Mobile Number": s.phone || "",
        "Email Address": s.email || "",
        "Date of Birth": s.dob || "",
        "Gender": s.gender || "",
        "City": s.city || "",
        "Country": s.country || "",
        "Choose the areas where you seek alignment and growth": resolveGoals(s),
        "Your Story (optional)": s.story || "",
        "Submitted At": formatDateTime(s.submitted_at),
        "Status": s.status || "",
      }));

      const ws = XLSX.utils.json_to_sheet(rows);
      // Auto-width columns
      const colWidths = Object.keys(rows[0] || {}).map((k) => ({
        wch: Math.max(k.length + 2, 18),
      }));
      ws["!cols"] = colWidths;

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Leads");
      const today = new Date().toISOString().split("T")[0];
      XLSX.writeFile(wb, `rudralife-leads-${today}.xlsx`);
    } catch (err) {
      alert("Export failed. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div data-testid="admin-dashboard" className="min-h-screen bg-[#F5F1E8]">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="w-64 bg-[#2A1133] flex-shrink-0 hidden md:flex flex-col">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center">
                <span className="text-[#2A1133] font-serif font-bold text-sm">R</span>
              </div>
              <span className="text-white font-serif text-lg font-semibold">Rudralife</span>
            </div>
            <p className="text-white/40 text-xs font-sans mt-1">Admin Dashboard</p>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <div className="bg-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
              <Users size={16} className="text-[#D4AF37]" />
              <span className="text-white text-sm font-sans">Leads</span>
            </div>
          </nav>
          <div className="p-4 border-t border-white/10">
            <div className="text-white/40 text-xs font-sans mb-3 truncate">{adminEmail}</div>
            <button data-testid="admin-logout-btn" onClick={logout}
              className="flex items-center gap-2 text-white/60 text-sm font-sans hover:text-white transition-colors">
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-auto">
          {/* Mobile header */}
          <div className="md:hidden flex items-center justify-between bg-[#2A1133] px-4 py-3">
            <span className="text-white font-serif">Rudralife Admin</span>
            <button onClick={logout} className="text-white/60">
              <LogOut size={18} />
            </button>
          </div>

          <div className="p-4 lg:p-8">
            {/* Page title + Export button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="font-serif text-3xl font-light text-[#2A1133]">Leads Dashboard</h1>
                <p className="text-[#6B5A74] text-sm font-sans mt-1">
                  {total} total {applied.fromDate || applied.toDate || applied.gender ? "filtered" : ""} submissions
                </p>
              </div>
              <button
                data-testid="export-excel-btn"
                onClick={exportExcel}
                disabled={exporting || total === 0}
                className="flex items-center gap-2 bg-[#D4AF37] text-[#2A1133] font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#B8962E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {exporting
                  ? <><RefreshCw size={15} className="animate-spin" /> Exporting...</>
                  : <><Download size={15} /> Export Excel ({total})</>
                }
              </button>
            </div>

            {/* Stats */}
            {stats && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <StatCard label="Total Submissions" value={stats.total} icon={Users} color="bg-[#4A235A]" />
                <StatCard label="Pending Review" value={stats.pending} icon={Clock} color="bg-[#D4AF37]" />
                <StatCard label="Top Goal" value={GOALS_MAP[stats.top_goals?.[0]?.goal] || stats.top_goals?.[0]?.goal || "—"} icon={TrendingUp} color="bg-[#2A1133]" />
              </div>
            )}

            {/* ── Filter Bar ── */}
            <div className="bg-white border border-[#D4AF37]/20 rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Filter size={14} className="text-[#D4AF37]" />
                <span className="text-xs font-semibold text-[#2A1133] uppercase tracking-wide font-sans">Filter Leads</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
                {/* From Date */}
                <div>
                  <label className="block text-xs text-[#6B5A74] font-sans mb-1.5 flex items-center gap-1">
                    <Calendar size={11} /> From Date
                  </label>
                  <input
                    data-testid="filter-from-date"
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full border border-[#D4AF37]/30 rounded-xl px-3 py-2 text-sm text-[#2A1133] font-sans outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] bg-white"
                  />
                </div>
                {/* To Date */}
                <div>
                  <label className="block text-xs text-[#6B5A74] font-sans mb-1.5 flex items-center gap-1">
                    <Calendar size={11} /> To Date
                  </label>
                  <input
                    data-testid="filter-to-date"
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full border border-[#D4AF37]/30 rounded-xl px-3 py-2 text-sm text-[#2A1133] font-sans outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] bg-white"
                  />
                </div>
                {/* Gender */}
                <div>
                  <label className="block text-xs text-[#6B5A74] font-sans mb-1.5">Gender</label>
                  <select
                    data-testid="filter-gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full border border-[#D4AF37]/30 rounded-xl px-3 py-2 text-sm text-[#2A1133] font-sans outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] bg-white"
                  >
                    {GENDER_OPTIONS.map((g) => (
                      <option key={g} value={g}>{g || "All Genders"}</option>
                    ))}
                  </select>
                </div>
                {/* Buttons */}
                <div className="flex gap-2">
                  <button
                    data-testid="apply-filter-btn"
                    onClick={applyFilters}
                    className="flex-1 bg-[#2A1133] text-white text-sm font-semibold py-2 rounded-xl hover:bg-[#4A235A] transition-colors"
                  >
                    Apply Filter
                  </button>
                  {hasFilters && (
                    <button
                      data-testid="clear-filter-btn"
                      onClick={clearFilters}
                      className="px-3 py-2 border border-[#D4AF37]/30 text-[#6B5A74] text-sm rounded-xl hover:border-[#D4AF37]/60 hover:text-[#2A1133] transition-colors"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>
              {/* Active filter tags */}
              {(applied.fromDate || applied.toDate || applied.gender) && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {applied.fromDate && (
                    <span className="bg-[#D4AF37]/10 text-[#8B6914] text-xs font-sans px-3 py-1 rounded-full">
                      From: {applied.fromDate}
                    </span>
                  )}
                  {applied.toDate && (
                    <span className="bg-[#D4AF37]/10 text-[#8B6914] text-xs font-sans px-3 py-1 rounded-full">
                      To: {applied.toDate}
                    </span>
                  )}
                  {applied.gender && (
                    <span className="bg-[#D4AF37]/10 text-[#8B6914] text-xs font-sans px-3 py-1 rounded-full">
                      Gender: {applied.gender}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* ── Table ── */}
            <div className="bg-white border border-[#D4AF37]/20 rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-[#D4AF37]/15 flex items-center justify-between">
                <h2 className="font-serif text-lg text-[#2A1133]">All Leads</h2>
                <span className="text-[#6B5A74] text-xs font-sans">{total} records</span>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-[#6B5A74] text-sm font-sans">Loading leads...</p>
                  </div>
                </div>
              ) : submissions.length === 0 ? (
                <div className="text-center py-16">
                  <Users size={40} className="text-[#D4AF37]/30 mx-auto mb-3" />
                  <p className="text-[#6B5A74] font-serif text-xl mb-2">No leads found</p>
                  <p className="text-[#6B5A74]/60 text-sm font-sans">
                    {applied.fromDate || applied.toDate || applied.gender
                      ? "No results match the selected filters."
                      : "Leads will appear here once users submit the form."}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[1100px]">
                    <thead>
                      <tr className="border-b border-[#D4AF37]/10 bg-[#F5F1E8]/60">
                        {[
                          "Date Submitted", "Full Name", "Mobile Number",
                          "Email Address", "Date of Birth", "Gender",
                          "City", "Country",
                          "Areas Seeking Growth", "Story", "Action",
                        ].map((h) => (
                          <th key={h} className="text-left px-4 py-3 text-xs text-[#6B5A74] font-sans uppercase tracking-wide whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.map((s) => (
                        <tr key={s.id} data-testid={`submission-row-${s.id}`}
                          className="border-b border-[#D4AF37]/10 hover:bg-[#F5F1E8]/40 transition-colors">
                          <td className="px-4 py-3 text-[#6B5A74] font-sans text-xs whitespace-nowrap">
                            {formatDate(s.submitted_at)}
                          </td>
                          <td className="px-4 py-3 font-sans text-[#2A1133] font-medium whitespace-nowrap">
                            {s.name || "—"}
                          </td>
                          <td className="px-4 py-3 text-[#2A1133] font-sans text-xs whitespace-nowrap">
                            {s.phone || "—"}
                          </td>
                          <td className="px-4 py-3 text-[#6B5A74] font-sans text-xs">
                            {s.email || "—"}
                          </td>
                          <td className="px-4 py-3 text-[#6B5A74] font-sans text-xs whitespace-nowrap">
                            {s.dob || "—"}
                          </td>
                          <td className="px-4 py-3 text-[#6B5A74] font-sans text-xs">
                            {s.gender || "—"}
                          </td>
                          <td className="px-4 py-3 text-[#6B5A74] font-sans text-xs">
                            {s.city || "—"}
                          </td>
                          <td className="px-4 py-3 text-[#6B5A74] font-sans text-xs">
                            {s.country || "—"}
                          </td>
                          <td className="px-4 py-3 text-[#6B5A74] font-sans text-xs max-w-[200px]">
                            <span className="line-clamp-2">{resolveGoals(s)}</span>
                          </td>
                          <td className="px-4 py-3 text-[#6B5A74] font-sans text-xs max-w-[160px]">
                            <span className="line-clamp-2">{s.story || "—"}</span>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              data-testid={`view-submission-${s.id}`}
                              onClick={() => setSelected(s)}
                              className="text-[#6B5A74] hover:text-[#D4AF37] transition-colors p-1 rounded-lg hover:bg-[#D4AF37]/10"
                              title="View Details"
                            >
                              <Eye size={15} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-[#D4AF37]/10">
                  <span className="text-xs text-[#6B5A74] font-sans">
                    Page {page} of {totalPages} ({total} total)
                  </span>
                  <div className="flex gap-2">
                    <button data-testid="pagination-prev"
                      onClick={() => setPage((p) => Math.max(p - 1, 1))}
                      disabled={page === 1}
                      className="p-2 rounded-lg border border-[#D4AF37]/25 text-[#6B5A74] hover:border-[#D4AF37]/60 disabled:opacity-30 transition-all">
                      <ChevronLeft size={14} />
                    </button>
                    <button data-testid="pagination-next"
                      onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                      disabled={page === totalPages}
                      className="p-2 rounded-lg border border-[#D4AF37]/25 text-[#6B5A74] hover:border-[#D4AF37]/60 disabled:opacity-30 transition-all">
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {selected && <DetailModal submission={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
