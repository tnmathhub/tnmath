import { useState } from 'react';
import { PageHeader, Card, Select, Button, Icon, Badge, FileDropzone } from '@/components/ui';
import { exams } from '@/data/exams';
import { answerSheets } from '@/data/answerSheets';
import { formatDate, statusTone } from '@/utils/helpers';
import type { UploadedAnswerFile } from '@/types';
import styles from './AnswerUpload.module.scss';

export function AnswerUpload() {
  const [examId, setExamId] = useState(exams[0]?.id ?? '');
  const [files, setFiles] = useState<UploadedAnswerFile[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const mySheets = answerSheets.filter((s) => s.studentName === 'Priya Ramesh');

  const handleSubmit = () => {
    if (files.length === 0) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
    setFiles([]);
  };

  return (
    <div>
      <PageHeader title="Upload Answer Sheet" subtitle="Submit a scanned or photographed answer sheet for teacher correction." />

      <div className={styles.grid}>
        <Card>
          <h3 className={styles.cardTitle}>New submission</h3>
          <div className={styles.form}>
            <Select
              label="Which exam is this for?"
              options={exams.map((e) => ({ value: e.id, label: e.title }))}
              value={examId}
              onChange={(e) => setExamId(e.target.value)}
            />

            <FileDropzone
              label="Answer sheet file(s) — PDF or image"
              hint="PDF, JPG or PNG, up to 20MB each. Add multiple pages if needed."
              files={files}
              onChange={setFiles}
              withTags
            />

            {submitted && (
              <div className={styles.successBanner}>
                <Icon name="check" size={16} /> Answer sheet submitted for correction.
              </div>
            )}

            <Button fullWidth size="lg" disabled={files.length === 0} onClick={handleSubmit} icon="upload">
              Submit for correction
            </Button>
          </div>
        </Card>

        <Card>
          <h3 className={styles.cardTitle}>Your recent submissions</h3>
          <div className={styles.sheetList}>
            {mySheets.map((sheet) => (
              <div key={sheet.id} className={styles.sheetRow}>
                <div className={styles.sheetIcon}><Icon name="content" size={16} /></div>
                <div className={styles.sheetInfo}>
                  <span className={styles.sheetExam}>{sheet.examTitle}</span>
                  <span className={styles.sheetDate}>Submitted {formatDate(sheet.submittedOn)}</span>
                </div>
                {sheet.status === 'corrected' ? (
                  <Badge tone="success">{sheet.score}/{sheet.maxScore}</Badge>
                ) : (
                  <Badge tone={statusTone(sheet.status)}>{sheet.status.replace('-', ' ')}</Badge>
                )}
              </div>
            ))}
            {mySheets.length === 0 && <p className={styles.empty}>No submissions yet.</p>}
          </div>
        </Card>
      </div>
    </div>
  );
}
