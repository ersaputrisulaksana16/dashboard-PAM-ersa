import React, { useState } from 'react';
import { PortfolioProject, TaskStatus } from '../types';
import { X, Plus, Sparkles, FolderKanban, Globe, Code2, Image as ImageIcon } from 'lucide-react';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Omit<PortfolioProject, 'id'>) => void;
  editingProject?: PortfolioProject | null;
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingProject
}) => {
  const [title, setTitle] = useState(editingProject?.title || '');
  const [weekNumber, setWeekNumber] = useState<number | string>(editingProject?.weekNumber || 1);
  const [description, setDescription] = useState(editingProject?.description || '');
  const [fullOverview, setFullOverview] = useState(editingProject?.fullOverview || '');
  const [status, setStatus] = useState<TaskStatus>(editingProject?.status || 'completed');
  const [imageUrl, setImageUrl] = useState(editingProject?.imageUrl || '');
  const [githubUrl, setGithubUrl] = useState(editingProject?.githubUrl || '');
  const [demoUrl, setDemoUrl] = useState(editingProject?.demoUrl || '');
  const [tags, setTags] = useState<string[]>(editingProject?.tags || ['HTML', 'CSS', 'JavaScript']);
  const [newTagInput, setNewTagInput] = useState('');
  const [highlights, setHighlights] = useState<string[]>(
    editingProject?.highlights || ['Mobile-first design', 'Clean semantic code']
  );
  const [newHighlightInput, setNewHighlightInput] = useState('');

  if (!isOpen) return null;

  const handleAddTag = () => {
    if (newTagInput.trim() && !tags.includes(newTagInput.trim())) {
      setTags([...tags, newTagInput.trim()]);
      setNewTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleAddHighlight = () => {
    if (newHighlightInput.trim() && !highlights.includes(newHighlightInput.trim())) {
      setHighlights([...highlights, newHighlightInput.trim()]);
      setNewHighlightInput('');
    }
  };

  const handleRemoveHighlight = (itemToRemove: string) => {
    setHighlights(highlights.filter(h => h !== itemToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      weekNumber: Number(weekNumber) || 1,
      description: description.trim(),
      fullOverview: fullOverview.trim() || description.trim(),
      status,
      imageUrl: imageUrl.trim() || undefined,
      githubUrl: githubUrl.trim() || undefined,
      demoUrl: demoUrl.trim() || undefined,
      tags: tags.length > 0 ? tags : ['Web Dev'],
      highlights: highlights.length > 0 ? highlights : undefined
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
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#64242f] text-white flex items-center justify-center">
              <FolderKanban className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-geist text-[20px] font-bold text-[#480e1a]">
                {editingProject ? 'Edit Proyek Portofolio' : 'Tambah Proyek Portofolio'}
              </h2>
              <p className="text-[13px] text-[#534344]">
                Dokumentasikan hasil karya proyek perkuliahan Anda.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#534344] hover:text-[#1d1b1b] p-1.5 rounded-lg hover:bg-[#ede7e6] transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <label className="font-geist text-[13px] font-semibold text-[#1d1b1b]">
                Judul Proyek <span className="text-[#ba1a1a]">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Week 03: Responsive Landing Page"
                className="px-3.5 py-2.5 bg-[#fef8f7] border border-[#dfd9d8] rounded-lg text-[14px] text-[#1d1b1b] focus:border-[#64242f] focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-geist text-[13px] font-semibold text-[#1d1b1b]">
                Minggu Ke-
              </label>
              <input
                type="number"
                min="1"
                max="16"
                value={weekNumber}
                onChange={(e) => setWeekNumber(e.target.value)}
                className="px-3.5 py-2.5 bg-[#fef8f7] border border-[#dfd9d8] rounded-lg text-[14px] text-[#1d1b1b] focus:border-[#64242f] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-geist text-[13px] font-semibold text-[#1d1b1b]">
                Status Proyek
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="px-3.5 py-2.5 bg-[#fef8f7] border border-[#dfd9d8] rounded-lg text-[14px] text-[#1d1b1b] focus:border-[#64242f] focus:outline-none"
              >
                <option value="completed">Completed (Selesai)</option>
                <option value="in_progress">In Progress (Sedang Dikerjakan)</option>
                <option value="not_started">Not Started (Belum Dimulai)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-geist text-[13px] font-semibold text-[#1d1b1b]">
                URL Gambar Pratinjau (Thumbnail)
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="px-3.5 py-2.5 bg-[#fef8f7] border border-[#dfd9d8] rounded-lg text-[14px] text-[#1d1b1b] focus:border-[#64242f] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-geist text-[13px] font-semibold text-[#1d1b1b]">
              Deskripsi Singkat
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Penjelasan ringkas proyek portofolio"
              className="px-3.5 py-2.5 bg-[#fef8f7] border border-[#dfd9d8] rounded-lg text-[14px] text-[#1d1b1b] focus:border-[#64242f] focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-geist text-[13px] font-semibold text-[#1d1b1b]">
              Penjelasan Lengkap (Overview & Arsitektur)
            </label>
            <textarea
              rows={3}
              value={fullOverview}
              onChange={(e) => setFullOverview(e.target.value)}
              placeholder="Ceritakan fitur, teknik yang dipelajari, dan implementasi kodenya..."
              className="px-3.5 py-2.5 bg-[#fef8f7] border border-[#dfd9d8] rounded-lg text-[14px] text-[#1d1b1b] focus:border-[#64242f] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-geist text-[13px] font-semibold text-[#1d1b1b]">
                GitHub Repository URL
              </label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/username/repo"
                className="px-3.5 py-2.5 bg-[#fef8f7] border border-[#dfd9d8] rounded-lg text-[14px] text-[#1d1b1b] focus:border-[#64242f] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-geist text-[13px] font-semibold text-[#1d1b1b]">
                Live Demo URL
              </label>
              <input
                type="url"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                placeholder="https://yourdemo.vercel.app"
                className="px-3.5 py-2.5 bg-[#fef8f7] border border-[#dfd9d8] rounded-lg text-[14px] text-[#1d1b1b] focus:border-[#64242f] focus:outline-none"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-2">
            <label className="font-geist text-[13px] font-semibold text-[#1d1b1b]">
              Teknologi / Tags
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }}
                placeholder="Ketik tag lalu tekan tambah..."
                className="flex-grow px-3.5 py-2 bg-[#fef8f7] border border-[#dfd9d8] rounded-lg text-[14px] text-[#1d1b1b] focus:border-[#64242f] focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-[#ede7e6] text-[#64242f] font-geist text-[13px] font-semibold rounded-lg hover:bg-[#dfd9d8] transition-colors cursor-pointer"
              >
                Tambah
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#ede7e6] rounded-full font-geist text-[12px] font-medium text-[#534344] flex items-center gap-1.5"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-[#ba1a1a]"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#dfd9d8] flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg border border-[#dfd9d8] font-geist text-[14px] font-semibold text-[#534344] hover:bg-[#f9f2f1] transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#64242f] text-white rounded-lg font-geist text-[14px] font-semibold hover:bg-[#480e1a] transition-colors cursor-pointer shadow-xs"
            >
              Simpan Proyek
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
