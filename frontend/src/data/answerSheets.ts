import type { AnswerSheet } from '@/types';

export const answerSheets: AnswerSheet[] = [
  { id: 'as-1', examTitle: 'Model Exam 1 — Chapters 1 to 4', studentName: 'Priya Ramesh', submittedOn: '2026-07-20', status: 'corrected', score: 78, maxScore: 90, fileName: 'priya_model1.pdf' },
  { id: 'as-2', examTitle: 'Model Exam 1 — Chapters 1 to 4', studentName: 'Arun Kumar', submittedOn: '2026-07-21', status: 'in-review', maxScore: 90, fileName: 'arun_model1.pdf' },
  { id: 'as-3', examTitle: 'Chapter 3 Test — Theory of Equations', studentName: 'Divya Shree', submittedOn: '2026-07-23', status: 'pending', maxScore: 50, fileName: 'divya_ch3.pdf' },
  { id: 'as-4', examTitle: 'Chapter 3 Test — Theory of Equations', studentName: 'Karthik S', submittedOn: '2026-07-23', status: 'pending', maxScore: 50, fileName: 'karthik_ch3.pdf' },
  { id: 'as-5', examTitle: 'Public Exam Pattern — Full Syllabus', studentName: 'Meena Loganathan', submittedOn: '2026-07-19', status: 'corrected', score: 81, maxScore: 90, fileName: 'meena_public.pdf' },
];
