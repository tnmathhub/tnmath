import type { ReportRow } from '@/types';

export const adminOverviewStats: ReportRow[] = [
  { id: 'r-1', label: 'Active Students', value: 1284, delta: '+6.2%', trend: 'up' },
  { id: 'r-2', label: 'Active Teachers', value: 42, delta: '+2', trend: 'up' },
  { id: 'r-3', label: 'Model Exams Conducted', value: 96, delta: '+11', trend: 'up' },
  { id: 'r-4', label: 'Avg. Correction Turnaround', value: '18 hrs', delta: '-3 hrs', trend: 'down' },
];

export const chapterCompletionReport: ReportRow[] = [
  { id: 'c-1', label: 'Matrices and Determinants', value: '91%' },
  { id: 'c-2', label: 'Complex Numbers', value: '76%' },
  { id: 'c-3', label: 'Theory of Equations', value: '58%' },
  { id: 'c-4', label: 'Inverse Trigonometric Functions', value: '34%' },
  { id: 'c-5', label: 'Analytical Geometry II', value: '19%' },
];
