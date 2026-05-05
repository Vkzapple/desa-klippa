"use client";

import { useState } from "react";
import { useStore } from "@/store/store";
import PubLayout from "@/components/PubLayout";

export default function PublikBeritaPage() {
  const { beritaList } = useStore();
  const [filterKat, setFilterKat] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const sorted = [...beritaList].sort((a, b) => b.tanggal.localeCompare(a.tanggal));
  const filtered = sorted.filter(b => filterKat === "all" || b.kategori === filterKat);

  const STYLE: Record<string, { border: string; badge: string; bar: string }> = {
    berita: { border: "border-blue-200", badge: "bg-blue-100 text-blue-700", bar: "from-blue-500 to-blue-600" },
    pengumuman: { border: "border-orange-200", badge: "bg-orange-100 text-orange-700", bar: "from-orange-400 to-orange-500" },
    informasi: { border: "border-green-200", badge: "bg-green-100 text-green-700", bar: "from-green-400 to-green-500" },
  };

  return (
    <PubLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-8">
          <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-2">Informasi</p>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Berita & Pengumuman</h1>
          <p className="text-slate-500">Informasi terbaru dari Desa Bandar Klippa</p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {[
            { key: "all", label: "Semua", count: beritaList.length },
            { key: "berita", label: "Berita", count: beritaList.filter(b => b.kategori === "berita").length },
            { key: "pengumuman", label: "Pengumuman", count: beritaList.filter(b => b.kategori === "pengumuman").length },
            { key: "informasi", label: "Informasi", count: beritaList.filter(b => b.kategori === "informasi").length },
          ].map(t => (
            <button key={t.key} onClick={() => setFilterKat(t.key)}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${filterKat === t.key ? "text-white shadow-md" : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300"}`}
              style={filterKat === t.key ? { background: "linear-gradient(135deg,#1d4ed8,#3b82f6)" } : {}}>
              {t.label}
              <span className={`text-xs px-2 py-0.5 rounded-full ${filterKat === t.key ? "bg-white/25 text-white" : "bg-slate-100 text-slate-500"}`}>{t.count}</span>
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <div className="text-5xl mb-3">📰</div>
            <p className="font-bold">Tidak ada berita untuk kategori ini</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(b => {
              const st = STYLE[b.kategori] || STYLE.berita;
              const isExpanded = expandedId === b.id;
              return (
                <article key={b.id} className={`bg-white rounded-2xl border-2 ${st.border} shadow-sm overflow-hidden transition-all`}>
                  <div className={`h-1.5 bg-linear-to-r ${st.bar}`} />
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${st.badge}`}>{b.kategori}</span>
                          <span className="text-xs text-slate-400">📅 {b.tanggal}</span>
                          <span className="text-xs text-slate-400">✍️ {b.penulis}</span>
                        </div>
                        <h2 className="text-lg font-extrabold text-slate-900 leading-tight">{b.judul}</h2>
                      </div>
                    </div>
                    <p className={`text-slate-600 text-sm leading-relaxed ${isExpanded ? "" : "line-clamp-2"}`}>{b.isi}</p>
                    {b.isi.length > 150 && (
                      <button onClick={() => setExpandedId(isExpanded ? null : b.id)}
                        className="mt-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">
                        {isExpanded ? "Lebih sedikit ▲" : "Baca selengkapnya ▼"}
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </PubLayout>
  );
}