import React, { useState, useRef } from 'react';
import { Task, TaskCategory, TaskStatus } from '../types';
import { 
  Link, 
  Globe, 
  UploadCloud, 
  X, 
  FileText, 
  Check, 
  Plus
} from 'lucide-react';

interface AddTaskViewProps {
  onSaveTask: (task: Omit<Task, 'id'>) => void;
  onCancel: () => void;
  editingTask?: Task | null;
}

export const AddTaskView: React.FC<AddTaskViewProps> = ({
  onSaveTask,
  onCancel,
  editingTask
}) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const nextWeekStr = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [title, setTitle] = useState(editingTask?.title || '');
  const [week, setWeek] = useState<number | string>(editingTask?.week || '');
  const [category, setCategory] = useState<TaskCategory>(editingTask?.category || 'Web Dev');
  const [dateGiven, setDateGiven] = useState(editingTask?.dateGiven || todayStr);
  const [deadline, setDeadline] = useState(editingTask?.deadline || nextWeekStr);
  const [status, setStatus] = useState<TaskStatus>(editingTask?.status || 'not_started');
  const [description, setDescription] = useState(editingTask?.description || '');
  const [tags, setTags] = useState<string[]>(editingTask?.tags || []);
  const [newTagInput, setNewTagInput] = useState('');
  const [githubUrl, setGithubUrl] = useState(editingTask?.githubUrl || '');
  const [demoUrl, setDemoUrl] = useState(editingTask?.demoUrl || '');
  const [attachmentName, setAttachmentName] = useState(editingTask?.attachmentFileName || '');
  const [notes, setNotes] = useState(editingTask?.notes || '');
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddTag = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter' && e.key !== ',') return;
    e.preventDefault();
    const clean = newTagInput.trim().replace(/,/g, '');
    if (clean && !tags.includes(clean)) {
      setTags([...tags, clean]);
      setNewTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setAttachmentName(e.dataTransfer.files[0].name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachmentName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Judul tugas wajib diisi.');
      return;
    }
    if (!week) {
      setErrorMsg('Pilih minggu ke berapa tugas ini diberikan.');
      return;
    }

    const weekNum = Number(week);
    const weekStr = `Minggu ${weekNum < 10 ? `0${weekNum}` : weekNum}`;

    onSaveTask({
      title: title.trim(),
      week: weekNum,
      weekStr,
      category,
      dateGiven,
      deadline,
      status,
      description: description.trim() || 'Tidak ada deskripsi rinci.',
      tags: tags.length > 0 ? tags : ['Web Dev'],
      githubUrl: githubUrl.trim() || undefined,
      demoUrl: demoUrl.trim() || undefined,
      attachmentFileName: attachmentName || undefined,
      notes: notes.trim() || undefined
    });
  };

  return (
    <div id="add-task-view" className="space-y-6 max-w-5xl mx-auto animate-in fade-in-50 duration-300">
      {/* Page Header */}
      <div>
        <h1 className="font-geist text-[32px] md:text-[36px] font-bold text-[#480e1a] tracking-tight">
          {editingTask ? 'Edit Tugas' : 'Tambah Tugas Baru'}
        </h1>
        <p className="text-[15px] md:text-[16px] text-[#534344] mt-1">
          Isi form di bawah ini untuk menambahkan tugas atau assignment baru ke portofolio Anda.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 bg-[#ffdad6] text-[#ba1a1a] rounded-lg text-[14px] font-medium border border-[#ba1a1a]/30">
          {errorMsg}
        </div>
      )}

      {/* Main Form Container */}
      <div className="bg-[#ffffff] rounded-xl p-6 lg:p-8 border border-[#dfd9d8] soft-shadow">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Top Fields Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
            {/* Left Column */}
            <div className="space-y-5">
              {/* Judul Tugas */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="task-title" className="font-geist text-[14px] font-semibold text-[#1d1b1b]">
                  Judul Tugas
                </label>
                <input
                  id="task-title"
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Contoh: Desain Sistem UI"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#dfd9d8] bg-[#fef8f7] focus:border-[#64242f] focus:ring-1 focus:ring-[#64242f] focus:outline-none transition-all text-[14px] text-[#1d1b1b] placeholder:text-[#867274]"
                  required
                />
              </div>

              {/* Minggu & Kategori Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="task-week" className="font-geist text-[14px] font-semibold text-[#1d1b1b]">
                    Minggu Ke-
                  </label>
                  <select
                    id="task-week"
                    value={week}
                    onChange={(e) => setWeek(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#dfd9d8] bg-[#fef8f7] focus:border-[#64242f] focus:ring-1 focus:ring-[#64242f] focus:outline-none transition-all text-[14px] text-[#1d1b1b] cursor-pointer"
                    required
                  >
                    <option value="" disabled>Pilih...</option>
                    {Array.from({ length: 16 }, (_, i) => i + 1).map((w) => (
                      <option key={w} value={w}>
                        Minggu {w}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="task-category" className="font-geist text-[14px] font-semibold text-[#1d1b1b]">
                    Kategori
                  </label>
                  <select
                    id="task-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as TaskCategory)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#dfd9d8] bg-[#fef8f7] focus:border-[#64242f] focus:ring-1 focus:ring-[#64242f] focus:outline-none transition-all text-[14px] text-[#1d1b1b] cursor-pointer"
                  >
                    <option value="Web Dev">Web Dev</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Front-end">Front-end</option>
                    <option value="Back-end">Back-end</option>
                    <option value="Design">Design</option>
                  </select>
                </div>
              </div>

              {/* Dates Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="task-date-given" className="font-geist text-[14px] font-semibold text-[#1d1b1b]">
                    Tanggal Diberikan
                  </label>
                  <input
                    id="task-date-given"
                    type="date"
                    value={dateGiven}
                    onChange={(e) => setDateGiven(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#dfd9d8] bg-[#fef8f7] focus:border-[#64242f] focus:ring-1 focus:ring-[#64242f] focus:outline-none text-[14px] text-[#1d1b1b]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="task-deadline" className="font-geist text-[14px] font-semibold text-[#1d1b1b]">
                    Deadline
                  </label>
                  <input
                    id="task-deadline"
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#dfd9d8] bg-[#fef8f7] focus:border-[#64242f] focus:ring-1 focus:ring-[#64242f] focus:outline-none text-[14px] text-[#1d1b1b]"
                  />
                </div>
              </div>

              {/* Status */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="task-status" className="font-geist text-[14px] font-semibold text-[#1d1b1b]">
                  Status
                </label>
                <select
                  id="task-status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as TaskStatus)}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#dfd9d8] bg-[#fef8f7] focus:border-[#64242f] focus:ring-1 focus:ring-[#64242f] focus:outline-none text-[14px] text-[#1d1b1b] cursor-pointer"
                >
                  <option value="not_started">Belum Dikerjakan</option>
                  <option value="in_progress">Sedang Dikerjakan</option>
                  <option value="completed">Selesai</option>
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-5 flex flex-col">
              {/* Deskripsi Tugas */}
              <div className="flex flex-col gap-1.5 flex-1">
                <label htmlFor="task-description" className="font-geist text-[14px] font-semibold text-[#1d1b1b]">
                  Deskripsi Tugas
                </label>
                <textarea
                  id="task-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Jelaskan detail instruksi atau tujuan dari tugas ini..."
                  rows={4}
                  className="w-full flex-1 px-4 py-2.5 rounded-lg border border-[#dfd9d8] bg-[#fef8f7] focus:border-[#64242f] focus:ring-1 focus:ring-[#64242f] focus:outline-none text-[14px] text-[#1d1b1b] placeholder:text-[#867274] resize-none"
                />
              </div>

              {/* Teknologi yang Digunakan */}
              <div className="flex flex-col gap-1.5">
                <label className="font-geist text-[14px] font-semibold text-[#1d1b1b]">
                  Teknologi yang Digunakan
                </label>
                <div className="p-2.5 border border-[#dfd9d8] rounded-lg bg-[#fef8f7] flex flex-wrap gap-2 items-center min-h-[46px]">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-[#ede7e6] rounded-full text-[12px] font-medium text-[#1d1b1b] flex items-center gap-1.5 border border-[#d8c1c2]"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-[#534344] hover:text-[#ba1a1a]"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <div className="flex items-center gap-1 flex-1 min-w-[140px]">
                    <input
                      type="text"
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                      placeholder="Ketik lalu Enter..."
                      className="w-full bg-transparent border-none focus:ring-0 text-[13px] text-[#1d1b1b] p-0 outline-none"
                    />
                    {newTagInput && (
                      <button
                        type="button"
                        onClick={handleAddTag}
                        className="text-[#64242f] hover:text-[#480e1a] p-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-[#d8c1c2]/60 my-4" />

          {/* Links & Attachments Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
            {/* External Links */}
            <div className="space-y-4">
              <h3 className="font-geist text-[16px] font-bold text-[#480e1a]">
                Tautan Eksternal
              </h3>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="task-github" className="font-geist text-[13px] font-semibold text-[#1d1b1b]">
                  URL GitHub Repository
                </label>
                <div className="relative flex items-center">
                  <Link className="w-4 h-4 text-[#867274] absolute left-3 pointer-events-none" />
                  <input
                    id="task-github"
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-[#dfd9d8] bg-[#fef8f7] focus:border-[#64242f] focus:ring-1 focus:ring-[#64242f] focus:outline-none text-[14px] text-[#1d1b1b] placeholder:text-[#867274]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="task-demo" className="font-geist text-[13px] font-semibold text-[#1d1b1b]">
                  Live Demo URL
                </label>
                <div className="relative flex items-center">
                  <Globe className="w-4 h-4 text-[#867274] absolute left-3 pointer-events-none" />
                  <input
                    id="task-demo"
                    type="url"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-[#dfd9d8] bg-[#fef8f7] focus:border-[#64242f] focus:ring-1 focus:ring-[#64242f] focus:outline-none text-[14px] text-[#1d1b1b] placeholder:text-[#867274]"
                  />
                </div>
              </div>
            </div>

            {/* Attachments Upload */}
            <div className="space-y-4">
              <h3 className="font-geist text-[16px] font-bold text-[#480e1a]">
                Lampiran
              </h3>

              <div className="flex flex-col gap-1.5">
                <label className="font-geist text-[13px] font-semibold text-[#1d1b1b]">
                  File Tugas (PDF/ZIP)
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                  accept=".pdf,.zip,.rar,.docx,.png,.jpg"
                />
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleFileDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center bg-[#fef8f7] hover:bg-[#f9f2f1] transition-colors cursor-pointer ${
                    dragActive ? 'border-[#64242f] bg-[#ffd9dc]/20' : 'border-[#d8c1c2]'
                  }`}
                >
                  <UploadCloud className="w-8 h-8 text-[#867274] mb-2" />
                  {attachmentName ? (
                    <div className="flex items-center gap-2 text-[#64242f] font-semibold text-[13px]">
                      <FileText className="w-4 h-4" />
                      <span>{attachmentName}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setAttachmentName('');
                        }}
                        className="text-[#ba1a1a] hover:underline text-[12px] ml-1"
                      >
                        (Hapus)
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="font-geist text-[13px] font-semibold text-[#64242f]">
                        Klik untuk unggah atau seret file
                      </span>
                      <span className="text-[12px] text-[#534344] mt-0.5">
                        Maksimal 10MB (PDF, ZIP, Dokumen)
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="task-notes" className="font-geist text-[14px] font-semibold text-[#1d1b1b]">
              Catatan Tambahan (Opsional)
            </label>
            <textarea
              id="task-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Catatan pribadi mengenai kendala atau hal menarik saat mengerjakan tugas ini..."
              rows={2}
              className="w-full px-4 py-2.5 rounded-lg border border-[#dfd9d8] bg-[#fef8f7] focus:border-[#64242f] focus:ring-1 focus:ring-[#64242f] focus:outline-none text-[14px] text-[#1d1b1b] placeholder:text-[#867274] resize-none"
            />
          </div>

          {/* Form Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-[#d8c1c2]">
            <button
              type="button"
              id="btn-batal-task"
              onClick={onCancel}
              className="px-6 py-2.5 rounded-lg border border-[#64242f] text-[#64242f] font-geist text-[14px] font-semibold bg-transparent hover:bg-[#f9f2f1] transition-colors text-center cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              id="btn-simpan-task"
              className="px-6 py-2.5 rounded-lg bg-[#64242f] text-white font-geist text-[14px] font-semibold hover:bg-[#480e1a] transition-colors text-center shadow-xs cursor-pointer"
            >
              {editingTask ? 'Perbarui Tugas' : 'Simpan Tugas'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
