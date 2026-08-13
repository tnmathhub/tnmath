import { useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button, Icon, Badge, EmptyState, Modal } from '@/components/ui';
import { exams } from '@/data/exams';
import { classNames } from '@/utils/helpers';
import styles from './ExamAttempt.module.scss';

interface MockQuestion {
  id: string;
  text: string;
  options: string[];
}

function buildQuestions(count: number, chapterHint: string): MockQuestion[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `q-${i + 1}`,
    text: `Question ${i + 1}: A sample problem based on ${chapterHint}. Choose the correct option.`,
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
  }));
}

export function ExamAttempt() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const exam = exams.find((e) => e.id === examId);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [current, setCurrent] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const questions = useMemo(
    () => (exam ? buildQuestions(Math.min(exam.questionCount, 15), exam.chapters.join(', ')) : []),
    [exam]
  );

  if (!exam) {
    return (
      <EmptyState
        icon="exam"
        title="Exam not found"
        description="This exam may no longer be available."
        action={<Link to="/student/exams"><Button variant="outline">Back to exams</Button></Link>}
      />
    );
  }

  const answeredCount = Object.keys(answers).length;
  const question = questions[current];

  const handleSubmit = () => {
    setShowSubmitModal(false);
    navigate('/student/results');
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div>
          <h1>{exam.title}</h1>
          <span className={styles.subtitle}>{exam.type} · {exam.totalMarks} marks</span>
        </div>
        <div className={styles.timer}>
          <Icon name="clock" size={16} />
          <span>{exam.durationMins}:00</span>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.questionPanel}>
          <div className={styles.qMeta}>
            <Badge tone="primary">Question {current + 1} of {questions.length}</Badge>
            <Badge tone={answers[question.id] !== undefined ? 'success' : 'neutral'}>
              {answers[question.id] !== undefined ? 'Answered' : 'Not answered'}
            </Badge>
          </div>
          <p className={styles.qText}>{question.text}</p>
          <div className={styles.options}>
            {question.options.map((opt, i) => (
              <button
                key={opt}
                className={classNames(styles.option, answers[question.id] === i && styles.optionSelected)}
                onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: i }))}
              >
                <span className={styles.optionLetter}>{String.fromCharCode(65 + i)}</span>
                {opt}
              </button>
            ))}
          </div>

          <div className={styles.navRow}>
            <Button variant="outline" disabled={current === 0} onClick={() => setCurrent((c) => c - 1)}>
              Previous
            </Button>
            {current < questions.length - 1 ? (
              <Button onClick={() => setCurrent((c) => c + 1)}>Next question</Button>
            ) : (
              <Button variant="danger" onClick={() => setShowSubmitModal(true)}>Submit exam</Button>
            )}
          </div>
        </div>

        <aside className={styles.navigator}>
          <h4>Question navigator</h4>
          <div className={styles.grid}>
            {questions.map((q, i) => (
              <button
                key={q.id}
                className={classNames(
                  styles.navCell,
                  i === current && styles.navCurrent,
                  answers[q.id] !== undefined && styles.navAnswered
                )}
                onClick={() => setCurrent(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className={styles.summary}>
            <span>{answeredCount} of {questions.length} answered</span>
          </div>
          <Button fullWidth variant="danger" onClick={() => setShowSubmitModal(true)}>Submit exam</Button>
        </aside>
      </div>

      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Submit this exam?"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowSubmitModal(false)}>Keep working</Button>
            <Button variant="primary" onClick={handleSubmit}>Yes, submit</Button>
          </>
        }
      >
        <p>
          You've answered {answeredCount} of {questions.length} questions. Once submitted, you
          won't be able to change your answers.
        </p>
      </Modal>
    </div>
  );
}
