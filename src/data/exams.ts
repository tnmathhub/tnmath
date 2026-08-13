import type { ModelExam } from '@/types';

export const exams: ModelExam[] = [
  { id: 'ex-1', title: 'Chapter 1 Test — Matrices & Determinants', type: 'Chapter Test', durationMins: 45, totalMarks: 50, questionCount: 20, chapters: ['Applications of Matrices and Determinants'], attempted: true, scorePercent: 88 },
  { id: 'ex-2', title: 'Chapter 2 Test — Complex Numbers', type: 'Chapter Test', durationMins: 45, totalMarks: 50, questionCount: 20, chapters: ['Complex Numbers'], attempted: true, scorePercent: 72 },
  { id: 'ex-3', title: 'Model Exam 1 — Chapters 1 to 4', type: 'Model Exam', durationMins: 120, totalMarks: 90, questionCount: 45, chapters: ['Matrices', 'Complex Numbers', 'Theory of Equations', 'Inverse Trig Functions'], attempted: false },
  { id: 'ex-4', title: 'Public Exam Pattern — Full Syllabus', type: 'Public Exam Pattern', durationMins: 180, totalMarks: 90, questionCount: 45, chapters: ['All 12 chapters'], attempted: false },
  { id: 'ex-5', title: 'Chapter 3 Test — Theory of Equations', type: 'Chapter Test', durationMins: 45, totalMarks: 50, questionCount: 20, chapters: ['Theory of Equations'], attempted: false },
];
