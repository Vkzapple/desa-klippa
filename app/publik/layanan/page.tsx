"use client";

import { useState } from "react";
import Link from "next/link";
import { JENIS_SURAT } from "@/lib/suratData";
import PubLayout from "@/components/PubLayout";

const PERSYARATAN: Record<string, string[]> = {
  SKD: ["Fotokopi KTP", "Fotokopi KK", "Surat pengantar RT/RW"],
  SKU: ["Fotokopi KTP", "Fotokopi KK", "Surat pengantar RT/RW", "Foto usaha (jika ada)"],
  SKTM: ["Fotokopi KTP", "Fotokopi KK", "Surat pengantar RT/RW", "Bukti penghasilan/slip gaji"],
  SPKTP: ["Fotokopi KK", "Pas foto 3x4 (2 lembar)", "Surat pengantar RT/RW"],
  SPKK: ["Fotokopi KTP seluruh anggota keluarga", "Buku nikah (jika ada)", "Surat pengantar RT/RW"],
  SKLahir: ["Surat keterangan kelahiran dari bidan/RS", "Fotokopi KTP orang tua", "Fotokopi KK"],
  SKMati: ["Surat keterangan meninggal dari RS/dokter", "Fotokopi KTP almarhum", "Fotokopi KK"],
  SPindah: ["Fotokopi KTP", "Fotokopi KK", "Surat permohonan pindah"],
  SDatang: ["Surat pindah dari daerah asal", "Fotokopi KTP", "Fotokopi KK"],
  SPN: ["Fotokopi KTP", "Fotokopi KK", "Fotokopi akta kelahiran", "Pas foto 3x4 (4 lembar)"],
  SIK: ["Fotokopi KTP pemohon", "Surat pengantar RT/RW", "Detail rencana kegiatan"],
  SKBM: ["Fotokopi KTP", "Fotokopi KK", "Surat pengantar RT/RW"],
  SKBN: ["Fotokopi KTP", "Dokumen yang memuat nama berbeda", "Surat pernyataan bermaterai"],
  SKHilang: ["Fotokopi KTP", "Laporan kehilangan (jika ada)", "Deskripsi barang yang hilang"],
  SKAS: ["Fotokopi KTP orang tua", "Surat keterangan aktif dari sekolah", "Fotokopi kartu pelajar"],
  SRB: ["Fotokopi KTP", "Fotokopi KK", "Surat keterangan tidak mampu", "Prestasi/dokumen pendukung"],
  SKTMSekolah: ["Fotokopi KTP orang tua", "Fotokopi KK", "Surat pengantar RT/RW", "Bukti penghasilan"],
  SKP: ["Fotokopi KTP", "Slip gaji / bukti penghasilan", "Surat pengantar RT/RW"],
  SKUM: ["Fotokopi KTP", "Foto usaha", "Surat pengantar RT/RW"],
  SRBantuan: ["Fotokopi KTP", "Fotokopi KK", "Data kondisi ekonomi keluarga", "Surat pengantar RT/RW"],
};

export default function LayananPage() {
  const [activeKat, setActiveKat] = useState("dasar");
  const [selectedSurat, setSelectedSurat] = useState<string | null>(null);
  const kategoriKeys = Object.keys(JENIS_SURAT) as (keyof typeof JENIS_SURAT)[];

  return (
    <PubLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-2">Layanan</p>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Jenis Layanan Surat</h1>
          <p className="text-slate-500 max-w-xl mx-auto">Tersedia 19 jenis surat yang dapat diajukan secara online maupun langsung ke kantor desa.</p>
        </div>

        {/* Alur */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {[
            { step: "1", title: "Ajukan Online / Datang Langsung" },
            { step: "2", title: "Siapkan Dokumen Persyaratan" },
            { step: "3", title: "Tunggu Proses 1–3 Hari Kerja" },
            { step: "4", title: "Ambil Surat di Kantor Desa" },
          ].map(s => (
            <div key={s.step} className="bg-white rounded-2xl p-4 border border-blue-100 shadow-sm text-center">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center mx-auto mb-2">{s.step}</div>
              <div className="text-2xl mb-1"></div>
              <p className="text-xs font-semibold text-slate-700 leading-tight">{s.title}</p>
            </div>
          ))}
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {kategoriKeys.map(k => (
            <button key={k} onClick={() => setActiveKat(k)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold transition-all ${activeKat === k ? "text-white shadow-md" : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300"}`}
              style={activeKat === k ? { background: "linear-gradient(135deg,#1d4ed8,#3b82f6)" } : {}}>
              <span>{JENIS_SURAT[k].icon}</span>
              <span>{JENIS_SURAT[k].label}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${activeKat === k ? "bg-white/25 text-white" : "bg-slate-100 text-slate-500"}`}>
                {JENIS_SURAT[k].items.length}
              </span>
            </button>
          ))}
        </div>

        {/* Letter cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {JENIS_SURAT[activeKat as keyof typeof JENIS_SURAT].items.map(item => {
            const syarat = PERSYARATAN[item.id] || ["Fotokopi KTP", "Fotokopi KK", "Surat pengantar RT/RW"];
            const isOpen = selectedSurat === item.id;
            return (
              <div key={item.id} className={`bg-white rounded-2xl border-2 shadow-sm transition-all overflow-hidden ${isOpen ? "border-blue-400 shadow-md" : "border-slate-200 hover:border-blue-300"}`}>
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-xl flex-shrink-0">📄</div>
                    <div className="flex-1">
                      <p className="font-extrabold text-slate-900 text-sm leading-tight">{item.nama}</p>
                      <span className="inline-block mt-1 text-xs bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded-lg">{item.singkatan}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => setSelectedSurat(isOpen ? null : item.id)}
                      className="flex-1 py-2 rounded-xl text-xs font-bold transition-all border-2 border-blue-200 text-blue-700 hover:bg-blue-50">
                      {isOpen ? "Tutup ▲" : "Persyaratan ▼"}
                    </button>
                    <Link href="/publik/pengajuan"
                      className="flex-1 py-2 rounded-xl text-xs font-bold text-white text-center transition-all hover:scale-105"
                      style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6)" }}>
                      Ajukan →
                    </Link>
                  </div>
                </div>

                {/* Persyaratan dropdown */}
                {isOpen && (
                  <div className="border-t border-blue-100 px-5 py-4 bg-blue-50">
                    <p className="text-xs font-bold text-blue-800 uppercase tracking-wide mb-2">Persyaratan:</p>
                    <ul className="space-y-1">
                      {syarat.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-blue-700">
                          <span className="text-blue-400 mt-0.5 flex-shrink-0">✓</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 pt-3 border-t border-blue-200 flex items-center gap-2 text-xs text-blue-600">
                      <span>⏱️</span>
                      <span><strong>Estimasi:</strong> 1–3 hari kerja</span>
                      <span className="mx-1">·</span>
                      <span>💰 Gratis</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-3xl p-8 text-center text-white" style={{ background: "linear-gradient(135deg,#1d4ed8,#0ea5e9)" }}>
          <h3 className="text-xl font-extrabold mb-2">Siap Mengajukan?</h3>
          <p className="text-blue-100 text-sm mb-5">Ajukan surat secara online atau datang langsung ke kantor desa.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/publik/pengajuan"
              className="px-6 py-3 rounded-2xl bg-white text-blue-700 font-extrabold text-sm hover:bg-blue-50 transition-all hover:scale-105 shadow-lg">
              📝 Ajukan Online
            </Link>
            <Link href="/publik/jadwal"
              className="px-6 py-3 rounded-2xl bg-white/20 text-white font-bold text-sm border border-white/30 hover:bg-white/30 transition-all">
              📅 Lihat Jadwal Pelayanan
            </Link>
          </div>
        </div>
      </div>
    </PubLayout>
  );
}