import React from 'react';
import { Task, StudentProfile } from '../types';
import { 
  Plus, 
  FolderArchive, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Award, 
  Eye, 
  Edit3,
  ArrowRight,
  FileCode2,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface DashboardViewProps {
  profile: StudentProfile;
  tasks: Task[];
  onNavigateToAddTask: () => void;
  onNavigateToTasks: () => void;
  onNavigateToCvTask?: () => void;
  onNavigateToLuveBeauty?: () => void;
  onViewTask: (task: Task) => void;
  onEditTask: (task: Task) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  tasks,
  onNavigateToAddTask,
  onNavigateToTasks,
  onNavigateToCvTask,
  onNavigateToLuveBeauty,
  onViewTask,
  onEditTask
}) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;
  const notStartedTasks = tasks.filter(t => t.status === 'not_started').length;

  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Recent 5 tasks sorted by week
  const recentTasks = [...tasks].sort((a, b) => a.week - b.week).slice(0, 5);

  return (
    <div id="dashboard-view" className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-geist text-[32px] md:text-[40px] font-bold text-[#1d1b1b] tracking-tight mb-1 flex items-center gap-2">
            Halo, {profile.name} <span className="animate-bounce inline-block">👋</span>
          </h1>
          <p className="text-[16px] md:text-[18px] text-[#534344]">
            Kelola dan dokumentasikan tugas mingguan kamu di sini.
          </p>
        </div>

        <button
          id="btn-tambah-tugas-dashboard"
          onClick={onNavigateToAddTask}
          className="bg-[#64242f] text-white rounded-lg px-6 py-3 font-geist text-[14px] font-semibold flex items-center justify-center gap-2 hover:bg-[#480e1a] transition-all soft-shadow w-full md:w-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Tugas</span>
        </button>
      </div>

      {/* 4 Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Tugas */}
        <div className="bg-[#ffffff] rounded-xl p-6 border border-[#dfd9d8] soft-shadow card-hover flex flex-col gap-4">
          <div className="w-12 h-12 rounded-full bg-[#ffd9dc] flex items-center justify-center text-[#64242f]">
            <FolderArchive className="w-6 h-6" />
          </div>
          <div>
            <p className="font-geist text-[14px] font-semibold text-[#534344] mb-1">
              Total Tugas
            </p>
            <p className="font-geist text-[32px] font-bold text-[#1d1b1b] leading-none">
              {totalTasks}
            </p>
          </div>
        </div>

        {/* Tugas Selesai */}
        <div className="bg-[#ffffff] rounded-xl p-6 border border-[#dfd9d8] soft-shadow card-hover flex flex-col gap-4">
          <div className="w-12 h-12 rounded-full bg-[#E6F4EA] flex items-center justify-center text-[#137333]">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="font-geist text-[14px] font-semibold text-[#534344] mb-1">
              Tugas Selesai
            </p>
            <p className="font-geist text-[32px] font-bold text-[#1d1b1b] leading-none">
              {completedTasks}
            </p>
          </div>
        </div>

        {/* Sedang Dikerjakan */}
        <div className="bg-[#ffffff] rounded-xl p-6 border border-[#dfd9d8] soft-shadow card-hover flex flex-col gap-4">
          <div className="w-12 h-12 rounded-full bg-[#FFF3E0] flex items-center justify-center text-[#E65100]">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="font-geist text-[14px] font-semibold text-[#534344] mb-1">
              Sedang Dikerjakan
            </p>
            <p className="font-geist text-[32px] font-bold text-[#1d1b1b] leading-none">
              {inProgressTasks}
            </p>
          </div>
        </div>

        {/* Belum Dikerjakan */}
        <div className="bg-[#ffffff] rounded-xl p-6 border border-[#dfd9d8] soft-shadow card-hover flex flex-col gap-4">
          <div className="w-12 h-12 rounded-full bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a]">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="font-geist text-[14px] font-semibold text-[#534344] mb-1">
              Belum Dikerjakan
            </p>
            <p className="font-geist text-[32px] font-bold text-[#1d1b1b] leading-none">
              {notStartedTasks}
            </p>
          </div>
        </div>
      </div>

      {/* Progress & Banner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Semester */}
        <div className="bg-[#ffffff] rounded-xl p-6 border border-[#dfd9d8] soft-shadow col-span-1 lg:col-span-1 flex flex-col justify-center">
          <div className="flex justify-between items-end mb-4">
            <h3 className="font-geist text-[20px] font-bold text-[#1d1b1b]">
              Progress Semester
            </h3>
            <span className="font-geist text-[24px] font-bold text-[#64242f]">
              {progressPercent}%
            </span>
          </div>

          <div className="w-full bg-[#e7e1e0] rounded-full h-3 mb-2 overflow-hidden">
            <div
              className="bg-[#64242f] h-3 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <p className="text-[12px] text-[#534344] mt-2">
            {totalTasks === 0 
              ? 'Belum ada tugas yang ditambahkan (0% selesai).'
              : `Berdasarkan ${totalTasks} tugas semester ini (${completedTasks} selesai).`}
          </p>
        </div>

        {/* Tugas CV Quick Access Banner */}
        <div className="bg-[#ffffff] rounded-xl border border-[#dfd9d8] soft-shadow col-span-1 lg:col-span-2 overflow-hidden relative p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#64242f]/10 text-[#64242f] flex items-center justify-center flex-shrink-0">
              <FileCode2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold text-[#64242f] uppercase tracking-wider bg-[#ffd9dc]/70 px-2 py-0.5 rounded">
                  Dokumen Baru
                </span>
                <span className="text-[12px] text-[#534344] font-mono">tugas pembuatan cv.html</span>
              </div>
              <h4 className="font-geist text-[17px] font-bold text-[#1d1b1b]">
                Tugas Pembuatan CV (HTML5)
              </h4>
              <p className="text-[13px] text-[#534344] mt-0.5 max-w-md">
                Dokumen CV mahasiswa berbasis HTML 5 murni lengkap dengan tabel jadwal perkuliahan & elemen semantik.
              </p>
            </div>
          </div>
          {onNavigateToCvTask && (
            <button
              onClick={onNavigateToCvTask}
              className="px-4 py-2.5 bg-[#64242f] text-white hover:bg-[#480e1a] rounded-lg font-geist text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors flex-shrink-0 cursor-pointer shadow-xs"
            >
              <span>Buka Tugas CV</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Luve Beauty Quick Access Banner */}
      <div className="bg-[#ffffff] rounded-xl border border-[#dfd9d8] soft-shadow overflow-hidden relative p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#64242f]/10 text-[#64242f] flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-[#64242f] uppercase tracking-wider bg-[#ffd9dc]/70 px-2 py-0.5 rounded">
                Aplikasi Cabang
              </span>
              <span className="text-[12px] text-[#534344] font-mono break-all">
                luve-beauty-ten.vercel.app
              </span>
            </div>
            <h4 className="font-geist text-[17px] font-bold text-[#1d1b1b]">
              Luve Beauty Web App
            </h4>
            <p className="text-[13px] text-[#534344] mt-0.5 max-w-xl">
              Lihat pratinjau langsung aplikasi cabang Luve Beauty di dalam website ini atau buka tautan deployment Vercel secara penuh.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
          <a
            href="https://luve-beauty-ten.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2.5 border border-[#dfd9d8] text-[#534344] hover:bg-[#f9f2f1] hover:text-[#480e1a] rounded-lg font-geist text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Tab Baru</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          {onNavigateToLuveBeauty && (
            <button
              type="button"
              onClick={onNavigateToLuveBeauty}
              className="px-4 py-2.5 bg-[#64242f] text-white hover:bg-[#480e1a] rounded-lg font-geist text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <span>Buka Luve Beauty</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Recent Assignments Table */}
      <div className="bg-[#ffffff] rounded-xl border border-[#dfd9d8] soft-shadow overflow-hidden">
        <div className="px-6 py-5 border-b border-[#dfd9d8] flex justify-between items-center bg-[#ffffff]">
          <h3 className="font-geist text-[20px] font-bold text-[#1d1b1b]">
            Tugas Terkini
          </h3>
          <button
            id="btn-lihat-semua-tugas"
            onClick={onNavigateToTasks}
            className="text-[#64242f] font-geist text-[14px] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Lihat Semua</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#ffffff] border-b border-[#dfd9d8] text-[#534344] font-geist text-[14px]">
                <th className="py-4 px-6 font-semibold">Week</th>
                <th className="py-4 px-6 font-semibold">Title</th>
                <th className="py-4 px-6 font-semibold hidden md:table-cell">Description</th>
                <th className="py-4 px-6 font-semibold hidden lg:table-cell">Date</th>
                <th className="py-4 px-6 font-semibold">Status</th>
                <th className="py-4 px-6 font-semibold hidden sm:table-cell">Category</th>
                <th className="py-4 px-6 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-[15px] text-[#1d1b1b]">
              {recentTasks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 px-6 text-center text-[#534344]">
                    <div className="max-w-md mx-auto flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-[#f9f2f1] flex items-center justify-center text-[#64242f] mb-3">
                        <FolderArchive className="w-6 h-6" />
                      </div>
                      <p className="font-geist text-[16px] font-bold text-[#1d1b1b]">
                        Belum Ada Tugas Ditambahkan
                      </p>
                      <p className="text-[13px] text-[#534344] mt-1 mb-4">
                        Semua progres tugas saat ini 0. Klik tombol di bawah untuk menambahkan tugas pertama Anda.
                      </p>
                      <button
                        onClick={onNavigateToAddTask}
                        className="bg-[#64242f] text-white px-5 py-2.5 rounded-lg font-geist text-[13px] font-semibold hover:bg-[#480e1a] transition-all flex items-center gap-2 cursor-pointer soft-shadow"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Tugas Pertama</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                recentTasks.map((task) => {
                const isCompleted = task.status === 'completed';
                const isInProgress = task.status === 'in_progress';

                return (
                  <tr
                    key={task.id}
                    className="border-b border-[#dfd9d8]/60 hover:bg-[#f9f2f1]/80 transition-colors"
                  >
                    <td className="py-4 px-6 text-[#534344] font-mono text-[13px]">
                      {task.week < 10 ? `0${task.week}` : task.week}
                    </td>
                    <td className="py-4 px-6 font-medium text-[#1d1b1b]">
                      <button
                        onClick={() => onViewTask(task)}
                        className="hover:text-[#64242f] hover:underline text-left font-semibold"
                      >
                        {task.title}
                      </button>
                    </td>
                    <td className="py-4 px-6 text-[#534344] hidden md:table-cell truncate max-w-[220px] text-[13px]">
                      {task.description}
                    </td>
                    <td className="py-4 px-6 text-[#534344] hidden lg:table-cell text-[13px]">
                      {task.dateGiven || task.deadline}
                    </td>
                    <td className="py-4 px-6">
                      {isCompleted && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-semibold bg-[#E6F4EA] text-[#137333]">
                          Selesai
                        </span>
                      )}
                      {isInProgress && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-semibold bg-[#FFF3E0] text-[#E65100]">
                          Sedang Dikerjakan
                        </span>
                      )}
                      {!isCompleted && !isInProgress && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-semibold bg-[#ffdad6] text-[#ba1a1a]">
                          Belum Selesai
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 hidden sm:table-cell text-[13px] text-[#534344]">
                      {task.category}
                    </td>
                    <td className="py-4 px-6 text-right">
                      {isCompleted ? (
                        <button
                          onClick={() => onViewTask(task)}
                          className="text-[#64242f] hover:text-[#480e1a] transition-colors font-geist text-[14px] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => onEditTask(task)}
                          className="text-[#a5393c] hover:text-[#64242f] font-geist text-[14px] font-semibold flex items-center justify-end gap-1 hover:underline ml-auto cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              }))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
