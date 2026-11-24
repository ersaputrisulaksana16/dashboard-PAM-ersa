import React, { useState, useRef, useEffect } from 'react';
import { CourseNotification, StudentProfile } from '../types';
import { HEADER_AVATAR } from '../data/initialData';
import { 
  Menu, 
  Search, 
  Bell, 
  Check, 
  ExternalLink,
  BookOpen,
  X
} from 'lucide-react';

interface HeaderProps {
  profile: StudentProfile;
  notifications: CourseNotification[];
  onMarkNotificationAsRead: (id: string) => void;
  onMarkAllNotificationsAsRead?: () => void;
  onClearAllNotifications?: () => void;
  onOpenMobileMenu: () => void;
  onSearchClick: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigateToAbout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  notifications,
  onMarkNotificationAsRead,
  onMarkAllNotificationsAsRead,
  onClearAllNotifications,
  onOpenMobileMenu,
  onSearchClick,
  searchQuery,
  onSearchChange,
  onNavigateToAbout
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header 
      id="top-app-bar"
      className="bg-[#fef8f7] border-b border-[#d8c1c2] flex justify-between items-center w-full px-6 py-4 lg:pl-[284px] fixed top-0 z-40 h-[72px] transition-all"
    >
      {/* Left: Mobile Toggle & Title */}
      <div className="flex items-center gap-3">
        <button
          id="btn-mobile-menu"
          onClick={onOpenMobileMenu}
          className="lg:hidden text-[#534344] hover:bg-[#ede7e6] p-2 rounded-full transition-colors flex items-center justify-center"
          aria-label="Buka menu navigasi"
        >
          <Menu className="w-5 h-5 text-[#480e1a]" />
        </button>

        <div>
          <span className="font-geist text-[18px] sm:text-[20px] font-bold text-[#480e1a] lg:hidden">
            PAW Dashboard
          </span>
          <span className="hidden lg:block font-geist text-[16px] font-semibold text-[#534344]">
            Pengembangan Aplikasi Website
          </span>
        </div>
      </div>

      {/* Right: Search, Notifications & Avatar */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Search Input on Desktop */}
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 text-[#867274] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="header-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari tugas, materi, teknologi..."
            className="pl-9 pr-8 py-2 bg-[#ffffff] border border-[#d8c1c2] rounded-full text-[14px] text-[#1d1b1b] placeholder:text-[#867274] focus:outline-none focus:border-[#64242f] focus:ring-1 focus:ring-[#64242f] w-56 lg:w-72 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#867274] hover:text-[#1d1b1b]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Mobile Search Icon Trigger */}
        <button
          onClick={onSearchClick}
          className="md:hidden text-[#534344] hover:bg-[#ede7e6] p-2 rounded-full transition-colors"
          title="Cari"
          aria-label="Cari tugas"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
          <button
            id="btn-notifications-dropdown"
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-[#534344] hover:bg-[#ede7e6] p-2 rounded-full transition-colors relative flex items-center justify-center"
            title="Notifikasi"
            aria-label="Notifikasi"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#a5393c] rounded-full ring-2 ring-[#fef8f7] animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#ffffff] rounded-xl border border-[#d8c1c2] soft-shadow py-2 z-50 animate-in fade-in-50 zoom-in-95">
              <div className="px-4 py-2.5 border-b border-[#ede7e6] flex items-center justify-between">
                <div className="font-geist text-[14px] font-bold text-[#480e1a] flex items-center gap-2">
                  <span>Notifikasi Kuliah</span>
                  {unreadCount > 0 && (
                    <span className="bg-[#fd7b7b]/20 text-[#a5393c] px-2 py-0.5 rounded-full text-[11px] font-semibold">
                      {unreadCount} baru
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-[11px]">
                  {unreadCount > 0 && onMarkAllNotificationsAsRead && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onMarkAllNotificationsAsRead();
                      }}
                      className="text-[#64242f] hover:underline font-medium cursor-pointer"
                    >
                      Baca Semua
                    </button>
                  )}
                  {notifications.length > 0 && onClearAllNotifications && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onClearAllNotifications();
                      }}
                      className="text-[#867274] hover:text-[#ba1a1a] font-medium cursor-pointer"
                    >
                      Bersihkan
                    </button>
                  )}
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-[#ede7e6]">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-[13px] text-[#867274]">
                    Belum ada notifikasi baru
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3.5 hover:bg-[#f9f2f1] transition-colors cursor-pointer ${
                        !n.read ? 'bg-[#fef8f7]' : ''
                      }`}
                      onClick={() => onMarkNotificationAsRead(n.id)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-[13px] font-semibold text-[#1d1b1b] leading-tight">
                          {n.title}
                        </h4>
                        {!n.read && (
                          <span className="w-2 h-2 rounded-full bg-[#a5393c] flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-[12px] text-[#534344] mt-1 line-clamp-2">
                        {n.message}
                      </p>
                      <div className="flex items-center justify-between mt-2 pt-1 text-[11px] text-[#867274]">
                        <span>{n.time}</span>
                        {!n.read && (
                          <span className="text-[#a5393c] font-medium flex items-center gap-1 hover:underline">
                            <Check className="w-3 h-3" /> Tandai sudah dibaca
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Student Avatar & Quick Menu */}
        <div className="relative" ref={profileRef}>
          <button
            id="btn-profile-quick-menu"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 group focus:outline-none"
            aria-label="Profil Mahasiswa"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#d8c1c2] group-hover:border-[#64242f] transition-all bg-[#ede7e6] shadow-xs">
              <img
                src={profile.avatarUrl || HEADER_AVATAR}
                alt="Student Avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/image.jpeg';
                }}
              />
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-[#ffffff] rounded-xl border border-[#d8c1c2] soft-shadow py-2 z-50 animate-in fade-in-50 zoom-in-95">
              <div className="px-4 py-3 border-b border-[#ede7e6] flex items-center gap-3">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#d8c1c2]"
                />
                <div className="overflow-hidden">
                  <div className="font-geist text-[14px] font-bold text-[#1d1b1b] truncate">
                    {profile.name}
                  </div>
                  <div className="text-[12px] text-[#534344] truncate">
                    {profile.role}
                  </div>
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onNavigateToAbout();
                  }}
                  className="w-full px-4 py-2 text-left text-[13px] text-[#1d1b1b] hover:bg-[#f9f2f1] flex items-center justify-between"
                >
                  <span>Lihat Profil Lengkap</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#867274]" />
                </button>
                <div className="px-4 py-2 text-[11px] text-[#867274] border-t border-[#ede7e6] mt-1">
                  NIM: {profile.nim}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
