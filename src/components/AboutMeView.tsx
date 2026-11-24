import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { 
  Edit3, 
  Terminal, 
  Wrench, 
  Plus, 
  Mail, 
  Camera, 
  Award, 
  FolderGit2, 
  Check, 
  X,
  Copy
} from 'lucide-react';

interface AboutMeViewProps {
  profile: StudentProfile;
  onEditProfile: () => void;
  onAddSkill: (skill: string) => void;
  onRemoveSkill: (skill: string) => void;
}

export const AboutMeView: React.FC<AboutMeViewProps> = ({
  profile,
  onEditProfile,
  onAddSkill,
  onRemoveSkill
}) => {
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkillText, setNewSkillText] = useState('');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const handleAddSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkillText.trim()) {
      onAddSkill(newSkillText.trim());
      setNewSkillText('');
      setIsAddingSkill(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(label);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <div id="about-me-view" className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-geist text-[32px] md:text-[40px] font-bold text-[#480e1a] tracking-tight mb-1">
            Student Profile
          </h1>
          <p className="text-[16px] md:text-[18px] text-[#534344]">
            Manage your personal information and portfolio details.
          </p>
        </div>

        <button
          id="btn-edit-profile-header"
          onClick={onEditProfile}
          className="bg-[#64242f] text-white px-5 py-2.5 rounded-lg font-geist text-[14px] font-semibold hover:bg-[#480e1a] transition-colors flex items-center justify-center gap-2 soft-shadow w-full md:w-auto cursor-pointer"
        >
          <Edit3 className="w-4 h-4" />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Profile Card (8 Cols) */}
        <div className="lg:col-span-8 bg-[#ffffff] rounded-2xl p-6 md:p-8 soft-shadow border border-[#dfd9d8] flex flex-col md:flex-row gap-8 items-start card-hover">
          {/* Avatar Column */}
          <div className="flex flex-col items-center gap-4 w-full md:w-auto flex-shrink-0">
            <div 
              onClick={onEditProfile}
              className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-[#ffffff] shadow-md ring-2 ring-[#64242f]/20 group cursor-pointer"
              title="Ganti Foto Profil"
            >
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>

            <span className="bg-[#a5393c]/10 text-[#a5393c] font-geist text-[12px] font-bold px-3.5 py-1 rounded-full border border-[#a5393c]/20">
              {profile.statusTag || 'Active Student'}
            </span>
          </div>

          {/* Info Column */}
          <div className="flex flex-col gap-4 flex-grow">
            <div>
              <h2 className="font-geist text-[32px] md:text-[38px] font-bold text-[#1d1b1b] tracking-tight mb-1">
                {profile.name}
              </h2>
              <div className="flex items-center gap-2 text-[#480e1a]">
                <Terminal className="w-5 h-5" />
                <span className="font-geist text-[18px] font-semibold">
                  {profile.role}
                </span>
              </div>
            </div>

            <div className="w-12 h-1 bg-[#64242f] rounded-full my-1" />

            <div className="text-[15px] md:text-[16px] text-[#534344] leading-relaxed">
              <p>{profile.bio}</p>
            </div>

            {/* Stats Inside Profile */}
            <div className="flex gap-8 mt-2 pt-4 border-t border-[#dfd9d8]">
              <div>
                <span className="block font-geist text-[24px] font-bold text-[#1d1b1b]">
                  {profile.projectsCount}
                </span>
                <span className="font-geist text-[12px] font-semibold text-[#534344] uppercase tracking-wider">
                  Projects
                </span>
              </div>

              <div>
                <span className="block font-geist text-[24px] font-bold text-[#1d1b1b]">
                  {profile.certificatesCount}
                </span>
                <span className="font-geist text-[12px] font-semibold text-[#534344] uppercase tracking-wider">
                  Certificates
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Core Skills Card */}
          <div className="bg-[#ffffff] rounded-2xl p-6 soft-shadow border border-[#dfd9d8] card-hover">
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="w-5 h-5 text-[#64242f]" />
              <h3 className="font-geist text-[20px] font-bold text-[#1d1b1b]">
                Core Skills
              </h3>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-[#ede7e6] border border-[#d8c1c2] text-[#1d1b1b] px-3.5 py-1.5 rounded-lg font-geist text-[13px] font-medium hover:border-[#64242f] hover:text-[#64242f] cursor-default transition-colors flex items-center gap-1.5 group"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => onRemoveSkill(skill)}
                    className="opacity-0 group-hover:opacity-100 hover:text-[#ba1a1a] transition-opacity"
                    title="Hapus skill"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {isAddingSkill ? (
                <form onSubmit={handleAddSkillSubmit} className="flex items-center gap-1">
                  <input
                    type="text"
                    autoFocus
                    value={newSkillText}
                    onChange={(e) => setNewSkillText(e.target.value)}
                    placeholder="Nama skill..."
                    className="px-2.5 py-1 bg-[#fef8f7] border border-[#64242f] rounded-lg text-[13px] text-[#1d1b1b] focus:outline-none w-28"
                  />
                  <button
                    type="submit"
                    className="p-1 bg-[#64242f] text-white rounded-md hover:bg-[#480e1a]"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingSkill(false)}
                    className="p-1 text-[#534344] hover:text-[#ba1a1a]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <button
                  id="btn-add-skill-tag"
                  onClick={() => setIsAddingSkill(true)}
                  className="bg-[#f9f2f1] border border-dashed border-[#867274] text-[#534344] px-3.5 py-1.5 rounded-lg font-geist text-[13px] font-medium cursor-pointer hover:bg-[#ede7e6] hover:text-[#480e1a] transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Skill</span>
                </button>
              )}
            </div>
          </div>

          {/* Let's Connect Card */}
          <div className="bg-[#480e1a] border border-[#64242f] rounded-2xl p-6 soft-shadow card-hover relative overflow-hidden text-white">
            {/* Decorative background glow */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#64242f] rounded-full opacity-60 blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <h3 className="font-geist text-[22px] font-bold text-white mb-1">
                Let's Connect
              </h3>
              <p className="text-[14px] text-[#ffb2ba] mb-6 opacity-90">
                Always open to discussing web dev projects or opportunities.
              </p>

              <div className="flex flex-col gap-2.5">
                {/* Email */}
                <div className="flex items-center justify-between text-white hover:text-[#ffd9dc] bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-all group">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-3 flex-1 overflow-hidden"
                  >
                    <Mail className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform text-[#ffb2ba]" />
                    <span className="font-geist text-[13px] font-medium truncate">
                      {profile.email}
                    </span>
                  </a>
                  <button
                    onClick={() => copyToClipboard(profile.email, 'email')}
                    className="p-1 hover:text-white text-[#ffb2ba] ml-1 flex-shrink-0"
                    title="Salin Email"
                  >
                    {copiedLink === 'email' ? (
                      <Check className="w-3.5 h-3.5 text-green-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* GitHub */}
                <div className="flex items-center justify-between text-white hover:text-[#ffd9dc] bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-all group">
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 flex-1 overflow-hidden"
                  >
                    <FolderGit2 className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform text-[#ffb2ba]" />
                      <span className="font-geist text-[13px] font-medium truncate">
                        {profile.githubUrl.replace(/^https?:\/\//, '')}
                      </span>
                    </a>
                    <button
                      onClick={() => copyToClipboard(profile.githubUrl, 'github')}
                      className="p-1 hover:text-white text-[#ffb2ba] ml-1 flex-shrink-0"
                      title="Salin Link GitHub"
                    >
                      {copiedLink === 'github' ? (
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Social / LinkedIn */}
                  <div className="flex items-center justify-between text-white hover:text-[#ffd9dc] bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-all group">
                    <a
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 flex-1 overflow-hidden"
                    >
                      <svg className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform fill-[#ffb2ba]" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      <span className="font-geist text-[13px] font-medium truncate">
                        {profile.linkedinUrl.replace(/^https?:\/\//, '')}
                      </span>
                  </a>
                  <button
                    onClick={() => copyToClipboard(profile.linkedinUrl, 'linkedin')}
                    className="p-1 hover:text-white text-[#ffb2ba] ml-1 flex-shrink-0"
                    title="Salin Link LinkedIn"
                  >
                    {copiedLink === 'linkedin' ? (
                      <Check className="w-3.5 h-3.5 text-green-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Teknologi & Arsitektur Website (F1 & F2) */}
      <section className="bg-[#ffffff] rounded-2xl p-6 md:p-8 soft-shadow border border-[#dfd9d8] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#ede7e6]">
          <div className="flex items-center gap-2.5">
            <Terminal className="w-5 h-5 text-[#64242f]" />
            <h3 className="font-geist text-[20px] font-bold text-[#1d1b1b]">
              Teknologi Website &amp; Peran Tools
            </h3>
          </div>
          <span className="text-[12px] font-mono text-[#64242f] bg-[#f9f2f1] px-2.5 py-1 rounded-md border border-[#d8c1c2] self-start sm:self-auto">
            {import.meta.env.VITE_APP_NAME || 'PAW Dashboard'} v{import.meta.env.VITE_APP_VERSION || '1.0.0'}
          </span>
        </div>

        <div className="space-y-3 text-[14px] md:text-[15px] text-[#534344] leading-relaxed">
          <p>
            Website pengelola daftar tugas kuliah ini dibangun dengan ekosistem frontend modern.{' '}
            <strong className="text-[#1d1b1b]">Git</strong> digunakan untuk mencatat riwayat perubahan kode melalui commit, memisahkan pengembangan fitur pada branch, menyelesaikan merge conflict, serta berkolaborasi lewat Pull Request di GitHub.{' '}
            <strong className="text-[#1d1b1b]">npm</strong> berperan sebagai package manager untuk mengelola dependensi di{' '}
            <code className="bg-[#f9f2f1] px-1.5 py-0.5 rounded text-[#480e1a] text-[13px]">package.json</code>{' '}
            dan menjalankan skrip build.
          </p>
          <p>
            <strong className="text-[#1d1b1b]">TypeScript</strong> menambahkan pemeriksaan tipe statis (primitive, array, interface, union type, dan generics) agar bug terdeteksi lebih awal. Karena browser hanya menjalankan JavaScript, proses pengembangan melibatkan{' '}
            <strong className="text-[#1d1b1b]">compiler</strong> (<code className="bg-[#f9f2f1] px-1.5 py-0.5 rounded text-[#480e1a] text-[13px]">tsc --noEmit</code> untuk validasi tipe) dan{' '}
            <strong className="text-[#1d1b1b]">transpiler</strong> (menerjemahkan kode TypeScript/TSX menjadi JavaScript standar).
          </p>
          <p>
            <strong className="text-[#1d1b1b]">Vite</strong> bertindak sebagai dev server cepat sekaligus{' '}
            <strong className="text-[#1d1b1b]">bundler</strong> produksi (Rollup) yang menggabungkan dan mengoptimasi modul HTML, CSS, serta JavaScript. Konfigurasi non-rahasia seperti nama dan versi aplikasi dipisahkan melalui{' '}
            <strong className="text-[#1d1b1b]">environment variables</strong> (<code className="bg-[#f9f2f1] px-1.5 py-0.5 rounded text-[#480e1a] text-[13px]">.env</code> berawalan{' '}
            <code className="bg-[#f9f2f1] px-1.5 py-0.5 rounded text-[#480e1a] text-[13px]">VITE_</code>) tanpa menyisipkan API key atau password rahasia ke kode publik.
          </p>
        </div>
      </section>
    </div>
  );
};
