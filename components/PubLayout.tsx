"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const pubNavItems = [
  { href: "/publik", label: "Beranda" },
  { href: "/publik/profil", label: "Profil Desa" },
  { href: "/publik/layanan", label: "Layanan" },
  { href: "/publik/cek-surat", label: "Cek Status Surat" },
  { href: "/publik/pengajuan", label: "Ajukan Surat" },
  { href: "/publik/berita", label: "Berita & Info" },
  { href: "/publik/jadwal", label: "Jadwal" },
];

export default function PubLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top navbar */}
      <header className="sticky top-0 z-50 shadow-md" style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/publik" className="flex items-center gap-3 shrink-0">
              <img src="/logo-2.jpg" alt="Logo Desa" className="w-9 h-9 rounded-xl object-contain shrink-0" />
              <div className="hidden sm:block">
                <p className="text-white font-extrabold text-sm leading-tight">Desa Bandar Klippa</p>
                <p className="text-blue-200 text-xs">Kec. Percut Sei Tuan</p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {pubNavItems.map(item => {
                const active = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}
                    className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${active ? "bg-white text-blue-700 shadow" : "text-blue-100 hover:bg-white/15 hover:text-white"}`}>
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <Link href="/login"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-blue-700 font-bold text-sm hover:bg-blue-50 transition-all shadow">
                 Login
              </Link>
              <button onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-9 h-9 rounded-xl bg-white/15 text-white flex items-center justify-center hover:bg-white/25 transition">
                {mobileOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-blue-700/40 px-4 py-3 space-y-1">
            {pubNavItems.map(item => {
              const active = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                  className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${active ? "bg-white text-blue-700" : "text-blue-100 hover:bg-white/15"}`}>
                  {item.label}
                </Link>
              );
            })}
            <Link href="/login" onClick={() => setMobileOpen(false)}
              className="flex items-center px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-white/20 mt-2">
              🔐 Login Admin
            </Link>
          </div>
        )}
      </header>

      {children}

      {/* Footer */}
      <footer style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)" }} className="mt-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid sm:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img src="/logo-2.jpg" alt="Logo Desa" className="w-10 h-10 rounded-xl object-contain shrink-0" />
                <div>
                  <p className="font-extrabold text-base">Desa Bandar Klippa</p>
                  <p className="text-blue-200 text-xs">Kec. Percut Sei Tuan, Kab. Deli Serdang</p>
                </div>
              </div>
              <p className="text-blue-200 text-sm">Jl. Bt.Kuis Km.10,2 Gg Rukun Bandar Klippa – 20371</p>
              <p className="text-blue-200 text-sm">Telp. 061 77838357</p>
            </div>
            <div>
              <p className="font-bold mb-3 text-sm uppercase tracking-wide">Menu Cepat</p>
              <div className="space-y-2">
                {pubNavItems.slice(0,4).map(i => (
                  <Link key={i.href} href={i.href} className="block text-blue-200 text-sm hover:text-white transition">{i.label}</Link>
                ))}
              </div>
            </div>
            <div>
              <p className="font-bold mb-3 text-sm uppercase tracking-wide">Jam Pelayanan</p>
              <div className="space-y-1 text-sm text-blue-200">
                <p>Senin – Kamis: 08.00 – 16.00 WIB</p>
                <p>Jumat: 08.00 – 16.00 WIB</p>
                <p className="text-red-300">Sabtu & Minggu: Tutup</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-blue-700/40 text-center text-blue-300 text-xs">
            © 2025 Pemerintah Desa Bandar Klippa. Semua hak dilindungi.
          </div>
        </div>
      </footer>
    </div>
  );
}