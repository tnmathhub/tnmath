import type { TranslationKey } from '@/utils/i18n';

export type UserRole = 'student' | 'teacher' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  username?: string;
  email: string;
  role: UserRole;
  schoolName?: string;
  district?: string;
  qualification?: string;
  phone?: string;
  avatarInitial?: string;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  tamilTitle?: string;
  description: string;
  topicsCount: number;
  progress: number; // 0-100
  isPremium: boolean;
  estMinutes: number;
}

export interface ModelExam {
  id: string;
  title: string;
  type: 'Chapter Test' | 'Model Exam' | 'Public Exam Pattern';
  durationMins: number;
  totalMarks: number;
  questionCount: number;
  chapters: string[];
  attempted: boolean;
  scorePercent?: number;
}

export interface AnswerSheet {
  id: string;
  examTitle: string;
  studentName: string;
  submittedOn: string;
  status: 'pending' | 'in-review' | 'corrected';
  score?: number;
  maxScore: number;
  fileName: string;
}

export interface SubscriptionPlan {
  id: string;
  role: UserRole;
  name: string;
  price: number;
  billing: 'monthly' | 'yearly';
  features: string[];
  highlighted?: boolean;
}

export interface ClassGroup {
  id: string;
  name: string;
  studentCount: number;
  section: string;
}

export interface ReportRow {
  id: string;
  label: string;
  value: string | number;
  delta?: string;
  trend?: 'up' | 'down' | 'flat';
}

export interface NavItem {
  label: string;
  labelKey?: TranslationKey;
  path: string;
  icon: IconName;
}

export type IconName =
  | 'dashboard' | 'book' | 'exam' | 'upload' | 'result' | 'card'
  | 'content' | 'correction' | 'class' | 'user' | 'report' | 'shield'
  | 'settings' | 'logout' | 'menu' | 'bell' | 'search' | 'chevron'
  | 'sigma' | 'check' | 'close' | 'plus' | 'download' | 'clock';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  /** Epoch ms when the access token stops being valid. */
  accessTokenExpiresAt: number;
}

// ============================================================
// Chapter-wise question bank + descriptive answer submissions
// ============================================================

export type QuestionType = 'mcq' | '2-mark' | '3-mark' | '5-mark';

export interface Question {
  id: string;
  chapterId: string;
  type: QuestionType;
  marks: number;
  text: string;
  textTa?: string;
  /** MCQ only */
  options?: string[];
  optionsTa?: string[];
  correctOptionIndex?: number;
  isPremium: boolean;
}

export type UploadedFileTag = 'diagram' | 'graph' | 'table' | 'rough-work' | 'other';

export interface UploadedAnswerFile {
  id: string;
  file: File;
  tag: UploadedFileTag;
}

export interface DescriptiveAnswerDraft {
  finalAnswerLatex: string;
  explanation: string;
  steps: string[];
  files: UploadedAnswerFile[];
}

export type Language = 'en' | 'ta';
