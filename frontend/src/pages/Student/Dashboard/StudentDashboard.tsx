import { Link } from 'react-router-dom';
import { PageHeader, StatCard, Card, Button, ProgressBar, Badge, Icon } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import { chapters } from '@/data/chapters';
import { exams } from '@/data/exams';
import styles from './StudentDashboard.module.scss';

export function StudentDashboard() {
  const { user } = useAuth();
  const inProgress = chapters.filter((c) => c.progress > 0 && c.progress < 100).slice(0, 3);
  const upcomingExams = exams.filter((e) => !e.attempted).slice(0, 3);
  const overallProgress = Math.round(chapters.reduce((sum, c) => sum + c.progress, 0) / chapters.length);

  return (
    <div>
      <PageHeader
        title={`Welcome back${user ? `, ${user.name.split(' ')[0]}` : ''}`}
        subtitle="Here's where you left off — keep the streak going."
        actions={<Link to="/student/chapters"><Button icon="book">Resume learning</Button></Link>}
      />

      <div className={styles.statGrid}>
        <StatCard label="Overall syllabus progress" value={`${overallProgress}%`} icon="dashboard" delta="+4% this week" trend="up" />
        <StatCard label="Chapter tests attempted" value={exams.filter((e) => e.attempted).length} icon="exam" />
        <StatCard label="Answer sheets in review" value={1} icon="upload" />
        <StatCard label="Average score" value="80%" icon="result" delta="+3%" trend="up" />
      </div>

      <div className={styles.twoCol}>
        <Card>
          <div className={styles.cardHeader}>
            <h3>Continue where you left off</h3>
            <Link to="/student/chapters" className={styles.viewAll}>View all chapters</Link>
          </div>
          <div className={styles.chapterList}>
            {inProgress.map((chapter) => (
              <Link to={`/student/chapters/${chapter.id}`} key={chapter.id} className={styles.chapterRow}>
                <div className={styles.chapterInfo}>
                  <span className={styles.chapterNumber}>Ch. {chapter.number}</span>
                  <span className={styles.chapterTitle}>{chapter.title}</span>
                </div>
                <div className={styles.chapterProgress}>
                  <ProgressBar value={chapter.progress} showPercent={false} size="sm" />
                  <span>{chapter.progress}%</span>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        <Card>
          <div className={styles.cardHeader}>
            <h3>Upcoming exams</h3>
            <Link to="/student/exams" className={styles.viewAll}>View all exams</Link>
          </div>
          <div className={styles.examList}>
            {upcomingExams.map((exam) => (
              <div key={exam.id} className={styles.examRow}>
                <span className={styles.examIcon}><Icon name="exam" size={16} /></span>
                <div className={styles.examInfo}>
                  <span className={styles.examTitle}>{exam.title}</span>
                  <span className={styles.examMeta}>{exam.durationMins} mins · {exam.totalMarks} marks</span>
                </div>
                <Badge tone="neutral">{exam.type}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
