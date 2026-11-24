import React from 'react';
import { PortfolioProject } from '../types';
import { 
  Code2, 
  Hourglass, 
  ExternalLink, 
  FolderKanban, 
  Sparkles,
  Layers,
  Globe,
  Plus,
  Trash2
} from 'lucide-react';

interface PortfolioViewProps {
  projects: PortfolioProject[];
  onViewProject: (project: PortfolioProject) => void;
  onAddProject?: () => void;
  onDeleteProject?: (id: string) => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  projects,
  onViewProject,
  onAddProject,
  onDeleteProject
}) => {
  return (
    <div id="portfolio-view" className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-geist text-[32px] md:text-[40px] font-bold text-[#480e1a] tracking-tight mb-1">
            Portofolio Saya
          </h1>
          <p className="text-[16px] md:text-[18px] text-[#534344] max-w-2xl">
            Koleksi proyek tugas yang telah diselesaikan sepanjang semester ini.
          </p>
        </div>

        {onAddProject && (
          <button
            onClick={onAddProject}
            className="bg-[#64242f] text-white px-5 py-2.5 rounded-lg font-geist text-[14px] font-semibold hover:bg-[#480e1a] transition-all flex items-center justify-center gap-2 soft-shadow w-full md:w-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Proyek</span>
          </button>
        )}
      </div>

      {/* Projects Grid or Empty State */}
      {projects.length === 0 ? (
        <div className="bg-[#ffffff] rounded-2xl border border-[#dfd9d8] p-12 text-center text-[#534344] soft-shadow">
          <div className="w-14 h-14 rounded-full bg-[#f9f2f1] flex items-center justify-center text-[#64242f] mx-auto mb-3">
            <FolderKanban className="w-7 h-7 opacity-80" />
          </div>
          <h3 className="font-geist text-[20px] font-bold text-[#1d1b1b] mb-1">
            Belum Ada Proyek Portofolio
          </h3>
          <p className="text-[14px] text-[#534344] max-w-md mx-auto mb-5">
            Portofolio Anda saat ini masih kosong (0 proyek). Anda dapat menambahkan proyek mandiri atau proyek perkuliahan untuk dipamerkan.
          </p>
          {onAddProject && (
            <button
              onClick={onAddProject}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#64242f] text-white rounded-lg font-geist text-[14px] font-semibold hover:bg-[#480e1a] transition-all soft-shadow cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Proyek Pertama</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const isCompleted = project.status === 'completed';

            return (
              <div
                key={project.id}
                id={`portfolio-card-${project.id}`}
                className="bg-[#ffffff] rounded-2xl p-4 border border-[#dfd9d8] hover:-translate-y-1 transition-all duration-300 soft-shadow flex flex-col group"
              >
                {/* Thumbnail Container */}
                <div className="rounded-xl overflow-hidden mb-4 relative aspect-video bg-[#f9f2f1] flex items-center justify-center border border-[#d8c1c2]/40">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                        const fallback = (e.target as HTMLElement).nextElementSibling;
                        if (fallback) (fallback as HTMLElement).style.display = 'flex';
                      }}
                    />
                  ) : null}

                  {/* Fallback in progress placeholder */}
                  <div
                    className={`text-center p-4 flex flex-col items-center justify-center ${
                      project.imageUrl ? 'hidden' : 'flex'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#ede7e6] flex items-center justify-center text-[#867274] mb-2">
                      <Hourglass className="w-6 h-6 animate-spin-slow" />
                    </div>
                    <p className="font-geist text-[14px] font-semibold text-[#867274]">
                      {isCompleted ? 'Screenshot Preview' : 'Project in Progress'}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-geist text-[18px] md:text-[20px] font-bold text-[#1d1b1b] group-hover:text-[#480e1a] transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-[14px] text-[#534344] mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#ede7e6] rounded-full font-geist text-[12px] font-medium text-[#534344]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-[#dfd9d8] mt-auto">
                  {isCompleted ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6b1e23]/10 text-[#6b1e23] font-geist text-[12px] font-semibold">
                      <span className="w-2 h-2 rounded-full bg-[#6b1e23]" />
                      Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#867274]/10 text-[#867274] font-geist text-[12px] font-semibold">
                      <span className="w-2 h-2 rounded-full bg-[#867274]" />
                      In Progress
                    </span>
                  )}

                  <div className="flex gap-2 items-center">
                    {onDeleteProject && (
                      <button
                        onClick={() => onDeleteProject(project.id)}
                        className="w-9 h-9 rounded-full border border-transparent text-[#867274] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/40 flex items-center justify-center transition-colors cursor-pointer"
                        title="Hapus Proyek"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full border border-[#64242f] text-[#64242f] flex items-center justify-center hover:bg-[#f9f2f1] transition-colors"
                        title="Lihat Repository GitHub"
                        aria-label="GitHub Repository"
                      >
                        <Code2 className="w-4 h-4" />
                      </a>
                    ) : (
                      <button
                        disabled
                        className="w-9 h-9 rounded-full border border-[#867274]/40 text-[#867274] flex items-center justify-center cursor-not-allowed opacity-50"
                        title="Repository belum tersedia"
                      >
                        <Code2 className="w-4 h-4" />
                      </button>
                    )}

                    {isCompleted ? (
                      <button
                        onClick={() => onViewProject(project)}
                        className="px-4 py-2 bg-[#64242f] text-white rounded-lg font-geist text-[13px] font-semibold hover:bg-[#480e1a] transition-colors cursor-pointer shadow-xs"
                      >
                        View Project
                      </button>
                    ) : (
                      <button
                        onClick={() => onViewProject(project)}
                        className="px-4 py-2 border border-[#64242f] text-[#64242f] rounded-lg font-geist text-[13px] font-semibold hover:bg-[#f9f2f1] transition-colors cursor-pointer"
                      >
                        Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
