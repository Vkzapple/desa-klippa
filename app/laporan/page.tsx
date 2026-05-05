"use client";

import { useMemo, useEffect } from "react";
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";

const MONTHS = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agt","Sep","Okt","Nov","Des"];

export default function LaporanPage() {
  const { penduduk, suratList, beritaList, isLoggedIn } = useStore();
  const router = useRouter();

  useEffect(() => { if (!isLoggedIn) router.push("/login"); }, [isLoggedIn, router]);

  const stats = useMemo(() => {
    const validSurat = suratList.filter(s => !isNaN(new Date(s.tanggalBuat).getTime()));

    // Kumpulkan semua bulan unik dari data, ambil 8 terakhir
    const monthSet = new Set<string>();
    validSurat.forEach(s => {
      const d = new Date(s.tanggalBuat);
      monthSet.add(`${d.getFullYear()}-${String(d.getMonth()).padStart(2,"0")}`);
    });
    const sortedKeys = [...monthSet].sort();
    const last8Keys = sortedKeys.slice(-8);
    while (last8Keys.length < 8) {
      const first = last8Keys[0] || `${new Date().getFullYear()}-${String(new Date().getMonth()).padStart(2,"0")}`;
      const [y, m] = first.split("-").map(Number);
      const prev = new Date(y, m - 1, 1);
      const key = `${prev.getFullYear()}-${String(prev.getMonth()).padStart(2,"0")}`;
      if (last8Keys.includes(key)) break;
      last8Keys.unshift(key);
    }

    const chartData = last8Keys.map(key => {
      const [year, month] = key.split("-").map(Number);
      const count = validSurat.filter(s => {
        const d = new Date(s.tanggalBuat);
        return d.getFullYear() === year && d.getMonth() === month;
      }).length;
      return { bulan: MONTHS[month], year, month, count };
    });

    const maxChart = Math.max(...chartData.map(d => d.count), 1);

    // Bulan terbaru di data
    const latestKey = last8Keys[last8Keys.length - 1] || "";
    const [ly, lm] = latestKey.split("-").map(Number);
    const bulanTerbaru = isNaN(ly) ? 0 : validSurat.filter(s => {
      const d = new Date(s.tanggalBuat);
      return d.getFullYear() === ly && d.getMonth() === lm;
    }).length;

    const jenisCounts: Record<string, number> = {};
    suratList.forEach(s => { jenisCounts[s.jenisSurat] = (jenisCounts[s.jenisSurat] || 0) + 1; });
    const topJenis = Object.entries(jenisCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);

    const katCounts: Record<string, number> = {};
    suratList.forEach(s => { katCounts[s.kategoriSurat] = (katCounts[s.kategoriSurat] || 0) + 1; });

    return { bulanTerbaru, chartData, topJenis, katCounts, maxChart };
  }, [suratList]);

  const katColors: Record<string, string> = {
    dasar: "bg-blue-500",
    kependudukan: "bg-sky-400",
    umum: "bg-indigo-400",
    pendidikan: "bg-violet-400",
    ekonomi: "bg-green-400",
  };

  if (!isLoggedIn) return null;

  const latestMonthLabel = stats.chartData.length > 0
    ? `${stats.chartData[stats.chartData.length-1].bulan} ${stats.chartData[stats.chartData.length-1].year}`
    : "-";

  return (
    <div className="min-h-screen bg-blue-50 lg:pl-64">
      <Nav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 fade-up">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
          <div>
            <p className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-1">Statistik</p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Laporan & Statistik</h1>
            <p className="text-slate-500 text-sm mt-1">Ringkasan data pelayanan desa</p>
          </div>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm text-white shadow-md self-start sm:self-auto"
            style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6)" }}>
            📥 Unduh Laporan
          </button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Penduduk", value: penduduk.length, sub: "Warga terdaftar", from: "#1d4ed8", to: "#1e40af" },
            { label: "Total Surat", value: suratList.length, sub: "Semua waktu", from: "#0ea5e9", to: "#0284c7" },
            { label: `Surat ${latestMonthLabel}`, value: stats.bulanTerbaru, sub: "Bulan terbaru di data", from: "#22c55e", to: "#16a34a" },
            { label: "Berita & Info", value: beritaList.length, sub: "Artikel aktif", from: "#8b5cf6", to: "#7c3aed" },
          ].map(s => (
            <div key={s.label} className="rounded-2xl p-5 text-white shadow-md"
              style={{ background: `linear-gradient(135deg,${s.from},${s.to})` }}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-white/80 text-xs font-semibold">{s.label}</p>
                <span className="text-xl"></span>
              </div>
              <p className="text-3xl font-extrabold tracking-tight">{s.value}</p>
              <p className="text-white/70 text-xs mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-extrabold text-slate-900 text-base">Grafik Surat Bulanan</h2>
                <p className="text-slate-400 text-xs mt-0.5">8 bulan terakhir dari data</p>
              </div>
            </div>
            <div className="flex items-end gap-1.5" style={{ height: "160px" }}>
              {stats.chartData.map((d, i) => {
                const pct = stats.maxChart > 0 ? (d.count / stats.maxChart) * 100 : 0;
                const isLast = i === stats.chartData.length - 1;
                const barH = Math.max(pct, d.count > 0 ? 6 : 2);
                return (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1 h-full group">
                    <span className="text-[9px] text-slate-500 font-bold opacity-0 group-hover:opacity-100 transition">{d.count}</span>
                    <div className="w-full rounded-t-lg transition-all duration-700 cursor-default"
                      style={{
                        height: `${barH}%`,
                        background: isLast
                          ? "linear-gradient(180deg,#1d4ed8,#60a5fa)"
                          : d.count > 0 ? "#93c5fd" : "#e2e8f0",
                      }} />
                    <span className="text-[9px] text-slate-400 font-medium">{d.bulan}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm" style={{ background: "linear-gradient(180deg,#1d4ed8,#60a5fa)" }} />
                <span className="text-[10px] text-slate-500">Bulan terbaru</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-blue-300" />
                <span className="text-[10px] text-slate-500">Bulan sebelumnya</span>
              </div>
            </div>
          </div>

          {/* Distribusi kategori */}
          <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
            <h2 className="font-extrabold text-slate-900 text-base mb-4">Distribusi Kategori</h2>
            <div className="space-y-3">
              {Object.entries(stats.katCounts).map(([kat, count]) => {
                const pct = suratList.length > 0 ? Math.round((count / suratList.length) * 100) : 0;
                return (
                  <div key={kat}>
                    <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                      <span className="capitalize">{kat}</span>
                      <span>{count} ({pct}%)</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${katColors[kat] || "bg-slate-400"} rounded-full transition-all duration-700`}
                        style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
              {Object.keys(stats.katCounts).length === 0 && <p className="text-slate-400 text-sm text-center py-4">Belum ada data</p>}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-5 grid md:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
            <h2 className="font-extrabold text-slate-900 text-base mb-4">Jenis Surat Terbanyak</h2>
            <div className="space-y-3">
              {stats.topJenis.map(([jenis, count], i) => (
                <div key={jenis} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold text-white shrink-0 ${i===0?"bg-yellow-500":i===1?"bg-slate-400":i===2?"bg-orange-400":"bg-blue-300"}`}>
                    {i+1}
                  </span>
                  <span className="flex-1 text-sm font-semibold text-slate-800 truncate">{jenis}</span>
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-extrabold">{count}×</span>
                </div>
              ))}
              {stats.topJenis.length === 0 && <p className="text-slate-400 text-sm text-center py-4">Belum ada data</p>}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
            <h2 className="font-extrabold text-slate-900 text-base mb-4"> Ringkasan Layanan</h2>
            <div className="space-y-3">
              {[
                { label: "Total surat dibuat", value: suratList.length, unit: "surat" },
                { label: "Sedang diproses", value: suratList.filter(s=>s.status==="diproses").length, unit: "surat" },
                { label: "Sudah selesai", value: suratList.filter(s=>s.status==="selesai").length, unit: "surat" },
                { label: "Warga pernah mengurus", value: new Set(suratList.map(s=>s.nikPemohon)).size, unit: "orang" },
                { label: "Berita & pengumuman", value: beritaList.length, unit: "artikel" },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                  <span className="text-sm text-slate-600">{item.label}</span>
                  <span className="font-extrabold text-slate-900 text-sm">
                    {item.value} <span className="font-normal text-slate-400">{item.unit}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}