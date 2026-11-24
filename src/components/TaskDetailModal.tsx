import React from 'react';
import { Task, TaskStatus } from '../types';
import { 
  X, 
  Calendar, 
  Tag, 
  ExternalLink, 
  Code2, 
  Globe, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Award, 
  Edit3
} from 'lucide-react';

interface TaskDetailModalProps {
  task: Task | null;
  onClose: () => void;
  onEdit: (task: Task) => void;
  onStatusChange: (id: string, newStatus: TaskStatus) => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task,
  onClose,
  onEdit,
  onStatusChange
}) => {
  if (!task) return null;

  const isCompleted = task.status === 'completed';
  const isInProgress = task.status === 'in_progress';

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in-50 duration-200">
      <div 
        className="bg-[#ffffff] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto soft-shadow border border-[#dfd9d8] relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-[#dfd9d8] flex items-start justify-between bg-[#fef8f7] rounded-t-2xl">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-geist text-[12px] font-bold text-[#a5393c] uppercase tracking-wider">
                {task.weekStr || `Minggu ${task.week}`}
              </span>
              <span className="text-[#867274]">•</span>
              <span className="text-[12px] font-medium text-[#534344]">
                {task.category}
              </span>
            </div>
            <h2 className="font-geist text-[22px] md:text-[26px] font-bold text-[#480e1a] leading-tight">
              {task.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-[#534344] hover:text-[#1d1b1b] p-1.5 rounded-lg hover:bg-[#ede7e6] transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Status & Dates Bar */}
          <div className="bg-[#f9f2f1] p-4 rounded-xl border border-[#d8c1c2]/50 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[12px] text-[#534344] block mb-1 font-medium">
                Status Pengerjaan:
              </span>
              <div className="flex items-center gap-2">
                <select
                  value={task.status}
                  onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
                  className="px-3 py-1 bg-[#ffffff] border border-[#d8c1c2] rounded-lg text-[13px] font-semibold text-[#1d1b1b] focus:outline-none cursor-pointer"
                >
                  <option value="not_started">Belum Dikerjakan</option>
                  <option value="in_progress">Sedang Dikerjakan</option>
                  <option value="completed">Selesai (Completed)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[13px] text-[#534344]">
              {task.dateGiven && (
                <div>
                  <span className="block text-[11px] text-[#867274]">Diberikan</span>
                  <span className="font-medium text-[#1d1b1b]">{task.dateGiven}</span>
                </div>
              )}
              {task.deadline && (
                <div>
                  <span className="block text-[11px] text-[#867274]">Tenggat Waktu</span>
                  <span className="font-semibold text-[#a5393c] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {task.deadline}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-geist text-[14px] font-bold text-[#1d1b1b] mb-2 uppercase tracking-wider text-[#867274]">
              Deskripsi &amp; Instruksi Tugas
            </h3>
            <p className="text-[15px] text-[#1d1b1b] leading-relaxed whitespace-pre-line bg-[#fef8f7] p-4 rounded-xl border border-[#dfd9d8]/60">
              {task.description}
            </p>
          </div>

          {/* Tags */}
          <div>
            <h3 className="font-geist text-[14px] font-bold text-[#1d1b1b] mb-2 uppercase tracking-wider text-[#867274]">
              Teknologi / Topik
            </h3>
            <div className="flex flex-wrap gap-2">
              {task.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#ede7e6] rounded-md font-geist text-[13px] font-medium text-[#480e1a] border border-[#d8c1c2]/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* External Links */}
          {(task.githubUrl || task.demoUrl) && (
            <div>
              <h3 className="font-geist text-[14px] font-bold text-[#1d1b1b] mb-2 uppercase tracking-wider text-[#867274]">
                Tautan Hasil Pengerjaan
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {task.githubUrl && (
                  <a
                    href={task.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#ffffff] border border-[#d8c1c2] hover:border-[#64242f] rounded-xl flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Code2 className="w-5 h-5 text-[#64242f]" />
                      <div>
                        <div className="text-[13px] font-semibold text-[#1d1b1b]">GitHub Repo</div>
                        <div className="text-[11px] text-[#867274] truncate max-w-[180px]">{task.githubUrl}</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#867274] group-hover:text-[#64242f]" />
                  </a>
                )}

                {task.demoUrl && (
                  <a
                    href={task.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#ffffff] border border-[#d8c1c2] hover:border-[#64242f] rounded-xl flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Globe className="w-5 h-5 text-[#a5393c]" />
                      <div>
                        <div className="text-[13px] font-semibold text-[#1d1b1b]">Live Demo</div>
                        <div className="text-[11px] text-[#867274] truncate max-w-[180px]">{task.demoUrl}</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#867274] group-hover:text-[#a5393c]" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Attachments */}
          {task.attachmentFileName && (
            <div>
              <h3 className="font-geist text-[14px] font-bold text-[#1d1b1b] mb-2 uppercase tracking-wider text-[#867274]">
                File Lampiran
              </h3>
              <div className="p-3 bg-[#fef8f7] border border-[#d8c1c2] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-[#64242f]" />
                  <span className="text-[13px] font-medium text-[#1d1b1b]">
                    {task.attachmentFileName}
                  </span>
                </div>
                <button
                  onClick={() => alert(`Mengunduh file: ${task.attachmentFileName}`)}
                  className="text-[#64242f] text-[12px] font-semibold hover:underline"
                >
                  Unduh
                </button>
              </div>
            </div>
          )}

          {/* Notes */}
          {task.notes && (
            <div className="p-4 bg-[#f9f2f1] rounded-xl border border-[#d8c1c2]/50">
              <span className="text-[12px] font-bold text-[#534344] uppercase tracking-wider block mb-1">
                Catatan Mahasiswa
              </span>
              <p className="text-[13px] text-[#1d1b1b]">{task.notes}</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-[#dfd9d8] flex justify-end gap-3 bg-[#fef8f7] rounded-b-2xl">
          <button
            onClick={() => {
              onClose();
              onEdit(task);
            }}
            className="px-5 py-2 border border-[#64242f] text-[#64242f] rounded-lg text-[13px] font-semibold hover:bg-[#ede7e6] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Tugas</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#64242f] text-white rounded-lg text-[13px] font-semibold hover:bg-[#480e1a] transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
