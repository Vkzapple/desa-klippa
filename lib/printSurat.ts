import { Surat, DataDesa } from '../store/store';

export const generateSuratHTML = (surat: Surat, dataDesa: DataDesa): string => {
  const tgl = new Date(surat.tanggalBuat);
  const todayLong = tgl.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  const d = surat.data;

  // Parse nomor surat → nomor urut saja
  const nomorUrut = surat.nomorSurat.split('/')[1] || '001';
  const tahun = tgl.getFullYear();
  const nomorResmi = `070/${nomorUrut}/${tahun}`;

  const getIsiBody = () => {
    const jenisMap: Record<string, string> = {
      'Surat Keterangan Domisili': `
        <p style="text-indent:40px;margin:0 0 10px">Memenuhi maksud keperluan administrasi, maka dengan ini kami sampaikan bahwa :</p>
        <table style="margin:12px 0;width:100%;font-size:12pt">
          <tr><td style="width:180px;padding:2px 0">Nama</td><td style="width:10px">:</td><td><strong>${surat.namaPemohon}</strong></td></tr>
          <tr><td style="padding:2px 0">NIK</td><td>:</td><td>${surat.nikPemohon}</td></tr>
          <tr><td style="padding:2px 0">Alamat</td><td>:</td><td>${d.alamat || 'Desa Bandar Klippa'}</td></tr>
        </table>
        <p style="text-indent:40px;margin:0 0 10px">Adalah benar-benar warga/penduduk yang berdomisili di wilayah Desa Bandar Klippa, Kecamatan Percut Sei Tuan, Kabupaten Deli Serdang, digunakan sebagai <strong>${d.keperluan || 'keperluan administrasi'}</strong>.</p>`,
      'Surat Keterangan Usaha': `
        <p style="text-indent:40px;margin:0 0 10px">Yang bertanda tangan di bawah ini menerangkan bahwa :</p>
        <table style="margin:12px 0;width:100%;font-size:12pt">
          <tr><td style="width:180px;padding:2px 0">Nama</td><td style="width:10px">:</td><td><strong>${surat.namaPemohon}</strong></td></tr>
          <tr><td style="padding:2px 0">NIK</td><td>:</td><td>${surat.nikPemohon}</td></tr>
          <tr><td style="padding:2px 0">Nama Usaha</td><td>:</td><td>${d.namaUsaha || '-'}</td></tr>
          <tr><td style="padding:2px 0">Jenis Usaha</td><td>:</td><td>${d.jenisUsaha || '-'}</td></tr>
        </table>
        <p style="text-indent:40px;margin:0 0 10px">Adalah benar-benar warga Desa Bandar Klippa yang memiliki usaha tersebut di atas, digunakan sebagai <strong>${d.keperluan || 'keperluan administrasi'}</strong>.</p>`,
      'Surat Keterangan Tidak Mampu': `
        <p style="text-indent:40px;margin:0 0 10px">Yang bertanda tangan di bawah ini menerangkan bahwa :</p>
        <table style="margin:12px 0;width:100%;font-size:12pt">
          <tr><td style="width:180px;padding:2px 0">Nama</td><td style="width:10px">:</td><td><strong>${surat.namaPemohon}</strong></td></tr>
          <tr><td style="padding:2px 0">NIK</td><td>:</td><td>${surat.nikPemohon}</td></tr>
          ${d.penghasilan ? `<tr><td style="padding:2px 0">Penghasilan</td><td>:</td><td>Rp ${d.penghasilan}/bulan</td></tr>` : ''}
          ${d.tanggungan ? `<tr><td style="padding:2px 0">Tanggungan</td><td>:</td><td>${d.tanggungan} orang</td></tr>` : ''}
        </table>
        <p style="text-indent:40px;margin:0 0 10px">Adalah benar-benar warga Desa Bandar Klippa yang termasuk dalam golongan keluarga kurang mampu / tidak mampu, digunakan sebagai <strong>${d.keperluan || 'keperluan administrasi'}</strong>.</p>`,
    };
    return jenisMap[surat.jenisSurat] || `
      <p style="text-indent:40px;margin:0 0 10px">Yang bertanda tangan di bawah ini menerangkan bahwa :</p>
      <table style="margin:12px 0;width:100%;font-size:12pt">
        <tr><td style="width:180px;padding:2px 0">Nama</td><td style="width:10px">:</td><td><strong>${surat.namaPemohon}</strong></td></tr>
        <tr><td style="padding:2px 0">NIK</td><td>:</td><td>${surat.nikPemohon}</td></tr>
      </table>
      <p style="text-indent:40px;margin:0 0 10px">Adalah benar-benar warga Desa Bandar Klippa yang memerlukan surat ini untuk <strong>${d.keperluan || 'keperluan administrasi'}</strong>.</p>`;
  };

  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>${surat.jenisSurat}</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'Times New Roman',Times,serif; font-size:12pt; color:#000; background:#fff; }
  .page { width:210mm; min-height:297mm; margin:0 auto; padding:20mm 25mm 20mm 30mm; }
  .kop { display:flex; align-items:center; gap:15px; padding-bottom:8px; border-bottom:3px solid #000; margin-bottom:16px; }
  .kop-logo { width:70px; height:70px; flex-shrink:0; }
  .kop-logo-img { width:70px; height:70px; object-fit:contain; flex-shrink:0; border-radius:4px; }
  .kop-logo img { width:100%; height:100%; object-fit:contain; }
  .kop-logo-placeholder { width:70px; height:70px; border:2px solid #000; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:28px; flex-shrink:0; }
  .kop-text { text-align:center; flex:1; }
  .kop-text .line1 { font-size:13pt; font-weight:bold; text-transform:uppercase; }
  .kop-text .line2 { font-size:13pt; font-weight:bold; text-transform:uppercase; }
  .kop-text .line3 { font-size:16pt; font-weight:bold; text-transform:uppercase; letter-spacing:1px; }
  .kop-text .alamat { font-size:9pt; margin-top:3px; }
  .judul { text-align:center; margin:18px 0 6px; }
  .judul h2 { font-size:14pt; text-transform:uppercase; text-decoration:underline; font-weight:bold; letter-spacing:1px; }
  .nomor-surat { text-align:center; font-size:11pt; margin-bottom:16px; }
  .meta { display:grid; grid-template-columns:1fr 1fr; gap:0; margin-bottom:16px; font-size:11pt; }
  .meta-left table td { padding:1px 0; vertical-align:top; }
  .meta-left table td:first-child { width:55px; }
  .meta-right { text-align:right; }
  .meta-right .kepada { margin-top:0; }
  .isi { font-size:12pt; line-height:1.8; margin-bottom:16px; }
  .ttd-area { margin-top:30px; display:flex; justify-content:flex-end; }
  .ttd-box { text-align:center; min-width:230px; }
  .ttd-box .ttd-nama { margin-top:75px; font-weight:bold; text-decoration:underline; font-size:12pt; }
  .ttd-box .ttd-jabatan { font-size:11pt; }
  .cc { margin-top:30px; font-size:11pt; }
  @media print {
    body { margin:0; }
    .page { padding:15mm 20mm 15mm 25mm; }
    .no-print { display:none !important; }
    @page { size:A4; margin:0; }
  }
</style>
</head>
<body>
<div class="page">
  <!-- KOP SURAT -->
  <div class="kop">
    <img src="/logo-2.jpg" alt="Logo Desa" class="kop-logo-img" onerror="this.style.display='none'" />
    <div class="kop-text">
      <div class="line1">PEMERINTAH KABUPATEN DELI SERDANG</div>
      <div class="line2">KECAMATAN PERCUT SEI TUAN</div>
      <div class="line3">DESA BANDAR KLIPPA</div>
      <div class="alamat">Alamat : ${dataDesa.alamatKantor} – ${dataDesa.kodePos} Telp. ${dataDesa.telepon}</div>
    </div>
  </div>

  <!-- META INFO -->
  <div class="meta">
    <div class="meta-left">
      <table>
        <tr><td>Nomor</td><td>: ${nomorResmi}</td></tr>
        <tr><td>Lamp</td><td>: ---</td></tr>
        <tr><td>H a l</td><td>: <strong><em>${surat.jenisSurat}</em></strong></td></tr>
      </table>
    </div>
    <div class="meta-right">
      <p>Bandar Klippa, ${todayLong}</p>
      <br/>
      <p>Kepada Yth :</p>
      <p>Yang Bersangkutan</p>
      <br/>
      <p>Di -</p>
      <p style="text-decoration:underline;text-align:center">T e m p a t</p>
    </div>
  </div>

  <!-- JUDUL -->
  <div class="judul">
    <h2>${surat.jenisSurat}</h2>
  </div>
  <div class="nomor-surat">Nomor : ${nomorResmi}</div>

  <!-- ISI -->
  <div class="isi">
    ${getIsiBody()}
    <p style="text-indent:40px;margin:12px 0 0">Demikian surat keterangan ini kami buat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.</p>
  </div>

  <!-- TTD -->
  <div class="ttd-area">
    <div class="ttd-box">
      <div class="ttd-jabatan">KEPALA DESA BANDAR KLIPPA</div>
      <div class="ttd-jabatan">KECAMATAN PERCUT SEI TUAN</div>
      <div class="ttd-nama">${dataDesa.kepala}</div>
    </div>
  </div>

  <div class="cc">CC. Arsip</div>
</div>

<div class="no-print" style="text-align:center;padding:20px;background:#f1f5f9">
  <button onclick="window.print()" style="background:#1d4ed8;color:#fff;border:none;padding:12px 32px;font-size:15px;border-radius:10px;cursor:pointer;margin-right:10px;font-family:sans-serif;font-weight:700">🖨️ Cetak Surat</button>
  <button onclick="window.close()" style="background:#64748b;color:#fff;border:none;padding:12px 32px;font-size:15px;border-radius:10px;cursor:pointer;font-family:sans-serif;font-weight:700">✕ Tutup</button>
</div>
</body>
</html>`;
};

export const printSurat = (surat: Surat, dataDesa: DataDesa) => {
  const html = generateSuratHTML(surat, dataDesa);
  const win = window.open('', '_blank', 'width=900,height=750');
  if (win) { win.document.write(html); win.document.close(); }
};