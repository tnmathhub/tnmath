import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PageHeader, Card, Badge, ProgressBar, Button, Icon, Tabs, EmptyState } from '@/components/ui';
import { chapters } from '@/data/chapters';
import { useBilingual } from '@/context/LanguageContext';
import { classNames } from '@/utils/helpers';
import { QuestionBank } from './QuestionBank';
import styles from './ChapterDetail.module.scss';

const TABS = [
  { key: 'topics', label: 'Topics' },
  { key: 'practice', label: 'Practice Questions' },
  { key: 'notes', label: 'Notes & Formulas' },
];

export function ChapterDetail() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState('topics');
  const pick = useBilingual();
  const chapter = chapters.find((c) => c.id === chapterId);

  if (!chapter) {
    return (
      <EmptyState
        icon="book"
        title="Chapter not found"
        description="This chapter may have moved. Head back to the chapter list."
        action={<Link to="/student/chapters"><Button variant="outline">Back to chapters</Button></Link>}
      />
    );
  }

  const topics = Array.from({ length: chapter.topicsCount }, (_, i) => ({
    id: `${chapter.id}-t${i + 1}`,
    title: `${pick(chapter.title, chapter.tamilTitle)} — Topic ${i + 1}`,
    done: i < Math.round((chapter.progress / 100) * chapter.topicsCount),
  }));

  return (
    <div>
      <PageHeader
        title={`Chapter ${chapter.number}: ${pick(chapter.title, chapter.tamilTitle)}`}
        subtitle={chapter.description}
        actions={
          <>
            <Button variant="outline" icon="chevron" onClick={() => navigate('/student/chapters')}>Back</Button>
            <Button icon="exam" onClick={() => navigate('/student/exams')}>Take chapter test</Button>
          </>
        }
      />

      <Card className={styles.progressCard}>
        <div className={styles.progressRow}>
          <div>
            <span className={styles.progressLabel}>Your progress in this chapter</span>
            <div className={styles.progressMeta}>
              {chapter.isPremium && <Badge tone="primary">Premium content</Badge>}
              <span>{chapter.topicsCount} topics · ~{chapter.estMinutes} min total</span>
            </div>
          </div>
          <div className={styles.progressBarWrap}>
            <ProgressBar value={chapter.progress} />
          </div>
        </div>
      </Card>

      <div className={styles.tabsWrap}>
        <Tabs tabs={TABS} active={tab} onChange={setTab} />
      </div>

      {tab === 'topics' && (
        <div className={styles.topicList}>
          {topics.map((topic, i) => (
            <div key={topic.id} className={styles.topicRow}>
              <span className={classNames(styles.topicCheck, topic.done && styles.topicDone)}>
                {topic.done ? <Icon name="check" size={14} /> : i + 1}
              </span>
              <span className={styles.topicTitle}>{topic.title}</span>
              <Button size="sm" variant={topic.done ? 'ghost' : 'outline'}>
                {topic.done ? 'Review' : 'Start'}
              </Button>
            </div>
          ))}
        </div>
      )}

      {tab === 'practice' && <QuestionBank chapterId={chapter.id} isPremium={chapter.isPremium} />}

      {tab === 'notes' && (
        <EmptyState
          icon="content"
          title="Notes & formula sheet"
          description="A condensed, printable formula sheet and short notes for this chapter would render here."
        />
      )}
    </div>
  );
}
