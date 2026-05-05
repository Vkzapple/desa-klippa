"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/store";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 600));
    const success = login(username, password);
    if (success) {
      router.push("/beranda");
    } else {
      setError("Username atau password salah. Coba lagi.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 40%, #1d4ed8 70%, #3b82f6 100%)" }}>
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 flex-col justify-between p-14 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-blue-400/10" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-1">
    <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0 overflow-hidden">
      <img src="./logo-2.jpg" alt="Logo Desa" className="w-full h-full object-cover" />
    </div>
    <div>
      <p className="text-white font-bold text-sm leading-tight">Desa Bandar Klippa</p>
      <p className="text-blue-200 text-xs">Kec. Percut Sei Tuan</p>
    </div>
  </div>
        </div>

        <div className="relative z-10">
          <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight tracking-tight mb-5">
            Sistem Administrasi<br />
            <span className="text-blue-300">Surat Desa</span>
          </h1>
          <p className="text-blue-200 text-lg leading-relaxed max-w-md">
            Platform digital terpadu untuk mengelola surat menyurat, data kependudukan, dan layanan administrasi Desa Bandar Klippa.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { icon: "", label: "19 Jenis Surat", desc: "Template lengkap" },
              { icon: "", label: "Data Warga", desc: "Terintegrasi NIK" },
              { icon: "", label: "Cetak Langsung", desc: "Format resmi" },
            ].map((item) => (
              <div key={item.label} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-4">
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="text-white font-semibold text-sm">{item.label}</p>
                <p className="text-blue-200 text-xs mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-blue-300 text-sm">© 2025 Pemerintah Desa Bandar Klippa. Jln. Rukun No. 2</p>
        </div>
      </div>

      {/* Right panel – form */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-md">
          {/* Mobile header */}
          <div className="lg:hidden text-center mb-8">
      <img src="./logo.png" alt="Logo Desa" className="w-10 h-10 object-cover" />
              <h2 className="text-white font-extrabold text-2xl">Desa Bandar Klippa</h2>
            <p className="text-blue-200 text-sm mt-1">Sistem Administrasi Surat</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Card header */}
            <div className="px-8 pt-8 pb-6 border-b border-slate-100">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Masuk ke Sistem</h2>
              <p className="text-slate-500 text-sm mt-1">Gunakan akun yang telah diberikan administrator.</p>
            </div>

            <form className="px-8 py-7 space-y-5" onSubmit={handleSubmit}>
              {/* Username */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base">👤</span>
                  <input
                    type="text"
                    required
                    placeholder="Masukkan username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 text-slate-900 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base">🔒</span>
                  <input
                    type={showPass ? "text" : "password"}
                    required
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 text-slate-900 text-sm outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm"
                  >
                    {showPass ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
                  <span className="text-red-500">⚠️</span>
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl font-bold text-sm text-white transition-all shadow-lg shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ background: loading ? "#60a5fa" : "linear-gradient(135deg, #1d4ed8, #2563eb)" }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>
                    Memproses...
                  </span>
                ) : "Masuk ke Sistem →"}
              </button>

              {/* Demo info */}
              <div className="rounded-2xl bg-blue-50 border border-blue-100 p-4">
                <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-2">Akun Demo</p>
                <div className="space-y-1.5 text-xs text-blue-600">
                  <div className="flex justify-between">
                    <span className="font-semibold">Admin</span>
                    <span className="font-mono bg-blue-100 px-2 py-0.5 rounded">admin / admin123</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Petugas</span>
                    <span className="font-mono bg-blue-100 px-2 py-0.5 rounded">petugas / petugas123</span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}