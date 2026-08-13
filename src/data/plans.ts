import type { SubscriptionPlan } from '@/types';

export const plans: SubscriptionPlan[] = [
  { id: 'p-student-free', role: 'student', name: 'Student — Free', price: 0, billing: 'monthly', features: ['3 chapters unlocked', '2 chapter tests / month', 'Community doubt forum'] },
  { id: 'p-student-premium', role: 'student', name: 'Student — Premium', price: 199, billing: 'monthly', features: ['All 12 chapters unlocked', 'Unlimited model exams', 'Answer-sheet correction (5/month)', 'Progress analytics'], highlighted: true },
  { id: 'p-teacher', role: 'teacher', name: 'Teacher Plan', price: 499, billing: 'monthly', features: ['Correction dashboard', 'Class management for up to 5 sections', 'Bulk answer-sheet upload', 'Performance reports'] },
  { id: 'p-school', role: 'admin', name: 'School Plan', price: 14999, billing: 'yearly', features: ['Unlimited students & teachers', 'Full admin & access control', 'School-wide analytics', 'Priority support & onboarding'], highlighted: true },
];
