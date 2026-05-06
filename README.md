# 📋 Panduan Penggunaan Sistem Administrasi Surat Desa Bandar Klippa

> Sistem administrasi surat berbasis web untuk Kantor Kepala Desa Bandar Klippa, Kecamatan Percut Sei Tuan, Kabupaten Deli Serdang.

---

## 🌐 Akses Website

| Halaman | Alamat | Keterangan |
|---|---|---|
| Halaman Publik (Warga) | `https://desa-klippa.vercel.app/publik` | Tanpa login |
| Login Admin/Petugas | `https://desa-klippa.vercel.app/login` | Butuh akun |

---

## 🔐 Akun Login

> **PENTING:** Segera ganti password setelah pertama kali login!

| Role | Username | Password Default |
|---|---|---|
| Administrator | `admin` | `admin123` |
| Petugas | `petugas` | `petugas123` |

**Perbedaan Admin vs Petugas:**
- **Admin** — akses penuh ke semua fitur termasuk pengaturan data desa
- **Petugas** — bisa buat surat dan kelola penduduk, tidak bisa ubah pengaturan sistem

---

## 👨‍💼 Panduan untuk Admin & Petugas

### 1. Login

1. Buka halaman `/login`
2. Masukkan username dan password
3. Klik **Masuk ke Sistem**
4. Akan diarahkan otomatis ke **Dashboard (Beranda)**

---

### 2. Dashboard (Beranda)

Tampilan utama setelah login. Berisi:
- **Statistik:** total warga, total surat, surat diproses, surat terbaru
- **Grafik:** tren surat bulanan (line chart)
- **Akses Cepat:** tombol shortcut ke Buat Surat, Data Warga, Arsip, Laporan
- **Surat Terbaru:** 4 surat terakhir yang dibuat
- **Jenis Terbanyak:** jenis surat yang paling sering diajukan
- **Berita Terbaru:** 2 artikel berita/pengumuman terbaru
- **Status hari ini:** informasi jam buka/tutup kantor

---

### 3. Data Penduduk

Menu: **Data Penduduk** di sidebar

**Tambah Data Warga:**
1. Klik tombol **＋ Tambah Warga**
2. Isi form: NIK, Nama, Tempat/Tanggal Lahir, Jenis Kelamin, Status, Agama, RT/RW, Pendidikan, Pekerjaan, Alamat
3. Klik **Simpan Data Warga**

**Cari Warga:**
- Ketik di kolom pencarian — bisa berdasarkan NIK, nama, atau alamat
- Filter tambahan: Jenis Kelamin dan Status Perkawinan

**Hapus Data:**
- Klik tombol **Hapus** di baris warga yang ingin dihapus
- ⚠️ Penghapusan tidak bisa dibatalkan

> **Tips:** Pastikan NIK diisi dengan benar (16 digit) karena digunakan untuk pencarian saat membuat surat.

---

### 4. Pembuatan Surat ⭐ (Fitur Utama)

Menu: **Buat Surat** di sidebar

**Langkah membuat surat:**

1. **Pilih jenis surat** dari kategori yang tersedia:
   - 📄 Surat Dasar (Domisili, Usaha, SKTM, Pengantar KTP/KK)
   - 👨‍👩‍👧 Surat Kependudukan (Kelahiran, Kematian, Pindah, Datang)
   - 🏢 Surat Umum (Pengantar Nikah, Izin Keramaian, Belum Menikah, dll)
   - 🎓 Surat Pendidikan & Sosial (Aktif Sekolah, Beasiswa, SKTM Sekolah)
   - 💼 Surat Ekonomi (Penghasilan, Usaha Mikro, Rekomendasi Bantuan)

2. **Cari data pemohon** dengan cara:
   - Ketik NIK lalu klik **Cari NIK**, atau
   - Pilih dari dropdown daftar warga

3. **Isi detail surat** sesuai jenis surat yang dipilih (keperluan, nama usaha, dll)

4. Klik **✅ Buat Surat**

5. Surat otomatis tersimpan di **Arsip Surat**

> **Catatan:** Warga harus sudah terdaftar di Data Penduduk sebelum bisa dibuatkan surat.

---

### 5. Arsip Surat

Menu: **Arsip Surat** di sidebar

- Lihat semua surat yang pernah dibuat
- **Filter** berdasarkan kategori surat atau bulan
- **Cari** berdasarkan nomor surat, nama, atau jenis
- Klik **🖨️ Cetak** untuk membuka preview dan cetak surat
- Klik **Hapus** untuk menghapus surat dari arsip

---

### 6. Cetak Surat

Setelah klik tombol **🖨️ Cetak** di Arsip Surat:

1. Browser membuka jendela baru berisi template surat resmi
2. Nomor surat tertera sebagai `070/` — **isi nomor urut secara manual** sesuai buku register desa
3. Kolom **Lamp** dikosongkan — isi manual jika ada lampiran
4. Klik tombol **🖨️ Cetak Surat** atau tekan `Ctrl+P` / `Cmd+P`
5. Pilih printer dan cetak

> **Format kertas:** A4, orientasi Portrait

---

### 7. Laporan & Statistik

Menu: **Laporan** di sidebar

Berisi:
- Grafik surat per bulan (8 bulan terakhir dari data)
- Distribusi kategori surat (persentase per kategori)
- Ranking jenis surat terbanyak
- Ringkasan layanan: total surat, diproses, selesai, warga yang pernah mengurus

---

### 8. Berita & Informasi

Menu: **Berita & Info** di sidebar

**Tambah berita/pengumuman:**
1. Klik **＋ Tambah Berita**
2. Isi: Judul, Kategori (Berita / Pengumuman / Informasi), Tanggal, Penulis, Isi
3. Klik **Publikasikan**

Berita yang dipublikasikan akan otomatis tampil di **halaman publik warga**.

---

### 9. Riwayat Aktivitas

Menu: **Riwayat Aktivitas** di sidebar

Mencatat semua aktivitas sistem: siapa yang login, membuat surat, menambah/menghapus data, dan kapan dilakukan. Berguna untuk audit dan kontrol.

---

### 10. Jadwal Pelayanan

Menu: **Jadwal Pelayanan** di sidebar

- Atur jam buka dan jam tutup untuk setiap hari
- Aktifkan/nonaktifkan hari pelayanan (misal: Sabtu & Minggu libur)
- Perubahan langsung tampil di halaman publik warga

---

### 11. Pengaturan

Menu: **Pengaturan** di sidebar

- Lihat informasi akun yang sedang login
- Edit data desa: nama, kepala desa, alamat, telepon, email, visi, misi
- Klik **✏️ Edit** → ubah data → klik **💾 Simpan Perubahan**
- Tombol **Keluar** untuk logout dari sistem

---

## 🌐 Panduan untuk Warga (Halaman Publik)

Halaman publik bisa diakses **tanpa login** oleh semua warga.

### Fitur yang tersedia:

| Menu | Fungsi |
|---|---|
| **Beranda** | Informasi desa, layanan populer, berita terbaru, alur pembuatan surat |
| **Profil Desa** | Visi misi, data kontak, informasi kepala desa |
| **Layanan** | Daftar 19 jenis surat beserta persyaratan dan estimasi waktu |
| **Cek Status Surat** | Cek status permohonan dengan memasukkan NIK |
| **Ajukan Surat** | Form pengajuan surat online (nama, NIK, jenis surat, keperluan, upload dokumen) |
| **Berita & Info** | Baca berita, pengumuman, dan informasi desa |
| **Jadwal** | Lihat jam buka/tutup kantor desa |

### Cara Cek Status Surat (untuk Warga):
1. Buka menu **Cek Status Surat**
2. Masukkan NIK (16 digit)
3. Klik **Cek Status**
4. Akan tampil semua surat yang pernah diajukan beserta statusnya:
   - ⏳ **Diproses** — sedang dikerjakan petugas
   - ✅ **Selesai** — bisa diambil di kantor desa dengan KTP asli
   - ❌ **Ditolak** — lihat alasan penolakan, hubungi kantor desa

### Cara Ajukan Surat Online (untuk Warga):
1. Buka menu **Ajukan Surat**
2. Isi form: Nama Lengkap, NIK, Jenis Surat, Keperluan
3. Upload foto KTP dan KK (opsional tapi disarankan)
4. Klik **📤 Kirim Pengajuan**
5. Simpan NIK untuk cek status nantinya
6. **Surat tetap diambil langsung di kantor desa** dengan membawa KTP & KK asli

---

## 🖨️ Panduan Cetak Surat

1. Masuk ke **Arsip Surat**
2. Temukan surat yang ingin dicetak
3. Klik tombol **🖨️ Cetak**
4. Jendela preview surat terbuka
5. **Tulis nomor urut** setelah `070/` di surat secara manual dengan pulpen
6. Klik **🖨️ Cetak Surat** atau `Ctrl+P`
7. Pastikan ukuran kertas **A4** dan margin **None / Tanpa batas**
8. Cetak → tandatangani → stempel

---

## 📁 Pengelolaan Logo Desa

Logo desa tampil di:
- Sidebar (menu navigasi)
- Halaman login
- Navbar halaman publik
- Kop surat cetak

**Cara mengganti logo:**
1. Siapkan file logo format `.png` dengan background transparan
2. Rename file menjadi `logo-desa.png`
3. Upload ke folder `public/` di project
4. Logo otomatis terganti di seluruh halaman

---

## ❓ Pertanyaan Umum (FAQ)

**Q: Warga tidak ditemukan saat membuat surat?**
A: Pastikan warga sudah ditambahkan ke menu **Data Penduduk** terlebih dahulu dengan NIK yang benar.

**Q: Bagaimana mengisi nomor surat?**
A: Nomor surat ditulis manual setelah cetak. Format yang digunakan desa: `070/[nomor urut]/[tahun]`. Nomor urut mengikuti buku register desa.

**Q: Data hilang setelah refresh?**
A: Sistem menyimpan data di browser (localStorage). Jangan clear browser data/cache. Untuk data permanen, disarankan upgrade ke database server.

**Q: Bisa diakses dari HP?**
A: Ya, sistem sudah responsif dan bisa diakses dari HP, tablet, maupun komputer.

**Q: Bagaimana cara backup data?**
A: Saat ini data tersimpan di browser. Untuk backup, catat atau export data penting secara manual. Pengembangan backup otomatis bisa ditambahkan di versi berikutnya.

**Q: Status pengajuan warga tidak berubah otomatis?**
A: Status pengajuan warga perlu diupdate manual oleh admin di dashboard. Warga bisa cek status terbaru di halaman publik.

---

## 📞 Kontak & Dukungan Teknis

Untuk pertanyaan teknis terkait sistem, hubungi pengembang:

- 📧 Email pengembang: evellykhnz@gmail.com
- 🌐 Website: `https://desa-klippa.vercel.app`

---

## 📝 Catatan Penting

> - Data tersimpan di **browser lokal**. Jika berganti perangkat atau clear cache, data tidak terbawa.
> - Disarankan menggunakan **satu perangkat/browser** yang sama untuk operasional sehari-hari.
> - Untuk keamanan, selalu **logout** setelah selesai menggunakan sistem.
> - Nomor surat pada kop surat diisi **manual** oleh petugas sesuai buku register desa.

---

*Sistem Administrasi Surat Desa Bandar Klippa | 2026*