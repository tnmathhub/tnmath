import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PageHeader, Card, Badge, Button, MathEditor, FileDropzone, EmptyState, Icon } from '@/components/ui';
import { getQuestionById } from '@/data/questions';
import { chapters } from '@/data/chapters';
import { useBilingual } from '@/context/LanguageContext';
import type { UploadedAnswerFile } from '@/types';
import styles from './QuestionAnswer.module.scss';

export function QuestionAnswer() {
  const { chapterId, questionId } = useParams();
  const navigate = useNavigate();
  const pick = useBilingual();

  const question = questionId ? getQuestionById(questionId) : undefined;
  const chapter = chapters.find((c) => c.id === chapterId);

  const [finalAnswer, setFinalAnswer] = useState('');
  const [explanation, setExplanation] = useState('');
  const [steps, setSteps] = useState<string[]>(['']);
  const [files, setFiles] = useState<UploadedAnswerFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!question || !chapter) {
    return (
      <EmptyState
        icon="content"
        title="Question not found"
        description="This question may have moved. Head back to the chapter."
        action={<Link to="/student/chapters"><Button variant="outline">Back to chapters</Button></Link>}
      />
    );
  }

  const updateStep = (index: number, value: string) => {
    setSteps((prev) => prev.map((s, i) => (i === index ? value : s)));
  };

  const addStep = () => setSteps((prev) => [...prev, '']);
  const removeStep = (index: number) => setSteps((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Frontend-only demo: real integration would POST the draft (final answer LaTeX,
    // explanation, steps, and files) to a per-question answer-submission endpoint,
    // then route into the teacher correction queue.
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  if (submitted) {
    return (
      <div className={styles.successWrap}>
        <span className={styles.successIcon}><Icon name="check" size={22} /></span>
        <h2>Answer submitted</h2>
        <p>Your answer for this question has been sent for correction. You'll see feedback and marks on your Results page once it's reviewed.</p>
        <div className={styles.successActions}>
          <Link to={`/student/chapters/${chapter.id}`}><Button variant="outline">Back to chapter</Button></Link>
          <Link to="/student/results"><Button>View results</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={`Chapter ${chapter.number}: ${pick(chapter.title, chapter.tamilTitle)}`}
        subtitle="Answer this question, then submit for teacher correction."
        actions={<Button variant="outline" icon="chevron" onClick={() => navigate(`/student/chapters/${chapter.id}`)}>Back to chapter</Button>}
      />

      <Card className={styles.questionCard}>
        <Badge tone="neutral">{question.marks} mark{question.marks > 1 ? 's' : ''}</Badge>
        <p className={styles.qText}>{pick(question.text, question.textTa)}</p>
      </Card>

      <Card className={styles.formCard}>
        <div className={styles.section}>
          <MathEditor
            label="Final answer"
            value={finalAnswer}
            onChange={setFinalAnswer}
            placeholder="e.g. x = 3, y = -1 or a LaTeX expression like \frac{d}{dx}(x^2) = 2x"
          />
        </div>

        <div className={styles.section}>
          <label className={styles.label}>Short explanation</label>
          <textarea
            className={styles.textarea}
            rows={3}
            placeholder="In a couple of sentences, explain how you approached this question."
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
          />
        </div>

        <div className={styles.section}>
          <div className={styles.stepsHeader}>
            <label className={styles.label}>Key steps of the solution</label>
            <Button size="sm" variant="ghost" icon="plus" onClick={addStep}>Add step</Button>
          </div>
          <div className={styles.stepsList}>
            {steps.map((step, i) => (
              <div key={i} className={styles.stepRow}>
                <span className={styles.stepNumber}>{i + 1}</span>
                <div className={styles.stepEditor}>
                  <MathEditor value={step} onChange={(v) => updateStep(i, v)} placeholder={`Step ${i + 1}, e.g. Multiply both sides by x`} />
                </div>
                {steps.length > 1 && (
                  <button type="button" className={styles.stepRemove} onClick={() => removeStep(i)} aria-label="Remove step">
                    <Icon name="close" size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <FileDropzone
            label="Upload handwritten work, diagrams, graphs, or tables"
            hint="Great for long solutions, geometry constructions, or rough calculations. PDF, JPG or PNG, up to 20MB each."
            files={files}
            onChange={setFiles}
            withTags
          />
        </div>

        <div className={styles.formFooter}>
          <Button variant="ghost">Save draft</Button>
          <Button icon="upload" onClick={handleSubmit} isLoading={isSubmitting}>Submit answer</Button>
        </div>
      </Card>
    </div>
  );
}
