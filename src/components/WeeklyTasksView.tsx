import React, { useState, useMemo } from 'react';
import { Task, TaskStatus } from '../types';
import { filterByStatus } from '../utils/taskHelpers';
import { 
  Search, 
  Plus, 
  Calendar, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Filter,
  ArrowUpDown,
  FolderArchive
} from 'lucide-react';

interface WeeklyTasksViewProps {
  tasks: Task[];
  onNavigateToAddTask: () => void;
  onViewTask: (task: Task) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onToggleStatus: (id: string, newStatus: TaskStatus) => void;
  initialSearch?: string;
}

export const WeeklyTasksView: React.FC<WeeklyTasksViewProps> = ({
  tasks,
  onNavigateToAddTask,
  onViewTask,
  onEditTask,
  onDeleteTask,
  onToggleStatus,
  initialSearch = ''
}) => {
  const [search, setSearch] = useState(initialSearch);
  const [selectedWeek, setSelectedWeek] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'deadline'>('newest');

  // Available weeks from tasks
  const weeksList = useMemo(() => {
    const weeks: number[] = Array.from(new Set(tasks.map(t => Number(t.week))));
    return weeks.sort((a: number, b: number) => a - b);
  }, [tasks]);

  // Filtered & Sorted Tasks
  const filteredTasks = useMemo(() => {
    const statusFiltered = filterByStatus<Task>(
      tasks,
      selectedStatus === 'all' ? 'all' : (selectedStatus as TaskStatus)
    );

    return statusFiltered.filter(task => {
      const matchSearch = 
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase()) ||
        task.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())) ||
        task.category.toLowerCase().includes(search.toLowerCase());

      const matchWeek = selectedWeek === 'all' || task.week.toString() === selectedWeek;

      return matchSearch && matchWeek;
    }).sort((a, b) => {
      if (sortBy === 'newest') return Number(b.week) - Number(a.week);
      if (sortBy === 'oldest') return Number(a.week) - Number(b.week);
      if (sortBy === 'deadline') return (a.deadline || '').localeCompare(b.deadline || '');
      return 0;
    });
  }, [tasks, search, selectedWeek, selectedStatus, sortBy]);

  return (
    <div id="weekly-tasks-view" className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-geist text-[32px] md:text-[40px] font-bold text-[#480e1a] tracking-tight mb-1">
            Tugas Mingguan
          </h1>
          <p className="text-[16px] md:text-[18px] text-[#534344]">
            Daftar tugas Pengembangan Aplikasi Website
          </p>
        </div>
      </div>

      {/* Controls / Filter Bar matching design */}
      <div className="bg-[#ffffff] p-4 rounded-xl border border-[#d8c1c2] soft-shadow flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-grow md:flex-grow-0 min-w-[220px]">
            <Search className="w-4 h-4 text-[#867274] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari tugas..."
              className="w-full pl-9 pr-4 py-2 bg-[#fef8f7] border border-[#d8c1c2] rounded-lg text-[14px] text-[#1d1b1b] placeholder:text-[#867274] focus:outline-none focus:border-[#64242f] focus:ring-1 focus:ring-[#64242f] transition-all"
            />
          </div>

          {/* Week Filter */}
          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            className="bg-[#fef8f7] border border-[#d8c1c2] rounded-lg px-3 py-2 text-[14px] text-[#1d1b1b] focus:outline-none focus:border-[#64242f] cursor-pointer"
          >
            <option value="all">Semua Minggu</option>
            {weeksList.map((w) => (
              <option key={w} value={w.toString()}>
                Minggu {w < 10 ? `0${w}` : w}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#fef8f7] border border-[#d8c1c2] rounded-lg px-3 py-2 text-[14px] text-[#1d1b1b] focus:outline-none focus:border-[#64242f] cursor-pointer"
          >
            <option value="all">Semua Status</option>
            <option value="not_started">Belum Selesai</option>
            <option value="in_progress">Sedang Dikerjakan</option>
            <option value="completed">Selesai</option>
          </select>
        </div>

        {/* Sort & Add Task */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#fef8f7] border border-[#d8c1c2] rounded-lg px-3 py-2 text-[14px] text-[#1d1b1b] focus:outline-none focus:border-[#64242f] cursor-pointer flex-grow md:flex-grow-0"
          >
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
            <option value="deadline">Mendekati Deadline</option>
          </select>

          <button
            id="btn-tambah-tugas-tasks-view"
            onClick={onNavigateToAddTask}
            className="bg-[#64242f] text-white px-5 py-2 rounded-lg font-geist text-[14px] font-semibold flex items-center justify-center gap-2 hover:bg-[#480e1a] transition-colors whitespace-nowrap cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Tugas</span>
          </button>
        </div>
      </div>

      {/* Tasks Bento Grid */}
      {tasks.length === 0 ? (
        <div className="bg-[#ffffff] rounded-xl border border-[#d8c1c2] p-12 text-center text-[#534344] soft-shadow">
          <div className="w-14 h-14 rounded-full bg-[#f9f2f1] flex items-center justify-center text-[#64242f] mx-auto mb-3">
            <FolderArchive className="w-7 h-7 opacity-80" />
          </div>
          <h3 className="font-geist text-[20px] font-bold text-[#1d1b1b] mb-1">
            Belum Ada Tugas Mingguan
          </h3>
          <p className="text-[14px] text-[#534344] max-w-md mx-auto mb-5">
            Daftar tugas Anda masih kosong (0 tugas). Silakan tambahkan tugas mingguan baru untuk memulai dokumentasi perkuliahan.
          </p>
          <button
            onClick={onNavigateToAddTask}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#64242f] text-white rounded-lg font-geist text-[14px] font-semibold hover:bg-[#480e1a] transition-all soft-shadow cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Tugas Pertama</span>
          </button>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="bg-[#ffffff] rounded-xl border border-[#d8c1c2] p-12 text-center text-[#534344] soft-shadow">
          <Filter className="w-12 h-12 text-[#867274] mx-auto mb-3 opacity-60" />
          <h3 className="font-geist text-[18px] font-bold text-[#1d1b1b] mb-1">
            Tidak ada tugas yang cocok
          </h3>
          <p className="text-[14px] text-[#534344] max-w-sm mx-auto mb-4">
            Coba ubah kata kunci pencarian atau reset filter untuk melihat tugas lainnya.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedWeek('all');
              setSelectedStatus('all');
            }}
            className="px-4 py-2 bg-[#ede7e6] text-[#480e1a] rounded-lg text-[13px] font-semibold hover:bg-[#d8c1c2] transition-colors"
          >
            Reset Semua Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => {
            const isCompleted = task.status === 'completed';
            const isInProgress = task.status === 'in_progress';

            // Left stripe color
            const stripeColor = isCompleted
              ? 'bg-[#10b981]'
              : isInProgress
              ? 'bg-[#f59e0b]'
              : 'bg-[#fd7b7b]';

            return (
              <div
                key={task.id}
                id={`task-card-${task.id}`}
                className="bg-[#ffffff] border border-[#d8c1c2] rounded-xl p-6 soft-shadow card-hover flex flex-col h-full relative overflow-hidden group"
              >
                {/* Left vertical accent stripe */}
                <div className={`absolute top-0 left-0 w-1.5 h-full ${stripeColor}`} />

                {/* Top header: Week Label & Status Badge */}
                <div className="flex justify-between items-start mb-3 pl-1">
                  <span className="font-geist text-[12px] font-bold text-[#a5393c] uppercase tracking-wider">
                    {task.weekStr || `Minggu ${task.week < 10 ? `0${task.week}` : task.week}`}
                  </span>

                  {isCompleted && (
                    <div className="bg-[#d1fae5] text-[#065f46] px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                      Selesai
                    </div>
                  )}

                  {isInProgress && (
                    <div className="bg-[#fef3c7] text-[#92400e] px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                      Sedang Dikerjakan
                    </div>
                  )}

                  {!isCompleted && !isInProgress && (
                    <div className="bg-[#ffdad6]/60 text-[#93000a] px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#ba1a1a]" />
                      Belum Selesai
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-geist text-[20px] font-bold text-[#480e1a] mb-2 line-clamp-2 pl-1 leading-snug">
                  {task.title}
                </h3>

                {/* Description */}
                <p className="text-[14px] text-[#534344] mb-6 flex-grow line-clamp-3 pl-1 leading-relaxed">
                  {task.description}
                </p>

                {/* Meta details: Deadline & Tags */}
                <div className="space-y-3 mb-6 pl-1">
                  <div className="flex items-center gap-2 text-[#534344] text-[12px]">
                    <Calendar className="w-4 h-4 text-[#a5393c]" />
                    <span>Deadline: {task.deadline || 'Belum diatur'}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <span className="bg-[#f3eceb] px-2.5 py-1 rounded-md text-[11px] font-medium text-[#1d1b1b] border border-[#d8c1c2]/50">
                      {task.category}
                    </span>
                    {task.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-[#ede7e6] px-2.5 py-1 rounded-md text-[11px] font-medium text-[#534344]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-[#ede7e6] mt-auto">
                  {/* Quick status dropdown */}
                  <select
                    value={task.status}
                    onChange={(e) => onToggleStatus(task.id, e.target.value as TaskStatus)}
                    className="text-[12px] bg-[#f9f2f1] text-[#480e1a] font-medium px-2 py-1 rounded border border-[#d8c1c2] focus:outline-none cursor-pointer"
                    title="Ubah Status"
                  >
                    <option value="not_started">Belum Selesai</option>
                    <option value="in_progress">Sedang Dikerjakan</option>
                    <option value="completed">Selesai</option>
                  </select>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onViewTask(task)}
                      className="text-[#534344] hover:text-[#480e1a] hover:bg-[#f9f2f1] p-2 rounded-lg transition-colors"
                      title="Lihat Detail"
                      aria-label="Lihat Detail"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onEditTask(task)}
                      className="text-[#534344] hover:text-[#a5393c] hover:bg-[#f9f2f1] p-2 rounded-lg transition-colors"
                      title="Edit Tugas"
                      aria-label="Edit Tugas"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm(`Hapus tugas "${task.title}"?`)) {
                          onDeleteTask(task.id);
                        }
                      }}
                      className="text-[#534344] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/40 p-2 rounded-lg transition-colors"
                      title="Hapus Tugas"
                      aria-label="Hapus Tugas"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
