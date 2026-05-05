"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";

export default function PengaturanPage() {
  const { dataDesa, updateDataDesa, logout, isLoggedIn, currentUser } = useStore();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(dataDesa);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  useEffect(() => { if (!isLoggedIn) router.push("/login"); }, [isLoggedIn, router]);
  useEffect(() => { setForm(dataDesa); }, [dataDesa]);

  const set = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSave = () => {
    updateDataDesa(form);
    setEditMode(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-blue-50 lg:pl-64">
      <Nav />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 fade-up">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
          <div>
            <p className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-1">Sistem</p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Pengaturan</h1>
            <p className="text-slate-500 text-sm mt-1">Kelola data akun dan informasi desa</p>
          </div>
          <button onClick={() => { logout(); router.push("/login"); }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm text-white shadow-md self-start sm:self-auto bg-red-500 hover:bg-red-600 transition-all">
            🚪 Keluar
          </button>
        </div>

        {saved && (
          <div className="mb-5 flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-5 py-4">
            <span className="text-xl">✅</span>
            <p className="font-bold text-green-800 text-sm">Data desa berhasil disimpan!</p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Akun info */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-extrabold text-blue-700 mx-auto mb-3">
                  {currentUser?.nama.charAt(0)}
                </div>
                <p className="font-extrabold text-slate-900">{currentUser?.nama}</p>
                <span className="inline-block mt-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold capitalize">{currentUser?.role}</span>
              </div>
              <div className="space-y-2 text-sm">
                {[
                  { label: "Username", value: currentUser?.username },
                  { label: "Role", value: currentUser?.role },
                ].map(i => (
                  <div key={i.label} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-500 font-medium">{i.label}</span>
                    <span className="font-bold text-slate-900 capitalize">{i.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Link publik */}
            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-5">
              <p className="font-extrabold text-slate-900 text-sm mb-3">🌐 Halaman Publik</p>
              <p className="text-xs text-slate-500 mb-3">Bagikan link ini kepada warga untuk akses layanan online:</p>
              <a href="/publik" target="_blank"
                className="flex items-center gap-2 p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold hover:bg-blue-100 transition-all">
                <span>🔗</span>
                <span className="truncate">/publik</span>
                <span className="ml-auto">→</span>
              </a>
            </div>
          </div>

          {/* Data desa */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between" style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)" }}>
              <h2 className="font-extrabold text-slate-900 text-base"> Data Desa</h2>
              <button onClick={() => setEditMode(p => !p)}
                className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${editMode ? "bg-slate-200 text-slate-700" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
                {editMode ? "Batal" : "✏️ Edit"}
              </button>
            </div>
            <div className="p-6">
              {editMode ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { k: "namaDesa", l: "Nama Desa" },
                    { k: "kecamatan", l: "Kecamatan" },
                    { k: "kabupaten", l: "Kabupaten" },
                    { k: "provinsi", l: "Provinsi" },
                    { k: "kepala", l: "Nama Kepala Desa" },
                    { k: "kodePos", l: "Kode Pos" },
                    { k: "telepon", l: "Telepon" },
                    { k: "email", l: "Email" },
                  ].map(f => (
                    <div key={f.k}>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">{f.l}</label>
                      <input value={form[f.k as keyof typeof form]} onChange={e => set(f.k as keyof typeof form, e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm focus:border-blue-500 focus:bg-white outline-none transition-all" />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Alamat Kantor</label>
                    <input value={form.alamatKantor} onChange={e => set("alamatKantor", e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm focus:border-blue-500 focus:bg-white outline-none transition-all" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Visi</label>
                    <textarea value={form.visi} onChange={e => set("visi", e.target.value)} rows={2}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm focus:border-blue-500 focus:bg-white outline-none transition-all resize-none" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Misi</label>
                    <textarea value={form.misi} onChange={e => set("misi", e.target.value)} rows={2}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm focus:border-blue-500 focus:bg-white outline-none transition-all resize-none" />
                  </div>
                  <div className="sm:col-span-2 flex justify-end">
                    <button onClick={handleSave}
                      className="px-6 py-2.5 rounded-xl font-bold text-sm text-white shadow-md transition-all hover:scale-105"
                      style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6)" }}>
                      💾 Simpan Perubahan
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: "Nama Desa", value: dataDesa.namaDesa },
                    { label: "Kepala Desa", value: dataDesa.kepala },
                    { label: "Kecamatan", value: dataDesa.kecamatan },
                    { label: "Kabupaten", value: dataDesa.kabupaten },
                    { label: "Provinsi", value: dataDesa.provinsi },
                    { label: "Kode Pos", value: dataDesa.kodePos },
                    { label: "Telepon", value: dataDesa.telepon },
                    { label: "Email", value: dataDesa.email },
                  ].map(i => (
                    <div key={i.label} className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">{i.label}</p>
                      <p className="text-slate-900 font-semibold text-sm mt-1">{i.value}</p>
                    </div>
                  ))}
                  <div className="sm:col-span-2 p-3 bg-slate-50 rounded-xl">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Alamat</p>
                    <p className="text-slate-900 font-semibold text-sm mt-1">{dataDesa.alamatKantor}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}