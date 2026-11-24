import React, { useState, useEffect } from 'react';
import { ActiveNavTab, Task, TaskStatus, PortfolioProject, StudentProfile, CourseNotification } from './types';
import { INITIAL_PROFILE, INITIAL_TASKS, INITIAL_PROJECTS, INITIAL_NOTIFICATIONS } from './data/initialData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { WeeklyTasksView } from './components/WeeklyTasksView';
import { AddTaskView } from './components/AddTaskView';
import { PortfolioView } from './components/PortfolioView';
import { AboutMeView } from './components/AboutMeView';
import { SettingsView } from './components/SettingsView';
import { TaskDetailModal } from './components/TaskDetailModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { EditProfileModal } from './components/EditProfileModal';
import { AddProjectModal } from './components/AddProjectModal';
import { CvTaskView } from './components/CvTaskView';
import { LuveBeautyView } from './components/LuveBeautyView';
import { findById } from './utils/taskHelpers';

const APP_NAME = import.meta.env.VITE_APP_NAME || 'PAW Dashboard';
const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveNavTab>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Local Storage initialized state
  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('paw_profile');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        const isOldAvatar = !parsed.avatarUrl || parsed.avatarUrl.includes('googleusercontent');
        const isOldName = !parsed.name || parsed.name === 'Eca';
        return {
          ...parsed,
          name: isOldName ? INITIAL_PROFILE.name : parsed.name,
          university: isOldName ? INITIAL_PROFILE.university : parsed.university,
          avatarUrl: isOldAvatar ? '/image.jpeg' : parsed.avatarUrl,
          projectsCount: parsed.projectsCount || 0
        };
      } catch (e) {}
    }
    return INITIAL_PROFILE;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    // Clear old legacy mock data if exists
    if (localStorage.getItem('paw_tasks') && !localStorage.getItem('paw_tasks_v2')) {
      localStorage.removeItem('paw_tasks');
    }
    const saved = localStorage.getItem('paw_tasks_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_TASKS;
  });

  const [projects, setProjects] = useState<PortfolioProject[]>(() => {
    // Clear old legacy mock projects
    if (localStorage.getItem('paw_projects') && !localStorage.getItem('paw_projects_v2')) {
      localStorage.removeItem('paw_projects');
    }
    const saved = localStorage.getItem('paw_projects_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_PROJECTS;
  });

  const [notifications, setNotifications] = useState<CourseNotification[]>(() => {
    // Clear old legacy mock notifications
    if (localStorage.getItem('paw_notifications') && !localStorage.getItem('paw_notifications_v2')) {
      localStorage.removeItem('paw_notifications');
    }
    const saved = localStorage.getItem('paw_notifications_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Modals state
  const [selectedTaskForDetail, setSelectedTaskForDetail] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState<PortfolioProject | null>(null);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('paw_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('paw_tasks_v2', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('paw_projects_v2', JSON.stringify(projects));
    setProfile(prev => ({
      ...prev,
      projectsCount: projects.length
    }));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('paw_notifications_v2', JSON.stringify(notifications));
  }, [notifications]);

  // Handlers
  const handleSaveTask = (newTaskData: Omit<Task, 'id'>) => {
    if (editingTask) {
      // Update existing
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...newTaskData, id: editingTask.id } : t));
      
      // Check for status changes during edit
      if (editingTask.status !== newTaskData.status) {
        if (newTaskData.status === 'in_progress') {
          const statusNotif: CourseNotification = {
            id: `notif_${Date.now()}_prog`,
            title: 'Tugas Sedang Dikerjakan',
            message: `Tugas "${newTaskData.title}" (${newTaskData.weekStr || `Minggu ${newTaskData.week}`}) kini sedang aktif dikerjakan.`,
            time: 'Baru saja',
            read: false,
            type: 'announcement'
          };
          setNotifications(prev => [statusNotif, ...prev]);
        } else if (newTaskData.status === 'completed') {
          const statusNotif: CourseNotification = {
            id: `notif_${Date.now()}_comp`,
            title: 'Tugas Selesai Dikerjakan 🎉',
            message: `Selamat! Tugas "${newTaskData.title}" (${newTaskData.weekStr || `Minggu ${newTaskData.week}`}) telah berhasil diselesaikan.`,
            time: 'Baru saja',
            read: false,
            type: 'grade'
          };
          setNotifications(prev => [statusNotif, ...prev]);
        }
      }
      setEditingTask(null);
    } else {
      // Create new
      const newTask: Task = {
        ...newTaskData,
        id: `task_${Date.now()}`
      };
      setTasks([newTask, ...tasks]);

      // Trigger notification for new task
      const newNotifs: CourseNotification[] = [];
      newNotifs.push({
        id: `notif_${Date.now()}_add`,
        title: 'Tugas Baru Ditambahkan',
        message: `Tugas "${newTask.title}" (${newTask.weekStr || `Minggu ${newTask.week}`}) berhasil ditambahkan ke daftar tugas.`,
        time: 'Baru saja',
        read: false,
        type: 'announcement'
      });

      if (newTask.status === 'in_progress') {
        newNotifs.push({
          id: `notif_${Date.now()}_prog`,
          title: 'Tugas Sedang Dikerjakan',
          message: `Tugas "${newTask.title}" ditandai sedang aktif dikerjakan.`,
          time: 'Baru saja',
          read: false,
          type: 'announcement'
        });
      } else if (newTask.status === 'completed') {
        newNotifs.push({
          id: `notif_${Date.now()}_comp`,
          title: 'Tugas Selesai Dikerjakan',
          message: `Selamat! Tugas "${newTask.title}" telah berhasil diselesaikan.`,
          time: 'Baru saja',
          read: false,
          type: 'grade'
        });
      }

      setNotifications(prev => [...newNotifs, ...prev]);
    }
    setActiveTab('tasks');
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setActiveTab('add_task');
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
    if (selectedTaskForDetail?.id === id) {
      setSelectedTaskForDetail(null);
    }
  };

  const handleToggleTaskStatus = (id: string, newStatus: TaskStatus) => {
    const targetTask = findById<Task>(tasks, id);
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
    
    if (selectedTaskForDetail && selectedTaskForDetail.id === id) {
      setSelectedTaskForDetail({ ...selectedTaskForDetail, status: newStatus });
    }

    if (targetTask && targetTask.status !== newStatus) {
      if (newStatus === 'in_progress') {
        const notif: CourseNotification = {
          id: `notif_${Date.now()}_prog`,
          title: 'Tugas Sedang Dikerjakan',
          message: `Tugas "${targetTask.title}" (${targetTask.weekStr || `Minggu ${targetTask.week}`}) kini sedang aktif dikerjakan.`,
          time: 'Baru saja',
          read: false,
          type: 'announcement'
        };
        setNotifications(prev => [notif, ...prev]);
      } else if (newStatus === 'completed') {
        const notif: CourseNotification = {
          id: `notif_${Date.now()}_comp`,
          title: 'Tugas Selesai Dikerjakan 🎉',
          message: `Selamat! Tugas "${targetTask.title}" (${targetTask.weekStr || `Minggu ${targetTask.week}`}) telah berhasil diselesaikan.`,
          time: 'Baru saja',
          read: false,
          type: 'grade'
        };
        setNotifications(prev => [notif, ...prev]);
      } else if (newStatus === 'not_started') {
        const notif: CourseNotification = {
          id: `notif_${Date.now()}_reset`,
          title: 'Status Tugas Diperbarui',
          message: `Status tugas "${targetTask.title}" diubah kembali ke Belum Dimulai.`,
          time: 'Baru saja',
          read: false,
          type: 'announcement'
        };
        setNotifications(prev => [notif, ...prev]);
      }
    }
  };

  const handleSaveProject = (newProjectData: Omit<PortfolioProject, 'id'>) => {
    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? { ...newProjectData, id: editingProject.id } : p));
      setEditingProject(null);
    } else {
      const newProj: PortfolioProject = {
        ...newProjectData,
        id: `proj_${Date.now()}`
      };
      setProjects([newProj, ...projects]);
    }
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
    if (selectedProjectForDetail?.id === id) {
      setSelectedProjectForDetail(null);
    }
  };

  const handleAddSkill = (skill: string) => {
    if (!profile.skills.includes(skill)) {
      setProfile({
        ...profile,
        skills: [...profile.skills, skill]
      });
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter(s => s !== skillToRemove)
    });
  };

  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  const handleResetData = () => {
    setProfile(INITIAL_PROFILE);
    setTasks(INITIAL_TASKS);
    setProjects(INITIAL_PROJECTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    localStorage.removeItem('paw_profile');
    localStorage.removeItem('paw_tasks');
    localStorage.removeItem('paw_tasks_v2');
    localStorage.removeItem('paw_projects');
    localStorage.removeItem('paw_projects_v2');
    localStorage.removeItem('paw_notifications');
    localStorage.removeItem('paw_notifications_v2');
  };

  return (
    <div className="min-h-screen bg-[#fef8f7] text-[#1d1b1b] flex flex-col font-geist antialiased selection:bg-[#fd7b7b]/30 selection:text-[#480e1a]">
      {/* Fixed Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'add_task') {
            setEditingTask(null);
          }
        }}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Top Navigation Bar */}
      <Header
        profile={profile}
        notifications={notifications}
        onMarkNotificationAsRead={handleMarkNotificationAsRead}
        onMarkAllNotificationsAsRead={handleMarkAllNotificationsAsRead}
        onClearAllNotifications={handleClearAllNotifications}
        onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (activeTab !== 'tasks' && q.trim().length > 0) {
            setActiveTab('tasks');
          }
        }}
        onSearchClick={() => setActiveTab('tasks')}
        onNavigateToAbout={() => setActiveTab('about')}
      />

      {/* Main Content Area */}
      <main 
        id="main-content"
        className="flex-1 lg:pl-[260px] pt-[72px] transition-all duration-300 min-h-screen flex flex-col"
      >
        <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex-1">
          {activeTab === 'dashboard' && (
            <DashboardView
              profile={profile}
              tasks={tasks}
              onNavigateToAddTask={() => {
                setEditingTask(null);
                setActiveTab('add_task');
              }}
              onNavigateToTasks={() => setActiveTab('tasks')}
              onNavigateToCvTask={() => setActiveTab('cv_task')}
              onNavigateToLuveBeauty={() => setActiveTab('luve_beauty')}
              onViewTask={(task) => setSelectedTaskForDetail(task)}
              onEditTask={handleEditTask}
            />
          )}

          {activeTab === 'tasks' && (
            <WeeklyTasksView
              tasks={tasks}
              initialSearch={searchQuery}
              onNavigateToAddTask={() => {
                setEditingTask(null);
                setActiveTab('add_task');
              }}
              onViewTask={(task) => setSelectedTaskForDetail(task)}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onToggleStatus={handleToggleTaskStatus}
            />
          )}

          {activeTab === 'add_task' && (
            <AddTaskView
              editingTask={editingTask}
              onSaveTask={handleSaveTask}
              onCancel={() => {
                setEditingTask(null);
                setActiveTab('tasks');
              }}
            />
          )}

          {activeTab === 'cv_task' && (
            <CvTaskView />
          )}

          {activeTab === 'luve_beauty' && (
            <LuveBeautyView />
          )}

          {activeTab === 'portfolio' && (
            <PortfolioView
              projects={projects}
              onViewProject={(project) => setSelectedProjectForDetail(project)}
              onAddProject={() => {
                setEditingProject(null);
                setIsAddProjectOpen(true);
              }}
              onDeleteProject={handleDeleteProject}
            />
          )}

          {activeTab === 'about' && (
            <AboutMeView
              profile={profile}
              onEditProfile={() => setIsEditProfileOpen(true)}
              onAddSkill={handleAddSkill}
              onRemoveSkill={handleRemoveSkill}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              profile={profile}
              onUpdateProfile={(updated) => setProfile({ ...profile, ...updated })}
              onResetData={handleResetData}
              tasksCount={tasks.length}
            />
          )}
        </div>

        {/* Global Academic Footer */}
        <footer className="border-t border-[#dfd9d8] py-6 px-6 lg:px-8 text-center text-[13px] text-[#534344] bg-[#fef8f7]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>
              &copy; {new Date().getFullYear()} {profile.name} • {APP_NAME} v{APP_VERSION} • {profile.courseName || 'Pengembangan Aplikasi Website'}
            </p>
            <p className="text-[12px] text-[#867274]">
              {profile.university || 'UIN Sunan Gunung Djati Bandung'}
            </p>
          </div>
        </footer>
      </main>

      {/* Modals */}
      {selectedTaskForDetail && (
        <TaskDetailModal
          task={selectedTaskForDetail}
          onClose={() => setSelectedTaskForDetail(null)}
          onEdit={(task) => {
            setSelectedTaskForDetail(null);
            handleEditTask(task);
          }}
          onStatusChange={handleToggleTaskStatus}
        />
      )}

      {selectedProjectForDetail && (
        <ProjectDetailModal
          project={selectedProjectForDetail}
          onClose={() => setSelectedProjectForDetail(null)}
        />
      )}

      {isAddProjectOpen && (
        <AddProjectModal
          isOpen={isAddProjectOpen}
          editingProject={editingProject}
          onClose={() => {
            setIsAddProjectOpen(false);
            setEditingProject(null);
          }}
          onSave={handleSaveProject}
        />
      )}

      {isEditProfileOpen && (
        <EditProfileModal
          profile={profile}
          isOpen={isEditProfileOpen}
          onClose={() => setIsEditProfileOpen(false)}
          onSave={(updated) => setProfile(updated)}
        />
      )}
    </div>
  );
}
