"use client";

import { useState } from "react";
import { useStore } from "@/store/store";
import PubLayout from "@/components/PubLayout";

const STATUS_CONFIG = {
  diproses: { label: "Sedang Diproses", color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: "⏳", bar: "bg-yellow-400", desc: "Permohonan Anda sedang dalam proses oleh petugas desa." },
  selesai: { label: "Selesai", color: "bg-green-100 text-green-800 border-green-200", icon: "✅", bar: "bg-green-500", desc: "Surat Anda telah selesai diproses. Silakan ambil di kantor desa dengan membawa KTP asli." },
  ditolak: { label: "Ditolak", color: "bg-red-100 text-red-800 border-red-200", icon: "❌", bar: "bg-red-500", desc: "Permohonan Anda ditolak. Silakan hubungi kantor desa untuk informasi lebih lanjut." },
  aktif: { label: "Aktif", color: "bg-blue-100 text-blue-800 border-blue-200", icon: "📄", bar: "bg-blue-500", desc: "Surat dalam status aktif." },
  expired: { label: "Kedaluwarsa", color: "bg-slate-100 text-slate-600 border-slate-200", icon: "📅", bar: "bg-slate-400", desc: "Surat telah kedaluwarsa." },
};

export default function CekSuratPage() {
  const { suratList, pengajuanList } = useStore();
  const [nik, setNik] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCek = async () => {
    if (!nik.trim()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setSearched(true);
    setLoading(false);
  };

  const suratWarga = suratList.filter(s => s.nikPemohon === nik);
  const pengajuanWarga = pengajuanList.filter(p => p.nik === nik);
  const total = suratWarga.length + pengajuanWarga.length;

  return (
    <PubLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Cek Status Surat</h1>
          <p className="text-slate-500">Masukkan NIK Anda untuk melihat status permohonan surat</p>
        </div>

        {/* Search box */}
        <div className="bg-white rounded-3xl shadow-md border border-blue-100 p-6 mb-8">
          <label className="block text-sm font-bold text-slate-700 mb-2">Nomor Induk Kependudukan (NIK)</label>
          <div className="flex gap-3">
            <input
              value={nik}
              onChange={e => { setNik(e.target.value); setSearched(false); }}
              onKeyDown={e => e.key === "Enter" && handleCek()}
              placeholder="Masukkan 16 digit NIK..."
              maxLength={16}
              className="flex-1 px-5 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 text-sm font-mono focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-900"
            />
            <button onClick={handleCek} disabled={!nik.trim() || loading}
              className="px-6 py-3 rounded-2xl font-bold text-sm text-white shadow-md transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6)" }}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>
                  Cek...
                </span>
              ) : "Cek Status"}
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-2">Contoh: 1212345678901234</p>
        </div>

        {/* Results */}
        {searched && (
          <div className="space-y-5">
            {total === 0 ? (
              <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <div className="text-5xl mb-3">📭</div>
                <p className="font-extrabold text-slate-900 text-lg">Tidak Ada Data</p>
                <p className="text-slate-500 text-sm mt-1">NIK <strong className="font-mono">{nik}</strong> tidak ditemukan dalam sistem.</p>
                <p className="text-slate-400 text-xs mt-3">Pastikan NIK yang dimasukkan benar, atau hubungi kantor desa.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-2xl px-5 py-4">
                  <span className="text-2xl">📋</span>
                  <div>
                    <p className="font-extrabold text-blue-900">Ditemukan {total} data</p>
                    <p className="text-blue-600 text-xs">untuk NIK: <span className="font-mono font-bold">{nik}</span></p>
                  </div>
                </div>

                {/* Surat resmi */}
                {suratWarga.length > 0 && (
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Surat Resmi ({suratWarga.length})</p>
                    <div className="space-y-3">
                      {suratWarga.map(s => {
                        const cfg = STATUS_CONFIG[s.status] || STATUS_CONFIG.diproses;
                        return (
                          <div key={s.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className={`h-1.5 w-full ${cfg.bar}`} />
                            <div className="p-5">
                              <div className="flex items-start justify-between gap-3 mb-3">
                                <div>
                                  <p className="font-extrabold text-slate-900">{s.jenisSurat}</p>
                                  <p className="text-xs text-slate-400 font-mono mt-0.5">{s.nomorSurat}</p>
                                </div>
                                <span className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${cfg.color}`}>
                                  <span>{cfg.icon}</span> {cfg.label}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 mb-2">{cfg.desc}</p>
                              <div className="grid grid-cols-2 gap-2 text-xs text-slate-500">
                                <span>📅 Tanggal: <strong>{s.tanggalBuat}</strong></span>
                                <span>👤 Keperluan: <strong>{s.keperluan}</strong></span>
                              </div>
                              {s.alasanTolak && <p className="mt-2 text-xs text-red-600 bg-red-50 rounded-xl px-3 py-2">Alasan: {s.alasanTolak}</p>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Pengajuan online */}
                {pengajuanWarga.length > 0 && (
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Pengajuan Online ({pengajuanWarga.length})</p>
                    <div className="space-y-3">
                      {pengajuanWarga.map(p => {
                        const cfg = STATUS_CONFIG[p.status] || STATUS_CONFIG.diproses;
                        return (
                          <div key={p.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className={`h-1.5 w-full ${cfg.bar}`} />
                            <div className="p-5">
                              <div className="flex items-start justify-between gap-3 mb-3">
                                <div>
                                  <p className="font-extrabold text-slate-900">{p.jenisSurat}</p>
                                  <p className="text-xs text-slate-400 mt-0.5">Pengajuan Online · {p.tanggalAjuan}</p>
                                </div>
                                <span className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${cfg.color}`}>
                                  <span>{cfg.icon}</span> {cfg.label}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500">{cfg.desc}</p>
                              {p.alasanTolak && <p className="mt-2 text-xs text-red-600 bg-red-50 rounded-xl px-3 py-2">Alasan: {p.alasanTolak}</p>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Info box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <p className="font-bold text-blue-900 text-sm mb-2">ℹ️ Informasi</p>
          <ul className="space-y-1 text-xs text-blue-700">
            <li>• Surat dengan status <strong>Selesai</strong> bisa diambil di kantor desa dengan membawa KTP asli</li>
            <li>• Proses pembuatan surat memerlukan <strong>1–3 hari kerja</strong></li>
            <li>• Jika ada kendala, hubungi kami di <strong>061 77838357</strong></li>
          </ul>
        </div>
      </div>
    </PubLayout>
  );
}