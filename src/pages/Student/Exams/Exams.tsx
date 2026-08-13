import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Card, Badge, Button, Icon, Tabs } from '@/components/ui';
import { exams } from '@/data/exams';
import styles from './Exams.module.scss';

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'Chapter Test', label: 'Chapter Tests' },
  { key: 'Model Exam', label: 'Model Exams' },
  { key: 'Public Exam Pattern', label: 'Public Pattern' },
];

export function Exams() {
  const [filter, setFilter] = useState('all');
  const visible = filter === 'all' ? exams : exams.filter((e) => e.type === filter);

  return (
    <div>
      <PageHeader title="Model Exams" subtitle="Timed chapter tests, model exams, and full public-exam-pattern papers." />
      <div className={styles.tabsWrap}>
        <Tabs tabs={TABS} active={filter} onChange={setFilter} />
      </div>
      <div className={styles.list}>
        {visible.map((exam) => (
          <Card key={exam.id} className={styles.examCard}>
            <div className={styles.iconWrap}><Icon name="exam" size={22} /></div>
            <div className={styles.info}>
              <div className={styles.titleRow}>
                <h3>{exam.title}</h3>
                <Badge tone="neutral">{exam.type}</Badge>
              </div>
              <div className={styles.meta}>
                <span><Icon name="clock" size={14} /> {exam.durationMins} mins</span>
                <span>{exam.questionCount} questions</span>
                <span>{exam.totalMarks} marks</span>
              </div>
            </div>
            <div className={styles.action}>
              {exam.attempted ? (
                <>
                  <Badge tone="success">Scored {exam.scorePercent}%</Badge>
                  <Button variant="ghost" size="sm">Review</Button>
                </>
              ) : (
                <Link to={`/student/exams/${exam.id}`}>
                  <Button size="sm" icon="chevron" iconPosition="right">Start exam</Button>
                </Link>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
