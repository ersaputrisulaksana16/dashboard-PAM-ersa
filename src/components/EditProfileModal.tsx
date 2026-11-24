import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { X, Save, User, Mail, Globe, Image as ImageIcon } from 'lucide-react';

interface EditProfileModalProps {
  profile: StudentProfile;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: StudentProfile) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  profile,
  isOpen,
  onClose,
  onSave
}) => {
  const [name, setName] = useState(profile.name);
  const [role, setRole] = useState(profile.role);
  const [nim, setNim] = useState(profile.nim);
  const [email, setEmail] = useState(profile.email);
  const [bio, setBio] = useState(profile.bio);
  const [githubUrl, setGithubUrl] = useState(profile.githubUrl);
  const [linkedinUrl, setLinkedinUrl] = useState(profile.linkedinUrl);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
  const [projectsCount, setProjectsCount] = useState(profile.projectsCount);
  const [certificatesCount, setCertificatesCount] = useState(profile.certificatesCount);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...profile,
      name: name.trim() || profile.name,
      role: role.trim() || profile.role,
      nim: nim.trim() || profile.nim,
      email: email.trim() || profile.email,
      bio: bio.trim() || profile.bio,
      githubUrl: githubUrl.trim() || profile.githubUrl,
      linkedinUrl: linkedinUrl.trim() || profile.linkedinUrl,
      avatarUrl: avatarUrl.trim() || profile.avatarUrl,
      projectsCount: Number(projectsCount) || profile.projectsCount,
      certificatesCount: Number(certificatesCount) || profile.certificatesCount
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in-50 duration-200">
      <div 
        className="bg-[#ffffff] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto soft-shadow border border-[#dfd9d8] relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-[#dfd9d8] flex items-center justify-between bg-[#fef8f7] rounded-t-2xl">
          <h2 className="font-geist text-[20px] font-bold text-[#480e1a]">
            Edit Student Profile
          </h2>
          <button
            onClick={onClose}
            className="text-[#534344] hover:text-[#1d1b1b] p-1.5 rounded-lg hover:bg-[#ede7e6] transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-geist text-[13px] font-semibold text-[#1d1b1b]">
                Nama Lengkap / Panggilan
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-3.5 py-2 bg-[#fef8f7] border border-[#dfd9d8] rounded-lg text-[14px] text-[#1d1b1b] focus:border-[#64242f] focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-geist text-[13px] font-semibold text-[#1d1b1b]">
                Status / Role
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="px-3.5 py-2 bg-[#fef8f7] border border-[#dfd9d8] rounded-lg text-[14px] text-[#1d1b1b] focus:border-[#64242f] focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-geist text-[13px] font-semibold text-[#1d1b1b]">
                NIM
              </label>
              <input
                type="text"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                className="px-3.5 py-2 bg-[#fef8f7] border border-[#dfd9d8] rounded-lg text-[14px] text-[#1d1b1b] focus:border-[#64242f] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-geist text-[13px] font-semibold text-[#1d1b1b]">
                Email Mahasiswa
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3.5 py-2 bg-[#fef8f7] border border-[#dfd9d8] rounded-lg text-[14px] text-[#1d1b1b] focus:border-[#64242f] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-geist text-[13px] font-semibold text-[#1d1b1b]">
              Avatar Image URL
            </label>
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="px-3.5 py-2 bg-[#fef8f7] border border-[#dfd9d8] rounded-lg text-[14px] text-[#1d1b1b] focus:border-[#64242f] focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-geist text-[13px] font-semibold text-[#1d1b1b]">
              Bio Mahasiswa
            </label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="px-3.5 py-2 bg-[#fef8f7] border border-[#dfd9d8] rounded-lg text-[14px] text-[#1d1b1b] focus:border-[#64242f] focus:outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-geist text-[13px] font-semibold text-[#1d1b1b]">
                GitHub URL
              </label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="px-3.5 py-2 bg-[#fef8f7] border border-[#dfd9d8] rounded-lg text-[14px] text-[#1d1b1b] focus:border-[#64242f] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-geist text-[13px] font-semibold text-[#1d1b1b]">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="px-3.5 py-2 bg-[#fef8f7] border border-[#dfd9d8] rounded-lg text-[14px] text-[#1d1b1b] focus:border-[#64242f] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-geist text-[13px] font-semibold text-[#1d1b1b]">
                Total Projects
              </label>
              <input
                type="number"
                value={projectsCount}
                onChange={(e) => setProjectsCount(Number(e.target.value))}
                className="px-3.5 py-2 bg-[#fef8f7] border border-[#dfd9d8] rounded-lg text-[14px] text-[#1d1b1b] focus:border-[#64242f] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-geist text-[13px] font-semibold text-[#1d1b1b]">
                Certificates
              </label>
              <input
                type="number"
                value={certificatesCount}
                onChange={(e) => setCertificatesCount(Number(e.target.value))}
                className="px-3.5 py-2 bg-[#fef8f7] border border-[#dfd9d8] rounded-lg text-[14px] text-[#1d1b1b] focus:border-[#64242f] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#dfd9d8]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#867274] text-[#534344] rounded-lg text-[13px] font-semibold hover:bg-[#ede7e6] transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#64242f] text-white rounded-lg text-[13px] font-semibold hover:bg-[#480e1a] transition-colors flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
