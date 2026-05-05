"use client";

import { useStore } from "@/store/store";
import PubLayout from "@/components/PubLayout";

export default function ProfilDesaPage() {
  const { dataDesa, penduduk } = useStore();

  return (
    <PubLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Hero profil */}
        <div className="rounded-3xl p-8 sm:p-12 text-white mb-10 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg,#1e3a8a,#1d4ed8,#2563eb)" }}>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/3 translate-x-1/4" />
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-5">
              <img src="/logo-2.jpg" alt="Logo Desa" className="w-16 h-16 rounded-2xl object-contain" />
              <div>
                <h1 className="text-3xl font-extrabold">{dataDesa.namaDesa}</h1>
                <p className="text-blue-200">Kecamatan {dataDesa.kecamatan}, {dataDesa.kabupaten}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: "Provinsi", value: dataDesa.provinsi, icon: "🗺️" },
                { label: "Kepala Desa", value: dataDesa.kepala, icon: "👤" },
                { label: "Kode Pos", value: dataDesa.kodePos, icon: "📮" },
              ].map(i => (
                <div key={i.label} className="bg-white/10 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span>{i.icon}</span>
                    <p className="text-blue-200 text-xs font-semibold uppercase tracking-wide">{i.label}</p>
                  </div>
                  <p className="text-white font-bold text-sm">{i.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Visi */}
          <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-xl">🎯</div>
              <h2 className="font-extrabold text-slate-900 text-lg">Visi</h2>
            </div>
            <p className="text-slate-600 leading-relaxed italic">"{dataDesa.visi}"</p>
          </div>

          {/* Misi */}
          <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-xl">📋</div>
              <h2 className="font-extrabold text-slate-900 text-lg">Misi</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">{dataDesa.misi}</p>
          </div>
        </div>

        {/* Kontak */}
        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 mb-6">
          <h2 className="font-extrabold text-slate-900 text-lg mb-5">📍 Informasi Kontak</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: "📍", label: "Alamat", value: dataDesa.alamatKantor },
              { icon: "🏘️", label: "Kecamatan", value: dataDesa.kecamatan },
              { icon: "🏙️", label: "Kabupaten", value: dataDesa.kabupaten },
              { icon: "📞", label: "Telepon", value: dataDesa.telepon },
              { icon: "✉️", label: "Email", value: dataDesa.email },
              { icon: "📮", label: "Kode Pos", value: dataDesa.kodePos },
            ].map(i => (
              <div key={i.label} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
                <span className="text-lg shrink-0">{i.icon}</span>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">{i.label}</p>
                  <p className="text-slate-900 font-semibold text-sm mt-0.5">{i.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistik sederhana */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: "👥", label: "Warga Terdaftar", value: penduduk.length + "+" },
            { icon: "📄", label: "Jenis Layanan", value: "19" },
            { icon: "🆓", label: "Biaya", value: "Gratis" },
            { icon: "⚡", label: "Estimasi Proses", value: "1-3 Hari" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-5 border border-blue-100 shadow-sm text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <p className="font-extrabold text-2xl text-slate-900">{s.value}</p>
              <p className="text-slate-400 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </PubLayout>
  );
}