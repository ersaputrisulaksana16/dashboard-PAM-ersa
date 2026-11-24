import React from 'react';
import { ActiveNavTab } from '../types';
import { UNIVERSITY_LOGO } from '../data/initialData';
import { 
  LayoutDashboard, 
  ListTodo, 
  PlusSquare, 
  FolderKanban, 
  User, 
  Settings, 
  X,
  GraduationCap,
  FileCode2
} from 'lucide-react';

interface SidebarProps {
  activeTab: ActiveNavTab;
  onSelectTab: (tab: ActiveNavTab) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile
}) => {
  const navItems = [
    {
      id: 'dashboard' as ActiveNavTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      materialIcon: 'dashboard'
    },
    {
      id: 'tasks' as ActiveNavTab,
      label: 'Weekly Tasks',
      icon: ListTodo,
      materialIcon: 'assignment'
    },
    {
      id: 'cv_task' as ActiveNavTab,
      label: 'Tugas CV (HTML5)',
      icon: FileCode2,
      materialIcon: 'code'
    },
    {
      id: 'add_task' as ActiveNavTab,
      label: 'Add Task',
      icon: PlusSquare,
      materialIcon: 'add_box'
    },
    {
      id: 'portfolio' as ActiveNavTab,
      label: 'Portfolio',
      icon: FolderKanban,
      materialIcon: 'folder_shared'
    },
    {
      id: 'about' as ActiveNavTab,
      label: 'About Me',
      icon: User,
      materialIcon: 'person'
    },
    {
      id: 'settings' as ActiveNavTab,
      label: 'Settings',
      icon: Settings,
      materialIcon: 'settings'
    }
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div 
          id="mobile-sidebar-backdrop"
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs transition-opacity duration-200"
        />
      )}

      {/* SideNavBar Container */}
      <aside
        id="app-sidebar"
        className={`fixed left-0 top-0 h-screen w-[260px] bg-[#fef8f7] border-r border-[#d8c1c2] flex flex-col py-8 z-50 transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header / Brand */}
        <div className="px-6 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#ede7e6] flex items-center justify-center overflow-hidden border border-[#d8c1c2]/60 shadow-xs flex-shrink-0">
              <img
                src={UNIVERSITY_LOGO}
                alt="PAW Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                  const fallback = (e.target as HTMLElement).nextElementSibling;
                  if (fallback) (fallback as HTMLElement).style.display = 'flex';
                }}
              />
              <div className="hidden w-full h-full items-center justify-center bg-[#64242f] text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h1 className="font-geist text-[18px] font-bold text-[#480e1a] leading-tight">
                {import.meta.env.VITE_APP_NAME || 'PAW Dashboard'}
              </h1>
              <p className="text-[12px] text-[#534344] font-normal leading-normal">
                Univ. Course Portfolio • v{import.meta.env.VITE_APP_VERSION || '1.0.0'}
              </p>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden text-[#534344] hover:text-[#480e1a] p-1.5 rounded-lg hover:bg-[#ede7e6]"
            aria-label="Tutup navigasi"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const IconComponent = item.icon;

            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 font-geist text-[14px] ${
                  isActive
                    ? 'border-l-4 border-[#fd7b7b] bg-[#ede7e6] text-[#480e1a] font-bold shadow-xs translate-x-1'
                    : 'text-[#534344] hover:bg-[#f9f2f1] hover:text-[#480e1a] font-medium'
                }`}
              >
                <IconComponent 
                  className={`w-5 h-5 flex-shrink-0 ${
                    isActive ? 'text-[#a5393c] fill-[#a5393c]/20' : 'text-[#534344]'
                  }`} 
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Course Info Footer */}
        <div className="px-6 pt-4 mt-auto border-t border-[#d8c1c2]/50">
          <div className="bg-[#f9f2f1] p-3 rounded-lg border border-[#d8c1c2]/40 text-left">
            <div className="text-[11px] font-semibold text-[#a5393c] uppercase tracking-wider mb-0.5">
              Semester 5 (2026)
            </div>
            <div className="text-[12px] font-medium text-[#1d1b1b] truncate">
              Mata Kuliah: PAW (3 SKS)
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
