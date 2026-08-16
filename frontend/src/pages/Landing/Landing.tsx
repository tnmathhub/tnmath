import { Link } from 'react-router-dom';
import { Icon, Button, Card, Badge, StatCard } from '@/components/ui';
import { PublicNav } from '@/components/layout/PublicNav/PublicNav';
import { PublicFooter } from '@/components/layout/PublicFooter/PublicFooter';
import styles from './Landing.module.scss';

const TRUST_BADGES = [
  { icon: 'shield' as const, text: '100% TN Board syllabus' },
  { icon: 'user' as const, text: 'Expert teachers' },
  { icon: 'trophy' as const, text: 'Built for exam success' },
  { icon: 'gift' as const, text: 'Free to get started' },
];

const FEATURES = [
  { icon: 'book' as const, title: 'Chapter-wise Learning', desc: 'All 12 chapters of the TN Class 12 Maths syllabus, broken into focused topics with worked examples.' },
  { icon: 'exam' as const, title: 'Model Exams', desc: 'Chapter tests, model exams and full public-exam-pattern papers with timers and auto-scoring for MCQs.' },
  { icon: 'correction' as const, title: 'Answer-Sheet Correction', desc: 'Upload handwritten answer sheets and get them checked by real teachers, with marks and feedback.' },
  { icon: 'robot' as const, title: 'AI Solver', desc: 'Stuck on a problem? Upload it or type it in and get a clear, step-by-step explanation.' },
  { icon: 'shield' as const, title: 'Student & Teacher Access', desc: 'Purpose-built dashboards for students and teachers — not a one-size-fits-all login.' },
  { icon: 'briefcase' as const, title: 'Career Guidance', desc: 'Seminar updates, college paths, and counseling to help you plan life after Class 12.' },
];

const STEPS = [
  { title: 'Pick a chapter', desc: 'Start from any of the 12 chapters — track progress as you go.' },
  { title: 'Attempt a test or model exam', desc: 'Timed chapter tests and full model exams that mirror the public exam pattern.' },
  { title: 'Upload your answer sheet', desc: 'Scan or photograph your written answers and submit for correction.' },
  { title: 'Get corrected & improve', desc: 'Receive marks, teacher feedback, and a clear view of where to focus next.' },
];

const STATS = [
  { icon: 'users' as const, label: 'Active students', value: '5,000+' },
  { icon: 'book' as const, label: 'Chapters covered', value: '12' },
  { icon: 'exam' as const, label: 'Practice questions', value: '500+' },
  { icon: 'star' as const, label: 'Average rating', value: '4.8★' },
];

const TESTIMONIALS = [
  { initial: 'S', name: 'Sneha R.', role: 'Class 12 Student · Tamil Nadu', quote: 'Studying feels organised now. The practice, model exams, and teacher feedback made me a lot more confident before my exams.' },
  { initial: 'K', name: 'Karthik M.', role: 'Class 12 Student · Chennai', quote: 'The AI step-by-step solutions helped me understand where I was going wrong, not just what the right answer was.' },
  { initial: 'P', name: 'Priya T.', role: 'Maths Teacher', quote: 'Correcting answer sheets online and tracking each student\u2019s weak chapters has saved me hours every week.' },
];

export function Landing() {
  return (
    <div className={styles.page}>
      <PublicNav />

      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={`${styles.heroCopy} fade-in-up`}>
              <Badge tone="primary" dot>Tamil Nadu State Board · Class 12 Maths</Badge>
              <h1>Learn every chapter. Sit every model exam. Get every answer sheet corrected.</h1>
              <p>
                One platform for chapter-wise learning, model exams, AI-powered doubt solving,
                and answer-sheet correction — built specifically for TN Class 12 Maths.
              </p>
              <div className={styles.heroActions}>
                <Link to="/register"><Button size="lg" icon="chevron" iconPosition="right">Start learning free</Button></Link>
                <Link to="/login"><Button size="lg" variant="outline">I already have an account</Button></Link>
              </div>
              <div className={styles.trustRow}>
                {TRUST_BADGES.map((t) => (
                  <span key={t.text} className={styles.trustChip}>
                    <Icon name={t.icon} size={14} />
                    {t.text}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.heroVisual}>
              <Card className={styles.previewCard} padding="lg">
                <div className={styles.previewHeader}>
                  <span>Chapter 1 · Progress</span>
                  <strong>82%</strong>
                </div>
                <div className={styles.previewBar}><div style={{ width: '82%' }} /></div>
                <div className={styles.previewRow}>
                  <Icon name="exam" size={16} />
                  <span>Model Exam 1 — Chapters 1 to 4</span>
                  <Badge tone="warning">Not attempted</Badge>
                </div>
                <div className={styles.previewRow}>
                  <Icon name="upload" size={16} />
                  <span>Chapter 3 answer sheet</span>
                  <Badge tone="info">In review</Badge>
                </div>
                <div className={styles.previewRow}>
                  <Icon name="result" size={16} />
                  <span>Model Exam — Public pattern</span>
                  <Badge tone="success">Corrected · 81/90</Badge>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className={styles.statsGrid}>
          {STATS.map((s) => (
            <StatCard key={s.label} icon={s.icon} label={s.label} value={s.value} />
          ))}
        </div>
      </div>

      <section id="features" className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Everything a Maths student, teacher, and school needs</h2>
          <p className={styles.sectionSubtitle}>Learning and evaluation, combined — not separate apps.</p>
          <div className={styles.featureGrid}>
            {FEATURES.map((f) => (
              <Card key={f.title} hoverable className={styles.featureCard}>
                <span className={styles.featureIcon}><Icon name={f.icon} size={20} /></span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>How the flow works</h2>
          <div className={styles.steps}>
            {STEPS.map((step, i) => (
              <div key={step.title} className={styles.step}>
                <span className={styles.stepNumber}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="teachers" className={styles.section}>
        <div className="container">
          <div className={styles.teachersBox}>
            <div className={styles.teachersCopy}>
              <Badge tone="primary" dot>For Teachers</Badge>
              <h2>Purpose-built tools for the teachers behind the results</h2>
              <p>
                Create chapter content, set model exams, and correct handwritten answer sheets
                online — with a dashboard built for grading, not a generic admin panel.
              </p>
              <ul className={styles.teachersList}>
                <li><Icon name="check" size={16} /> Upload and organise chapter content</li>
                <li><Icon name="check" size={16} /> Build model exams and chapter tests</li>
                <li><Icon name="check" size={16} /> Correct answer sheets with marks &amp; feedback</li>
              </ul>
              <Link to="/register"><Button variant="outline">Register as a teacher</Button></Link>
            </div>
            <div className={styles.teachersVisual}>
              <span className={styles.teachersIcon}><Icon name="briefcase" size={28} /></span>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Loved by students &amp; teachers</h2>
          <p className={styles.sectionSubtitle}>A platform people actually use before their exams — not just once.</p>
          <div className={styles.testimonialGrid}>
            {TESTIMONIALS.map((t) => (
              <Card key={t.name} className={styles.testimonialCard}>
                <div className={styles.stars}>
                  <Icon name="star" size={14} /><Icon name="star" size={14} /><Icon name="star" size={14} /><Icon name="star" size={14} /><Icon name="star" size={14} />
                </div>
                <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>
                <div className={styles.author}>
                  <span className={styles.authorAvatar}>{t.initial}</span>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing section disabled for now (student + teacher scope only).
          The `plans` data and all Subscription pages still exist — see
          the NOTE at the top of src/utils/constants.ts to bring this back. */}

      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaBox}>
            <div>
              <h2>Ready to bring structured Maths practice to your students?</h2>
              <p>Sign up as a student or a teacher — takes less than a minute.</p>
            </div>
            <Link to="/register"><Button size="lg" variant="secondary">Create your account</Button></Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
