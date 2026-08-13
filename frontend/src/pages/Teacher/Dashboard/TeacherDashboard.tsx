import { Link } from 'react-router-dom';
import { PageHeader, StatCard, Card, Button, Badge, Icon } from '@/components/ui';
import { answerSheets } from '@/data/answerSheets';
import { formatDate, statusTone } from '@/utils/helpers';
import styles from './TeacherDashboard.module.scss';

export function TeacherDashboard() {
  const pendingSheets = answerSheets.filter((s) => s.status !== 'corrected').slice(0, 4);

  return (
    <div>
      <PageHeader
        title="Teacher Dashboard"
        subtitle="Track correction workload and class performance at a glance."
        actions={<Link to="/teacher/correction"><Button icon="correction">Go to correction queue</Button></Link>}
      />

      <div className={styles.statGrid}>
        <StatCard label="Pending corrections" value={answerSheets.filter((s) => s.status === 'pending').length} icon="upload" />
        <StatCard label="In review" value={answerSheets.filter((s) => s.status === 'in-review').length} icon="correction" />
        <StatCard label="Corrected this week" value={answerSheets.filter((s) => s.status === 'corrected').length} icon="check" delta="+5" trend="up" />
        <StatCard label="Classes managed" value={3} icon="class" />
      </div>

      <Card>
        <div className={styles.cardHeader}>
          <h3>Answer sheets awaiting correction</h3>
          <Link to="/teacher/correction" className={styles.viewAll}>View all</Link>
        </div>
        <div className={styles.list}>
          {pendingSheets.map((sheet) => (
            <div key={sheet.id} className={styles.row}>
              <div className={styles.icon}><Icon name="content" size={16} /></div>
              <div className={styles.info}>
                <span className={styles.exam}>{sheet.examTitle}</span>
                <span className={styles.meta}>{sheet.studentName} · Submitted {formatDate(sheet.submittedOn)}</span>
              </div>
              <Badge tone={statusTone(sheet.status)}>{sheet.status.replace('-', ' ')}</Badge>
              <Link to="/teacher/correction"><Button size="sm" variant="outline">Correct</Button></Link>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
