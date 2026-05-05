"use client";

import Link from "next/link";
import { useStore } from "@/store/store";
import PubLayout from "@/components/PubLayout";

const layananHighlight = [
  { icon: "📄", label: "Surat Keterangan Domisili", desc: "Bukti tempat tinggal resmi" },
  { icon: "💼", label: "Surat Keterangan Usaha", desc: "Legalitas usaha mikro" },
  { icon: "🎓", label: "Surat Tidak Mampu", desc: "Keperluan sekolah/sosial" },
  { icon: "👶", label: "Surat Kelahiran", desc: "Keterangan kelahiran anak" },
  { icon: "📋", label: "Pengantar KTP/KK", desc: "Pengurusan identitas" },
  { icon: "💍", label: "Pengantar Nikah", desc: "Keperluan pernikahan" },
];

export default function PublikBeranda() {
  const { beritaList, jadwalPelayanan } = useStore();
  const todayName = new Date().toLocaleDateString("id-ID", { weekday: "long" });
  const jadwalHariIni = jadwalPelayanan.find(j => j.hari.toLowerCase() === todayName.toLowerCase());

  return (
    <PubLayout>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%)" }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white" />
          <div className="absolute bottom-0 right-20 w-96 h-96 rounded-full bg-blue-400" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-3xl">
            {jadwalHariIni && (
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6 ${jadwalHariIni.aktif ? "bg-green-500/20 text-green-300 border border-green-500/30" : "bg-red-500/20 text-red-300 border border-red-500/30"}`}>
                <span className={`w-2 h-2 rounded-full ${jadwalHariIni.aktif ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
                {jadwalHariIni.aktif ? `Kantor Buka Hari Ini: ${jadwalHariIni.jamBuka} – ${jadwalHariIni.jamTutup} WIB` : "Kantor Tutup Hari Ini"}
              </div>
            )}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-5">
              Pelayanan Administrasi<br />
              <span className="text-blue-300">Desa Bandar Klippa</span>
            </h1>
            <p className="text-blue-200 text-lg leading-relaxed mb-8 max-w-2xl">
              Layanan administrasi surat menyurat yang cepat, mudah, dan transparan untuk seluruh warga Desa Bandar Klippa, Kecamatan Percut Sei Tuan.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/publik/cek-surat"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm bg-white text-blue-700 shadow-lg hover:bg-blue-50 transition-all hover:scale-105">
                 Cek Status Surat
              </Link>
              <Link href="/publik/pengajuan"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm bg-blue-500/30 text-white border border-blue-400/40 hover:bg-blue-500/40 transition-all hover:scale-105">
                 Ajukan Surat Online
              </Link>
              <Link href="/publik/layanan"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-blue-200 hover:text-white transition-all">
                 Lihat Semua Layanan →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: "📄", label: "Jenis Surat", value: "19+", color: "bg-blue-600" },
            { icon: "⚡", label: "Proses Cepat", value: "1-3 Hari", color: "bg-sky-500" },
            { icon: "🌐", label: "Layanan Online", value: "24/7", color: "bg-indigo-500" },
            { icon: "✅", label: "Gratis", value: "100%", color: "bg-green-500" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-5 shadow-lg border border-blue-100 text-center">
              <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center text-xl mx-auto mb-2`}>{s.icon}</div>
              <p className="font-extrabold text-2xl text-slate-900">{s.value}</p>
              <p className="text-slate-500 text-xs font-semibold mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Layanan populer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-1">Layanan</p>
            <h2 className="text-2xl font-extrabold text-slate-900">Layanan Surat Populer</h2>
          </div>
          <Link href="/publik/layanan" className="text-sm font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-xl">Lihat Semua →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {layananHighlight.map(l => (
            <Link key={l.label} href="/publik/layanan"
              className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-md hover:border-blue-300 hover:-translate-y-0.5 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl shrink-0 group-hover:bg-blue-100 transition">
                {l.icon}
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">{l.label}</p>
                <p className="text-slate-400 text-xs mt-0.5">{l.desc}</p>
              </div>
              <span className="ml-auto text-blue-400 group-hover:text-blue-600 transition">›</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA cek surat */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-6">
        <div className="rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #0ea5e9 100%)" }}>
          <div>
            <h3 className="text-2xl font-extrabold mb-2">Sudah Mengajukan Surat?</h3>
            <p className="text-blue-100">Pantau status permohonan surat Anda secara online dengan memasukkan NIK.</p>
          </div>
          <Link href="/publik/cek-surat"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white text-blue-700 font-extrabold text-sm shadow-lg hover:bg-blue-50 transition-all hover:scale-105">
            Cek Sekarang
          </Link>
        </div>
      </section>

      {/* Berita */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-1">Informasi</p>
            <h2 className="text-2xl font-extrabold text-slate-900">Berita & Pengumuman</h2>
          </div>
          <Link href="/publik/berita" className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl">Lihat Semua →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {beritaList.slice(0,3).map(b => {
            const katColor = b.kategori === "pengumuman" ? "bg-orange-100 text-orange-700" : b.kategori === "informasi" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700";
            const barColor = b.kategori === "pengumuman" ? "from-orange-400 to-orange-500" : b.kategori === "informasi" ? "from-green-400 to-green-500" : "from-blue-500 to-blue-600";
            return (
              <div key={b.id} className="bg-white rounded-2xl overflow-hidden border border-blue-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className={`h-2 w-full bg-linear-to-r ${barColor}`} />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${katColor}`}>{b.kategori}</span>
                    <span className="text-xs text-slate-400">{b.tanggal}</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base mb-2 leading-tight">{b.judul}</h3>
                  <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{b.isi}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-linear-to-b from-blue-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-1">Panduan</p>
            <h2 className="text-2xl font-extrabold text-slate-900">Alur Pembuatan Surat</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: "1",  title: "Ajukan Online", desc: "Isi formulir pengajuan surat melalui website ini" },
              { step: "2", title: "Upload Dokumen", desc: "Unggah KTP dan KK sebagai persyaratan" },
              { step: "3", title: "Tunggu Proses", desc: "Admin memproses permohonan 1-3 hari kerja" },
              { step: "4", title: "Ambil Surat", desc: "Ambil surat di kantor desa dengan membawa KTP asli" },
            ].map(s => (
              <div key={s.step} className="relative bg-white rounded-2xl p-5 border border-blue-100 shadow-sm text-center">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center mx-auto mb-3">{s.step}</div>
                <div className="text-3xl mb-2"></div>
                <p className="font-extrabold text-slate-900 mb-1">{s.title}</p>
                <p className="text-slate-500 text-xs">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PubLayout>
  );
}