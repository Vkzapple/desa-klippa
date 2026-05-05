"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/store/store";

const navItems = [
  { href: "/beranda", label: "Beranda", },
  { href: "/penduduk", label: "Data Penduduk",},
  { href: "/surat", label: "Buat Surat", },
  { href: "/arsip", label: "Arsip Surat",},
  { href: "/laporan", label: "Laporan", },
  { href: "/berita", label: "Berita & Info", },
  { href: "/riwayat", label: "Riwayat Aktivitas", },
  { href: "/jadwal", label: "Jadwal Pelayanan", },
  { href: "/pengaturan", label: "Pengaturan", },
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo/Header */}
     <div className="px-5 py-6 border-b border-blue-700/40">
  <div className="flex items-center gap-3 mb-1">
    <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0 overflow-hidden">
      <img src="./logo-2.jpg" alt="Logo Desa" className="w-full h-full object-cover" />
    </div>
    <div>
      <p className="text-white font-bold text-sm leading-tight">Desa Bandar Klippa</p>
      <p className="text-blue-200 text-xs">Kec. Percut Sei Tuan</p>
    </div>
  </div>
</div>

      {/* User info */}
      {currentUser && (
        <div className="mx-4 mt-4 mb-2 px-3 py-3 bg-white/10 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/25 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {currentUser.nama.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">{currentUser.nama}</p>
              <span className="inline-block text-xs bg-blue-400/40 text-blue-100 px-2 py-0.5 rounded-full capitalize">{currentUser.role}</span>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-4 py-3 overflow-y-auto space-y-0.5">
        <p className="text-blue-300 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-2 mt-1">Menu Utama</p>
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== "/beranda" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                active
                  ? "bg-white text-blue-700 shadow-md font-semibold"
                  : "text-blue-100 hover:bg-white/15 hover:text-white"
              }`}
            >
              <span className="text-base w-5 text-center shrink-0"></span>
              <span className="truncate">{item.label}</span>
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 pb-5 pt-2 border-t border-blue-700/40">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-200 hover:bg-red-500/20 hover:text-red-100 transition-all"
        >
          <span className="text-base w-5 text-center">🚪</span>
          <span>Keluar</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 z-40"
        style={{ background: "linear-gradient(180deg, #1e3a8a 0%, #1d4ed8 55%, #2563eb 100%)" }}>
        <SidebarContent />
      </aside>

      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-blue-800 shadow-lg">
        <div className="flex items-center gap-2">
          <span className="text-xl">🏛️</span>
          <div>
            <p className="text-white font-bold text-sm leading-tight">Bandar Klippa</p>
            <p className="text-blue-200 text-xs">Administrasi Desa</p>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/15 text-white hover:bg-white/25 transition"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="lg:hidden fixed top-0 left-0 bottom-0 z-50 w-72 shadow-2xl"
            style={{ background: "linear-gradient(180deg, #1e3a8a 0%, #1d4ed8 55%, #2563eb 100%)" }}>
            <SidebarContent />
          </aside>
        </>
      )}

      {/* Mobile top spacer */}
      <div className="lg:hidden h-16" />
    </>
  );
}