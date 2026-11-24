import React from 'react';
import { PortfolioProject } from '../types';
import { 
  X, 
  ExternalLink, 
  Code2, 
  Globe, 
  CheckCircle2, 
  Sparkles, 
  Layers
} from 'lucide-react';

interface ProjectDetailModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose
}) => {
  if (!project) return null;

  const isCompleted = project.status === 'completed';

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in-50 duration-200">
      <div 
        className="bg-[#ffffff] rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto soft-shadow border border-[#dfd9d8] relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-[#dfd9d8] flex items-start justify-between bg-[#fef8f7] rounded-t-2xl">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-geist text-[12px] font-bold text-[#a5393c] uppercase tracking-wider">
                Minggu {project.weekNumber < 10 ? `0${project.weekNumber}` : project.weekNumber}
              </span>
              <span className="text-[#867274]">•</span>
              <span className={`text-[12px] font-semibold px-2.5 py-0.5 rounded-full ${
                isCompleted ? 'bg-[#E6F4EA] text-[#137333]' : 'bg-[#fef3c7] text-[#92400e]'
              }`}>
                {isCompleted ? 'Completed Project' : 'In Progress'}
              </span>
            </div>
            <h2 className="font-geist text-[22px] md:text-[26px] font-bold text-[#480e1a] leading-tight">
              {project.title}
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

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Project Preview Image */}
          {project.imageUrl && (
            <div className="rounded-xl overflow-hidden border border-[#dfd9d8] shadow-xs max-h-[360px] bg-[#f9f2f1]">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Overview */}
          <div>
            <h3 className="font-geist text-[14px] font-bold text-[#1d1b1b] mb-2 uppercase tracking-wider text-[#867274]">
              Ringkasan Proyek
            </h3>
            <p className="text-[15px] text-[#1d1b1b] leading-relaxed bg-[#fef8f7] p-4 rounded-xl border border-[#dfd9d8]/60">
              {project.fullOverview || project.description}
            </p>
          </div>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h3 className="font-geist text-[14px] font-bold text-[#1d1b1b] mb-2 uppercase tracking-wider text-[#867274]">
                Fitur Utama &amp; Implementasi
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.highlights.map((h, i) => (
                  <div key={i} className="p-3 bg-[#f9f2f1] rounded-lg border border-[#d8c1c2]/50 flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#137333] flex-shrink-0" />
                    <span className="text-[13px] font-medium text-[#1d1b1b]">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div>
            <h3 className="font-geist text-[14px] font-bold text-[#1d1b1b] mb-2 uppercase tracking-wider text-[#867274]">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#ede7e6] rounded-md font-geist text-[13px] font-medium text-[#480e1a] border border-[#d8c1c2]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-[#dfd9d8] flex items-center justify-between bg-[#fef8f7] rounded-b-2xl">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#ffffff] border border-[#64242f] text-[#64242f] rounded-lg text-[13px] font-semibold hover:bg-[#ede7e6] transition-colors flex items-center gap-2"
              >
                <Code2 className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#64242f] text-white rounded-lg text-[13px] font-semibold hover:bg-[#480e1a] transition-colors flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#ede7e6] text-[#480e1a] rounded-lg text-[13px] font-semibold hover:bg-[#d8c1c2] transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
