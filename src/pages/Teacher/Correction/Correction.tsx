import { useState } from 'react';
import { PageHeader, Card, Badge, Button, Icon, Input, Tabs, EmptyState } from '@/components/ui';
import { answerSheets } from '@/data/answerSheets';
import { formatDate, statusTone, classNames } from '@/utils/helpers';
import styles from './Correction.module.scss';

const TABS = [
  { key: 'pending', label: 'Pending' },
  { key: 'in-review', label: 'In Review' },
  { key: 'corrected', label: 'Corrected' },
];

export function Correction() {
  const [tab, setTab] = useState('pending');
  const [activeSheetId, setActiveSheetId] = useState<string | null>(null);
  const [marks, setMarks] = useState('');

  const visible = answerSheets.filter((s) => s.status === tab);
  const activeSheet = answerSheets.find((s) => s.id === activeSheetId) ?? visible[0] ?? null;

  return (
    <div>
      <PageHeader title="Correction Queue" subtitle="Review submitted answer sheets and award marks with feedback." />

      <div className={styles.tabsWrap}>
        <Tabs tabs={TABS} active={tab} onChange={(k) => { setTab(k); setActiveSheetId(null); }} />
      </div>

      <div className={styles.grid}>
        <Card padding="sm" className={styles.queue}>
          {visible.length === 0 && <EmptyState icon="correction" title="Nothing here" description="No answer sheets in this state right now." />}
          {visible.map((sheet) => (
            <button
              key={sheet.id}
              className={classNames(styles.queueItem, activeSheet?.id === sheet.id && styles.queueItemActive)}
              onClick={() => setActiveSheetId(sheet.id)}
            >
              <span className={styles.queueIcon}><Icon name="content" size={15} /></span>
              <span className={styles.queueInfo}>
                <span className={styles.queueName}>{sheet.studentName}</span>
                <span className={styles.queueMeta}>{sheet.examTitle}</span>
              </span>
              <Badge tone={statusTone(sheet.status)}>{sheet.status.replace('-', ' ')}</Badge>
            </button>
          ))}
        </Card>

        <Card className={styles.detail}>
          {activeSheet ? (
            <>
              <div className={styles.detailHeader}>
                <div>
                  <h3>{activeSheet.studentName}</h3>
                  <span className={styles.detailMeta}>{activeSheet.examTitle} · Submitted {formatDate(activeSheet.submittedOn)}</span>
                </div>
                <Button variant="outline" icon="download" size="sm">Download sheet</Button>
              </div>

              <div className={styles.previewBox}>
                <Icon name="content" size={32} />
                <span>{activeSheet.fileName}</span>
                <span className={styles.previewHint}>Scanned answer sheet preview would render here</span>
              </div>

              <div className={styles.markingRow}>
                <Input
                  label={`Marks (out of ${activeSheet.maxScore})`}
                  type="number"
                  placeholder="e.g. 78"
                  value={activeSheet.status === 'corrected' ? String(activeSheet.score) : marks}
                  onChange={(e) => setMarks(e.target.value)}
                  disabled={activeSheet.status === 'corrected'}
                />
              </div>
              <Input
                label="Feedback for student"
                placeholder="e.g. Strong on matrix inversion, revise Cramer's rule steps."
                disabled={activeSheet.status === 'corrected'}
              />

              {activeSheet.status !== 'corrected' && (
                <div className={styles.actions}>
                  <Button variant="outline">Save draft</Button>
                  <Button icon="check">Mark as corrected</Button>
                </div>
              )}
            </>
          ) : (
            <EmptyState icon="correction" title="Select an answer sheet" description="Choose a submission from the queue to begin correction." />
          )}
        </Card>
      </div>
    </div>
  );
}
