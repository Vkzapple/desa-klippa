export const JENIS_SURAT = {
  dasar: {
    label: 'Surat Dasar',
    icon: '📄',
    items: [
      { id: 'SKD', nama: 'Surat Keterangan Domisili', singkatan: 'SKD' },
      { id: 'SKU', nama: 'Surat Keterangan Usaha', singkatan: 'SKU' },
      { id: 'SKTM', nama: 'Surat Keterangan Tidak Mampu', singkatan: 'SKTM' },
      { id: 'SPKTP', nama: 'Surat Pengantar KTP', singkatan: 'SPKTP' },
      { id: 'SPKK', nama: 'Surat Pengantar KK', singkatan: 'SPKK' },
    ]
  },
  kependudukan: {
    label: 'Surat Kependudukan',
    icon: '👨‍👩‍👧',
    items: [
      { id: 'SKLahir', nama: 'Surat Keterangan Kelahiran', singkatan: 'SKLahir' },
      { id: 'SKMati', nama: 'Surat Keterangan Kematian', singkatan: 'SKMati' },
      { id: 'SPindah', nama: 'Surat Pindah', singkatan: 'SPindah' },
      { id: 'SDatang', nama: 'Surat Datang', singkatan: 'SDatang' },
    ]
  },
  umum: {
    label: 'Surat Umum',
    icon: '🏢',
    items: [
      { id: 'SPN', nama: 'Surat Pengantar Nikah', singkatan: 'SPN' },
      { id: 'SIK', nama: 'Surat Izin Keramaian', singkatan: 'SIK' },
      { id: 'SKBM', nama: 'Surat Keterangan Belum Menikah', singkatan: 'SKBM' },
      { id: 'SKBN', nama: 'Surat Keterangan Beda Nama', singkatan: 'SKBN' },
      { id: 'SKHilang', nama: 'Surat Keterangan Kehilangan', singkatan: 'SKHilang' },
    ]
  },
  pendidikan: {
    label: 'Surat Pendidikan & Sosial',
    icon: '🎓',
    items: [
      { id: 'SKAS', nama: 'Surat Keterangan Aktif Sekolah', singkatan: 'SKAS' },
      { id: 'SRB', nama: 'Surat Rekomendasi Beasiswa', singkatan: 'SRB' },
      { id: 'SKTMSekolah', nama: 'Surat Keterangan Tidak Mampu (Sekolah)', singkatan: 'SKTMS' },
    ]
  },
  ekonomi: {
    label: 'Surat Ekonomi',
    icon: '💼',
    items: [
      { id: 'SKP', nama: 'Surat Keterangan Penghasilan', singkatan: 'SKP' },
      { id: 'SKUM', nama: 'Surat Keterangan Usaha Mikro', singkatan: 'SKUM' },
      { id: 'SRBantuan', nama: 'Surat Rekomendasi Bantuan', singkatan: 'SRB' },
    ]
  },
};

export const getAllJenisSurat = () => {
  return Object.entries(JENIS_SURAT).flatMap(([kat, val]) =>
    val.items.map(item => ({ ...item, kategori: kat, kategoriLabel: val.label }))
  );
};

export const getTemplateFields = (suratId: string): { id: string; label: string; type: string; required: boolean }[] => {
  const commonFields = [
    { id: 'keperluan', label: 'Keperluan / Keterangan', type: 'textarea', required: true },
  ];

  const fieldMap: Record<string, typeof commonFields> = {
    SKD: [...commonFields],
    SKU: [
      { id: 'namaUsaha', label: 'Nama Usaha', type: 'text', required: true },
      { id: 'jenisUsaha', label: 'Jenis Usaha', type: 'text', required: true },
      { id: 'alamatUsaha', label: 'Alamat Usaha', type: 'text', required: false },
      ...commonFields,
    ],
    SKTM: [
      { id: 'penghasilan', label: 'Penghasilan per Bulan (Rp)', type: 'text', required: false },
      { id: 'tanggungan', label: 'Jumlah Tanggungan', type: 'text', required: false },
      ...commonFields,
    ],
    SPKTP: [...commonFields],
    SPKK: [...commonFields],
    SKLahir: [
      { id: 'namaAnak', label: 'Nama Anak', type: 'text', required: true },
      { id: 'tanggalLahirAnak', label: 'Tanggal Lahir Anak', type: 'date', required: true },
      { id: 'jenisKelaminAnak', label: 'Jenis Kelamin Anak', type: 'text', required: true },
      { id: 'tempatLahirAnak', label: 'Tempat Lahir', type: 'text', required: true },
      { id: 'namaIbu', label: 'Nama Ibu', type: 'text', required: true },
      ...commonFields,
    ],
    SKMati: [
      { id: 'namaAlmarhum', label: 'Nama Almarhum/Almarhumah', type: 'text', required: true },
      { id: 'tanggalMeninggal', label: 'Tanggal Meninggal', type: 'date', required: true },
      { id: 'tempatMeninggal', label: 'Tempat Meninggal', type: 'text', required: true },
      { id: 'penyebabMeninggal', label: 'Penyebab Meninggal', type: 'text', required: false },
      ...commonFields,
    ],
    SPindah: [
      { id: 'alamatTujuan', label: 'Alamat Tujuan', type: 'text', required: true },
      { id: 'desaTujuan', label: 'Desa Tujuan', type: 'text', required: true },
      { id: 'alasanPindah', label: 'Alasan Pindah', type: 'text', required: true },
      ...commonFields,
    ],
    SDatang: [
      { id: 'asalDaerah', label: 'Asal Daerah', type: 'text', required: true },
      { id: 'alasanDatang', label: 'Alasan Datang', type: 'text', required: true },
      ...commonFields,
    ],
    SPN: [
      { id: 'namaCalonPasangan', label: 'Nama Calon Pasangan', type: 'text', required: true },
      { id: 'alamatCalonPasangan', label: 'Alamat Calon Pasangan', type: 'text', required: true },
      { id: 'tanggalNikah', label: 'Rencana Tanggal Nikah', type: 'date', required: false },
      ...commonFields,
    ],
    SIK: [
      { id: 'namaAcara', label: 'Nama Acara', type: 'text', required: true },
      { id: 'tanggalAcara', label: 'Tanggal Acara', type: 'date', required: true },
      { id: 'lokasiAcara', label: 'Lokasi Acara', type: 'text', required: true },
      { id: 'perkiraanPeserta', label: 'Perkiraan Jumlah Peserta', type: 'text', required: false },
      ...commonFields,
    ],
    SKBM: [...commonFields],
    SKBN: [
      { id: 'namaLain', label: 'Nama Lain yang Digunakan', type: 'text', required: true },
      { id: 'alasanBedaNama', label: 'Alasan Perbedaan Nama', type: 'text', required: true },
      ...commonFields,
    ],
    SKHilang: [
      { id: 'barangHilang', label: 'Barang/Dokumen yang Hilang', type: 'text', required: true },
      { id: 'tanggalHilang', label: 'Tanggal Kehilangan', type: 'date', required: true },
      { id: 'lokasiHilang', label: 'Lokasi Kehilangan', type: 'text', required: false },
      ...commonFields,
    ],
    SKAS: [
      { id: 'namaSekolah', label: 'Nama Sekolah', type: 'text', required: true },
      { id: 'kelas', label: 'Kelas/Semester', type: 'text', required: true },
      ...commonFields,
    ],
    SRB: [
      { id: 'namaBeasiswa', label: 'Nama Beasiswa', type: 'text', required: true },
      { id: 'institusiPemberi', label: 'Institusi Pemberi Beasiswa', type: 'text', required: true },
      { id: 'namaSekolah', label: 'Nama Sekolah/Universitas', type: 'text', required: true },
      ...commonFields,
    ],
    SKTMSekolah: [
      { id: 'namaSekolah', label: 'Nama Sekolah', type: 'text', required: true },
      { id: 'penghasilan', label: 'Penghasilan Orang Tua (Rp)', type: 'text', required: false },
      ...commonFields,
    ],
    SKP: [
      { id: 'penghasilan', label: 'Penghasilan per Bulan (Rp)', type: 'text', required: true },
      { id: 'sumberPenghasilan', label: 'Sumber Penghasilan', type: 'text', required: true },
      ...commonFields,
    ],
    SKUM: [
      { id: 'namaUsaha', label: 'Nama Usaha', type: 'text', required: true },
      { id: 'jenisUsaha', label: 'Jenis Usaha', type: 'text', required: true },
      { id: 'omzetPerBulan', label: 'Omzet per Bulan (Rp)', type: 'text', required: false },
      ...commonFields,
    ],
    SRBantuan: [
      { id: 'jenisBantuan', label: 'Jenis Bantuan', type: 'text', required: true },
      { id: 'lembagaPemberi', label: 'Lembaga Pemberi Bantuan', type: 'text', required: true },
      ...commonFields,
    ],
  };

  return fieldMap[suratId] || commonFields;
};