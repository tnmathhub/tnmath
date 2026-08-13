import { Link } from 'react-router-dom';
import { Icon, Button, Card, Badge } from '@/components/ui';
import styles from './Landing.module.scss';

const FEATURES = [
  { icon: 'book' as const, title: 'Chapter-wise Learning', desc: 'All 12 chapters of the TN Class 12 Maths syllabus, broken into focused topics with worked examples.' },
  { icon: 'exam' as const, title: 'Model Exams', desc: 'Chapter tests, model exams and full public-exam-pattern papers with timers and auto-scoring for MCQs.' },
  { icon: 'correction' as const, title: 'Answer-Sheet Correction', desc: 'Upload handwritten answer sheets and get them checked by real teachers, with marks and feedback.' },
  { icon: 'shield' as const, title: 'Student & Teacher Access', desc: 'Purpose-built dashboards for students and teachers — not a one-size-fits-all login.' },
];

const STEPS = [
  { title: 'Pick a chapter', desc: 'Start from any of the 12 chapters — track progress as you go.' },
  { title: 'Attempt a test or model exam', desc: 'Timed chapter tests and full model exams that mirror the public exam pattern.' },
  { title: 'Upload your answer sheet', desc: 'Scan or photograph your written answers and submit for correction.' },
  { title: 'Get corrected & improve', desc: 'Receive marks, teacher feedback, and a clear view of where to focus next.' },
];

export function Landing() {
  return (
    <div className={styles.page}>
      <header className={styles.nav}>
        <div className={`${styles.navInner} container`}>
          <div className={styles.brand}>
            <span className={styles.brandMark}><Icon name="sigma" size={18} /></span>
            <span>TN Maths 12</span>
          </div>
          <nav className={styles.navLinks}>
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
          </nav>
          <div className={styles.navActions}>
            <Link to="/login"><Button variant="ghost" size="sm">Log in</Button></Link>
            <Link to="/register"><Button variant="primary" size="sm">Get started</Button></Link>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={`${styles.heroCopy} fade-in-up`}>
              <Badge tone="primary" dot>Tamil Nadu State Board · Class 12 Maths</Badge>
              <h1>Learn every chapter. Sit every model exam. Get every answer sheet corrected.</h1>
              <p>
                One platform for chapter-wise learning, model exams, and answer-sheet
                correction — built specifically for TN Class 12 Maths.
              </p>
              <div className={styles.heroActions}>
                <Link to="/register"><Button size="lg" icon="chevron" iconPosition="right">Start learning free</Button></Link>
                <Link to="/login"><Button size="lg" variant="outline">I already have an account</Button></Link>
              </div>
              <div className={styles.heroStats}>
                <div><strong>12</strong><span>Chapters covered</span></div>
                <div><strong>500+</strong><span>Practice questions</span></div>
                <div><strong>3</strong><span>Role-based logins</span></div>
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

      <section id="features" className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Everything a Maths student, teacher, and school needs</h2>
          <p className={styles.sectionSubtitle}>Learning and evaluation, combined — not two separate apps.</p>
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

      <footer className={styles.footer}>
        <div className={`${styles.footerInner} container`}>
          <span>© 2026 TN Maths 12. Built for Tamil Nadu Class 12 students.</span>
          <div className={styles.footerLinks}>
            <Link to="/login">Log in</Link>
            <Link to="/register">Sign up</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
