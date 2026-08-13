import { PageHeader, Card, Table, Badge, ProgressBar } from '@/components/ui';
import type { TableColumn } from '@/components/ui';
import { exams } from '@/data/exams';
import { chapters } from '@/data/chapters';
import styles from './Results.module.scss';

interface ResultRow {
  id: string;
  exam: string;
  type: string;
  score: number;
}

export function Results() {
  const attempted = exams.filter((e) => e.attempted);
  const rows: ResultRow[] = attempted.map((e) => ({
    id: e.id,
    exam: e.title,
    type: e.type,
    score: e.scorePercent ?? 0,
  }));

  const columns: TableColumn<ResultRow>[] = [
    { key: 'exam', header: 'Exam' },
    { key: 'type', header: 'Type', width: '160px' },
    {
      key: 'score',
      header: 'Score',
      width: '160px',
      render: (row) => (
        <Badge tone={row.score >= 75 ? 'success' : row.score >= 50 ? 'warning' : 'error'}>
          {row.score}%
        </Badge>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Results" subtitle="Your exam scores and chapter-wise strength across the syllabus." />

      <Card className={styles.summaryCard}>
        <h3>Chapter-wise strength</h3>
        <div className={styles.chapterBars}>
          {chapters.slice(0, 6).map((c) => (
            <div key={c.id} className={styles.chapterBarRow}>
              <span className={styles.chapterName}>{c.title}</span>
              <ProgressBar value={c.progress} showPercent size="sm" />
            </div>
          ))}
        </div>
      </Card>

      <Card padding="sm">
        <div className={styles.tableHeader}>
          <h3>Exam history</h3>
        </div>
        <Table columns={columns} data={rows} rowKey={(r) => r.id} emptyMessage="You haven't attempted any exams yet." />
      </Card>
    </div>
  );
}
