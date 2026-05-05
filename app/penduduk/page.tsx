"use client";

import { useMemo, useState } from "react";
import { useStore } from "@/store/store";
import type { Penduduk } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Nav from "@/components/Nav";

const defaultForm: Omit<Penduduk, "id" | "createdAt"> = {
  nik: "", nama: "", tempatLahir: "", tanggalLahir: new Date().toISOString().slice(0, 10),
  jenisKelamin: "L", alamat: "", rt: "", rw: "", pekerjaan: "",
  status: "Belum Menikah", agama: "Islam", pendidikan: "SD",
};

export default function PendudukPage() {
  const { penduduk, addPenduduk, deletePenduduk, isLoggedIn } = useStore();
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [filterJK, setFilterJK] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const router = useRouter();

  useEffect(() => { if (!isLoggedIn) router.push("/login"); }, [isLoggedIn, router]);

  const filtered = useMemo(() => penduduk.filter(p => {
    const matchQ = [p.nik, p.nama, p.alamat, p.pekerjaan, p.status].join(" ").toLowerCase().includes(query.toLowerCase());
    const matchJK = filterJK === "all" || p.jenisKelamin === filterJK;
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    return matchQ && matchJK && matchStatus;
  }), [penduduk, query, filterJK, filterStatus]);

  const summary = useMemo(() => ({
    laki: penduduk.filter(p => p.jenisKelamin === "L").length,
    perempuan: penduduk.filter(p => p.jenisKelamin === "P").length,
    menikah: penduduk.filter(p => p.status === "Menikah").length,
    belumMenikah: penduduk.filter(p => p.status === "Belum Menikah").length,
  }), [penduduk]);

  const set = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPenduduk({ ...form, id: Date.now().toString(), createdAt: new Date().toISOString().slice(0, 10) });
    setForm(defaultForm);
    setShowForm(false);
  };

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-blue-50 lg:pl-64">
      <Nav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 fade-up">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
          <div>
            <p className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-1">Manajemen</p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Data Penduduk</h1>
            <p className="text-slate-500 text-sm mt-1">Kelola data warga Desa Bandar Klippa</p>
          </div>
          <button onClick={() => setShowForm(p => !p)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm text-white shadow-md transition-all hover:scale-105 self-start sm:self-auto"
            style={{ background: "linear-gradient(135deg, #1d4ed8, #3b82f6)" }}>
            {showForm ? "✕ Tutup" : "＋ Tambah Warga"}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Warga", value: penduduk.length, color: "bg-blue-50 text-blue-600" },
            { label: "Laki-laki", value: summary.laki, color: "bg-sky-50 text-sky-600" },
            { label: "Perempuan", value: summary.perempuan, color: "bg-pink-50 text-pink-600" },
            { label: "Status Menikah", value: summary.menikah, color: "bg-green-50 text-green-600" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-500 text-xs font-semibold">{s.label}</p>
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm ${s.color}`}></span>
              </div>
              <p className="text-3xl font-extrabold text-slate-900">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Form tambah */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm border border-blue-100 mb-6 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100" style={{ background: "linear-gradient(135deg, #eff6ff, #dbeafe)" }}>
              <h2 className="font-extrabold text-slate-900 text-base">📋 Form Tambah Data Penduduk</h2>
            </div>
            <form className="p-6 grid gap-5" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">NIK *</label>
                  <input value={form.nik} onChange={e => set("nik", e.target.value)} placeholder="16 digit NIK"
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm font-mono focus:border-blue-500 focus:bg-white outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Nama Lengkap *</label>
                  <input value={form.nama} onChange={e => set("nama", e.target.value)} placeholder="Nama sesuai KTP"
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm focus:border-blue-500 focus:bg-white outline-none transition-all" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Tempat Lahir</label>
                  <input value={form.tempatLahir} onChange={e => set("tempatLahir", e.target.value)} placeholder="Kota lahir"
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm focus:border-blue-500 focus:bg-white outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Tanggal Lahir</label>
                  <input type="date" value={form.tanggalLahir} onChange={e => set("tanggalLahir", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm focus:border-blue-500 focus:bg-white outline-none transition-all" />
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Jenis Kelamin</label>
                  <select value={form.jenisKelamin} onChange={e => set("jenisKelamin", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm focus:border-blue-500 focus:bg-white outline-none transition-all">
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Status Perkawinan</label>
                  <select value={form.status} onChange={e => set("status", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm focus:border-blue-500 focus:bg-white outline-none transition-all">
                    <option>Belum Menikah</option>
                    <option>Menikah</option>
                    <option>Cerai Hidup</option>
                    <option>Cerai Mati</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Agama</label>
                  <select value={form.agama} onChange={e => set("agama", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm focus:border-blue-500 focus:bg-white outline-none transition-all">
                    <option>Islam</option><option>Kristen</option><option>Katolik</option><option>Hindu</option><option>Buddha</option><option>Lainnya</option>
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">RT</label>
                  <input value={form.rt} onChange={e => set("rt", e.target.value)} placeholder="001"
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm focus:border-blue-500 focus:bg-white outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">RW</label>
                  <input value={form.rw} onChange={e => set("rw", e.target.value)} placeholder="002"
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm focus:border-blue-500 focus:bg-white outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Pendidikan</label>
                  <select value={form.pendidikan} onChange={e => set("pendidikan", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm focus:border-blue-500 focus:bg-white outline-none transition-all">
                    <option>SD</option><option>SMP</option><option>SMA</option><option>D3</option><option>S1</option><option>S2</option><option>Lainnya</option>
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Pekerjaan</label>
                  <input value={form.pekerjaan} onChange={e => set("pekerjaan", e.target.value)} placeholder="Petani, PNS, dll."
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm focus:border-blue-500 focus:bg-white outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Alamat</label>
                  <input value={form.alamat} onChange={e => set("alamat", e.target.value)} placeholder="Nama jalan, nomor"
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm focus:border-blue-500 focus:bg-white outline-none transition-all" />
                </div>
              </div>
              <div className="flex gap-3 justify-end pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 rounded-xl font-bold text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all">Batal</button>
                <button type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-sm text-white shadow-md transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #1d4ed8, #3b82f6)" }}>Simpan Data Warga</button>
              </div>
            </form>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3" style={{ background: "linear-gradient(135deg, #eff6ff, #dbeafe)" }}>
            <div>
              <h2 className="font-extrabold text-slate-900 text-base">Daftar Penduduk</h2>
              <p className="text-slate-500 text-xs mt-0.5">{filtered.length} dari {penduduk.length} warga</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="🔍 Cari NIK, nama, alamat..."
                className="px-4 py-2 rounded-xl border-2 border-slate-200 bg-white text-sm focus:border-blue-500 outline-none transition-all w-56" />
              <select value={filterJK} onChange={e => setFilterJK(e.target.value)}
                className="px-3 py-2 rounded-xl border-2 border-slate-200 bg-white text-sm focus:border-blue-500 outline-none">
                <option value="all">Semua JK</option>
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                className="px-3 py-2 rounded-xl border-2 border-slate-200 bg-white text-sm focus:border-blue-500 outline-none">
                <option value="all">Semua Status</option>
                <option>Menikah</option>
                <option>Belum Menikah</option>
                <option>Cerai Hidup</option>
                <option>Cerai Mati</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="px-5 py-3.5 text-left font-bold">NIK</th>
                  <th className="px-5 py-3.5 text-left font-bold">Nama</th>
                  <th className="px-5 py-3.5 text-left font-bold hidden md:table-cell">Alamat</th>
                  <th className="px-5 py-3.5 text-left font-bold hidden lg:table-cell">Pekerjaan</th>
                  <th className="px-5 py-3.5 text-left font-bold">Status</th>
                  <th className="px-5 py-3.5 text-left font-bold hidden sm:table-cell">JK</th>
                  <th className="px-5 py-3.5 text-center font-bold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="text-center py-12 text-slate-400">
                    <div className="text-4xl mb-2">🔍</div>
                    <p className="font-semibold">Tidak ada data</p>
                  </td></tr>
                )}
                {filtered.map((p, i) => (
                  <tr key={p.id} className={`border-t border-slate-100 hover:bg-blue-50/50 transition-colors ${i % 2 === 0 ? "" : "bg-slate-50/30"}`}>
                    <td className="px-5 py-3.5 font-mono text-xs text-slate-600">{p.nik}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700 flex-shrink-0">
                          {p.nama.charAt(0)}
                        </div>
                        <span className="font-semibold text-slate-900">{p.nama}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 hidden md:table-cell text-xs">{p.alamat}, RT {p.rt}/RW {p.rw}</td>
                    <td className="px-5 py-3.5 text-slate-500 hidden lg:table-cell">{p.pekerjaan}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${p.status === "Menikah" ? "bg-green-100 text-green-700" : p.status === "Belum Menikah" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 hidden sm:table-cell">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${p.jenisKelamin === "L" ? "bg-sky-100 text-sky-700" : "bg-pink-100 text-pink-700"}`}>
                        {p.jenisKelamin === "L" ? "L" : "P"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <button onClick={() => deletePenduduk(p.id)}
                        className="px-3 py-1.5 rounded-xl bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100 transition-colors">
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}