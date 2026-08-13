import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Button, Icon, Tabs, EmptyState } from '@/components/ui';
import { useBilingual } from '@/context/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { getQuestionsByChapter } from '@/data/questions';
import type { Question, QuestionType } from '@/types';
import { classNames } from '@/utils/helpers';
import styles from './QuestionBank.module.scss';

const CATEGORY_TABS: { key: QuestionType; labelKey: 'mcq' | 'twoMark' | 'threeMark' | 'fiveMark' }[] = [
  { key: 'mcq', labelKey: 'mcq' },
  { key: '2-mark', labelKey: 'twoMark' },
  { key: '3-mark', labelKey: 'threeMark' },
  { key: '5-mark', labelKey: 'fiveMark' },
];

const FREE_PREVIEW_COUNT = 2;

function McqItem({ question }: { question: Question }) {
  const pick = useBilingual();
  const [selected, setSelected] = useState<number | null>(null);

  const options = question.options ?? [];
  const optionsTa = question.optionsTa ?? [];

  return (
    <div className={styles.mcqCard}>
      <p className={styles.qText}>{pick(question.text, question.textTa)}</p>
      <div className={styles.mcqOptions}>
        {options.map((opt, i) => {
          const isCorrect = i === question.correctOptionIndex;
          const isSelected = selected === i;
          return (
            <button
              key={opt}
              type="button"
              className={classNames(
                styles.mcqOption,
                isSelected && !isCorrect && styles.mcqWrong,
                selected !== null && isCorrect && styles.mcqCorrect
              )}
              onClick={() => setSelected(i)}
              disabled={selected !== null}
            >
              <span className={styles.mcqLetter}>{String.fromCharCode(65 + i)}</span>
              {pick(opt, optionsTa[i])}
              {selected !== null && isCorrect && <Icon name="check" size={14} />}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <span className={selected === question.correctOptionIndex ? styles.feedbackCorrect : styles.feedbackWrong}>
          {selected === question.correctOptionIndex ? 'Correct!' : 'Not quite — the correct answer is highlighted above.'}
        </span>
      )}
    </div>
  );
}

function DescriptiveItem({ chapterId, question }: { chapterId: string; question: Question }) {
  const pick = useBilingual();
  return (
    <div className={styles.descCard}>
      <div className={styles.descHeader}>
        <Badge tone="neutral">{question.marks} mark{question.marks > 1 ? 's' : ''}</Badge>
      </div>
      <p className={styles.qText}>{pick(question.text, question.textTa)}</p>
      <Link to={`/student/chapters/${chapterId}/questions/${question.id}`}>
        <Button size="sm" icon="content" variant="outline">Answer this question</Button>
      </Link>
    </div>
  );
}

function LockedCard({ count }: { count: number }) {
  return (
    <EmptyState
      icon="card"
      title={`${count} more question${count > 1 ? 's' : ''} in this chapter`}
      description="Unlock the full question bank for this chapter — MCQs, 2/3/5 mark questions, and answer correction — with Premium."
      action={<Link to="/student/subscription"><Button icon="card">Unlock with Premium</Button></Link>}
    />
  );
}

export function QuestionBank({ chapterId, isPremium }: { chapterId: string; isPremium: boolean }) {
  const { t } = useTranslation();
  const [category, setCategory] = useState<QuestionType>('mcq');

  const all = getQuestionsByChapter(chapterId).filter((q) => q.type === category);
  const visible = isPremium ? all.slice(0, FREE_PREVIEW_COUNT) : all;
  const lockedCount = all.length - visible.length;

  return (
    <div>
      <div className={styles.tabsWrap}>
        <Tabs
          tabs={CATEGORY_TABS.map((c) => ({ key: c.key, label: t(c.labelKey) }))}
          active={category}
          onChange={(k) => setCategory(k as QuestionType)}
        />
      </div>

      {visible.length === 0 && (
        <EmptyState icon="exam" title="No questions yet" description="This category doesn't have questions loaded for this chapter yet." />
      )}

      <div className={styles.list}>
        {visible.map((q) =>
          q.type === 'mcq' ? (
            <McqItem key={q.id} question={q} />
          ) : (
            <DescriptiveItem key={q.id} chapterId={chapterId} question={q} />
          )
        )}
      </div>

      {lockedCount > 0 && (
        <div className={styles.lockedWrap}>
          <LockedCard count={lockedCount} />
        </div>
      )}
    </div>
  );
}
