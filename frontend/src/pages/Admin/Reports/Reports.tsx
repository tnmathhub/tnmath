import { PageHeader, Card, ProgressBar, StatCard } from '@/components/ui';
import { adminOverviewStats, chapterCompletionReport } from '@/data/reports';
import styles from './Reports.module.scss';

export function Reports() {
  return (
    <div>
      <PageHeader title="Reports" subtitle="School-wide performance and chapter completion trends." />

      <div className={styles.statGrid}>
        {adminOverviewStats.map((s) => (
          <StatCard key={s.id} label={s.label} value={s.value} icon="report" delta={s.delta} trend={s.trend} />
        ))}
      </div>

      <Card>
        <h3 className={styles.title}>Chapter completion across school</h3>
        <div className={styles.bars}>
          {chapterCompletionReport.map((row) => (
            <div key={row.id} className={styles.row}>
              <span className={styles.label}>{row.label}</span>
              <ProgressBar value={parseInt(String(row.value), 10)} size="sm" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
