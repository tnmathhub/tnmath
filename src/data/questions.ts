import type { Question } from '@/types';
import { chapters } from './chapters';

// ------------------------------------------------------------------
// Hand-authored question sets for the two free chapters (Ch.1 & Ch.2)
// so the Tamil Q&A and premium-gating flow has real content to browse.
// Every other chapter gets a generated set of the same shape so the
// "MCQ / 2 / 3 / 5 mark" structure is consistent across all 12 chapters.
// ------------------------------------------------------------------

const chapter1Mcqs: Question[] = [
  { id: 'ch1-mcq-1', chapterId: 'ch-1', type: 'mcq', marks: 1, isPremium: false,
    text: 'If A is a square matrix such that A² = A, then (I + A)³ − 7A is equal to',
    textTa: 'A என்பது A² = A எனும் நிபந்தனையை நிறைவு செய்யும் ஒரு சதுர அணி எனில், (I + A)³ − 7A இன் மதிப்பு',
    options: ['A', 'I − A', 'I', '3A'], optionsTa: ['A', 'I − A', 'I', '3A'], correctOptionIndex: 2 },
  { id: 'ch1-mcq-2', chapterId: 'ch-1', type: 'mcq', marks: 1, isPremium: false,
    text: 'If A is a non-singular matrix, then det(A⁻¹) is equal to',
    textTa: 'A ஒரு ஒற்றைத்தன்மையற்ற அணி எனில், det(A⁻¹) இன் மதிப்பு',
    options: ['det(A)', '1 / det(A)', '0', '1'], optionsTa: ['det(A)', '1 / det(A)', '0', '1'], correctOptionIndex: 1 },
  { id: 'ch1-mcq-3', chapterId: 'ch-1', type: 'mcq', marks: 1, isPremium: false,
    text: 'The rank of a 3×3 identity matrix is',
    textTa: '3×3 அடையாள அணியின் தரம் (rank)',
    options: ['0', '1', '2', '3'], optionsTa: ['0', '1', '2', '3'], correctOptionIndex: 3 },
  { id: 'ch1-mcq-4', chapterId: 'ch-1', type: 'mcq', marks: 1, isPremium: false,
    text: 'If A is a 3×3 matrix and |A| = 4, then |adj A| is',
    textTa: 'A ஒரு 3×3 அணி மற்றும் |A| = 4 எனில், |adj A| இன் மதிப்பு',
    options: ['4', '8', '16', '64'], optionsTa: ['4', '8', '16', '64'], correctOptionIndex: 2 },
  { id: 'ch1-mcq-5', chapterId: 'ch-1', type: 'mcq', marks: 1, isPremium: false,
    text: 'A system of linear equations AX = B has a unique solution when',
    textTa: 'AX = B எனும் நேரியல் சமன்பாட்டு தொகுப்பிற்கு தனித்துவமான தீர்வு இருக்க வேண்டிய நிபந்தனை',
    options: ['|A| = 0', '|A| ≠ 0', 'A is not square', 'rank(A) = 0'], optionsTa: ['|A| = 0', '|A| ≠ 0', 'A சதுரமானது அல்ல', 'rank(A) = 0'], correctOptionIndex: 1 },
  { id: 'ch1-mcq-6', chapterId: 'ch-1', type: 'mcq', marks: 1, isPremium: false,
    text: 'The inverse of a matrix A exists only if',
    textTa: 'ஒரு அணி A இன் தலைகீழி இருப்பதற்கான நிபந்தனை',
    options: ['A is square and |A| ≠ 0', 'A is any matrix', 'A is symmetric', 'A is diagonal'],
    optionsTa: ['A சதுரமாகவும் |A| ≠ 0 ஆகவும் இருத்தல்', 'A எந்த அணியும் ஆகலாம்', 'A சமச்சீர் அணி', 'A குறுக்கு அணி'], correctOptionIndex: 0 },
  { id: 'ch1-mcq-7', chapterId: 'ch-1', type: 'mcq', marks: 1, isPremium: false,
    text: 'If the rank of an n×n matrix is less than n, the matrix is called',
    textTa: 'n×n அணியின் தரம் n ஐ விட குறைவாக இருந்தால், அந்த அணி அழைக்கப்படுவது',
    options: ['Non-singular', 'Singular', 'Identity', 'Diagonal'], optionsTa: ['ஒற்றைத்தன்மையற்றது', 'ஒற்றைத்தன்மையுடையது', 'அடையாள அணி', 'குறுக்கு அணி'], correctOptionIndex: 1 },
  { id: 'ch1-mcq-8', chapterId: 'ch-1', type: 'mcq', marks: 1, isPremium: false,
    text: 'Cramer\'s rule is used to solve',
    textTa: 'கிராமரின் விதி பயன்படுத்தப்படுவது',
    options: ['Quadratic equations', 'Systems of linear equations', 'Differential equations', 'Trigonometric equations'],
    optionsTa: ['இருபடிச் சமன்பாடுகள்', 'நேரியல் சமன்பாட்டு தொகுப்புகள்', 'வகைக்கெழுச் சமன்பாடுகள்', 'முக்கோணமிதி சமன்பாடுகள்'], correctOptionIndex: 1 },
  { id: 'ch1-mcq-9', chapterId: 'ch-1', type: 'mcq', marks: 1, isPremium: false,
    text: 'The adjoint of a 2×2 matrix [[a,b],[c,d]] is',
    textTa: '2×2 அணி [[a,b],[c,d]] இன் இணை அணி (adjoint)',
    options: ['[[d,-b],[-c,a]]', '[[a,b],[c,d]]', '[[d,b],[c,a]]', '[[-d,b],[c,-a]]'],
    optionsTa: ['[[d,-b],[-c,a]]', '[[a,b],[c,d]]', '[[d,b],[c,a]]', '[[-d,b],[c,-a]]'], correctOptionIndex: 0 },
  { id: 'ch1-mcq-10', chapterId: 'ch-1', type: 'mcq', marks: 1, isPremium: false,
    text: 'If A and B are invertible matrices of the same order, (AB)⁻¹ =',
    textTa: 'A மற்றும் B ஒரே வரிசையிலான தலைகீழி உள்ள அணிகள் எனில், (AB)⁻¹ =',
    options: ['A⁻¹B⁻¹', 'B⁻¹A⁻¹', 'AB', 'BA'], optionsTa: ['A⁻¹B⁻¹', 'B⁻¹A⁻¹', 'AB', 'BA'], correctOptionIndex: 1 },
  { id: 'ch1-mcq-11', chapterId: 'ch-1', type: 'mcq', marks: 1, isPremium: false,
    text: 'A homogeneous system of linear equations always has',
    textTa: 'ஒரு சமபடித்தான (homogeneous) நேரியல் சமன்பாட்டு தொகுப்பிற்கு எப்போதும் இருப்பது',
    options: ['No solution', 'The trivial solution', 'Infinite non-trivial solutions only', 'A unique non-zero solution'],
    optionsTa: ['தீர்வே இல்லை', 'சமன்ப தீர்வு (trivial solution)', 'எண்ணிலா trivial அல்லாத தீர்வுகள் மட்டும்', 'தனித்துவமான பூஜ்ஜியமற்ற தீர்வு'], correctOptionIndex: 1 },
  { id: 'ch1-mcq-12', chapterId: 'ch-1', type: 'mcq', marks: 1, isPremium: false,
    text: 'The rank of a zero matrix of any order is',
    textTa: 'எந்த வரிசையிலான பூஜ்ஜிய அணியின் தரமும்',
    options: ['1', 'Equal to its order', '0', 'Undefined'], optionsTa: ['1', 'அதன் வரிசைக்கு சமம்', '0', 'வரையறுக்கப்படாதது'], correctOptionIndex: 2 },
];

const chapter1Descriptive: Question[] = [
  { id: 'ch1-2m-1', chapterId: 'ch-1', type: '2-mark', marks: 2, isPremium: false,
    text: 'Find the adjoint of the matrix A = [[2, 3], [1, 4]].',
    textTa: 'A = [[2, 3], [1, 4]] அணியின் இணை அணியை (adjoint) காண்க.' },
  { id: 'ch1-2m-2', chapterId: 'ch-1', type: '2-mark', marks: 2, isPremium: false,
    text: 'If |A| = 5 for a 3×3 matrix A, find |3A|.',
    textTa: '3×3 அணி A க்கு |A| = 5 எனில், |3A| ஐ காண்க.' },
  { id: 'ch1-3m-1', chapterId: 'ch-1', type: '3-mark', marks: 3, isPremium: false,
    text: 'Find the rank of the matrix A = [[1, 2, 3], [2, 4, 6], [3, 6, 9]].',
    textTa: 'A = [[1, 2, 3], [2, 4, 6], [3, 6, 9]] அணியின் தரத்தை (rank) காண்க.' },
  { id: 'ch1-3m-2', chapterId: 'ch-1', type: '3-mark', marks: 3, isPremium: false,
    text: 'Using the adjoint method, find the inverse of A = [[1, 2], [3, 4]].',
    textTa: 'இணை அணி முறையைப் பயன்படுத்தி A = [[1, 2], [3, 4]] இன் தலைகீழியைக் காண்க.' },
  { id: 'ch1-5m-1', chapterId: 'ch-1', type: '5-mark', marks: 5, isPremium: false,
    text: 'Solve the system of equations x + y + z = 6, x − y + z = 2, 2x + y − z = 1 using Cramer\'s rule.',
    textTa: 'கிராமரின் விதியைப் பயன்படுத்தி x + y + z = 6, x − y + z = 2, 2x + y − z = 1 எனும் சமன்பாட்டுத் தொகுப்பைத் தீர்க்க.' },
  { id: 'ch1-5m-2', chapterId: 'ch-1', type: '5-mark', marks: 5, isPremium: false,
    text: 'Find the inverse of A = [[2, -1, 1], [-1, 2, -1], [1, -1, 2]] using the Gauss-Jordan method.',
    textTa: 'காஸ்-ஜோர்டான் முறையைப் பயன்படுத்தி A = [[2, -1, 1], [-1, 2, -1], [1, -1, 2]] இன் தலைகீழியைக் காண்க.' },
];

const chapter2Mcqs: Question[] = [
  { id: 'ch2-mcq-1', chapterId: 'ch-2', type: 'mcq', marks: 1, isPremium: false,
    text: 'The modulus of the complex number 3 + 4i is',
    textTa: '3 + 4i எனும் கலப்பு எண்ணின் மட்டு (modulus)',
    options: ['5', '7', '25', '1'], optionsTa: ['5', '7', '25', '1'], correctOptionIndex: 0 },
  { id: 'ch2-mcq-2', chapterId: 'ch-2', type: 'mcq', marks: 1, isPremium: false,
    text: 'i⁴ⁿ (n is a positive integer) is equal to',
    textTa: 'i⁴ⁿ (n ஒரு நேர்ம முழு எண்) இன் மதிப்பு',
    options: ['i', '−1', '1', '−i'], optionsTa: ['i', '−1', '1', '−i'], correctOptionIndex: 2 },
  { id: 'ch2-mcq-3', chapterId: 'ch-2', type: 'mcq', marks: 1, isPremium: false,
    text: 'The conjugate of 2 − 3i is',
    textTa: '2 − 3i இன் இணைப்பு (conjugate)',
    options: ['2 + 3i', '−2 + 3i', '−2 − 3i', '3 − 2i'], optionsTa: ['2 + 3i', '−2 + 3i', '−2 − 3i', '3 − 2i'], correctOptionIndex: 0 },
  { id: 'ch2-mcq-4', chapterId: 'ch-2', type: 'mcq', marks: 1, isPremium: false,
    text: 'The argument of the complex number −1 + i is',
    textTa: '−1 + i எனும் கலப்பு எண்ணின் துணை கோணம் (argument)',
    options: ['π/4', '3π/4', '−π/4', 'π/2'], optionsTa: ['π/4', '3π/4', '−π/4', 'π/2'], correctOptionIndex: 1 },
  { id: 'ch2-mcq-5', chapterId: 'ch-2', type: 'mcq', marks: 1, isPremium: false,
    text: 'The number of nth roots of unity is',
    textTa: 'ஒன்றின் n-ஆம் மூலங்களின் எண்ணிக்கை',
    options: ['1', 'n', 'n − 1', 'n + 1'], optionsTa: ['1', 'n', 'n − 1', 'n + 1'], correctOptionIndex: 1 },
  { id: 'ch2-mcq-6', chapterId: 'ch-2', type: 'mcq', marks: 1, isPremium: false,
    text: 'By De Moivre\'s theorem, (cos θ + i sin θ)ⁿ =',
    textTa: 'டி மாய்வரின் தேற்றத்தின்படி, (cos θ + i sin θ)ⁿ =',
    options: ['cos(nθ) + i sin(nθ)', 'n(cos θ + i sin θ)', 'cos θ + i sin(nθ)', 'cos(nθ) − i sin(nθ)'],
    optionsTa: ['cos(nθ) + i sin(nθ)', 'n(cos θ + i sin θ)', 'cos θ + i sin(nθ)', 'cos(nθ) − i sin(nθ)'], correctOptionIndex: 0 },
  { id: 'ch2-mcq-7', chapterId: 'ch-2', type: 'mcq', marks: 1, isPremium: false,
    text: 'If z = x + iy, then |z|² equals',
    textTa: 'z = x + iy எனில், |z|² இன் மதிப்பு',
    options: ['x² + y²', 'x² − y²', 'x + y', '2xy'], optionsTa: ['x² + y²', 'x² − y²', 'x + y', '2xy'], correctOptionIndex: 0 },
  { id: 'ch2-mcq-8', chapterId: 'ch-2', type: 'mcq', marks: 1, isPremium: false,
    text: 'The complex number i is represented on the Argand plane at',
    textTa: 'i எனும் கலப்பு எண் ஆர்கண்ட் தளத்தில் குறிக்கப்படும் புள்ளி',
    options: ['(1, 0)', '(0, 1)', '(−1, 0)', '(0, −1)'], optionsTa: ['(1, 0)', '(0, 1)', '(−1, 0)', '(0, −1)'], correctOptionIndex: 1 },
  { id: 'ch2-mcq-9', chapterId: 'ch-2', type: 'mcq', marks: 1, isPremium: false,
    text: 'z · z̄ (z conjugate) is always',
    textTa: 'z · z̄ (z இன் இணைப்பு) எப்போதும்',
    options: ['A complex number', 'A negative real number', 'A non-negative real number', 'Zero'],
    optionsTa: ['ஒரு கலப்பு எண்', 'எதிர்க் குறி மெய்யெண்', 'எதிர்மறையற்ற மெய்யெண்', 'பூஜ்ஜியம்'], correctOptionIndex: 2 },
  { id: 'ch2-mcq-10', chapterId: 'ch-2', type: 'mcq', marks: 1, isPremium: false,
    text: 'The polar form of a complex number z = r(cos θ + i sin θ) uses r as its',
    textTa: 'z = r(cos θ + i sin θ) எனும் முனைவுக் கோள வடிவத்தில் r குறிப்பது',
    options: ['Argument', 'Modulus', 'Real part', 'Imaginary part'], optionsTa: ['துணை கோணம்', 'மட்டு', 'மெய்ம்மப் பகுதி', 'கற்பனைப் பகுதி'], correctOptionIndex: 1 },
  { id: 'ch2-mcq-11', chapterId: 'ch-2', type: 'mcq', marks: 1, isPremium: false,
    text: 'Which of these is a cube root of unity (other than 1)?',
    textTa: 'கீழ்க்கண்டவற்றுள் எது ஒன்றின் கன மூலம் (1 தவிர)?',
    options: ['i', '−1', '(−1 + i√3)/2', '2'], optionsTa: ['i', '−1', '(−1 + i√3)/2', '2'], correctOptionIndex: 2 },
  { id: 'ch2-mcq-12', chapterId: 'ch-2', type: 'mcq', marks: 1, isPremium: false,
    text: 'If z₁ and z₂ are complex numbers, |z₁z₂| equals',
    textTa: 'z₁, z₂ கலப்பு எண்கள் எனில், |z₁z₂| இன் மதிப்பு',
    options: ['|z₁| + |z₂|', '|z₁| · |z₂|', '|z₁| − |z₂|', '|z₁| / |z₂|'], optionsTa: ['|z₁| + |z₂|', '|z₁| · |z₂|', '|z₁| − |z₂|', '|z₁| / |z₂|'], correctOptionIndex: 1 },
];

const chapter2Descriptive: Question[] = [
  { id: 'ch2-2m-1', chapterId: 'ch-2', type: '2-mark', marks: 2, isPremium: false,
    text: 'Find the modulus and argument of z = 1 − i.',
    textTa: 'z = 1 − i இன் மட்டு மற்றும் துணை கோணத்தைக் காண்க.' },
  { id: 'ch2-2m-2', chapterId: 'ch-2', type: '2-mark', marks: 2, isPremium: false,
    text: 'Simplify i²⁹ + i³⁹.',
    textTa: 'i²⁹ + i³⁹ ஐ எளிமைப்படுத்துக.' },
  { id: 'ch2-3m-1', chapterId: 'ch-2', type: '3-mark', marks: 3, isPremium: false,
    text: 'Express z = −1 + i√3 in polar form.',
    textTa: 'z = −1 + i√3 ஐ முனைவுக் கோள வடிவில் எழுதுக.' },
  { id: 'ch2-3m-2', chapterId: 'ch-2', type: '3-mark', marks: 3, isPremium: false,
    text: 'If z = 2 + 3i, verify that z + z̄ is real and z − z̄ is purely imaginary.',
    textTa: 'z = 2 + 3i எனில், z + z̄ மெய்யெண் என்றும், z − z̄ முழுக்க கற்பனை எண் என்றும் சரிபார்க்க.' },
  { id: 'ch2-5m-1', chapterId: 'ch-2', type: '5-mark', marks: 5, isPremium: false,
    text: 'Using De Moivre\'s theorem, find all the cube roots of unity.',
    textTa: 'டி மாய்வரின் தேற்றத்தைப் பயன்படுத்தி, ஒன்றின் அனைத்து கன மூலங்களையும் காண்க.' },
  { id: 'ch2-5m-2', chapterId: 'ch-2', type: '5-mark', marks: 5, isPremium: false,
    text: 'If z = cos θ + i sin θ, prove that zⁿ + 1/zⁿ = 2cos(nθ).',
    textTa: 'z = cos θ + i sin θ எனில், zⁿ + 1/zⁿ = 2cos(nθ) என நிரூபிக்க.' },
];

// ------------------------------------------------------------------
// Generated question sets for the remaining (premium) chapters, so
// every chapter has the same MCQ / 2 / 3 / 5 mark structure. Replace
// these with real question-bank content chapter by chapter over time.
// ------------------------------------------------------------------

function buildGeneratedQuestions(chapterId: string, chapterTitle: string, isPremium: boolean): Question[] {
  const mcqs: Question[] = Array.from({ length: 12 }, (_, i) => ({
    id: `${chapterId}-mcq-${i + 1}`,
    chapterId,
    type: 'mcq',
    marks: 1,
    isPremium,
    text: `MCQ ${i + 1}: A question based on ${chapterTitle}. Choose the correct option.`,
    textTa: `பலவுள் தேர்வு வினா ${i + 1}: ${chapterTitle} அடிப்படையில் அமைந்த வினா. சரியான விடையைத் தேர்ந்தெடுக்கவும்.`,
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    optionsTa: ['விடை அ', 'விடை ஆ', 'விடை இ', 'விடை ஈ'],
    correctOptionIndex: i % 4,
  }));

  const build = (type: Question['type'], marks: number, count: number): Question[] =>
    Array.from({ length: count }, (_, i) => ({
      id: `${chapterId}-${type}-${i + 1}`,
      chapterId,
      type,
      marks,
      isPremium,
      text: `${marks}-mark question ${i + 1} on ${chapterTitle}.`,
      textTa: `${chapterTitle} தொடர்பான ${marks}-மதிப்பெண் வினா ${i + 1}.`,
    }));

  return [
    ...mcqs,
    ...build('2-mark', 2, 4),
    ...build('3-mark', 3, 3),
    ...build('5-mark', 5, 2),
  ];
}

const generatedQuestions: Question[] = chapters
  .filter((c) => c.id !== 'ch-1' && c.id !== 'ch-2')
  .flatMap((c) => buildGeneratedQuestions(c.id, c.title, c.isPremium));

export const questions: Question[] = [
  ...chapter1Mcqs,
  ...chapter1Descriptive,
  ...chapter2Mcqs,
  ...chapter2Descriptive,
  ...generatedQuestions,
];

export function getQuestionsByChapter(chapterId: string): Question[] {
  return questions.filter((q) => q.chapterId === chapterId);
}

export function getQuestionById(questionId: string): Question | undefined {
  return questions.find((q) => q.id === questionId);
}
