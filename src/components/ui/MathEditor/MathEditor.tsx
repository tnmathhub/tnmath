import { useMemo, useRef } from 'react';
import katex from 'katex';
import { Icon } from '../Icon/Icon';
import styles from './MathEditor.module.scss';

interface MathEditorProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

interface Snippet {
  label: string;
  insert: string;
  /** Cursor offset from the end of `insert`, so it lands inside e.g. \frac{}{} */
  cursorBack?: number;
}

const SNIPPETS: Snippet[] = [
  { label: 'x²', insert: '^{}', cursorBack: 1 },
  { label: 'xₙ', insert: '_{}', cursorBack: 1 },
  { label: '⁄', insert: '\\frac{}{}', cursorBack: 3 },
  { label: '√', insert: '\\sqrt{}', cursorBack: 1 },
  { label: 'π', insert: '\\pi' },
  { label: 'θ', insert: '\\theta' },
  { label: '∑', insert: '\\sum_{}^{}', cursorBack: 4 },
  { label: '∫', insert: '\\int_{}^{}', cursorBack: 4 },
  { label: '≤', insert: '\\le' },
  { label: '≥', insert: '\\ge' },
  { label: '±', insert: '\\pm' },
  { label: '∞', insert: '\\infty' },
];

export function MathEditor({ label, value, onChange, placeholder }: MathEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const renderedHtml = useMemo(() => {
    if (!value.trim()) return '';
    try {
      return katex.renderToString(value, { throwOnError: false, displayMode: false });
    } catch {
      return '';
    }
  }, [value]);

  const insertSnippet = (snippet: Snippet) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      onChange(value + snippet.insert);
      return;
    }
    const start = textarea.selectionStart ?? value.length;
    const end = textarea.selectionEnd ?? value.length;
    const next = value.slice(0, start) + snippet.insert + value.slice(end);
    onChange(next);

    const cursorPos = start + snippet.insert.length - (snippet.cursorBack ?? 0);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(cursorPos, cursorPos);
    });
  };

  return (
    <div className={styles.wrap}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.toolbar}>
        {SNIPPETS.map((s) => (
          <button
            key={s.label}
            type="button"
            className={styles.snippetBtn}
            onClick={() => insertSnippet(s)}
            title={s.insert}
          >
            {s.label}
          </button>
        ))}
      </div>

      <textarea
        ref={textareaRef}
        className={styles.textarea}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? 'Type your answer, e.g. x^2 + y^2 = r^2'}
        rows={2}
      />

      <div className={styles.previewRow}>
        <span className={styles.previewLabel}><Icon name="sigma" size={13} /> Preview</span>
        <div className={styles.previewBox}>
          {renderedHtml ? (
            <span dangerouslySetInnerHTML={{ __html: renderedHtml }} />
          ) : (
            <span className={styles.previewPlaceholder}>Your formula will render here</span>
          )}
        </div>
      </div>
    </div>
  );
}
