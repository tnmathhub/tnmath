import { Link } from 'react-router-dom';
import { Icon, Button, Card, Badge, StatCard } from '@/components/ui';
import { PublicNav } from '@/components/layout/PublicNav/PublicNav';
import { PublicFooter } from '@/components/layout/PublicFooter/PublicFooter';
import styles from '../Marketing.module.scss';

const TRUST = [
  { icon: 'book' as const, text: 'Exam-focused learning' },
  { icon: 'user' as const, text: 'Teacher guidance' },
  { icon: 'robot' as const, text: 'AI support' },
  { icon: 'briefcase' as const, text: 'Career seminars' },
];

const STATS = [
  { icon: 'users' as const, label: 'Students served', value: '5,000+' },
  { icon: 'trophy' as const, label: 'Chapters covered', value: '12' },
  { icon: 'heart' as const, label: 'Learning satisfaction', value: '98%' },
  { icon: 'clock' as const, label: 'Platform access', value: '24/7' },
];

const MISSION = [
  { icon: 'bulb' as const, title: 'Simple Learning', desc: 'We explain topics in a student-friendly way so learning feels easier and less stressful.' },
  { icon: 'chart' as const, title: 'Improvement Focus', desc: 'Students can practice, test, and track progress to steadily improve their scores.' },
  { icon: 'heart' as const, title: 'Confidence Building', desc: 'We help learners gain confidence through support, clarity, and consistent guidance.' },
];

const BELIEVE = [
  { title: 'Students need clarity', desc: 'Clear explanations help students learn faster and with less fear.' },
  { title: 'Practice creates progress', desc: 'Repeated practice and smart revision improve performance.' },
  { title: 'Trust matters', desc: 'A good learning platform should feel reliable, supportive, and honest.' },
  { title: 'Future planning matters too', desc: 'Career seminars and counseling help students make better choices after school.' },
];

const SERVE = [
  { title: 'Class 12 students', desc: 'Students preparing for board exams and looking for structured support.' },
  { title: 'Teachers', desc: 'Educators who want tools to support practice and evaluation.' },
  { title: 'Parents', desc: 'Families who want a trusted platform for learning and future guidance.' },
  { title: 'Career-seeking students', desc: 'Learners who need seminar updates, counseling, and planning help.' },
];

const BUILD = [
  { icon: 'bulb' as const, title: 'Student-First Thinking', desc: 'Every page is designed around what students actually need: practice, clarity, speed, and confidence.' },
  { icon: 'rocket' as const, title: 'Fast Improvement Loop', desc: 'We launch, test, learn, and refine features quickly so the platform keeps getting better.' },
  { icon: 'shield' as const, title: 'Trust by Design', desc: 'We build with transparent content, clear explanations, and student-friendly support features.' },
];

export function About() {
  return (
    <div className={styles.page}>
      <PublicNav />

      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <Badge tone="primary" dot>Built for student trust</Badge>
            <h1>About TN Maths 12</h1>
            <p>
              TN Maths 12 is a student-first learning platform built to help Tamil Nadu Class 12
              students practice better, test smarter, learn from teachers, and plan their future
              with confidence.
            </p>
            <div className={styles.trustRow}>
              {TRUST.map((t) => (
                <span key={t.text} className={styles.trustChip}>
                  <Icon name={t.icon} size={14} />
                  {t.text}
                </span>
              ))}
            </div>
            <div className={styles.heroActions}>
              <Link to="/register"><Button size="lg" icon="chevron" iconPosition="right">Explore platform</Button></Link>
              <Link to="/career"><Button size="lg" variant="outline" icon="phone">Contact us</Button></Link>
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

      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}><Icon name="target" size={20} /> Our Mission</h2>
          <p className={styles.sectionSubtitle}>
            To make mathematics learning more accessible, structured, and confidence-building for
            students through practice, mock tests, AI help, teacher support, and career guidance.
          </p>
          <div className={styles.grid3}>
            {MISSION.map((m) => (
              <Card key={m.title} hoverable className={styles.iconCard}>
                <span className={styles.iconCircle}><Icon name={m.icon} size={20} /></span>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div className={styles.splitGrid}>
            <div className={styles.panel}>
              <h3><Icon name="compass" size={18} /> What We Believe</h3>
              <div className={styles.timelineList}>
                {BELIEVE.map((b) => (
                  <div key={b.title} className={styles.timelineItem}>
                    <strong>{b.title}</strong>
                    <p>{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.panel}>
              <h3><Icon name="users" size={18} /> Who We Serve</h3>
              <div className={styles.timelineList}>
                {SERVE.map((s) => (
                  <div key={s.title} className={styles.timelineItem}>
                    <strong>{s.title}</strong>
                    <p>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}><Icon name="compass" size={20} /> How We Build</h2>
          <p className={styles.sectionSubtitle}>
            TN Maths 12 is built with a focused product vision: solve one student problem at a
            time, ship useful learning tools fast, and improve them through feedback.
          </p>
          <div className={styles.grid3}>
            {BUILD.map((b) => (
              <Card key={b.title} hoverable className={styles.iconCard}>
                <span className={styles.iconCircle}><Icon name={b.icon} size={20} /></span>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <h2 className={styles.sectionTitle}><Icon name="star" size={20} /> Student Feedback</h2>
          <div className={styles.testimonial}>
            <div className={styles.stars}>
              <Icon name="star" size={16} /><Icon name="star" size={16} /><Icon name="star" size={16} /><Icon name="star" size={16} /><Icon name="star" size={16} />
            </div>
            <p className={styles.quote}>
              &ldquo;TN Maths 12 helped me study in a much more organised way. The practice, model exams,
              and teacher support made me feel more confident before exams.&rdquo;
            </p>
            <div className={styles.author}>
              <strong>Sneha R.</strong>
              <span>Class 12 Student · Tamil Nadu</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaBox}>
            <div>
              <h3>Want to explore TN Maths 12?</h3>
              <p>Use the platform for practice, mock tests, AI solving, teacher support, and career guidance.</p>
            </div>
            <div className={styles.ctaActions}>
              <Link to="/register"><Button size="lg" variant="secondary" icon="plus">Register free</Button></Link>
              <Link to="/career"><Button size="lg" variant="outline" icon="clock" className={styles.ctaOutlineBtn}>Seminar updates</Button></Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
