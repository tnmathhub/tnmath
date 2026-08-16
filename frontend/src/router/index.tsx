import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout/Layout';
import { ProtectedRoute } from '@/components/routing/ProtectedRoute';

import { Landing } from '@/pages/Landing/Landing';
import { About } from '@/pages/Marketing/About/About';
import { Career } from '@/pages/Marketing/Career/Career';
import { AISolver } from '@/pages/Marketing/AISolver/AISolver';
import { Login } from '@/pages/Auth/Login';
import { Register } from '@/pages/Auth/Register';
import { ForgotPassword } from '@/pages/Auth/ForgotPassword';
import { ResetPassword } from '@/pages/Auth/ResetPassword';
import { NotFound } from '@/pages/NotFound/NotFound';
import { Profile } from '@/pages/Profile/Profile';

import { StudentDashboard } from '@/pages/Student/Dashboard/StudentDashboard';
import { Chapters } from '@/pages/Student/Chapters/Chapters';
import { ChapterDetail } from '@/pages/Student/ChapterDetail/ChapterDetail';
import { QuestionAnswer } from '@/pages/Student/QuestionAnswer/QuestionAnswer';
import { Exams } from '@/pages/Student/Exams/Exams';
import { ExamAttempt } from '@/pages/Student/ExamAttempt/ExamAttempt';
import { AnswerUpload } from '@/pages/Student/AnswerUpload/AnswerUpload';
import { Results } from '@/pages/Student/Results/Results';
import { Subscription } from '@/pages/Student/Subscription/Subscription';

import { TeacherDashboard } from '@/pages/Teacher/Dashboard/TeacherDashboard';
import { Content } from '@/pages/Teacher/Content/Content';
import { Correction } from '@/pages/Teacher/Correction/Correction';
import { Classes } from '@/pages/Teacher/Classes/Classes';
import { TeacherSubscription } from '@/pages/Teacher/Subscription/TeacherSubscription';

import { AdminDashboard } from '@/pages/Admin/Dashboard/AdminDashboard';
import { Users } from '@/pages/Admin/Users/Users';
import { Reports } from '@/pages/Admin/Reports/Reports';
import { Subscriptions } from '@/pages/Admin/Subscriptions/Subscriptions';
import { AccessControl } from '@/pages/Admin/AccessControl/AccessControl';

export const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/about', element: <About /> },
  { path: '/career', element: <Career /> },
  { path: '/ai-solver', element: <AISolver /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/reset-password', element: <ResetPassword /> },

  {
    element: (
      <ProtectedRoute allowedRoles={['student']}>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/student/dashboard', element: <StudentDashboard /> },
      { path: '/student/chapters', element: <Chapters /> },
      { path: '/student/chapters/:chapterId', element: <ChapterDetail /> },
      { path: '/student/chapters/:chapterId/questions/:questionId', element: <QuestionAnswer /> },
      { path: '/student/exams', element: <Exams /> },
      { path: '/student/exams/:examId', element: <ExamAttempt /> },
      { path: '/student/answer-upload', element: <AnswerUpload /> },
      { path: '/student/results', element: <Results /> },
      { path: '/student/subscription', element: <Subscription /> },
    ],
  },

  {
    element: (
      <ProtectedRoute allowedRoles={['teacher']}>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/teacher/dashboard', element: <TeacherDashboard /> },
      { path: '/teacher/content', element: <Content /> },
      { path: '/teacher/correction', element: <Correction /> },
      { path: '/teacher/classes', element: <Classes /> },
      { path: '/teacher/subscription', element: <TeacherSubscription /> },
    ],
  },

  {
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/admin/dashboard', element: <AdminDashboard /> },
      { path: '/admin/users', element: <Users /> },
      { path: '/admin/reports', element: <Reports /> },
      { path: '/admin/subscriptions', element: <Subscriptions /> },
      { path: '/admin/access-control', element: <AccessControl /> },
    ],
  },

  {
    element: (
      <ProtectedRoute allowedRoles={['student', 'teacher', 'admin']}>
        <Layout />
      </ProtectedRoute>
    ),
    children: [{ path: '/profile', element: <Profile /> }],
  },

  { path: '/dashboard', element: <Navigate to="/student/dashboard" replace /> },
  { path: '*', element: <NotFound /> },
]);
