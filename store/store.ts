import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Penduduk {
  id: string;
  nik: string;
  nama: string;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: 'L' | 'P';
  alamat: string;
  rt: string;
  rw: string;
  pekerjaan: string;
  status: 'Menikah' | 'Belum Menikah' | 'Cerai Hidup' | 'Cerai Mati';
  agama: string;
  pendidikan: string;
  foto?: string;
  ktpFile?: string;
  kkFile?: string;
  createdAt: string;
}

export interface Surat {
  id: string;
  nomorSurat: string;
  jenisSurat: string;
  kategoriSurat: string;
  nikPemohon: string;
  namaPemohon: string;
  keperluan: string;
  tanggalBuat: string;
  tanggalBerlaku?: string;
  status: 'diproses' | 'selesai' | 'ditolak' | 'aktif' | 'expired';
  dibuatOleh: string;
  data: Record<string, string>;
  alasanTolak?: string;
}

export interface PengajuanPublik {
  id: string;
  nama: string;
  nik: string;
  jenisSurat: string;
  keperluan: string;
  tanggalAjuan: string;
  status: 'diproses' | 'selesai' | 'ditolak';
  alasanTolak?: string;
  dokumen?: string[];
  diproseOleh?: string;
}

export interface Berita {
  id: string;
  judul: string;
  isi: string;
  kategori: 'berita' | 'pengumuman' | 'informasi';
  tanggal: string;
  penulis: string;
  gambar?: string;
}

export interface Aktivitas {
  id: string;
  aksi: string;
  detail: string;
  pengguna: string;
  waktu: string;
}

export interface JadwalPelayanan {
  hari: string;
  jamBuka: string;
  jamTutup: string;
  aktif: boolean;
}

export interface DataDesa {
  namaDesa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  alamatKantor: string;
  telepon: string;
  email: string;
  kodePos: string;
  kepala: string;
  visi: string;
  misi: string;
}

interface AppStore {
  isLoggedIn: boolean;
  currentUser: { nama: string; role: 'admin' | 'petugas'; username: string } | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  penduduk: Penduduk[];
  addPenduduk: (p: Penduduk) => void;
  updatePenduduk: (id: string, p: Partial<Penduduk>) => void;
  deletePenduduk: (id: string) => void;
  suratList: Surat[];
  addSurat: (s: Surat) => void;
  updateSurat: (id: string, s: Partial<Surat>) => void;
  deleteSurat: (id: string) => void;
  pengajuanList: PengajuanPublik[];
  addPengajuan: (p: PengajuanPublik) => void;
  updatePengajuan: (id: string, p: Partial<PengajuanPublik>) => void;
  beritaList: Berita[];
  addBerita: (b: Berita) => void;
  updateBerita: (id: string, b: Partial<Berita>) => void;
  deleteBerita: (id: string) => void;
  aktivitas: Aktivitas[];
  addAktivitas: (a: Omit<Aktivitas, 'id' | 'waktu'>) => void;
  jadwalPelayanan: JadwalPelayanan[];
  updateJadwal: (hari: string, jadwal: Partial<JadwalPelayanan>) => void;
  dataDesa: DataDesa;
  updateDataDesa: (d: Partial<DataDesa>) => void;
}

// ─── DUMMY DATA ───────────────────────────────────────────────
const dummyPenduduk: Penduduk[] = [
  { id:'1', nik:'1212010190010001', nama:'Ahmad Fauzi', tempatLahir:'Medan', tanggalLahir:'1990-01-15', jenisKelamin:'L', alamat:'Jln. Rukun No. 5', rt:'001', rw:'002', pekerjaan:'Petani', status:'Menikah', agama:'Islam', pendidikan:'SMA', createdAt:'2024-01-10' },
  { id:'2', nik:'1212020295020002', nama:'Siti Aminah', tempatLahir:'Deli Serdang', tanggalLahir:'1995-02-22', jenisKelamin:'P', alamat:'Jln. Merdeka No. 12', rt:'003', rw:'001', pekerjaan:'Ibu Rumah Tangga', status:'Menikah', agama:'Islam', pendidikan:'SMP', createdAt:'2024-01-12' },
  { id:'3', nik:'1212031285030003', nama:'Budi Santoso', tempatLahir:'Tebing Tinggi', tanggalLahir:'1985-12-01', jenisKelamin:'L', alamat:'Jln. Pasar No. 8', rt:'002', rw:'003', pekerjaan:'Wiraswasta', status:'Menikah', agama:'Islam', pendidikan:'S1', createdAt:'2024-02-05' },
  { id:'4', nik:'1212042000040004', nama:'Dewi Rahayu', tempatLahir:'Medan', tanggalLahir:'2000-04-10', jenisKelamin:'P', alamat:'Jln. Rukun No. 15', rt:'001', rw:'001', pekerjaan:'Mahasiswa', status:'Belum Menikah', agama:'Islam', pendidikan:'S1', createdAt:'2024-02-20' },
  { id:'5', nik:'1212051978050005', nama:'Hasan Basri', tempatLahir:'Lubuk Pakam', tanggalLahir:'1978-05-30', jenisKelamin:'L', alamat:'Jln. Klippa No. 3', rt:'004', rw:'002', pekerjaan:'Nelayan', status:'Menikah', agama:'Islam', pendidikan:'SD', createdAt:'2024-03-01' },
  { id:'6', nik:'1212061992060006', nama:'Rina Wati', tempatLahir:'Bandar Klippa', tanggalLahir:'1992-06-17', jenisKelamin:'P', alamat:'Jln. Mawar No. 4', rt:'002', rw:'001', pekerjaan:'Guru', status:'Menikah', agama:'Islam', pendidikan:'S1', createdAt:'2024-03-10' },
  { id:'7', nik:'1212071988070007', nama:'Darmawan Putra', tempatLahir:'Medan', tanggalLahir:'1988-07-05', jenisKelamin:'L', alamat:'Jln. Melati No. 9', rt:'003', rw:'003', pekerjaan:'PNS', status:'Menikah', agama:'Islam', pendidikan:'S1', createdAt:'2024-03-15' },
  { id:'8', nik:'1212082002080008', nama:'Fitri Handayani', tempatLahir:'Deli Serdang', tanggalLahir:'2002-08-20', jenisKelamin:'P', alamat:'Jln. Kenanga No. 6', rt:'001', rw:'004', pekerjaan:'Pelajar', status:'Belum Menikah', agama:'Islam', pendidikan:'SMA', createdAt:'2024-04-01' },
  { id:'9', nik:'1212091975090009', nama:'Suryo Adi', tempatLahir:'Tebing Tinggi', tanggalLahir:'1975-09-12', jenisKelamin:'L', alamat:'Jln. Klippa No. 18', rt:'004', rw:'001', pekerjaan:'Buruh', status:'Menikah', agama:'Islam', pendidikan:'SMP', createdAt:'2024-04-05' },
  { id:'10', nik:'1212101998100010', nama:'Nurul Hidayah', tempatLahir:'Medan', tanggalLahir:'1998-10-08', jenisKelamin:'P', alamat:'Jln. Rukun No. 22', rt:'002', rw:'002', pekerjaan:'Pegawai Swasta', status:'Belum Menikah', agama:'Islam', pendidikan:'D3', createdAt:'2024-04-10' },
  { id:'11', nik:'1212111980110011', nama:'Zulkifli Rahman', tempatLahir:'Lubuk Pakam', tanggalLahir:'1980-11-25', jenisKelamin:'L', alamat:'Jln. Pasar No. 14', rt:'003', rw:'002', pekerjaan:'Pedagang', status:'Menikah', agama:'Islam', pendidikan:'SMA', createdAt:'2024-05-01' },
  { id:'12', nik:'1212121993120012', nama:'Maya Sari', tempatLahir:'Bandar Klippa', tanggalLahir:'1993-12-03', jenisKelamin:'P', alamat:'Jln. Merdeka No. 7', rt:'001', rw:'003', pekerjaan:'Bidan', status:'Menikah', agama:'Islam', pendidikan:'D3', createdAt:'2024-05-12' },
  { id:'13', nik:'1212011997010013', nama:'Rizky Pratama', tempatLahir:'Medan', tanggalLahir:'1997-01-14', jenisKelamin:'L', alamat:'Jln. Mawar No. 11', rt:'002', rw:'004', pekerjaan:'Teknisi', status:'Belum Menikah', agama:'Islam', pendidikan:'SMA', createdAt:'2024-06-01' },
  { id:'14', nik:'1212022001020014', nama:'Linda Sari', tempatLahir:'Deli Serdang', tanggalLahir:'2001-02-28', jenisKelamin:'P', alamat:'Jln. Melati No. 3', rt:'004', rw:'003', pekerjaan:'Mahasiswa', status:'Belum Menikah', agama:'Islam', pendidikan:'S1', createdAt:'2024-06-15' },
  { id:'15', nik:'1212031965030015', nama:'Pak Slamet', tempatLahir:'Jawa Tengah', tanggalLahir:'1965-03-10', jenisKelamin:'L', alamat:'Jln. Kenanga No. 2', rt:'003', rw:'004', pekerjaan:'Pensiunan', status:'Menikah', agama:'Islam', pendidikan:'SMP', createdAt:'2024-07-01' },
];

const dummySurat: Surat[] = [
  { id:'s1', nomorSurat:'070/001/DS-BK/2024', jenisSurat:'Surat Keterangan Domisili', kategoriSurat:'dasar', nikPemohon:'1212010190010001', namaPemohon:'Ahmad Fauzi', keperluan:'Melamar pekerjaan', tanggalBuat:'2024-10-05', status:'selesai', dibuatOleh:'Admin', data:{ keperluan:'Melamar pekerjaan' } },
  { id:'s2', nomorSurat:'070/002/DS-BK/2024', jenisSurat:'Surat Keterangan Usaha', kategoriSurat:'dasar', nikPemohon:'1212031285030003', namaPemohon:'Budi Santoso', keperluan:'Pengajuan kredit bank', tanggalBuat:'2024-10-12', status:'selesai', dibuatOleh:'Petugas', data:{ namaUsaha:'Toko Sembako Budi', jenisUsaha:'Perdagangan', keperluan:'Pengajuan kredit bank' } },
  { id:'s3', nomorSurat:'070/003/DS-BK/2024', jenisSurat:'Surat Keterangan Tidak Mampu', kategoriSurat:'dasar', nikPemohon:'1212020295020002', namaPemohon:'Siti Aminah', keperluan:'Beasiswa sekolah anak', tanggalBuat:'2024-11-03', status:'selesai', dibuatOleh:'Admin', data:{ penghasilan:'1.200.000', tanggungan:'3', keperluan:'Beasiswa sekolah anak' } },
  { id:'s4', nomorSurat:'070/004/DS-BK/2024', jenisSurat:'Surat Pengantar KTP', kategoriSurat:'dasar', nikPemohon:'1212042000040004', namaPemohon:'Dewi Rahayu', keperluan:'Pembuatan KTP baru', tanggalBuat:'2024-11-18', status:'selesai', dibuatOleh:'Petugas', data:{ keperluan:'Pembuatan KTP baru' } },
  { id:'s5', nomorSurat:'070/005/DS-BK/2024', jenisSurat:'Surat Keterangan Kelahiran', kategoriSurat:'kependudukan', nikPemohon:'1212020295020002', namaPemohon:'Siti Aminah', keperluan:'Pengurusan akta kelahiran', tanggalBuat:'2024-12-01', status:'selesai', dibuatOleh:'Admin', data:{ namaAnak:'Muhammad Rafi', tanggalLahirAnak:'2024-11-25', jenisKelaminAnak:'Laki-laki', tempatLahirAnak:'Deli Serdang', namaIbu:'Siti Aminah', keperluan:'Pengurusan akta kelahiran' } },
  { id:'s6', nomorSurat:'070/006/DS-BK/2024', jenisSurat:'Surat Pengantar Nikah', kategoriSurat:'umum', nikPemohon:'1212071988070007', namaPemohon:'Darmawan Putra', keperluan:'Pernikahan', tanggalBuat:'2024-12-10', status:'selesai', dibuatOleh:'Admin', data:{ namaCalonPasangan:'Sri Wahyuni', alamatCalonPasangan:'Jln. Melati No. 5', tanggalNikah:'2025-01-05', keperluan:'Pernikahan' } },
  { id:'s7', nomorSurat:'070/007/DS-BK/2025', jenisSurat:'Surat Keterangan Aktif Sekolah', kategoriSurat:'pendidikan', nikPemohon:'1212082002080008', namaPemohon:'Fitri Handayani', keperluan:'Daftar beasiswa prestasi', tanggalBuat:'2025-01-08', status:'selesai', dibuatOleh:'Petugas', data:{ namaSekolah:'SMA Negeri 1 Percut', kelas:'XII IPA', keperluan:'Daftar beasiswa prestasi' } },
  { id:'s8', nomorSurat:'070/008/DS-BK/2025', jenisSurat:'Surat Keterangan Penghasilan', kategoriSurat:'ekonomi', nikPemohon:'1212061992060006', namaPemohon:'Rina Wati', keperluan:'Pengajuan KPR', tanggalBuat:'2025-01-15', status:'selesai', dibuatOleh:'Admin', data:{ penghasilan:'4.500.000', sumberPenghasilan:'Guru Honorer SDN 001', keperluan:'Pengajuan KPR' } },
  { id:'s9', nomorSurat:'070/009/DS-BK/2025', jenisSurat:'Surat Keterangan Tidak Mampu', kategoriSurat:'dasar', nikPemohon:'1212091975090009', namaPemohon:'Suryo Adi', keperluan:'Bantuan sosial BPJS', tanggalBuat:'2025-02-03', status:'selesai', dibuatOleh:'Admin', data:{ penghasilan:'900.000', tanggungan:'4', keperluan:'Bantuan sosial BPJS' } },
  { id:'s10', nomorSurat:'070/010/DS-BK/2025', jenisSurat:'Surat Izin Keramaian', kategoriSurat:'umum', nikPemohon:'1212111980110011', namaPemohon:'Zulkifli Rahman', keperluan:'Pesta pernikahan anak', tanggalBuat:'2025-02-14', status:'selesai', dibuatOleh:'Petugas', data:{ namaAcara:'Resepsi Pernikahan', tanggalAcara:'2025-03-01', lokasiAcara:'Jln. Pasar No. 14', perkiraanPeserta:'200', keperluan:'Pesta pernikahan anak' } },
  { id:'s11', nomorSurat:'070/011/DS-BK/2025', jenisSurat:'Surat Keterangan Kehilangan', kategoriSurat:'umum', nikPemohon:'1212101998100010', namaPemohon:'Nurul Hidayah', keperluan:'Pengurusan dokumen hilang', tanggalBuat:'2025-02-20', status:'selesai', dibuatOleh:'Admin', data:{ barangHilang:'Kartu ATM BRI dan SIM A', tanggalHilang:'2025-02-18', lokasiHilang:'Pasar Klippa', keperluan:'Pengurusan dokumen hilang' } },
  { id:'s12', nomorSurat:'070/012/DS-BK/2025', jenisSurat:'Surat Rekomendasi Beasiswa', kategoriSurat:'pendidikan', nikPemohon:'1212042000040004', namaPemohon:'Dewi Rahayu', keperluan:'Beasiswa Bidikmisi', tanggalBuat:'2025-03-05', status:'selesai', dibuatOleh:'Admin', data:{ namaBeasiswa:'Bidikmisi Kemendikbud', institusiPemberi:'Kementerian Pendidikan', namaSekolah:'Universitas Sumatera Utara', keperluan:'Beasiswa Bidikmisi' } },
  { id:'s13', nomorSurat:'070/013/DS-BK/2025', jenisSurat:'Surat Keterangan Domisili', kategoriSurat:'dasar', nikPemohon:'1212011997010013', namaPemohon:'Rizky Pratama', keperluan:'Daftar BPJS Kesehatan', tanggalBuat:'2025-03-12', status:'diproses', dibuatOleh:'Petugas', data:{ keperluan:'Daftar BPJS Kesehatan' } },
  { id:'s14', nomorSurat:'070/014/DS-BK/2025', jenisSurat:'Surat Keterangan Usaha Mikro', kategoriSurat:'ekonomi', nikPemohon:'1212031285030003', namaPemohon:'Budi Santoso', keperluan:'Program UMKM Pemerintah', tanggalBuat:'2025-03-20', status:'diproses', dibuatOleh:'Admin', data:{ namaUsaha:'Toko Sembako Budi', jenisUsaha:'Perdagangan Sembako', omzetPerBulan:'8.000.000', keperluan:'Program UMKM Pemerintah' } },
  { id:'s15', nomorSurat:'070/015/DS-BK/2025', jenisSurat:'Surat Pengantar KK', kategoriSurat:'dasar', nikPemohon:'1212031965030015', namaPemohon:'Pak Slamet', keperluan:'Pembaruan Kartu Keluarga', tanggalBuat:'2025-04-01', status:'diproses', dibuatOleh:'Petugas', data:{ keperluan:'Pembaruan Kartu Keluarga' } },
  { id:'s16', nomorSurat:'070/016/DS-BK/2025', jenisSurat:'Surat Pindah', kategoriSurat:'kependudukan', nikPemohon:'1212121993120012', namaPemohon:'Maya Sari', keperluan:'Pindah ke Medan Kota', tanggalBuat:'2025-04-10', status:'diproses', dibuatOleh:'Admin', data:{ alamatTujuan:'Jln. Sudirman No. 45', desaTujuan:'Kelurahan Petisah', alasanPindah:'Ikut suami pindah tugas', keperluan:'Pindah ke Medan Kota' } },
  { id:'s17', nomorSurat:'070/017/DS-BK/2025', jenisSurat:'Surat Keterangan Belum Menikah', kategoriSurat:'umum', nikPemohon:'1212022001020014', namaPemohon:'Linda Sari', keperluan:'Persyaratan lamaran kerja BUMN', tanggalBuat:'2025-04-22', status:'diproses', dibuatOleh:'Petugas', data:{ keperluan:'Persyaratan lamaran kerja BUMN' } },
  { id:'s18', nomorSurat:'070/018/DS-BK/2025', jenisSurat:'Surat Keterangan Tidak Mampu', kategoriSurat:'pendidikan', nikPemohon:'1212051978050005', namaPemohon:'Hasan Basri', keperluan:'Keringanan SPP sekolah anak', tanggalBuat:'2025-04-28', status:'diproses', dibuatOleh:'Admin', data:{ namaSekolah:'SMP Negeri 2 Percut', penghasilan:'1.500.000', keperluan:'Keringanan SPP sekolah anak' } },
];

const dummyPengajuan: PengajuanPublik[] = [
  { id:'p1', nama:'Rizky Pratama', nik:'1212011997010013', jenisSurat:'Surat Keterangan Domisili', keperluan:'Daftar BPJS Kesehatan', tanggalAjuan:'2025-04-20', status:'diproses' },
  { id:'p2', nama:'Linda Sari', nik:'1212022001020014', jenisSurat:'Surat Keterangan Tidak Mampu', keperluan:'Beasiswa sekolah anak', tanggalAjuan:'2025-04-18', status:'selesai' },
  { id:'p3', nama:'Suryo Adi', nik:'1212091975090009', jenisSurat:'Surat Rekomendasi Bantuan', keperluan:'Program bantuan PKH', tanggalAjuan:'2025-04-15', status:'diproses' },
  { id:'p4', nama:'Fitri Handayani', nik:'1212082002080008', jenisSurat:'Surat Keterangan Aktif Sekolah', keperluan:'Beasiswa dari bank', tanggalAjuan:'2025-04-10', status:'selesai' },
  { id:'p5', nama:'Nurul Hidayah', nik:'1212101998100010', jenisSurat:'Surat Keterangan Penghasilan', keperluan:'Pengajuan kredit motor', tanggalAjuan:'2025-04-05', status:'ditolak', alasanTolak:'Dokumen KTP tidak jelas, harap upload ulang' },
];

const dummyBerita: Berita[] = [
  { id:'b1', judul:'Musyawarah Desa Rencana Pembangunan 2025', isi:'Pemerintah Desa Bandar Klippa mengundang seluruh warga untuk hadir dalam Musyawarah Desa yang akan membahas Rencana Pembangunan Jangka Menengah Desa (RPJMDes) tahun 2025-2030. Acara dilaksanakan pada Sabtu, 25 Januari 2025 pukul 09.00 WIB di Balai Desa. Kehadiran warga sangat diharapkan untuk bersama-sama menentukan arah pembangunan desa ke depan.', kategori:'pengumuman', tanggal:'2025-01-15', penulis:'Admin Desa' },
  { id:'b2', judul:'Penyaluran Bantuan Sosial PKH Tahap I 2025', isi:'Pemerintah Desa Bandar Klippa akan menyalurkan Bantuan Sosial Program Keluarga Harapan (PKH) tahap pertama tahun 2025. Warga yang terdaftar sebagai penerima manfaat dapat mengambil bantuan di Kantor Desa mulai tanggal 1-5 Februari 2025 dengan membawa KTP asli dan Kartu PKH. Informasi lebih lanjut hubungi kantor desa.', kategori:'informasi', tanggal:'2025-01-22', penulis:'Admin Desa' },
  { id:'b3', judul:'Gotong Royong Serentak Bersih Desa', isi:'Dalam rangka menyambut Hari Jadi Desa Bandar Klippa, akan diadakan kegiatan Gotong Royong Serentak pada Minggu, 2 Februari 2025 pukul 07.00 WIB. Seluruh warga diharapkan berpartisipasi membersihkan lingkungan RT/RW masing-masing. Peralatan kebersihan disediakan oleh panitia. Bersama kita wujudkan Bandar Klippa yang bersih dan sehat!', kategori:'berita', tanggal:'2025-01-28', penulis:'Petugas Desa' },
  { id:'b4', judul:'Jadwal Posyandu Februari 2025', isi:'Posyandu Desa Bandar Klippa akan dilaksanakan pada Selasa, 11 Februari 2025 pukul 08.00–11.00 WIB di Balai Desa. Kegiatan meliputi penimbangan bayi dan balita, pemberian vitamin A, imunisasi, dan konsultasi gizi. Ibu-ibu yang memiliki bayi dan balita harap hadir tepat waktu. Pelayanan gratis untuk semua warga.', kategori:'informasi', tanggal:'2025-02-03', penulis:'Admin Desa' },
  { id:'b5', judul:'Pemadaman Listrik Terjadwal', isi:'PLN Wilayah Deli Serdang akan melakukan pemeliharaan jaringan listrik pada Rabu, 19 Februari 2025 pukul 08.00–16.00 WIB. Wilayah yang terdampak meliputi RT 001-004 RW 001-003 Desa Bandar Klippa. Warga diharapkan mempersiapkan diri dengan menyimpan air dan mematikan peralatan elektronik sensitif. Mohon maaf atas ketidaknyamanan ini.', kategori:'pengumuman', tanggal:'2025-02-15', penulis:'Admin Desa' },
  { id:'b6', judul:'Pelatihan Wirausaha Gratis untuk Warga', isi:'Dinas Koperasi dan UMKM Kabupaten Deli Serdang bekerja sama dengan Pemerintah Desa Bandar Klippa menyelenggarakan Pelatihan Kewirausahaan gratis. Pelatihan dilaksanakan 3-5 Maret 2025 di Balai Desa. Materi meliputi manajemen usaha, pemasaran digital, dan akses permodalan. Pendaftaran di kantor desa paling lambat 25 Februari 2025. Tempat terbatas, daftarkan diri Anda sekarang!', kategori:'informasi', tanggal:'2025-02-20', penulis:'Admin Desa' },
  { id:'b7', judul:'Hasil Pemilihan Ketua RT/RW Periode 2025-2027', isi:'Pemilihan Ketua RT dan RW Desa Bandar Klippa telah dilaksanakan pada 1 Maret 2025 dengan lancar dan demokratis. Selamat kepada seluruh Ketua RT/RW terpilih yang akan memimpin wilayahnya periode 2025-2027. Pemerintah desa berterima kasih atas partisipasi aktif warga dalam proses demokrasi tingkat bawah ini.', kategori:'berita', tanggal:'2025-03-02', penulis:'Admin Desa' },
  { id:'b8', judul:'Imbauan Waspada Banjir Musim Hujan', isi:'Mengingat intensitas hujan yang tinggi belakangan ini, Pemerintah Desa Bandar Klippa mengimbau seluruh warga untuk waspada terhadap potensi banjir, terutama warga yang tinggal di sekitar aliran sungai dan daerah rawan genangan. Segera laporkan ke RT/RW atau kantor desa jika terjadi hal-hal yang membutuhkan penanganan segera. Nomor darurat: 061 77838357.', kategori:'pengumuman', tanggal:'2025-04-10', penulis:'Kepala Desa' },
];

const dummyAktivitas: Aktivitas[] = [
  { id:'a1', aksi:'Login', detail:'Administrator masuk ke sistem', pengguna:'Administrator', waktu:'27/04/2025, 08.05' },
  { id:'a2', aksi:'Buat Surat', detail:'Surat Keterangan Tidak Mampu untuk Hasan Basri', pengguna:'Administrator', waktu:'27/04/2025, 08.32' },
  { id:'a3', aksi:'Buat Surat', detail:'Surat Keterangan Belum Menikah untuk Linda Sari', pengguna:'Petugas Desa', waktu:'27/04/2025, 09.10' },
  { id:'a4', aksi:'Pengajuan Baru', detail:'Surat Keterangan Domisili dari Rizky Pratama', pengguna:'Masyarakat', waktu:'26/04/2025, 14.22' },
  { id:'a5', aksi:'Buat Surat', detail:'Surat Pindah untuk Maya Sari', pengguna:'Administrator', waktu:'26/04/2025, 10.45' },
  { id:'a6', aksi:'Buat Surat', detail:'Surat Keterangan Domisili untuk Rizky Pratama', pengguna:'Petugas Desa', waktu:'25/04/2025, 11.20' },
  { id:'a7', aksi:'Tambah Penduduk', detail:'Menambah data: Fitri Handayani', pengguna:'Administrator', waktu:'24/04/2025, 09.00' },
  { id:'a8', aksi:'Pengajuan Baru', detail:'Surat Rekomendasi Bantuan dari Suryo Adi', pengguna:'Masyarakat', waktu:'23/04/2025, 16.05' },
  { id:'a9', aksi:'Buat Surat', detail:'Surat Pengantar KK untuk Pak Slamet', pengguna:'Petugas Desa', waktu:'22/04/2025, 08.50' },
  { id:'a10', aksi:'Login', detail:'Petugas Desa masuk ke sistem', pengguna:'Petugas Desa', waktu:'22/04/2025, 08.45' },
];

// ─── DEFAULT JADWAL ───────────────────────────────────────────
const defaultJadwal: JadwalPelayanan[] = [
  { hari:'Senin',  jamBuka:'08:00', jamTutup:'16:00', aktif:true  },
  { hari:'Selasa', jamBuka:'08:00', jamTutup:'16:00', aktif:true  },
  { hari:'Rabu',   jamBuka:'08:00', jamTutup:'16:00', aktif:true  },
  { hari:'Kamis',  jamBuka:'08:00', jamTutup:'16:00', aktif:true  },
  { hari:'Jumat',  jamBuka:'08:00', jamTutup:'16:00', aktif:true  },
  { hari:'Sabtu',  jamBuka:'08:00', jamTutup:'16:00', aktif:false },
  { hari:'Minggu', jamBuka:'08:00', jamTutup:'12:00', aktif:false },
];

// ─── STORE ────────────────────────────────────────────────────
export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      currentUser: null,

      login: (username, password) => {
        const users = [
          { username:'admin', password:'admin123', nama:'Administrator', role:'admin' as const },
          { username:'petugas', password:'petugas123', nama:'Petugas Desa', role:'petugas' as const },
        ];
        const user = users.find(u => u.username===username && u.password===password);
        if (user) {
          set({ isLoggedIn:true, currentUser:{ nama:user.nama, role:user.role, username:user.username } });
          get().addAktivitas({ aksi:'Login', detail:`${user.nama} masuk ke sistem`, pengguna:user.nama });
          return true;
        }
        return false;
      },
      logout: () => {
        const user = get().currentUser;
        if (user) get().addAktivitas({ aksi:'Logout', detail:`${user.nama} keluar dari sistem`, pengguna:user.nama });
        set({ isLoggedIn:false, currentUser:null });
      },

      penduduk: dummyPenduduk,
      addPenduduk: (p) => { set(s=>({penduduk:[...s.penduduk,p]})); get().addAktivitas({ aksi:'Tambah Penduduk', detail:`Menambah data: ${p.nama}`, pengguna:get().currentUser?.nama||'Sistem' }); },
      updatePenduduk: (id,p) => set(s=>({penduduk:s.penduduk.map(x=>x.id===id?{...x,...p}:x)})),
      deletePenduduk: (id) => { const p=get().penduduk.find(x=>x.id===id); set(s=>({penduduk:s.penduduk.filter(x=>x.id!==id)})); get().addAktivitas({ aksi:'Hapus Penduduk', detail:`Menghapus data: ${p?.nama}`, pengguna:get().currentUser?.nama||'Sistem' }); },

      suratList: dummySurat,
      addSurat: (s) => { set(st=>({suratList:[...st.suratList,s]})); get().addAktivitas({ aksi:'Buat Surat', detail:`${s.jenisSurat} untuk ${s.namaPemohon}`, pengguna:get().currentUser?.nama||'Sistem' }); },
      updateSurat: (id,s) => set(st=>({suratList:st.suratList.map(x=>x.id===id?{...x,...s}:x)})),
      deleteSurat: (id) => set(s=>({suratList:s.suratList.filter(x=>x.id!==id)})),

      pengajuanList: dummyPengajuan,
      addPengajuan: (p) => { set(s=>({pengajuanList:[...s.pengajuanList,p]})); get().addAktivitas({ aksi:'Pengajuan Baru', detail:`${p.jenisSurat} dari ${p.nama}`, pengguna:'Masyarakat' }); },
      updatePengajuan: (id,p) => set(s=>({pengajuanList:s.pengajuanList.map(x=>x.id===id?{...x,...p}:x)})),

      beritaList: dummyBerita,
      addBerita: (b) => set(s=>({beritaList:[...s.beritaList,b]})),
      updateBerita: (id,b) => set(s=>({beritaList:s.beritaList.map(x=>x.id===id?{...x,...b}:x)})),
      deleteBerita: (id) => set(s=>({beritaList:s.beritaList.filter(x=>x.id!==id)})),

      aktivitas: dummyAktivitas,
      addAktivitas: (a) => set(s=>({ aktivitas:[{...a,id:Date.now().toString(),waktu:new Date().toLocaleString('id-ID')},...s.aktivitas].slice(0,100) })),

      jadwalPelayanan: defaultJadwal,
      updateJadwal: (hari,j) => set(s=>({jadwalPelayanan:s.jadwalPelayanan.map(x=>x.hari===hari?{...x,...j}:x)})),

      dataDesa: {
        namaDesa:'Desa Bandar Klippa',
        kecamatan:'Percut Sei Tuan',
        kabupaten:'Deli Serdang',
        provinsi:'Sumatera Utara',
        alamatKantor:'Jl. Bt.Kuis Km.10,2 Gg Rukun Bandar Klippa',
        telepon:'061 77838357',
        email:'desabandarklippa@gmail.com',
        kodePos:'20371',
        kepala:'Suripno, SH. MH',
        visi:'Terwujudnya Desa Bandar Klippa yang Maju, Sejahtera, dan Berdaya Saing',
        misi:'Meningkatkan kualitas pelayanan publik, pemberdayaan masyarakat, dan pembangunan infrastruktur desa yang berkelanjutan',
      },
      updateDataDesa: (d) => set(s=>({dataDesa:{...s.dataDesa,...d}})),
    }),
    {
      name: 'surat-desa-storage-v8',
      version: 2,
      migrate: (persistedState, version) => {
        if (version < 2) {
          return {
            ...(persistedState as AppStore),
            jadwalPelayanan: defaultJadwal,
          };
        }
        return persistedState as AppStore;
      },
    }
  )
);