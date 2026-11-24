import { Task, PortfolioProject, StudentProfile, CourseNotification } from '../types';

export const INITIAL_TASKS: Task[] = [];

export const INITIAL_PROJECTS: PortfolioProject[] = [];

export const INITIAL_PROFILE: StudentProfile = {
  name: 'R Ersa Putri Sulaksana',
  nim: '2210511099',
  role: 'Mahasiswa Teknik Informatika',
  statusTag: 'Active Student',
  university: 'UIN Sunan Gunung Djati Bandung',
  courseName: 'Pengembangan Aplikasi Web (PAW)',
  avatarUrl: '/image.jpeg',
  bio: 'Mahasiswa Teknik Informatika di UIN Sunan Gunung Djati Bandung dengan minat dalam pengembangan web dan pemrograman. Aktif dalam organisasi kemahasiswaan HIMATIF, PMII, dan kepemudaan Paskibra serta bertekad menjadi programmer handal.',
  projectsCount: 0,
  certificatesCount: 0,
  skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS', 'TypeScript', 'Git & GitHub', 'REST API', 'Figma'],
  email: 'ersaputrisulaksana997@gmail.com',
  githubUrl: 'https://github.com/ersaputrisulaksana',
  linkedinUrl: 'https://www.instagram.com/chaaaxei_97'
};

export const INITIAL_NOTIFICATIONS: CourseNotification[] = [];

export const UNIVERSITY_LOGO = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoTuqoBfIfYit3YRYh-C9vTIjo9i0VwhW-bPX6hKqwGTGA1cBdbW9zDSLw_8NunPbY6qMGSgMFQsVO3yQWaofop-rxOFwTO7gK8xYpxEY_FmS3aUKDMewWF7q7kVA9uBwSPIzQRiL7Wp-wUMc6KggpNnoIGs573EJIMTQQWCRVjT89P7J6bFYdgfJDiIMJSc3shFrWiGkXoFYELoCTCuAyasDSCHRBHvdQGkngrEwhtrknXONGL0DSbQ';
export const HEADER_AVATAR = '/image.jpeg';
