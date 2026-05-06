"use client";

import { useMemo, useEffect } from "react";
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import {
  ResponsiveContainer,
  Tooltip,
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

const MONTHS = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agt","Sep","Okt","Nov","Des"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-blue-100 rounded-2xl shadow-lg px-4 py-3 text-sm">
        <p className="font-bold text-slate-700 mb-1">{label}</p>
        <p className="text-blue-600 font-extrabold">{payload[0].value} surat</p>
      </div>
    );
  }
  return null;
};

export default function Beranda() {
  const {
    penduduk, suratList, beritaList,
    isLoggedIn, currentUser, jadwalPelayanan,
    pengajuanList, updatePengajuan,
  } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) router.push("/login");
  }, [isLoggedIn, router]);

  const stats = useMemo(() => {
    const validSurat = suratList.filter(s => !isNaN(new Date(s.tanggalBuat).getTime()));

    const monthSet = new Set<string>();
    validSurat.forEach(s => {
      const d = new Date(s.tanggalBuat);
      monthSet.add(`${d.getFullYear()}-${String(d.getMonth()).padStart(2, "0")}`);
    });
    const sortedKeys = [...monthSet].sort();
    const last8Keys = sortedKeys.slice(-8);

    while (last8Keys.length < 8) {
      const first = last8Keys[0] || `${new Date().getFullYear()}-${String(new Date().getMonth()).padStart(2, "0")}`;
      const [y, m] = first.split("-").map(Number);
      const prev = new Date(y, m - 1, 1);
      const key = `${prev.getFullYear()}-${String(prev.getMonth()).padStart(2, "0")}`;
      if (last8Keys.includes(key)) break;
      last8Keys.unshift(key);
    }

    const chartData = last8Keys.map(key => {
      const [year, month] = key.split("-").map(Number);
      const count = validSurat.filter(s => {
        const d = new Date(s.tanggalBuat);
        return d.getFullYear() === year && d.getMonth() === month;
      }).length;
      return { bulan: MONTHS[month], count };
    });

    const latestKey = last8Keys[last8Keys.length - 1] || "";
    const [ly, lm] = latestKey.split("-").map(Number);
    const bulanIni = isNaN(ly) ? 0 : validSurat.filter(s => {
      const d = new Date(s.tanggalBuat);
      return d.getFullYear() === ly && d.getMonth() === lm;
    }).length;

    return {
      totalWarga: penduduk.length,
      totalKK: Math.max(1, Math.ceil(penduduk.length / 3)),
      totalSurat: suratList.length,
      suratDiproses: suratList.filter(s => s.status === "diproses").length,
      bulanIni,
      chartData,
    };
  }, [penduduk, suratList]);

  // Pengajuan publik yang masuk & belum selesai
  const pengajuanMasuk = useMemo(() =>
    [...pengajuanList]
      .sort((a, b) => new Date(b.tanggalAjuan).getTime() - new Date(a.tanggalAjuan).getTime())
      .slice(0, 5),
    [pengajuanList]
  );
  const totalPengajuanDiproses = pengajuanList.filter(p => p.status === "diproses").length;

  const todayName = new Date().toLocaleDateString("id-ID", { weekday: "long" });
  const jadwalHariIni = jadwalPelayanan.find(j => j.hari.toLowerCase() === todayName.toLowerCase());

  const jenisCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    suratList.forEach(s => { counts[s.jenisSurat] = (counts[s.jenisSurat] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 4);
  }, [suratList]);

  if (!isLoggedIn) return null;

  const quickLinks = [
    { href: "/surat",     icon: "📄", label: "Buat Surat",  bg: "linear-gradient(135deg,#2563eb,#1d4ed8)" },
    { href: "/penduduk",  icon: "👨‍👩‍👧", label: "Data Warga",  bg: "linear-gradient(135deg,#0ea5e9,#0284c7)" },
    { href: "/arsip",     icon: "🗂️", label: "Arsip Surat", bg: "linear-gradient(135deg,#6366f1,#4f46e5)" },
    { href: "/laporan",   icon: "📊", label: "Laporan",      bg: "linear-gradient(135deg,#8b5cf6,#7c3aed)" },
  ];

  const statusBadge = (status: string) => {
    if (status === "diproses") return "bg-yellow-100 text-yellow-700";
    if (status === "selesai")  return "bg-green-100 text-green-700";
    if (status === "ditolak")  return "bg-red-100 text-red-600";
    return "bg-slate-100 text-slate-500";
  };

  const handleTerima = (id: string) => updatePengajuan(id, { status: "selesai" });
  const handleTolak  = (id: string) => updatePengajuan(id, { status: "ditolak", alasanTolak: "Ditolak oleh admin" });

  return (
    <div className="min-h-screen bg-blue-50 lg:pl-64">
      <Nav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 fade-up">

        {/* Header */}
        <div className="mb-7 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <p className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-1">Dashboard</p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Selamat datang, {currentUser?.nama?.split(" ")[0]}! 👋
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              {jadwalHariIni && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${jadwalHariIni.aktif ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                  {jadwalHariIni.aktif ? `● Buka ${jadwalHariIni.jamBuka}–${jadwalHariIni.jamTutup}` : "● Libur"}
                </span>
              )}
            </p>
          </div>
          <Link href="/surat"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm text-white shadow-md transition-all hover:scale-105 self-start sm:self-auto"
            style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6)" }}>
            <span>📄</span> Buat Surat Baru
          </Link>
        </div>

        {/* Stat cards — tambah badge notif pengajuan */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Warga",      value: stats.totalWarga,      sub: `${stats.totalKK} Kepala Keluarga`, light: "bg-blue-50" },
            { label: "Surat Terbaru",    value: stats.bulanIni,        sub: "Bulan data terakhir",             light: "bg-sky-50" },
            { label: "Sedang Diproses",  value: stats.suratDiproses,   sub: "Perlu tindakan",                  light: "bg-amber-50" },
            { label: "Total Surat",      value: stats.totalSurat,      sub: "Semua waktu",                     light: "bg-violet-50" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-blue-100 hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="flex items-start justify-between mb-3">
                <p className="text-slate-500 text-xs font-semibold">{s.label}</p>
                <div className={`w-8 h-8 ${s.light} rounded-xl flex items-center justify-center text-sm`}></div>
              </div>
              <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{s.value}</p>
              <p className="text-slate-400 text-xs mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Line Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-extrabold text-slate-900 text-base">Statistik Surat Bulanan</h2>
                <p className="text-slate-400 text-xs mt-0.5">8 bulan terakhir dari data</p>
              </div>
              <Link href="/laporan" className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-xl">
                Laporan →
              </Link>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={stats.chartData} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSurat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="bulan" tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={2.5} fill="url(#colorSurat)"
                  dot={{ fill: "#2563eb", r: 4, strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 6, fill: "#1d4ed8", stroke: "#fff", strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Akses Cepat */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
            <h2 className="font-extrabold text-slate-900 text-base mb-4">Akses Cepat</h2>
            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map(q => (
                <Link key={q.href} href={q.href}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all group text-center">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg shadow-md group-hover:scale-110 transition-transform"
                    style={{ background: q.bg }}>
                    <span>{q.icon}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-700 leading-tight">{q.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {/* Surat terbaru */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-extrabold text-slate-900 text-base">Surat Terbaru</h2>
              <Link href="/arsip" className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-xl">Lihat semua →</Link>
            </div>
            <div className="space-y-2.5">
              {[...suratList]
                .sort((a, b) => new Date(b.tanggalBuat).getTime() - new Date(a.tanggalBuat).getTime())
                .slice(0, 4)
                .map(s => (
                <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-sm shrink-0">📄</div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-800 truncate">{s.jenisSurat}</p>
                    <p className="text-xs text-slate-400 truncate">{s.namaPemohon} · {s.nomorSurat}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold shrink-0 ${
                    s.status === "selesai"  ? "bg-green-100 text-green-700"
                    : s.status === "diproses" ? "bg-yellow-100 text-yellow-700"
                    : "bg-slate-100 text-slate-500"
                  }`}>
                    {s.status}
                  </span>
                </div>
              ))}
              {suratList.length === 0 && <p className="text-slate-400 text-sm text-center py-4">Belum ada surat</p>}
            </div>
          </div>

          {/* Jenis terbanyak + Berita */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
            <h2 className="font-extrabold text-slate-900 text-base mb-4">Jenis Terbanyak</h2>
            <div className="space-y-3">
              {jenisCounts.length === 0 && <p className="text-slate-400 text-xs text-center py-2">Belum ada data</p>}
              {jenisCounts.map(([jenis, count], i) => {
                const pct = stats.totalSurat > 0 ? Math.round((count / stats.totalSurat) * 100) : 0;
                const colors = ["bg-blue-500","bg-sky-400","bg-indigo-400","bg-violet-400"];
                return (
                  <div key={jenis}>
                    <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                      <span className="truncate pr-2">{jenis}</span>
                      <span className="shrink-0">{count}</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${colors[i]} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-extrabold text-slate-900 text-sm">Berita Terbaru</h2>
                <Link href="/berita" className="text-xs text-blue-600 font-bold">Lihat →</Link>
              </div>
              <div className="space-y-2">
                {beritaList.slice(0, 2).map(b => (
                  <div key={b.id} className="p-2.5 rounded-xl bg-blue-50">
                    <p className="text-xs font-bold text-slate-800 truncate">{b.judul}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{b.tanggal} · {b.kategori}</p>
                  </div>
                ))}
                {beritaList.length === 0 && <p className="text-slate-400 text-xs text-center py-2">Belum ada berita</p>}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            WIDGET BARU: PENGAJUAN MASUK DARI PUBLIK
        ══════════════════════════════════════════════════ */}
        <div className="mt-5 bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
          {/* Header widget */}
          <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap gap-3 items-center justify-between"
            style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)" }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white text-base shadow-md">📥</div>
              <div>
                <h2 className="font-extrabold text-slate-900 text-base">Pengajuan Masuk</h2>
                <p className="text-slate-500 text-xs">Permohonan surat dari masyarakat</p>
              </div>
              {totalPengajuanDiproses > 0 && (
                <span className="ml-1 px-2.5 py-0.5 rounded-full bg-red-500 text-white text-xs font-extrabold animate-pulse">
                  {totalPengajuanDiproses} baru
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400 inline-block"></span>Diproses</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>Selesai</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400 inline-block"></span>Ditolak</span>
            </div>
          </div>

          {/* Tabel pengajuan */}
          {pengajuanList.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <div className="text-4xl mb-2">📭</div>
              <p className="font-semibold text-sm">Belum ada pengajuan masuk</p>
              <p className="text-xs mt-1">Pengajuan dari halaman publik akan muncul di sini</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider">
                    <th className="px-5 py-3.5 text-left font-bold">Pemohon</th>
                    <th className="px-5 py-3.5 text-left font-bold hidden sm:table-cell">Jenis Surat</th>
                    <th className="px-5 py-3.5 text-left font-bold hidden md:table-cell">Keperluan</th>
                    <th className="px-5 py-3.5 text-left font-bold hidden md:table-cell">Tgl Ajuan</th>
                    <th className="px-5 py-3.5 text-center font-bold">Status</th>
                    <th className="px-5 py-3.5 text-center font-bold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {pengajuanMasuk.map((p, i) => (
                    <tr key={p.id}
                      className={`border-t border-slate-100 hover:bg-blue-50/50 transition-colors ${i % 2 === 0 ? "" : "bg-slate-50/30"}`}>

                      {/* Pemohon */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700 shrink-0">
                            {p.nama.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 text-sm">{p.nama}</p>
                            <p className="text-xs text-slate-400 font-mono">{p.nik}</p>
                          </div>
                        </div>
                      </td>

                      {/* Jenis Surat */}
                      <td className="px-5 py-3.5 hidden sm:table-cell">
                        <span className="text-xs font-semibold text-slate-700">{p.jenisSurat}</span>
                      </td>

                      {/* Keperluan */}
                      <td className="px-5 py-3.5 hidden md:table-cell">
                        <p className="text-xs text-slate-500 max-w-[180px] truncate">{p.keperluan}</p>
                      </td>

                      {/* Tanggal */}
                      <td className="px-5 py-3.5 hidden md:table-cell">
                        <p className="text-xs text-slate-500">{p.tanggalAjuan}</p>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3.5 text-center">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${statusBadge(p.status)}`}>
                          {p.status === "diproses" ? "⏳ Diproses"
                            : p.status === "selesai" ? "✅ Selesai"
                            : "❌ Ditolak"}
                        </span>
                      </td>

                      {/* Aksi */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5 justify-center">
                          {p.status === "diproses" ? (
                            <>
                              <button onClick={() => handleTerima(p.id)}
                                className="px-3 py-1.5 rounded-xl bg-green-50 text-green-700 text-xs font-bold hover:bg-green-100 transition-colors whitespace-nowrap">
                                ✅ Terima
                              </button>
                              <button onClick={() => handleTolak(p.id)}
                                className="px-3 py-1.5 rounded-xl bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100 transition-colors whitespace-nowrap">
                                ❌ Tolak
                              </button>
                            </>
                          ) : (
                            <span className="text-xs text-slate-400 italic">Sudah diproses</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Footer — total */}
              {pengajuanList.length > 5 && (
                <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 text-center">
                  <p className="text-xs text-slate-400">
                    Menampilkan 5 dari <strong>{pengajuanList.length}</strong> pengajuan
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}