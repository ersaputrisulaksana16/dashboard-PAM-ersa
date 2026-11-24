export type TaskStatus = 'completed' | 'in_progress' | 'not_started';

export type TaskCategory = 'Web Dev' | 'UI/UX Design' | 'Front-end' | 'Back-end' | 'Design';

export interface Task {
  id: string;
  week: number;
  weekStr: string; // e.g. "Minggu 04" or "Week 04"
  title: string;
  description: string;
  dateGiven: string; // YYYY-MM-DD
  deadline: string; // YYYY-MM-DD or formatted "20 Oct 2024"
  status: TaskStatus;
  category: TaskCategory;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  attachmentFileName?: string;
  notes?: string;
  score?: number;
  feedback?: string;
}

export interface PortfolioProject {
  id: string;
  title: string; // e.g. "Week 03: Responsive Layout"
  weekNumber: number;
  description: string;
  fullOverview?: string;
  tags: string[];
  status: TaskStatus;
  imageUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  highlights?: string[];
}

export interface StudentProfile {
  name: string;
  nim: string;
  role: string;
  statusTag: string;
  university: string;
  courseName: string;
  avatarUrl: string;
  bio: string;
  projectsCount: number;
  certificatesCount: number;
  skills: string[];
  email: string;
  githubUrl: string;
  linkedinUrl: string;
}

export interface CourseNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'deadline' | 'grade' | 'announcement';
}

export type ActiveNavTab = 'dashboard' | 'tasks' | 'add_task' | 'portfolio' | 'cv_task' | 'luve_beauty' | 'about' | 'settings';
