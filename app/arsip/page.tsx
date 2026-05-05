"use client";

import { useMemo, useState, useEffect } from "react";
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import { printSurat } from "@/lib/printSurat";

export default function ArsipPage() {
  const { suratList, deleteSurat, isLoggedIn, dataDesa } = useStore();
  const [query, setQuery] = useState("");
  const [filterKat, setFilterKat] = useState("all");
  const [filterBulan, setFilterBulan] = useState("");
  const router = useRouter();

  useEffect(() => { if (!isLoggedIn) router.push("/login"); }, [isLoggedIn, router]);

  const filtered = useMemo(() => suratList.filter(s => {
    const matchQ = [s.nomorSurat, s.jenisSurat, s.namaPemohon, s.nikPemohon].join(" ").toLowerCase().includes(query.toLowerCase());
    const matchKat = filterKat === "all" || s.kategoriSurat === filterKat;
    const matchBulan = !filterBulan || s.tanggalBuat.startsWith(filterBulan);
    return matchQ && matchKat && matchBulan;
  }).slice().reverse(), [suratList, query, filterKat, filterBulan]);

  const kategoriColors: Record<string, string> = {
    dasar: "bg-blue-100 text-blue-700",
    kependudukan: "bg-sky-100 text-sky-700",
    umum: "bg-indigo-100 text-indigo-700",
    pendidikan: "bg-violet-100 text-violet-700",
    ekonomi: "bg-green-100 text-green-700",
  };

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-blue-50 lg:pl-64">
      <Nav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 fade-up">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
          <div>
            <p className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-1">Arsip</p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Arsip Surat</h1>
            <p className="text-slate-500 text-sm mt-1">Riwayat semua surat yang telah dibuat</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="px-4 py-2 rounded-2xl bg-blue-600 text-white font-bold text-sm shadow-md">{suratList.length} Total Surat</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          {[
            { kat: "all", label: "Semua", count: suratList.length, color: "bg-slate-800 text-white" },
            { kat: "dasar", label: "Dasar", count: suratList.filter(s => s.kategoriSurat === "dasar").length, color: "bg-blue-600 text-white" },
            { kat: "kependudukan", label: "Kependudukan", count: suratList.filter(s => s.kategoriSurat === "kependudukan").length, color: "bg-sky-500 text-white" },
            { kat: "umum", label: "Umum", count: suratList.filter(s => s.kategoriSurat === "umum").length, color: "bg-indigo-500 text-white" },
            { kat: "pendidikan", label: "Pendidikan", count: suratList.filter(s => s.kategoriSurat === "pendidikan").length, color: "bg-violet-500 text-white" },
          ].map(s => (
            <button key={s.kat} onClick={() => setFilterKat(s.kat)}
              className={`p-3 rounded-2xl text-center transition-all border-2 ${filterKat === s.kat ? `${s.color} border-transparent shadow-md scale-105` : "bg-white border-slate-200 hover:border-blue-300"}`}>
              <p className={`text-xl font-extrabold ${filterKat === s.kat ? "" : "text-slate-900"}`}>{s.count}</p>
              <p className={`text-xs font-semibold mt-0.5 ${filterKat === s.kat ? "opacity-80" : "text-slate-500"}`}>{s.label}</p>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap gap-3 items-center justify-between" style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)" }}>
            <div>
              <h2 className="font-extrabold text-slate-900 text-base">Daftar Surat</h2>
              <p className="text-slate-500 text-xs">{filtered.length} surat ditemukan</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="🔍 Cari nomor, nama, jenis..."
                className="px-4 py-2 rounded-xl border-2 border-slate-200 bg-white text-sm focus:border-blue-500 outline-none w-52" />
              <input type="month" value={filterBulan} onChange={e => setFilterBulan(e.target.value)}
                className="px-4 py-2 rounded-xl border-2 border-slate-200 bg-white text-sm focus:border-blue-500 outline-none" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider">
                  <th className="px-5 py-3.5 text-left font-bold">Nomor Surat</th>
                  <th className="px-5 py-3.5 text-left font-bold">Jenis Surat</th>
                  <th className="px-5 py-3.5 text-left font-bold">Pemohon</th>
                  <th className="px-5 py-3.5 text-left font-bold hidden md:table-cell">Tanggal</th>
                  <th className="px-5 py-3.5 text-left font-bold hidden lg:table-cell">Kategori</th>
                  <th className="px-5 py-3.5 text-left font-bold hidden sm:table-cell">Dibuat</th>
                  <th className="px-5 py-3.5 text-center font-bold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="text-center py-12 text-slate-400">
                    <div className="text-4xl mb-2">🗂️</div>
                    <p className="font-semibold">Tidak ada surat</p>
                  </td></tr>
                )}
                {filtered.map((s, i) => (
                  <tr key={s.id} className={`border-t border-slate-100 hover:bg-blue-50/50 transition-colors ${i % 2 === 0 ? "" : "bg-slate-50/30"}`}>
                    <td className="px-5 py-3.5 font-mono text-xs font-bold text-blue-700">{s.nomorSurat}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="text-base shrink-0">📄</span>
                        <span className="font-semibold text-slate-800 text-xs">{s.jenisSurat}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700 shrink-0">
                          {s.namaPemohon.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{s.namaPemohon}</p>
                          <p className="text-xs text-slate-400 font-mono">{s.nikPemohon}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 text-xs hidden md:table-cell">{s.tanggalBuat}</td>
                    <td className="px-5 py-3.5 hidden lg:table-cell">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${kategoriColors[s.kategoriSurat] || "bg-slate-100 text-slate-600"}`}>
                        {s.kategoriSurat}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 text-xs hidden sm:table-cell">{s.dibuatOleh}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5 justify-center">
                        <button onClick={() => printSurat(s, dataDesa)}
                          className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold hover:bg-blue-100 transition-colors">
                          🖨️ Cetak
                        </button>
                        <button onClick={() => deleteSurat(s.id)}
                          className="px-3 py-1.5 rounded-xl bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100 transition-colors">
                          Hapus
                        </button>
                      </div>
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