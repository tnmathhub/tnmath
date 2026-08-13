import { Link } from 'react-router-dom';
import { PageHeader, Card, Badge, ProgressBar, Icon } from '@/components/ui';
import { chapters } from '@/data/chapters';
import { useBilingual } from '@/context/LanguageContext';
import styles from './Chapters.module.scss';

export function Chapters() {
  const pick = useBilingual();

  return (
    <div>
      <PageHeader
        title="Chapters"
        subtitle="All 12 chapters of the TN Class 12 Maths syllabus, in order."
      />
      <div className={styles.grid}>
        {chapters.map((chapter) => (
          <Link to={`/student/chapters/${chapter.id}`} key={chapter.id}>
            <Card hoverable className={styles.card}>
              <div className={styles.top}>
                <span className={styles.number}>Chapter {chapter.number}</span>
                {chapter.isPremium && <Badge tone="primary">Premium</Badge>}
              </div>
              <h3>{pick(chapter.title, chapter.tamilTitle)}</h3>
              <p>{chapter.description}</p>
              <div className={styles.meta}>
                <span><Icon name="content" size={14} /> {chapter.topicsCount} topics</span>
                <span><Icon name="clock" size={14} /> ~{chapter.estMinutes} min</span>
              </div>
              <ProgressBar value={chapter.progress} size="sm" />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
