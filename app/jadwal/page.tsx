"use client";

import { useEffect } from "react";
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";

const HARI_ORDER = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

export default function JadwalPage() {
  const { jadwalPelayanan, updateJadwal, isLoggedIn } = useStore();
  const router = useRouter();

  useEffect(() => { if (!isLoggedIn) router.push("/login"); }, [isLoggedIn, router]);

  const today = new Date().toLocaleDateString("id-ID", { weekday: "long" });
  const sorted = [...jadwalPelayanan].sort((a, b) => HARI_ORDER.indexOf(a.hari) - HARI_ORDER.indexOf(b.hari));
  const aktifCount = jadwalPelayanan.filter(j => j.aktif).length;

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-blue-50 lg:pl-64">
      <Nav />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 fade-up">
        <div className="mb-7">
          <p className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-1">Pelayanan</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Jadwal Pelayanan</h1>
          <p className="text-slate-500 text-sm mt-1">Jam operasional Kantor Kepala Desa Bandar Klippa</p>
        </div>

        {/* Status hari ini */}
        {(() => {
          const hariIni = jadwalPelayanan.find(j => j.hari.toLowerCase() === today.toLowerCase());
          return hariIni ? (
            <div className={`mb-6 p-5 rounded-2xl border-2 flex items-center gap-4 ${hariIni.aktif ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${hariIni.aktif ? "bg-green-100" : "bg-red-100"}`}>
                {hariIni.aktif ? "🟢" : "🔴"}
              </div>
              <div>
                <p className={`font-extrabold text-lg ${hariIni.aktif ? "text-green-800" : "text-red-800"}`}>
                  {hariIni.aktif ? "Kantor Sedang Buka" : "Kantor Sedang Tutup"}
                </p>
                <p className={`text-sm font-medium ${hariIni.aktif ? "text-green-600" : "text-red-600"}`}>
                  {hariIni.hari} · {hariIni.aktif ? `${hariIni.jamBuka} – ${hariIni.jamTutup} WIB` : "Hari Libur"}
                </p>
              </div>
            </div>
          ) : null;
        })()}

        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between" style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)" }}>
            <div>
              <h2 className="font-extrabold text-slate-900 text-base">Jadwal Mingguan</h2>
              <p className="text-slate-500 text-xs mt-0.5">{aktifCount} hari aktif pelayanan</p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {sorted.map(j => {
              const isToday = j.hari.toLowerCase() === today.toLowerCase();
              return (
                <div key={j.hari} className={`flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-4 transition-colors ${isToday ? "bg-blue-50" : "hover:bg-slate-50"}`}>
                  <div className="flex items-center gap-3 sm:w-44">
                    {isToday && <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 animate-pulse" />}
                    <span className={`font-extrabold text-base ${isToday ? "text-blue-700" : "text-slate-900"} ${!isToday ? "ml-5" : ""}`}>{j.hari}</span>
                    {isToday && <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase">Hari ini</span>}
                  </div>

                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide w-16">Jam Buka</label>
                      <input type="time" value={j.jamBuka} onChange={e => updateJadwal(j.hari, { jamBuka: e.target.value })} disabled={!j.aktif}
                        className="px-3 py-2 rounded-xl border-2 border-slate-200 text-sm font-mono focus:border-blue-500 outline-none disabled:opacity-50 disabled:bg-slate-50" />
                    </div>
                    <span className="text-slate-400 font-bold">–</span>
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide w-16">Jam Tutup</label>
                      <input type="time" value={j.jamTutup} onChange={e => updateJadwal(j.hari, { jamTutup: e.target.value })} disabled={!j.aktif}
                        className="px-3 py-2 rounded-xl border-2 border-slate-200 text-sm font-mono focus:border-blue-500 outline-none disabled:opacity-50 disabled:bg-slate-50" />
                    </div>
                  </div>

                  <button onClick={() => updateJadwal(j.hari, { aktif: !j.aktif })}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${j.aktif ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                    <div className={`w-3 h-3 rounded-full ${j.aktif ? "bg-green-500" : "bg-slate-400"}`} />
                    {j.aktif ? "Aktif" : "Libur"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-5 bg-blue-600 rounded-2xl p-5 text-white">
          <div className="flex items-start gap-3">
            <span className="text-2xl">ℹ️</span>
            <div>
              <p className="font-extrabold text-base mb-1">Catatan Pelayanan</p>
              <p className="text-blue-100 text-sm leading-relaxed">Jam pelayanan dapat berubah pada hari-hari tertentu seperti libur nasional atau hari besar keagamaan. Pastikan untuk menghubungi kantor desa terlebih dahulu.</p>
              <p className="text-blue-200 text-sm mt-2">📞 Telepon: <strong>061-XXXXXXX</strong></p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}