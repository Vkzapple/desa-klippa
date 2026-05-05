"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/store/store";
import type { Berita } from "@/store/store";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";

const defaultForm: Omit<Berita, "id"> = {
  judul: "", isi: "", kategori: "berita",
  tanggal: new Date().toISOString().slice(0, 10), penulis: "",
};

const KATEGORI_STYLE: Record<string, string> = {
  berita: "bg-blue-100 text-blue-700",
  pengumuman: "bg-orange-100 text-orange-700",
  informasi: "bg-green-100 text-green-700",
};

export default function BeritaPage() {
  const { beritaList, addBerita, deleteBerita, isLoggedIn, currentUser } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ...defaultForm, penulis: "" });
  const [filterKat, setFilterKat] = useState("all");
  const router = useRouter();

  useEffect(() => { if (!isLoggedIn) router.push("/login"); }, [isLoggedIn, router]);
  useEffect(() => { if (currentUser) setForm(p => ({ ...p, penulis: currentUser.nama })); }, [currentUser]);

  const set = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBerita({ id: Date.now().toString(), ...form });
    setForm({ ...defaultForm, penulis: currentUser?.nama || "" });
    setShowForm(false);
  };

  const filtered = beritaList.filter(b => filterKat === "all" || b.kategori === filterKat).slice().reverse();

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-blue-50 lg:pl-64">
      <Nav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 fade-up">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
          <div>
            <p className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-1">Informasi</p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Berita & Informasi</h1>
            <p className="text-slate-500 text-sm mt-1">Pengumuman dan informasi penting desa</p>
          </div>
          <button onClick={() => setShowForm(p => !p)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm text-white shadow-md self-start sm:self-auto"
            style={{ background: showForm ? "#64748b" : "linear-gradient(135deg,#1d4ed8,#3b82f6)" }}>
            {showForm ? "✕ Tutup" : "＋ Tambah Berita"}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm border border-blue-100 mb-6 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100" style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)" }}>
              <h2 className="font-extrabold text-slate-900 text-base">📰 Tambah Berita / Pengumuman</h2>
            </div>
            <form className="p-6 grid gap-4" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Judul *</label>
                  <input value={form.judul} onChange={e => set("judul", e.target.value)} required placeholder="Judul berita atau pengumuman"
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm focus:border-blue-500 focus:bg-white outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Kategori</label>
                  <select value={form.kategori} onChange={e => set("kategori", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm focus:border-blue-500 focus:bg-white outline-none transition-all">
                    <option value="berita">Berita</option>
                    <option value="pengumuman">Pengumuman</option>
                    <option value="informasi">Informasi</option>
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Tanggal</label>
                  <input type="date" value={form.tanggal} onChange={e => set("tanggal", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm focus:border-blue-500 focus:bg-white outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Penulis</label>
                  <input value={form.penulis} onChange={e => set("penulis", e.target.value)} placeholder="Nama penulis"
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm focus:border-blue-500 focus:bg-white outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Isi *</label>
                <textarea value={form.isi} onChange={e => set("isi", e.target.value)} required rows={4} placeholder="Tulis isi berita atau pengumuman..."
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm focus:border-blue-500 focus:bg-white outline-none transition-all resize-none" />
              </div>
              <div className="flex gap-3 justify-end pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 rounded-xl font-bold text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all">Batal</button>
                <button type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-sm text-white shadow-md"
                  style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6)" }}>Publikasikan</button>
              </div>
            </form>
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {[
            { key: "all", label: "Semua", count: beritaList.length },
            { key: "berita", label: "Berita", count: beritaList.filter(b => b.kategori === "berita").length },
            { key: "pengumuman", label: "Pengumuman", count: beritaList.filter(b => b.kategori === "pengumuman").length },
            { key: "informasi", label: "Informasi", count: beritaList.filter(b => b.kategori === "informasi").length },
          ].map(t => (
            <button key={t.key} onClick={() => setFilterKat(t.key)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${filterKat === t.key ? "text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300"}`}
              style={filterKat === t.key ? { background: "linear-gradient(135deg,#1d4ed8,#3b82f6)" } : {}}>
              {t.label}
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${filterKat === t.key ? "bg-white/25 text-white" : "bg-slate-100 text-slate-500"}`}>{t.count}</span>
            </button>
          ))}
        </div>

        {/* Cards grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <div className="text-5xl mb-3">📰</div>
            <p className="font-bold text-lg">Belum ada berita</p>
            <p className="text-sm mt-1">Klik Tambah Berita untuk membuat artikel pertama</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map(b => (
              <article key={b.id} className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all group">
                <div className="h-2 w-full" style={{ background: b.kategori === "pengumuman" ? "linear-gradient(90deg,#f97316,#fb923c)" : b.kategori === "informasi" ? "linear-gradient(90deg,#22c55e,#4ade80)" : "linear-gradient(90deg,#1d4ed8,#3b82f6)" }} />
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${KATEGORI_STYLE[b.kategori] || "bg-slate-100 text-slate-600"}`}>
                      {b.kategori}
                    </span>
                    <span className="text-xs text-slate-400">{b.tanggal}</span>
                  </div>
                  <h2 className="font-extrabold text-slate-900 text-base leading-tight mb-2">{b.judul}</h2>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{b.isi}</p>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">
                        {b.penulis.charAt(0)}
                      </div>
                      <span className="text-xs text-slate-500">{b.penulis}</span>
                    </div>
                    <button onClick={() => deleteBerita(b.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 rounded-xl bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100">
                      Hapus
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}