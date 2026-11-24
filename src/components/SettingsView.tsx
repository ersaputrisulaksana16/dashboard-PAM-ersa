import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { 
  Sliders, 
  RotateCcw, 
  Download, 
  BookOpen, 
  ShieldCheck, 
  Bell, 
  Save, 
  CheckCircle,
  Database
} from 'lucide-react';

interface SettingsViewProps {
  profile: StudentProfile;
  onUpdateProfile: (updated: Partial<StudentProfile>) => void;
  onResetData: () => void;
  tasksCount: number;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  profile,
  onUpdateProfile,
  onResetData,
  tasksCount
}) => {
  const [courseName, setCourseName] = useState(profile.courseName || 'Pengembangan Aplikasi Website');
  const [university, setUniversity] = useState(profile.university || 'Universitas Pembangunan Nasional');
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      courseName,
      university
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const exportDataJson = () => {
    const data = {
      profile,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `paw_portfolio_backup_${profile.name.toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div id="settings-view" className="space-y-8 max-w-4xl mx-auto animate-in fade-in-50 duration-300">
      <div>
        <h1 className="font-geist text-[32px] md:text-[36px] font-bold text-[#480e1a] tracking-tight mb-1">
          Pengaturan Aplikasi
        </h1>
        <p className="text-[16px] text-[#534344]">
          Kelola preferensi mata kuliah, backup data tugas, dan reset portofolio.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-[#E6F4EA] text-[#137333] rounded-xl text-[14px] font-semibold border border-[#137333]/30 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Pengaturan berhasil disimpan!
        </div>
      )}

      {/* Course Info Form */}
      <div className="bg-[#ffffff] rounded-2xl p-6 md:p-8 soft-shadow border border-[#dfd9d8] space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-[#ede7e6]">
          <BookOpen className="w-5 h-5 text-[#64242f]" />
          <h2 className="font-geist text-[18px] font-bold text-[#1d1b1b]">
            Informasi Akademik &amp; Perkuliahan
          </h2>
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-geist text-[13px] font-semibold text-[#1d1b1b]">
                Nama Mata Kuliah
              </label>
              <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="px-4 py-2.5 bg-[#fef8f7] border border-[#dfd9d8] rounded-lg text-[14px] text-[#1d1b1b] focus:border-[#64242f] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-geist text-[13px] font-semibold text-[#1d1b1b]">
                Institusi / Universitas
              </label>
              <input
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="px-4 py-2.5 bg-[#fef8f7] border border-[#dfd9d8] rounded-lg text-[14px] text-[#1d1b1b] focus:border-[#64242f] focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="bg-[#64242f] text-white px-5 py-2.5 rounded-lg font-geist text-[13px] font-semibold hover:bg-[#480e1a] transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </form>
      </div>

      {/* Data Backup & Reset */}
      <div className="bg-[#ffffff] rounded-2xl p-6 md:p-8 soft-shadow border border-[#dfd9d8] space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-[#ede7e6]">
          <Database className="w-5 h-5 text-[#64242f]" />
          <h2 className="font-geist text-[18px] font-bold text-[#1d1b1b]">
            Manajemen Data &amp; Portofolio
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#f9f2f1] rounded-xl border border-[#d8c1c2]/50 flex flex-col justify-between gap-4">
            <div>
              <h3 className="font-geist text-[15px] font-bold text-[#1d1b1b] mb-1">
                Ekspor Data Portofolio
              </h3>
              <p className="text-[13px] text-[#534344]">
                Download salinan arsip data tugas dan profil mahasiswa ke dalam file format JSON.
              </p>
            </div>
            <button
              type="button"
              onClick={exportDataJson}
              className="px-4 py-2 bg-[#ffffff] border border-[#64242f] text-[#64242f] hover:bg-[#ede7e6] rounded-lg text-[13px] font-semibold transition-colors flex items-center justify-center gap-2 w-full"
            >
              <Download className="w-4 h-4" />
              <span>Ekspor JSON</span>
            </button>
          </div>

          <div className="p-4 bg-[#ffdad6]/30 rounded-xl border border-[#ba1a1a]/20 flex flex-col justify-between gap-4">
            <div>
              <h3 className="font-geist text-[15px] font-bold text-[#ba1a1a] mb-1">
                Reset Demo Data
              </h3>
              <p className="text-[13px] text-[#534344]">
                Kembalikan semua daftar tugas dan nilai ke data awal tugas perkuliahan semester ini.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Apakah Anda yakin ingin me-reset data ke kondisi awal?')) {
                  onResetData();
                  alert('Data tugas dan profil telah direset ke setelan awal.');
                }
              }}
              className="px-4 py-2 bg-[#ba1a1a] text-white hover:bg-[#93000a] rounded-lg text-[13px] font-semibold transition-colors flex items-center justify-center gap-2 w-full"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Data Awal</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
