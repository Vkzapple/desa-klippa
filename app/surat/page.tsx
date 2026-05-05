"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import { JENIS_SURAT, getAllJenisSurat, getTemplateFields } from "@/lib/suratData";

export default function SuratPage() {
  const { suratList, addSurat, penduduk, isLoggedIn, currentUser, dataDesa } = useStore();
  const router = useRouter();
  const [step, setStep] = useState<"pilih" | "form">("pilih");
  const [selectedJenis, setSelectedJenis] = useState<ReturnType<typeof getAllJenisSurat>[0] | null>(null);
  const [nikInput, setNikInput] = useState("");
  const [foundWarga, setFoundWarga] = useState<typeof penduduk[0] | null>(null);
  const [extraData, setExtraData] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState("");
  const [activeKat, setActiveKat] = useState("dasar");

  useEffect(() => { if (!isLoggedIn) router.push("/login"); }, [isLoggedIn, router]);

  const handleNIKSearch = () => {
    const found = penduduk.find(p => p.nik === nikInput);
    setFoundWarga(found || null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJenis || !foundWarga) return;
    const count = suratList.filter(s => s.kategoriSurat === selectedJenis.kategori).length + 1;
    const nomorSurat = `${selectedJenis.singkatan}/${new Date().getFullYear()}/${String(count).padStart(3, "0")}`;
    addSurat({
      id: Date.now().toString(),
      nomorSurat,
      jenisSurat: selectedJenis.nama,
      kategoriSurat: selectedJenis.kategori,
      nikPemohon: foundWarga.nik,
      namaPemohon: foundWarga.nama,
      keperluan: extraData.keperluan || "",
      tanggalBuat: new Date().toISOString().slice(0, 10),
      status: "aktif",
      dibuatOleh: currentUser?.nama || "Admin",
      data: extraData,
    });
    setSuccess(`Surat ${selectedJenis.nama} untuk ${foundWarga.nama} berhasil dibuat!`);
    setTimeout(() => {
      setSuccess("");
      setStep("pilih");
      setSelectedJenis(null);
      setFoundWarga(null);
      setNikInput("");
      setExtraData({});
    }, 3000);
  };

  const templateFields = selectedJenis ? getTemplateFields(selectedJenis.id) : [];
  const kategoriKeys = Object.keys(JENIS_SURAT) as (keyof typeof JENIS_SURAT)[];

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-blue-50 lg:pl-64">
      <Nav />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 fade-up">
        {/* Header */}
        <div className="mb-7">
          <p className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-1">Layanan</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Pembuatan Surat</h1>
          <p className="text-slate-500 text-sm mt-1">Pilih jenis surat lalu isi data pemohon</p>
        </div>

        {success && (
          <div className="mb-5 flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-5 py-4">
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-bold text-green-800 text-sm">{success}</p>
              <p className="text-green-600 text-xs mt-0.5">Surat tersimpan di Arsip Surat.</p>
            </div>
          </div>
        )}

        {step === "pilih" && (
          <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100" style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)" }}>
              <h2 className="font-extrabold text-slate-900 text-base">Pilih Jenis Surat</h2>
              <p className="text-slate-500 text-xs mt-1">19 jenis surat tersedia</p>
            </div>

            <div className="flex gap-1 px-6 pt-5 pb-2 overflow-x-auto">
              {kategoriKeys.map(k => (
                <button key={k} onClick={() => setActiveKat(k)}
                  className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeKat === k ? "text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                  style={activeKat === k ? { background: "linear-gradient(135deg,#1d4ed8,#3b82f6)" } : {}}>
                  <span>{JENIS_SURAT[k].icon}</span>
                  <span>{JENIS_SURAT[k].label}</span>
                </button>
              ))}
            </div>

            <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {JENIS_SURAT[activeKat as keyof typeof JENIS_SURAT].items.map(item => {
                const count = suratList.filter(s => s.jenisSurat === item.nama).length;
                return (
                  <button key={item.id} onClick={() => { setSelectedJenis({ ...item, kategori: activeKat, kategoriLabel: JENIS_SURAT[activeKat as keyof typeof JENIS_SURAT].label }); setStep("form"); }}
                    className="text-left p-4 rounded-2xl border-2 border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50 hover:shadow-md transition-all group">
                    <div className="flex items-start justify-between gap-2">
                      <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-base shrink-0 group-hover:bg-blue-200 transition">📄</div>
                      {count > 0 && <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">{count}x</span>}
                    </div>
                    <p className="font-bold text-slate-900 text-sm mt-3 leading-tight">{item.nama}</p>
                    <p className="text-xs text-blue-600 font-bold mt-1 bg-blue-50 inline-block px-2 py-0.5 rounded-lg">{item.singkatan}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === "form" && selectedJenis && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <button onClick={() => { setStep("pilih"); setFoundWarga(null); setNikInput(""); setExtraData({}); }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
                ← Kembali
              </button>
              <div>
                <p className="font-extrabold text-slate-900">{selectedJenis.nama}</p>
                <p className="text-xs text-blue-600 font-bold">{selectedJenis.singkatan} · {selectedJenis.kategoriLabel}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Cari warga */}
              <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                <h2 className="font-extrabold text-slate-900 text-base mb-4">👤 Data Pemohon</h2>
                <div className="flex gap-3 mb-4">
                  <div className="flex-1 relative">
                    <input value={nikInput} onChange={e => setNikInput(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), handleNIKSearch())}
                      placeholder="Masukkan NIK pemohon..."
                      className="w-full pl-4 pr-4 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm focus:border-blue-500 focus:bg-white outline-none transition-all font-mono" />
                  </div>
                  <button type="button" onClick={handleNIKSearch}
                    className="px-5 py-2.5 rounded-xl font-bold text-sm text-white shadow-md transition-all hover:scale-105"
                    style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6)" }}>Cari NIK</button>
                </div>

                {/* Autocomplete from list */}
                <div className="mb-4">
                  <p className="text-xs font-bold text-slate-500 mb-2">Atau pilih dari daftar:</p>
                  <select onChange={e => { const w = penduduk.find(p => p.nik === e.target.value); setFoundWarga(w || null); setNikInput(e.target.value); }}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm focus:border-blue-500 focus:bg-white outline-none transition-all">
                    <option value="">-- Pilih Warga --</option>
                    {penduduk.map(p => <option key={p.id} value={p.nik}>{p.nama} – {p.nik}</option>)}
                  </select>
                </div>

                {foundWarga ? (
                  <div className="p-4 rounded-2xl bg-green-50 border border-green-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center font-extrabold text-green-800">{foundWarga.nama.charAt(0)}</div>
                      <div>
                        <p className="font-extrabold text-slate-900">{foundWarga.nama}</p>
                        <p className="text-xs text-green-700 font-bold">✅ Warga terdaftar</p>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2 text-xs text-slate-600">
                      <span>📋 NIK: <strong>{foundWarga.nik}</strong></span>
                      <span>📍 {foundWarga.alamat}, RT {foundWarga.rt}/RW {foundWarga.rw}</span>
                      <span>💼 {foundWarga.pekerjaan}</span>
                      <span>📅 {foundWarga.tempatLahir}, {foundWarga.tanggalLahir}</span>
                    </div>
                  </div>
                ) : nikInput && (
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-sm text-red-700 font-semibold">
                    ⚠️ NIK tidak ditemukan di database warga
                  </div>
                )}
              </div>

              {/* Dynamic fields */}
              <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
                <h2 className="font-extrabold text-slate-900 text-base mb-4">📝 Detail Surat</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {templateFields.map(field => (
                    <div key={field.id} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">
                        {field.label}{field.required && " *"}
                      </label>
                      {field.type === "textarea" ? (
                        <textarea value={extraData[field.id] || ""} onChange={e => setExtraData(p => ({ ...p, [field.id]: e.target.value }))}
                          rows={3} placeholder={`Isi ${field.label.toLowerCase()}...`}
                          className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm focus:border-blue-500 focus:bg-white outline-none transition-all resize-none" />
                      ) : (
                        <input type={field.type} value={extraData[field.id] || ""} onChange={e => setExtraData(p => ({ ...p, [field.id]: e.target.value }))}
                          placeholder={`Masukkan ${field.label.toLowerCase()}...`}
                          className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm focus:border-blue-500 focus:bg-white outline-none transition-all" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => { setStep("pilih"); setFoundWarga(null); setNikInput(""); setExtraData({}); }}
                  className="px-5 py-2.5 rounded-xl font-bold text-sm text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-sm">
                  Batal
                </button>
                <button type="submit" disabled={!foundWarga}
                  className="px-6 py-2.5 rounded-xl font-bold text-sm text-white shadow-md transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6)" }}>
                  ✅ Buat Surat
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}