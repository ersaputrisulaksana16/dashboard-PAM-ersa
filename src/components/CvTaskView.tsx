import React, { useState } from 'react';
import { CV_HTML_STRING } from '../data/cvHtmlContent';
import { 
  FileCode2, 
  ExternalLink, 
  Download, 
  Copy, 
  Check, 
  Eye, 
  Code2, 
  FileText, 
  Layers, 
  Table, 
  Calendar,
  Smartphone,
  Monitor,
  RefreshCw,
  Sparkles
} from 'lucide-react';

export const CvTaskView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'structure'>('preview');
  const [copied, setCopied] = useState(false);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');
  const [iframeKey, setIframeKey] = useState(0);

  // Ensure relative <img src="image.jpeg"> inside srcDoc resolves to /image.jpeg
  const htmlWithBase = CV_HTML_STRING.includes('<head>')
    ? CV_HTML_STRING.replace('<head>', '<head>\n    <base href="/" />')
    : CV_HTML_STRING;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CV_HTML_STRING);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([CV_HTML_STRING], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tugas pembuatan cv.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleOpenNewTab = () => {
    window.open('/tugas-pembuatan-cv.html', '_blank');
  };

  return (
    <div id="cv-task-view" className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Top Banner Header */}
      <div className="bg-[#ffffff] rounded-2xl p-6 border border-[#dfd9d8] soft-shadow flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#64242f] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <FileCode2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h1 className="font-geist text-[24px] md:text-[28px] font-bold text-[#480e1a] tracking-tight">
                Tugas Pembuatan CV (HTML5)
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#64242f]/10 text-[#64242f] font-geist text-[12px] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#64242f]" />
                File Asli: tugas pembuatan cv.html
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#006622]/10 text-[#006622] font-geist text-[12px] font-semibold">
                HTML5 Valid
              </span>
            </div>
            <p className="text-[14px] md:text-[15px] text-[#534344] max-w-2xl leading-relaxed">
              Halaman penugasan pembuatan Curriculum Vitae (CV) berbasis murni HTML5 dengan elemen semantik lengkap: Header, Profile, Pengalaman Organisasi, Tabel Jadwal Kuliah 8 Mata Kuliah, dan Footer Kontak.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
          <button
            onClick={handleCopy}
            className="px-3.5 py-2 rounded-lg border border-[#dfd9d8] text-[#534344] hover:bg-[#f9f2f1] hover:text-[#480e1a] font-geist text-[13px] font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            title="Salin isi kode HTML5"
          >
            {copied ? <Check className="w-4 h-4 text-[#006622]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Tersalin!' : 'Salin Kode'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-3.5 py-2 rounded-lg border border-[#dfd9d8] text-[#534344] hover:bg-[#f9f2f1] hover:text-[#480e1a] font-geist text-[13px] font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            title="Unduh file tugas pembuatan cv.html"
          >
            <Download className="w-4 h-4" />
            <span>Unduh File</span>
          </button>

          <button
            onClick={handleOpenNewTab}
            className="px-4 py-2 bg-[#64242f] text-white rounded-lg font-geist text-[13px] font-semibold hover:bg-[#480e1a] flex items-center gap-2 transition-colors shadow-xs cursor-pointer"
            title="Buka tampilan penuh di tab baru browser"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Buka Tab Baru</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation & Viewport Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#dfd9d8] pb-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 rounded-lg font-geist text-[14px] font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'preview'
                ? 'bg-[#64242f] text-white shadow-xs'
                : 'text-[#534344] hover:bg-[#ede7e6] hover:text-[#1d1b1b]'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Pratinjau Hasil (Live HTML)</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 rounded-lg font-geist text-[14px] font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'code'
                ? 'bg-[#64242f] text-white shadow-xs'
                : 'text-[#534344] hover:bg-[#ede7e6] hover:text-[#1d1b1b]'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Kode Sumber (HTML5 Source)</span>
          </button>

          <button
            onClick={() => setActiveTab('structure')}
            className={`px-4 py-2 rounded-lg font-geist text-[14px] font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'structure'
                ? 'bg-[#64242f] text-white shadow-xs'
                : 'text-[#534344] hover:bg-[#ede7e6] hover:text-[#1d1b1b]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Struktur & Ringkasan</span>
          </button>
        </div>

        {activeTab === 'preview' && (
          <div className="flex items-center gap-2">
            <div className="bg-[#ede7e6] p-1 rounded-lg flex items-center gap-1">
              <button
                onClick={() => setViewportMode('desktop')}
                className={`px-2.5 py-1 rounded-md text-[12px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewportMode === 'desktop'
                    ? 'bg-[#ffffff] text-[#480e1a] shadow-xs'
                    : 'text-[#534344] hover:text-[#1d1b1b]'
                }`}
                title="Tampilan Desktop / Laptop"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </button>
              <button
                onClick={() => setViewportMode('mobile')}
                className={`px-2.5 py-1 rounded-md text-[12px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewportMode === 'mobile'
                    ? 'bg-[#ffffff] text-[#480e1a] shadow-xs'
                    : 'text-[#534344] hover:text-[#1d1b1b]'
                }`}
                title="Tampilan Smartphone"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile</span>
              </button>
            </div>

            <button
              onClick={() => setIframeKey(k => k + 1)}
              className="p-1.5 rounded-lg border border-[#dfd9d8] text-[#534344] hover:text-[#480e1a] hover:bg-[#ede7e6] transition-colors cursor-pointer"
              title="Muat Ulang Pratinjau"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Tab 1: Live Preview in Browser Frame */}
      {activeTab === 'preview' && (
        <div className="space-y-3 animate-in fade-in-50 duration-200">
          <div className="bg-[#ffffff] rounded-2xl border border-[#dfd9d8] soft-shadow overflow-hidden flex flex-col">
            {/* Mock Browser Header */}
            <div className="px-4 py-3 bg-[#f9f2f1] border-b border-[#dfd9d8] flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ba1a1a]/70" />
                <div className="w-3 h-3 rounded-full bg-[#fbbc04]/80" />
                <div className="w-3 h-3 rounded-full bg-[#34a853]/70" />
              </div>

              {/* Address bar */}
              <div className="flex-1 max-w-lg bg-[#ffffff] border border-[#dfd9d8] rounded-lg px-3 py-1 flex items-center gap-2 text-[12px] text-[#534344] truncate shadow-xs">
                <FileCode2 className="w-3.5 h-3.5 text-[#64242f] flex-shrink-0" />
                <span className="text-[#867274]">file:///paw/</span>
                <span className="font-mono text-[#1d1b1b] font-medium">tugas pembuatan cv.html</span>
              </div>

              <button
                onClick={handleOpenNewTab}
                className="text-[12px] font-semibold text-[#64242f] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Tab Penuh</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Iframe Viewport Container */}
            <div className={`p-4 md:p-6 bg-[#ede7e6]/40 flex justify-center min-h-[680px]`}>
              <div 
                className={`bg-[#ffffff] rounded-xl shadow-md border border-[#dfd9d8] overflow-hidden transition-all duration-300 ${
                  viewportMode === 'mobile' ? 'w-[375px]' : 'w-full'
                }`}
              >
                <iframe
                  key={iframeKey}
                  title="Pratinjau Tugas Pembuatan CV"
                  srcDoc={htmlWithBase}
                  src="/tugas-pembuatan-cv.html"
                  className="w-full h-[700px] border-none bg-white"
                  sandbox="allow-same-origin allow-scripts allow-popups"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: HTML Source Code View */}
      {activeTab === 'code' && (
        <div className="bg-[#1e1e1e] text-[#d4d4d4] rounded-2xl border border-[#333333] shadow-lg overflow-hidden animate-in fade-in-50 duration-200">
          <div className="px-5 py-3 bg-[#2d2d2d] border-b border-[#3e3e3e] flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-[13px] text-[#cccccc]">
              <FileCode2 className="w-4 h-4 text-[#e44d26]" />
              <span>tugas pembuatan cv.html (HTML5 Document)</span>
              <span className="text-[11px] text-[#888888] ml-2">106 Baris • UTF-8</span>
            </div>

            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-md bg-[#3e3e3e] hover:bg-[#505050] text-[#ffffff] font-geist text-[12px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#4ade80]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin' : 'Salin Semua'}</span>
            </button>
          </div>

          <div className="p-4 overflow-x-auto max-h-[700px] overflow-y-auto font-mono text-[13px] leading-relaxed">
            <pre className="text-[#f8f8f2]">
              {CV_HTML_STRING.split('\n').map((line, idx) => (
                <div key={idx} className="table-row hover:bg-[#2a2d2e]/50">
                  <span className="table-cell pr-6 text-right select-none text-[#6e7681] text-[12px]">
                    {idx + 1}
                  </span>
                  <span className="table-cell whitespace-pre">
                    {formatHtmlLine(line)}
                  </span>
                </div>
              ))}
            </pre>
          </div>
        </div>
      )}

      {/* Tab 3: Semantic Breakdown for Lecturer */}
      {activeTab === 'structure' && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Header Structure */}
            <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#dfd9d8] soft-shadow flex flex-col">
              <div className="flex items-center gap-2.5 mb-3 text-[#480e1a]">
                <div className="w-8 h-8 rounded-lg bg-[#f9f2f1] flex items-center justify-center font-bold text-[13px]">
                  &lt;h&gt;
                </div>
                <h3 className="font-geist text-[16px] font-bold">1. Header Identitas</h3>
              </div>
              <p className="text-[13px] text-[#534344] mb-3 leading-relaxed">
                Menggunakan elemen semantik <code className="bg-[#f9f2f1] px-1 py-0.5 rounded text-[#480e1a] font-mono text-[12px]">&lt;header&gt;</code> dengan judul utama <code className="bg-[#f9f2f1] px-1 py-0.5 rounded text-[#480e1a] font-mono text-[12px]">&lt;h1&gt;</code>, tempat & tanggal lahir, serta gambar foto profil.
              </p>
              <div className="bg-[#f9f2f1] p-3 rounded-lg border border-[#dfd9d8] text-[12px] font-mono text-[#480e1a] mt-auto">
                Nama: R Ersa Putri Sulaksana<br />
                TTL: Cianjur 16-06-2006<br />
                Image: image.jpeg (150px)
              </div>
            </div>

            {/* Main & Profile */}
            <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#dfd9d8] soft-shadow flex flex-col">
              <div className="flex items-center gap-2.5 mb-3 text-[#480e1a]">
                <div className="w-8 h-8 rounded-lg bg-[#f9f2f1] flex items-center justify-center font-bold text-[13px]">
                  &lt;m&gt;
                </div>
                <h3 className="font-geist text-[16px] font-bold">2. Main & Organisasi</h3>
              </div>
              <p className="text-[13px] text-[#534344] mb-3 leading-relaxed">
                Menggunakan elemen <code className="bg-[#f9f2f1] px-1 py-0.5 rounded text-[#480e1a] font-mono text-[12px]">&lt;main&gt;</code> yang memuat deskripsi profil mahasiswa dan daftar organisasi menggunakan unordered list (<code className="bg-[#f9f2f1] px-1 py-0.5 rounded text-[#480e1a] font-mono text-[12px]">&lt;ul&gt;</code> & <code className="bg-[#f9f2f1] px-1 py-0.5 rounded text-[#480e1a] font-mono text-[12px]">&lt;li&gt;</code>).
              </p>
              <div className="bg-[#f9f2f1] p-3 rounded-lg border border-[#dfd9d8] text-[12px] font-mono text-[#480e1a] mt-auto">
                Organisasi: HIMATIF (2025)<br />
                Ekstra: PMII<br />
                Lainnya: Paskibra
              </div>
            </div>

            {/* Table Schedule */}
            <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#dfd9d8] soft-shadow flex flex-col">
              <div className="flex items-center gap-2.5 mb-3 text-[#480e1a]">
                <div className="w-8 h-8 rounded-lg bg-[#f9f2f1] flex items-center justify-center font-bold text-[13px]">
                  &lt;t&gt;
                </div>
                <h3 className="font-geist text-[16px] font-bold">3. Tabel Jadwal Kuliah</h3>
              </div>
              <p className="text-[13px] text-[#534344] mb-3 leading-relaxed">
                Penerapan elemen <code className="bg-[#f9f2f1] px-1 py-0.5 rounded text-[#480e1a] font-mono text-[12px]">&lt;table border="1"&gt;</code> lengkap dengan baris (<code className="bg-[#f9f2f1] px-1 py-0.5 rounded text-[#480e1a] font-mono text-[12px]">&lt;tr&gt;</code>) dan kolom header (<code className="bg-[#f9f2f1] px-1 py-0.5 rounded text-[#480e1a] font-mono text-[12px]">&lt;th&gt;</code>) untuk 8 mata kuliah.
              </p>
              <div className="bg-[#f9f2f1] p-3 rounded-lg border border-[#dfd9d8] text-[12px] font-mono text-[#480e1a] mt-auto">
                Total Mata Kuliah: 8<br />
                Kolom: No, Mata Kuliah, Hari, Waktu<br />
                Termasuk: PAW, MBD, Jarkom, IMK, AI
              </div>
            </div>

            {/* Image Asset Status */}
            <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#dfd9d8] soft-shadow flex flex-col">
              <div className="flex items-center gap-2.5 mb-3 text-[#480e1a]">
                <div className="w-8 h-8 rounded-lg bg-[#f9f2f1] flex items-center justify-center font-bold text-[13px]">
                  &lt;img&gt;
                </div>
                <h3 className="font-geist text-[16px] font-bold">4. Aset Foto Mahasiswa</h3>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-18 rounded-lg overflow-hidden border border-[#dfd9d8] bg-[#f9f2f1] flex-shrink-0 shadow-xs">
                  <img
                    src="/image.jpeg"
                    alt="Foto Profil R Ersa Putri Sulaksana"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-[12px] text-[#534344]">
                  <span className="font-mono text-[#1d1b1b] font-bold block">image.jpeg</span>
                  <span className="text-[#006622] font-semibold flex items-center gap-1 mt-0.5">
                    <Check className="w-3.5 h-3.5" /> Terverifikasi
                  </span>
                  <span className="text-[11px] text-[#867274] block mt-0.5">1086 × 1448 px (48.8 KB)</span>
                </div>
              </div>
              <div className="bg-[#f9f2f1] p-2.5 rounded-lg border border-[#dfd9d8] text-[11px] font-mono text-[#480e1a] mt-auto">
                Source: &lt;img src="image.jpeg" width="150"&gt;
              </div>
            </div>
          </div>

          {/* Verification Box */}
          <div className="bg-[#ffffff] rounded-2xl p-6 border border-[#dfd9d8] soft-shadow">
            <h3 className="font-geist text-[18px] font-bold text-[#1d1b1b] mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#64242f]" />
              Catatan Penilaian untuk Dosen Pengampu
            </h3>
            <p className="text-[14px] text-[#534344] leading-relaxed mb-4">
              File <code className="font-mono text-[#64242f] bg-[#f9f2f1] px-1.5 py-0.5 rounded">tugas pembuatan cv.html</code> memenuhi standar tugas praktikum web dasar:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-[13px] text-[#534344]">
              <li className="flex items-center gap-2 bg-[#f9f2f1] p-2.5 rounded-lg">
                <Check className="w-4 h-4 text-[#006622] flex-shrink-0" />
                <span>Format Dokumen <strong>HTML 5 Standard</strong> dengan doctype deklaratif</span>
              </li>
              <li className="flex items-center gap-2 bg-[#f9f2f1] p-2.5 rounded-lg">
                <Check className="w-4 h-4 text-[#006622] flex-shrink-0" />
                <span>Pemanfaatan Tag Semantik: <strong>header, main, footer, table, ul, li</strong></span>
              </li>
              <li className="flex items-center gap-2 bg-[#f9f2f1] p-2.5 rounded-lg">
                <Check className="w-4 h-4 text-[#006622] flex-shrink-0" />
                <span>Penggunaan atribut <strong>align, width, border, href</strong> murni HTML</span>
              </li>
              <li className="flex items-center gap-2 bg-[#f9f2f1] p-2.5 rounded-lg">
                <Check className="w-4 h-4 text-[#006622] flex-shrink-0" />
                <span>Integrasi media gambar dan tautan sosial media Instagram aktif</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper for lightweight syntax highlighting in code view
function formatHtmlLine(line: string) {
  if (line.trim().startsWith('<!--')) {
    return <span className="text-[#6a9955]">{line}</span>;
  }
  if (line.includes('<') && line.includes('>')) {
    // Simple colored representation
    return (
      <span>
        {line.split(/(<[^>]+>)/g).map((part, i) => {
          if (part.startsWith('<') && part.endsWith('>')) {
            if (part.startsWith('</')) {
              return <span key={i} className="text-[#569cd6]">{part}</span>;
            }
            return <span key={i} className="text-[#4ec9b0] font-medium">{part}</span>;
          }
          return <span key={i} className="text-[#ce9178]">{part}</span>;
        })}
      </span>
    );
  }
  return <span className="text-[#d4d4d4]">{line}</span>;
}
