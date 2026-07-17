import { useState, useEffect, FormEvent } from "react";
import { supabase } from "./lib/supabase";
import { Lock, LogOut, Download, RefreshCw, Search, Check, X } from "lucide-react";
import type { Session } from "@supabase/supabase-js";

interface Registration {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  whatsapp: string;
  institution: string;
  primary_committee: string;
  secondary_committee: string;
  previous_mun_experience: string;
  position_statement: string;
  pass_id: string;
  payment_status: string;
}

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoadingSession(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) fetchRegistrations();
  }, [session]);

  const fetchRegistrations = async () => {
    setLoadingData(true);
    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setRegistrations(data as Registration[]);
    setLoadingData(false);
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoggingIn(false);
    if (error) setLoginError("Invalid email or password.");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const togglePayment = async (id: string, current: string) => {
    const next = current === "paid" ? "pending" : "paid";
    await supabase.from("registrations").update({ payment_status: next }).eq("id", id);
    setRegistrations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, payment_status: next } : r))
    );
  };

  const exportCSV = () => {
    const headers = [
      "Pass ID", "Name", "Email", "WhatsApp", "Institution",
      "Primary Committee", "Secondary Committee", "MUN Experience",
      "Payment Status", "Registered At"
    ];
    const rows = registrations.map((r) => [
      r.pass_id, r.full_name, r.email, r.whatsapp, r.institution,
      r.primary_committee, r.secondary_committee, r.previous_mun_experience,
      r.payment_status, new Date(r.created_at).toLocaleString()
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cda-mun-registrations-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = registrations.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.full_name?.toLowerCase().includes(q) ||
      r.email?.toLowerCase().includes(q) ||
      r.institution?.toLowerCase().includes(q) ||
      r.pass_id?.toLowerCase().includes(q)
    );
  });

  const paidCount = registrations.filter((r) => r.payment_status === "paid").length;

  if (loadingSession) {
    return (
      <div className="min-h-screen bg-[#080a0f] flex items-center justify-center text-white/60">
        Loading...
      </div>
    );
  }

  // ---------- LOGIN SCREEN ----------
  if (!session) {
    return (
      <div className="min-h-screen bg-[#080a0f] flex items-center justify-center px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-[#181c28] border border-white/10 rounded-xl p-8"
        >
          <div className="flex items-center gap-2 mb-6 text-[#c9a84c]">
            <Lock className="w-5 h-5" />
            <h1 className="font-bold text-lg text-white">Admin Login</h1>
          </div>

          {loginError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-3 py-2 mb-4">
              {loginError}
            </div>
          )}

          <label className="block text-xs uppercase tracking-wider text-white/50 mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-[#080a0f] border border-white/15 rounded-lg px-3 py-2.5 text-white text-sm mb-4 outline-none focus:border-[#c9a84c]"
          />

          <label className="block text-xs uppercase tracking-wider text-white/50 mb-1.5">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-[#080a0f] border border-white/15 rounded-lg px-3 py-2.5 text-white text-sm mb-6 outline-none focus:border-[#c9a84c]"
          />

          <button
            type="submit"
            disabled={loggingIn}
            className="w-full bg-[#c9a84c] hover:bg-[#e8c97a] text-black font-bold text-sm uppercase tracking-wider py-3 rounded-lg transition-colors disabled:opacity-60"
          >
            {loggingIn ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    );
  }

  // ---------- DASHBOARD ----------
  return (
    <div className="min-h-screen bg-[#080a0f] text-white px-4 sm:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Registrations</h1>
            <p className="text-white/50 text-sm mt-1">
              {registrations.length} total &middot; {paidCount} paid &middot; {registrations.length - paidCount} pending
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={fetchRegistrations}
              className="flex items-center gap-1.5 border border-white/15 hover:border-white/30 text-sm px-3 py-2 rounded-lg"
            >
              <RefreshCw className={`w-4 h-4 ${loadingData ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              onClick={exportCSV}
              className="flex items-center gap-1.5 bg-[#c9a84c] hover:bg-[#e8c97a] text-black font-bold text-sm px-3 py-2 rounded-lg"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 border border-white/15 hover:border-red-400/50 hover:text-red-400 text-sm px-3 py-2 rounded-lg"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="relative mb-4 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            placeholder="Search name, email, institution, pass ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#181c28] border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-sm outline-none focus:border-[#c9a84c]"
          />
        </div>

        <div className="bg-[#181c28] border border-white/10 rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/50 text-xs uppercase tracking-wider">
                <th className="text-left px-4 py-3">Pass ID</th>
                <th className="text-left px-4 py-3">Name</th>
                <th className="text-left px-4 py-3">Email</th>
                <th className="text-left px-4 py-3">WhatsApp</th>
                <th className="text-left px-4 py-3">Institution</th>
                <th className="text-left px-4 py-3">Committee</th>
                <th className="text-left px-4 py-3">Registered</th>
                <th className="text-left px-4 py-3">Payment</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="px-4 py-3 text-[#c9a84c] font-mono text-xs">{r.pass_id}</td>
                  <td className="px-4 py-3">{r.full_name}</td>
                  <td className="px-4 py-3 text-white/70">{r.email}</td>
                  <td className="px-4 py-3 text-white/70">{r.whatsapp}</td>
                  <td className="px-4 py-3 text-white/70">{r.institution}</td>
                  <td className="px-4 py-3 text-white/70">{r.primary_committee}</td>
                  <td className="px-4 py-3 text-white/50 text-xs">
                    {new Date(r.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => togglePayment(r.id, r.payment_status)}
                      className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                        r.payment_status === "paid"
                          ? "bg-green-500/15 text-green-400"
                          : "bg-yellow-500/15 text-yellow-400"
                      }`}
                    >
                      {r.payment_status === "paid" ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <X className="w-3 h-3" />
                      )}
                      {r.payment_status}
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-white/40">
                    {loadingData ? "Loading..." : "No registrations found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
