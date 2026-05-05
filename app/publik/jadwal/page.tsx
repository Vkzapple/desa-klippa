"use client";

import { useStore } from "@/store/store";
import PubLayout from "@/components/PubLayout";

export default function PublikJadwalPage() {
  const { jadwalPelayanan, dataDesa } = useStore();
  const HARI_ORDER = ["Senin","Selasa","Rabu","Kamis","Jumat","Sabtu","Minggu"];
  const sorted = [...jadwalPelayanan].sort((a, b) => HARI_ORDER.indexOf(a.hari) - HARI_ORDER.indexOf(b.hari));
  const today = new Date().toLocaleDateString("id-ID", { weekday: "long" });
  const jadwalToday = sorted.find(j => j.hari.toLowerCase() === today.toLowerCase());

  return (
    <PubLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl mx-auto mb-4">📅</div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Jadwal Pelayanan</h1>
          <p className="text-slate-500">Jam operasional Kantor Kepala Desa Bandar Klippa</p>
        </div>

        {/* Status hari ini */}
        {jadwalToday && (
          <div className={`mb-6 p-5 rounded-2xl border-2 flex items-center gap-4 ${jadwalToday.aktif ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${jadwalToday.aktif ? "bg-green-100" : "bg-red-100"}`}>
              {jadwalToday.aktif ? "🟢" : "🔴"}
            </div>
            <div>
              <p className={`font-extrabold text-lg ${jadwalToday.aktif ? "text-green-800" : "text-red-800"}`}>
                {jadwalToday.aktif ? "Kantor Sedang Buka" : "Kantor Sedang Tutup"}
              </p>
              <p className={`text-sm font-medium ${jadwalToday.aktif ? "text-green-600" : "text-red-600"}`}>
                Hari ini, {jadwalToday.hari} · {jadwalToday.aktif ? `${jadwalToday.jamBuka} – ${jadwalToday.jamTutup} WIB` : "Hari Libur"}
              </p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-slate-100" style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)" }}>
            <h2 className="font-extrabold text-slate-900">Jadwal Mingguan</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {sorted.map(j => {
              const isToday = j.hari.toLowerCase() === today.toLowerCase();
              return (
                <div key={j.hari} className={`flex items-center justify-between px-6 py-4 ${isToday ? "bg-blue-50" : ""}`}>
                  <div className="flex items-center gap-3">
                    {isToday && <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />}
                    <span className={`font-bold ${isToday ? "text-blue-700" : "text-slate-900"} ${!isToday ? "ml-5" : ""}`}>{j.hari}</span>
                    {isToday && <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold">Hari ini</span>}
                  </div>
                  {j.aktif ? (
                    <span className="font-semibold text-sm text-slate-700">{j.jamBuka} – {j.jamTutup} <span className="text-slate-400">WIB</span></span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold">Tutup / Libur</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-blue-600 rounded-2xl p-5 text-white">
          <p className="font-extrabold text-base mb-3">📍 Lokasi Kantor</p>
          <p className="text-blue-100 text-sm">{dataDesa.alamatKantor}</p>
          <p className="text-blue-100 text-sm">{dataDesa.kecamatan}, {dataDesa.kabupaten}</p>
          <p className="text-blue-100 text-sm mt-2">📞 {dataDesa.telepon}</p>
        </div>
      </div>
    </PubLayout>
  );
}