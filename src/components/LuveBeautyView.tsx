import React, { useState } from 'react';
import {
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Globe,
  Smartphone,
  Monitor,
  RefreshCw,
  Eye
} from 'lucide-react';

const LUVE_BEAUTY_URL = 'https://luve-beauty-ten.vercel.app/';

export const LuveBeautyView: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');
  const [iframeKey, setIframeKey] = useState(0);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(LUVE_BEAUTY_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL', err);
    }
  };

  return (
    <div id="luve-beauty-view" className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Top Banner Header (matching CvTaskView) */}
      <div className="bg-[#ffffff] rounded-2xl p-6 border border-[#dfd9d8] soft-shadow flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#64242f] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h1 className="font-geist text-[24px] md:text-[28px] font-bold text-[#480e1a] tracking-tight">
                Luve Beauty
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#64242f]/10 text-[#64242f] font-geist text-[12px] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#64242f]" />
                Aplikasi Cabang
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#006622]/10 text-[#006622] font-geist text-[12px] font-semibold">
                Vercel Live
              </span>
            </div>
            <p className="text-[14px] md:text-[15px] text-[#534344] max-w-2xl leading-relaxed">
              Aplikasi cabang proyek web <strong>Luve Beauty</strong> yang terhubung langsung dengan deployment aktif di Vercel. Anda dapat mencoba tampilan dan interaksinya secara langsung di bawah ini atau membukanya di tab baru.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
          <button
            type="button"
            onClick={handleCopyUrl}
            className="px-3.5 py-2 rounded-lg border border-[#dfd9d8] text-[#534344] hover:bg-[#f9f2f1] hover:text-[#480e1a] font-geist text-[13px] font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            title="Salin URL Luve Beauty"
          >
            {copied ? <Check className="w-4 h-4 text-[#006622]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'URL Tersalin!' : 'Salin URL'}</span>
          </button>

          <a
            href={LUVE_BEAUTY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#64242f] text-white rounded-lg font-geist text-[13px] font-semibold hover:bg-[#480e1a] flex items-center gap-2 transition-colors shadow-xs cursor-pointer"
            title="Buka aplikasi Luve Beauty di tab baru browser"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Buka di Tab Baru</span>
          </a>
        </div>
      </div>

      {/* Preview Header & Viewport Toggle (matching CvTaskView) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#dfd9d8] pb-2">
        <div className="flex items-center gap-2">
          <div className="px-4 py-2 rounded-lg font-geist text-[14px] font-semibold flex items-center gap-2 bg-[#64242f] text-white shadow-xs">
            <Eye className="w-4 h-4" />
            <span>Pratinjau Aplikasi (Live Preview)</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-[#ede7e6] p-1 rounded-lg flex items-center gap-1">
            <button
              type="button"
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
              type="button"
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
            type="button"
            onClick={() => setIframeKey((k) => k + 1)}
            className="p-1.5 rounded-lg border border-[#dfd9d8] text-[#534344] hover:text-[#480e1a] hover:bg-[#ede7e6] transition-colors cursor-pointer"
            title="Muat Ulang Pratinjau"
            aria-label="Muat Ulang Pratinjau"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Live Preview in Browser Frame */}
      <div className="space-y-3 animate-in fade-in-50 duration-200">
        <div className="bg-[#ffffff] rounded-2xl border border-[#dfd9d8] soft-shadow overflow-hidden flex flex-col">
          {/* Mock Browser Header */}
          <div className="px-4 py-3 bg-[#f9f2f1] border-b border-[#dfd9d8] flex items-center justify-between gap-3">
            <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-[#ba1a1a]/70" />
              <div className="w-3 h-3 rounded-full bg-[#fbbc04]/80" />
              <div className="w-3 h-3 rounded-full bg-[#34a853]/70" />
            </div>

            {/* Address bar */}
            <div className="flex-1 min-w-0 max-w-xl bg-[#ffffff] border border-[#dfd9d8] rounded-lg px-3 py-1.5 flex items-center gap-2 text-[12px] text-[#534344] shadow-xs">
              <Globe className="w-3.5 h-3.5 text-[#64242f] flex-shrink-0" />
              <span className="font-mono text-[#1d1b1b] font-medium truncate">
                {LUVE_BEAUTY_URL}
              </span>
            </div>

            <a
              href={LUVE_BEAUTY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-semibold text-[#64242f] hover:underline flex items-center gap-1 flex-shrink-0"
            >
              <span>Tab Penuh</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Iframe Viewport Container */}
          <div className="p-3 sm:p-4 md:p-6 bg-[#ede7e6]/40 flex justify-center min-h-[680px]">
            <div
              className={`bg-[#ffffff] rounded-xl shadow-md border border-[#dfd9d8] overflow-hidden transition-all duration-300 max-w-full ${
                viewportMode === 'mobile' ? 'w-[375px]' : 'w-full'
              }`}
            >
              <iframe
                key={iframeKey}
                title="Pratinjau Aplikasi Luve Beauty"
                src={LUVE_BEAUTY_URL}
                className="w-full h-[650px] md:h-[720px] border-none bg-white"
                loading="lazy"
                allow="clipboard-read; clipboard-write"
              />
            </div>
          </div>

          {/* Fallback note footer */}
          <div className="px-4 py-3 bg-[#f9f2f1] border-t border-[#dfd9d8] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[12px] text-[#534344]">
            <span>
              Jika tampilan pratinjau tidak termuat penuh di browser Anda, gunakan tombol di samping untuk membuka aplikasi langsung.
            </span>
            <a
              href={LUVE_BEAUTY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-geist font-semibold text-[#64242f] hover:underline inline-flex items-center gap-1 flex-shrink-0"
            >
              <span>Buka di Tab Baru</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
