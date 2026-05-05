"use client";

import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Nav from "@/components/Nav";

export default function Pengaturan() {
  const { dataDesa, updateDataDesa, logout, isLoggedIn, currentUser } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-blue-50 lg:pl-72">
      <Nav />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between mb-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">Pengaturan</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">Pengaturan Akun & Desa</h1>
            <p className="mt-2 text-sm text-slate-600">Perbarui data profil dan informasi desa.</p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold text-slate-950 mb-4">Informasi Akun</h2>
            <div className="space-y-5 text-sm text-slate-600">
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Nama</p>
                <p className="mt-2 text-base font-semibold text-slate-900">{currentUser?.nama}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Username</p>
                <p className="mt-2 text-base font-semibold text-slate-900">{currentUser?.username}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Role</p>
                <p className="mt-2 text-base font-semibold text-slate-900 capitalize">{currentUser?.role}</p>
              </div>
            </div>
          </section>

          <section className="rounded-[32px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold text-slate-950 mb-4">Data Desa</h2>
            <div className="space-y-5 text-sm text-slate-600">
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Nama Desa</p>
                <p className="mt-2 text-base font-semibold text-slate-900">{dataDesa.namaDesa}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Kecamatan</p>
                <p className="mt-2 text-base font-semibold text-slate-900">{dataDesa.kecamatan}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Kabupaten</p>
                <p className="mt-2 text-base font-semibold text-slate-900">{dataDesa.kabupaten}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Kepala Desa</p>
                <p className="mt-2 text-base font-semibold text-slate-900">{dataDesa.kepala}</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}