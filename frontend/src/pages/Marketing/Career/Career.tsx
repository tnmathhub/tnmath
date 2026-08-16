import { Link } from 'react-router-dom';
import { Icon, Button, Card, Badge, StatCard } from '@/components/ui';
import { PublicNav } from '@/components/layout/PublicNav/PublicNav';
import { PublicFooter } from '@/components/layout/PublicFooter/PublicFooter';
import styles from '../Marketing.module.scss';

const TRUST = [
  { icon: 'clock' as const, text: 'Seminar updates' },
  { icon: 'target' as const, text: 'Local guidance events' },
  { icon: 'user' as const, text: 'Expert counselors' },
  { icon: 'book' as const, text: 'College path support' },
];

const STATS = [
  { icon: 'compass' as const, label: 'Career paths', value: '20+' },
  { icon: 'clock' as const, label: 'Seminars planned', value: '10+' },
  { icon: 'heart' as const, label: 'Student focused', value: '100%' },
  { icon: 'users' as const, label: 'Counseling support', value: '1-on-1' },
];

const PATHS = [
  { icon: 'briefcase' as const, title: 'Engineering', desc: 'Learn about entrance exams, top branches, college options, and skill-building paths.' },
  { icon: 'heart' as const, title: 'Medical', desc: 'Explore medical entrance support, study planning, and preparation strategies.' },
  { icon: 'chart' as const, title: 'Commerce', desc: 'Get guidance for commerce, finance, business studies, and professional courses.' },
  { icon: 'target' as const, title: 'Research & Science', desc: 'Discover science-based careers, higher studies, and research opportunities.' },
  { icon: 'book' as const, title: 'Teaching', desc: 'Understand education careers and how students can become future teachers or trainers.' },
  { icon: 'rocket' as const, title: 'Abroad Studies', desc: 'Learn about scholarships, applications, English tests, and study abroad planning.' },
];

const EVENTS = [
  { title: 'Career roadmap for Class 12 students', desc: 'Choosing the right path after board exams.' },
  { title: 'Top colleges and entrance exams', desc: 'Guidance for engineering, medical, and commerce streams.' },
  { title: 'Parent-student counseling session', desc: 'Helping families make informed decisions together.' },
  { title: 'Scholarship and admission support', desc: 'Learn how to apply with confidence.' },
];

const GET = [
  { icon: 'compass' as const, title: 'Career Roadmaps', desc: 'Simple roadmaps showing what students can study, apply for, and do next.' },
  { icon: 'book' as const, title: 'College Guidance', desc: 'Suggestions on choosing colleges based on course, location, and goal.' },
  { icon: 'phone' as const, title: 'Counseling Help', desc: 'Personal support to reduce confusion and answer student questions directly.' },
];

export function Career() {
  return (
    <div className={styles.page}>
      <PublicNav />

      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <Badge tone="primary" dot>Upcoming career seminar</Badge>
            <h1>Plan your future with confidence</h1>
            <p>
              Explore career options, college paths, entrance exam guidance, and seminar updates
              designed to help Class 12 students make smart decisions after school.
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
              <Link to="/register"><Button size="lg" icon="bell" iconPosition="left">Get seminar alert</Button></Link>
              <a href="#paths"><Button size="lg" variant="outline" icon="chevron" iconPosition="right">Explore careers</Button></a>
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

      <section id="paths" className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}><Icon name="compass" size={20} /> Career Paths</h2>
          <p className={styles.sectionSubtitle}>
            Discover the right path after Class 12 with easy-to-understand career options and
            future guidance.
          </p>
          <div className={styles.grid3}>
            {PATHS.map((p) => (
              <Card key={p.title} hoverable className={styles.iconCard}>
                <span className={styles.iconCircle}><Icon name={p.icon} size={20} /></span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <h2 className={styles.sectionTitle}><Icon name="clock" size={20} /> Seminar & Events</h2>
          <p className={styles.sectionSubtitle}>
            Upcoming career seminar details, with clear updates and a simple way to register.
          </p>
          <div className={styles.eventGrid}>
            <Card className={styles.eventCard}>
              <h3>Upcoming Seminar Highlights</h3>
              <div className={styles.eventList}>
                {EVENTS.map((e) => (
                  <div key={e.title} className={styles.eventItem}>
                    <strong>{e.title}</strong>
                    <span>{e.desc}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '1.1rem' }}>
                <Link to="/register"><Button icon="mail">Register for updates</Button></Link>
              </div>
            </Card>
            <Card className={styles.eventCard}>
              <h3>Why Students Attend</h3>
              <p className={styles.eventText}>
                Students get real clarity about future options, confidence in choosing a stream,
                and support from teachers and counselors.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}><Icon name="bulb" size={20} /> What Students Get</h2>
          <div className={styles.grid3}>
            {GET.map((g) => (
              <Card key={g.title} hoverable className={styles.iconCard}>
                <span className={styles.iconCircle}><Icon name={g.icon} size={20} /></span>
                <h3>{g.title}</h3>
                <p>{g.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaBox}>
            <div>
              <h3>Career seminar coming soon</h3>
              <p>Register now to be notified the moment dates and venues are announced.</p>
            </div>
            <div className={styles.ctaActions}>
              <Link to="/register"><Button size="lg" variant="secondary" icon="bell">Get notified</Button></Link>
              <Link to="/about"><Button size="lg" variant="outline" icon="phone" className={styles.ctaOutlineBtn}>Contact us</Button></Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
