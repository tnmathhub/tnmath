import { Link } from 'react-router-dom';
import { Icon, Button, Card, Badge } from '@/components/ui';
import { PublicNav } from '@/components/layout/PublicNav/PublicNav';
import { PublicFooter } from '@/components/layout/PublicFooter/PublicFooter';
import styles from '../Marketing.module.scss';

const TRUST = [
  'Image Upload',
  'Typed Input',
  'Step-by-Step',
  'Tamil + English',
  'Save Solution',
];

const HOW = [
  { icon: 'camera' as const, title: 'Upload Image', desc: 'Take a photo or upload a screenshot of your maths problem.' },
  { icon: 'keyboard' as const, title: 'Type Question', desc: 'Enter equations directly if you prefer typing.' },
  { icon: 'chart' as const, title: 'Get Steps', desc: 'Receive a clear explanation of every step in the solution.' },
  { icon: 'book' as const, title: 'Learn Again', desc: 'Review the same problem later for revision and practice.' },
];

const STEPS = [
  { label: 'Step 1', text: 'Read and understand the problem.' },
  { label: 'Step 2', text: 'Apply the correct formula or method.' },
  { label: 'Step 3', text: 'Simplify and solve carefully.' },
  { label: 'Final Answer', text: 'Show the result clearly with explanation.' },
];

const EXTRAS = ['Tamil Explanation', 'English Explanation', 'Graph Support', 'Formula Help', 'Save & Share'];

export function AISolver() {
  return (
    <div className={styles.page}>
      <PublicNav />

      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <Badge tone="primary" dot>AI Solver</Badge>
            <h1>Ask AI to solve any Maths question</h1>
            <p>
              Upload a photo, paste a screenshot, or type your equation. The AI explains the
              solution step by step so you understand the method, not just the answer.
            </p>
            <div className={styles.trustRow}>
              {TRUST.map((t) => (
                <span key={t} className={styles.trustChip}>
                  <Icon name="check" size={14} />
                  {t}
                </span>
              ))}
            </div>
            <div className={styles.heroActions}>
              <Link to="/register"><Button size="lg" icon="robot" iconPosition="left">Try the AI Solver</Button></Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}><Icon name="compass" size={20} /> How It Works</h2>
          <div className={styles.grid3}>
            {HOW.map((h) => (
              <Card key={h.title} hoverable className={styles.iconCard}>
                <span className={styles.iconCircle}><Icon name={h.icon} size={20} /></span>
                <h3>{h.title}</h3>
                <p>{h.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <h2 className={styles.sectionTitle}><Icon name="robot" size={20} /> Solver Preview</h2>
          <p className={styles.sectionSubtitle}>
            A look at how the solver panel works once you register and sign in.
          </p>
          <div className={styles.solverGrid}>
            <Card padding="lg">
              <h3 style={{ marginBottom: '1rem', fontSize: '1.05rem' }}>Submit your question</h3>
              <div className={styles.uploadBox}>
                <Icon name="upload" size={28} />
                <strong>Upload image or screenshot</strong>
                <span>JPG, PNG, WEBP supported</span>
              </div>
              <input className={styles.solverInput} type="text" placeholder="Or type your maths question here..." disabled />
              <Button fullWidth icon="chevron" iconPosition="right" disabled>Get solution (sign in required)</Button>
            </Card>

            <Card padding="lg">
              <h3 style={{ marginBottom: '1rem', fontSize: '1.05rem' }}>Step-by-step solution</h3>
              {STEPS.map((s) => (
                <div key={s.label} className={styles.solutionStep}>
                  <strong>{s.label}</strong>
                  <span>{s.text}</span>
                </div>
              ))}
            </Card>
          </div>

          <div className={styles.chipsRow} style={{ justifyContent: 'center', marginTop: '2rem' }}>
            {EXTRAS.map((e) => (
              <span key={e} className={styles.chip}>{e}</span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaBox}>
            <div>
              <h3>Stuck on a problem right now?</h3>
              <p>Create your free student account and start using the AI Solver in minutes.</p>
            </div>
            <div className={styles.ctaActions}>
              <Link to="/register"><Button size="lg" variant="secondary" icon="robot">Start solving</Button></Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
