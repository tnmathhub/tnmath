import type { Language } from '@/types';

// ============================================================
// Lightweight UI dictionary — English / Tamil.
// Covers navigation, common actions, and the chapter/question
// flow where bilingual support matters most. Extend this map to
// translate more of the app; every page can already consume it
// via useTranslation() below.
// ============================================================

const dictionary = {
  // Nav
  dashboard: { en: 'Dashboard', ta: 'முகப்பு' },
  chapters: { en: 'Chapters', ta: 'அத்தியாயங்கள்' },
  modelExams: { en: 'Model Exams', ta: 'மாதிரி தேர்வுகள்' },
  uploadAnswers: { en: 'Upload Answers', ta: 'விடைகளை பதிவேற்றவும்' },
  results: { en: 'Results', ta: 'முடிவுகள்' },
  subscription: { en: 'Subscription', ta: 'சந்தா' },
  content: { en: 'Content', ta: 'உள்ளடக்கம்' },
  correction: { en: 'Correction', ta: 'திருத்தம்' },
  classes: { en: 'Classes', ta: 'வகுப்புகள்' },
  users: { en: 'Users', ta: 'பயனர்கள்' },
  reports: { en: 'Reports', ta: 'அறிக்கைகள்' },
  accessControl: { en: 'Access Control', ta: 'அணுகல் கட்டுப்பாடு' },

  // Common actions
  submit: { en: 'Submit', ta: 'சமர்ப்பிக்கவும்' },
  cancel: { en: 'Cancel', ta: 'ரத்துசெய்' },
  save: { en: 'Save', ta: 'சேமிக்கவும்' },
  saveAnswer: { en: 'Save answer', ta: 'விடையை சேமிக்கவும்' },
  back: { en: 'Back', ta: 'பின்செல்' },
  upgrade: { en: 'Upgrade', ta: 'மேம்படுத்து' },

  // Chapter / question flow
  chapterQuestions: { en: 'Chapter questions', ta: 'அத்தியாய வினாக்கள்' },
  mcq: { en: 'MCQ', ta: 'பலவுள் தேர்வு' },
  twoMark: { en: '2 Mark', ta: '2 மதிப்பெண்' },
  threeMark: { en: '3 Mark', ta: '3 மதிப்பெண்' },
  fiveMark: { en: '5 Mark', ta: '5 மதிப்பெண்' },
  premiumLocked: { en: 'Premium content', ta: 'பிரீமியம் உள்ளடக்கம்' },
  premiumLockedDesc: {
    en: 'Unlock this chapter with a Premium subscription to access all questions.',
    ta: 'இந்த அத்தியாயத்தின் அனைத்து வினாக்களையும் பெற பிரீமியம் சந்தாவை பெறவும்.',
  },
  finalAnswer: { en: 'Final answer', ta: 'இறுதி விடை' },
  explanation: { en: 'Short explanation', ta: 'சுருக்க விளக்கம்' },
  keySteps: { en: 'Key steps', ta: 'முக்கிய படிகள்' },
  addStep: { en: 'Add step', ta: 'படி சேர்க்க' },
  step: { en: 'Step', ta: 'படி' },
  uploadWork: { en: 'Upload handwritten work', ta: 'கையால் எழுதிய பணியை பதிவேற்றவும்' },
  uploadWorkHint: {
    en: 'Photos or PDFs of your handwritten solution, diagrams, graphs, tables, or rough work.',
    ta: 'உங்கள் கையால் எழுதிய தீர்வு, வரைபடங்கள், வரைகோடுகள், அட்டவணைகள் அல்லது வரைவு வேலையின் புகைப்படங்கள்/PDF கள்.',
  },
  answerThisQuestion: { en: 'Answer this question', ta: 'இந்த வினாவிற்கு பதிலளிக்கவும்' },
  checkAnswer: { en: 'Check answer', ta: 'விடையை சரிபார்க்கவும்' },
  correct: { en: 'Correct!', ta: 'சரி!' },
  incorrect: { en: 'Incorrect', ta: 'தவறு' },
  correctAnswerIs: { en: 'Correct answer', ta: 'சரியான விடை' },
  mathEditor: { en: 'Math Editor', ta: 'கணித எடிட்டர்' },
  preview: { en: 'Preview', ta: 'முன்னோட்டம்' },
} as const;

export type TranslationKey = keyof typeof dictionary;

export function t(key: TranslationKey, language: Language): string {
  return dictionary[key][language];
}

export const translate = t;
