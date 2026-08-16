// ============================================================
// Centralized API endpoint map.
// Swap BASE_URL via VITE_API_BASE_URL in a .env file when the
// backend is ready — no other file should hardcode a URL.
// ============================================================

import { API_BASE_URL } from './apiBaseUrl';

export const BASE_URL: string =
  (import.meta.env.VITE_API_BASE_URL as string) || 'https://api.tnmathsplatform.com/v1';

const withBase = (path: string) => `${BASE_URL}${path}`;
const withApiBase = (path: string) => `${API_BASE_URL}${path}`;

export const API = {
  // Live endpoints on the deployed Django backend.
  hub: {
    registerStudent: withApiBase('/api/hub/register/student/'),
    registerTeacher: withApiBase('/api/hub/register/teacher/'),
  },

  auth: {
    login: withBase('/auth/login'),
    register: withBase('/auth/register'),
    logout: withBase('/auth/logout'),
    me: withBase('/auth/me'),
    refresh: withBase('/auth/refresh'),
    forgotPassword: withBase('/auth/forgot-password'),
    resetPassword: withBase('/auth/reset-password'),
    updateProfile: withBase('/auth/profile'),
    changePassword: withBase('/auth/change-password'),
  },

  student: {
    dashboard: withBase('/student/dashboard'),
    chapters: withBase('/student/chapters'),
    chapterDetail: (chapterId: string) => withBase(`/student/chapters/${chapterId}`),
    exams: withBase('/student/exams'),
    examDetail: (examId: string) => withBase(`/student/exams/${examId}`),
    submitExam: (examId: string) => withBase(`/student/exams/${examId}/submit`),
    uploadAnswerSheet: withBase('/student/answer-sheets'),
    results: withBase('/student/results'),
    resultDetail: (resultId: string) => withBase(`/student/results/${resultId}`),
    subscription: withBase('/student/subscription'),
  },

  teacher: {
    dashboard: withBase('/teacher/dashboard'),
    content: withBase('/teacher/content'),
    contentDetail: (contentId: string) => withBase(`/teacher/content/${contentId}`),
    correctionQueue: withBase('/teacher/correction'),
    correctionDetail: (sheetId: string) => withBase(`/teacher/correction/${sheetId}`),
    submitCorrection: (sheetId: string) => withBase(`/teacher/correction/${sheetId}/submit`),
    classes: withBase('/teacher/classes'),
    classDetail: (classId: string) => withBase(`/teacher/classes/${classId}`),
  },

  admin: {
    dashboard: withBase('/admin/dashboard'),
    users: withBase('/admin/users'),
    userDetail: (userId: string) => withBase(`/admin/users/${userId}`),
    reports: withBase('/admin/reports'),
    subscriptions: withBase('/admin/subscriptions'),
    subscriptionPlans: withBase('/admin/subscriptions/plans'),
    accessControl: withBase('/admin/access-control'),
    schools: withBase('/admin/schools'),
  },

  billing: {
    plans: withBase('/billing/plans'),
    checkout: withBase('/billing/checkout'),
    renew: withBase('/billing/renew'),
    upgrade: withBase('/billing/upgrade'),
    invoices: withBase('/billing/invoices'),
  },
} as const;
