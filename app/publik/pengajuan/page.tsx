"use client";

import { useState } from "react";
import { useStore } from "@/store/store";
import { getAllJenisSurat } from "@/lib/suratData";
import PubLayout from "@/components/PubLayout";

export default function PengajuanPage() {
  const { addPengajuan } = useStore();
  const [step, setStep] = useState<"form" | "sukses">("form");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nama: "", nik: "", jenisSurat: "", keperluan: "",
    ktpFile: "", kkFile: "",
  });

  const allJenis = getAllJenisSurat();
  const set = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    addPengajuan({
      id: Date.now().toString(),
      nama: form.nama,
      nik: form.nik,
      jenisSurat: form.jenisSurat,
      keperluan: form.keperluan,
      tanggalAjuan: new Date().toISOString().slice(0, 10),
      status: "diproses",
      dokumen: [form.ktpFile, form.kkFile].filter(Boolean),
    });
    setLoading(false);
    setStep("sukses");
  };

  if (step === "sukses") {
    return (
      <PubLayout>
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl mx-auto mb-6">✅</div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Pengajuan Berhasil!</h1>
          <p className="text-slate-500 mb-6">Permohonan surat <strong>{form.jenisSurat}</strong> atas nama <strong>{form.nama}</strong> telah kami terima.</p>
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-8 text-left">
            <p className="font-bold text-blue-900 text-sm mb-3">Detail Pengajuan</p>
            <div className="space-y-2 text-sm text-blue-700">
              <div className="flex justify-between"><span>Nama</span><strong>{form.nama}</strong></div>
              <div className="flex justify-between"><span>NIK</span><strong className="font-mono">{form.nik}</strong></div>
              <div className="flex justify-between"><span>Jenis Surat</span><strong>{form.jenisSurat}</strong></div>
              <div className="flex justify-between"><span>Status</span><span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-bold">⏳ Diproses</span></div>
            </div>
          </div>
          <p className="text-sm text-slate-500 mb-6">Gunakan NIK Anda untuk memantau status pengajuan.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { setStep("form"); setForm({ nama:"",nik:"",jenisSurat:"",keperluan:"",ktpFile:"",kkFile:"" }); }}
              className="px-6 py-3 rounded-2xl font-bold text-sm bg-white border-2 border-blue-200 text-blue-700 hover:bg-blue-50 transition-all">
              Ajukan Lagi
            </button>
            <a href="/publik/cek-surat"
              className="px-6 py-3 rounded-2xl font-bold text-sm text-white shadow-md transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6)" }}>
              🔍 Cek Status
            </a>
          </div>
        </div>
      </PubLayout>
    );
  }

  return (
    <PubLayout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Pengajuan Surat Online</h1>
          <p className="text-slate-500">Isi formulir di bawah untuk mengajukan permohonan surat desa</p>
        </div>

        {/* Info */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex gap-3">
          <span className="text-xl flex-shrink-0">⚠️</span>
          <p className="text-sm text-amber-800">Pengajuan online hanya sebagai pendaftaran awal. Surat tetap diambil langsung di <strong>Kantor Desa Bandar Klippa</strong> dengan membawa KTP dan KK asli.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100" style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)" }}>
            <h2 className="font-extrabold text-slate-900">Data Pemohon</h2>
          </div>
          <div className="p-6 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Nama Lengkap *</label>
                <input value={form.nama} onChange={e => set("nama", e.target.value)} required placeholder="Sesuai KTP"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm focus:border-blue-500 focus:bg-white outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">NIK *</label>
                <input value={form.nik} onChange={e => set("nik", e.target.value)} required placeholder="16 digit NIK" maxLength={16}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm font-mono focus:border-blue-500 focus:bg-white outline-none transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Jenis Surat *</label>
              <select value={form.jenisSurat} onChange={e => set("jenisSurat", e.target.value)} required
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm focus:border-blue-500 focus:bg-white outline-none transition-all">
                <option value="">-- Pilih Jenis Surat --</option>
                {["dasar","kependudukan","umum","pendidikan","ekonomi"].map(kat => {
                  const items = allJenis.filter(j => j.kategori === kat);
                  return (
                    <optgroup key={kat} label={`— ${kat.charAt(0).toUpperCase()+kat.slice(1)} —`}>
                      {items.map(j => <option key={j.id} value={j.nama}>{j.nama}</option>)}
                    </optgroup>
                  );
                })}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Keperluan / Keterangan *</label>
              <textarea value={form.keperluan} onChange={e => set("keperluan", e.target.value)} required rows={3}
                placeholder="Jelaskan keperluan pengajuan surat ini..."
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm focus:border-blue-500 focus:bg-white outline-none transition-all resize-none" />
            </div>

            {/* Upload dokumen */}
            <div className="border-t border-slate-100 pt-5">
              <p className="font-extrabold text-slate-900 text-sm mb-3">Upload Dokumen <span className="text-slate-400 font-normal">(opsional)</span></p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { key: "ktpFile", label: "Foto KTP", icon: "🪪" },
                  { key: "kkFile", label: "Foto KK", icon: "📋" },
                ].map(doc => (
                  <div key={doc.key}>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">{doc.icon} {doc.label}</label>
                    <div className="relative">
                      <input type="file" accept="image/*,.pdf" id={doc.key}
                        onChange={e => set(doc.key as keyof typeof form, e.target.files?.[0]?.name || "")}
                        className="absolute inset-0 opacity-0 w-full cursor-pointer" />
                      <div className="w-full px-4 py-3 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-sm text-slate-400 flex items-center gap-2 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer">
                        <span>📁</span>
                        <span className="truncate">{form[doc.key as keyof typeof form] || "Pilih file (JPG/PDF)..."}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <button type="submit" disabled={loading}
                className="w-full py-3.5 rounded-2xl font-bold text-sm text-white shadow-md transition-all hover:scale-[1.01] disabled:opacity-70"
                style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6)" }}>
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>
                    Mengirim Pengajuan...
                  </span>
                ) : " Kirim Pengajuan"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </PubLayout>
  );
}