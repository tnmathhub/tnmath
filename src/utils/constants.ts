import type { NavItem, UserRole } from '@/types';

// NOTE: School Admin registration/login and the Subscription (plans/billing)
// pages are intentionally not linked from the active nav or auth flow right
// now — student + teacher is the current scope. Nothing was deleted: the
// Admin pages, routes, and Subscription pages for all three roles still
// exist under src/pages/ and src/router/index.tsx. To bring any of it back:
//   1. Add the role option back in Login.tsx / Register.tsx
//   2. Add the nav item(s) back below
// That's it — everything else (routes, pages, data) is already wired.

export const APP_NAME = 'TN Maths 12';
export const APP_FULL_NAME = 'Tamil Nadu Class 12 Maths Platform';

export const ROLE_LABEL: Record<UserRole, string> = {
  student: 'Student',
  teacher: 'Teacher',
  admin: 'School Admin',
};

export const NAV_ITEMS: Record<UserRole, NavItem[]> = {
  student: [
    { label: 'Dashboard', labelKey: 'dashboard', path: '/student/dashboard', icon: 'dashboard' },
    { label: 'Chapters', labelKey: 'chapters', path: '/student/chapters', icon: 'book' },
    { label: 'Model Exams', labelKey: 'modelExams', path: '/student/exams', icon: 'exam' },
    { label: 'Upload Answers', labelKey: 'uploadAnswers', path: '/student/answer-upload', icon: 'upload' },
    { label: 'Results', labelKey: 'results', path: '/student/results', icon: 'result' },
    // Subscription nav item disabled for now — see NOTE at top of file.
  ],
  teacher: [
    { label: 'Dashboard', labelKey: 'dashboard', path: '/teacher/dashboard', icon: 'dashboard' },
    { label: 'Content', labelKey: 'content', path: '/teacher/content', icon: 'content' },
    { label: 'Correction', labelKey: 'correction', path: '/teacher/correction', icon: 'correction' },
    { label: 'Classes', labelKey: 'classes', path: '/teacher/classes', icon: 'class' },
    // Subscription nav item disabled for now — see NOTE at top of file.
  ],
  admin: [
    { label: 'Dashboard', labelKey: 'dashboard', path: '/admin/dashboard', icon: 'dashboard' },
    { label: 'Users', labelKey: 'users', path: '/admin/users', icon: 'user' },
    { label: 'Reports', labelKey: 'reports', path: '/admin/reports', icon: 'report' },
    { label: 'Subscriptions', labelKey: 'subscription', path: '/admin/subscriptions', icon: 'card' },
    { label: 'Access Control', labelKey: 'accessControl', path: '/admin/access-control', icon: 'shield' },
  ],
};
