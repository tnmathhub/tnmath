import { useState } from 'react';
import type { DragEvent } from 'react';
import { Icon } from '../Icon/Icon';
import { Select } from '../Select/Select';
import type { UploadedAnswerFile, UploadedFileTag } from '@/types';
import { classNames } from '@/utils/helpers';
import styles from './FileDropzone.module.scss';

interface FileDropzoneProps {
  files: UploadedAnswerFile[];
  onChange: (files: UploadedAnswerFile[]) => void;
  label?: string;
  hint?: string;
  /** Show a per-file tag selector (diagram / graph / table / rough work). */
  withTags?: boolean;
}

const TAG_OPTIONS: { value: UploadedFileTag; label: string }[] = [
  { value: 'diagram', label: 'Diagram' },
  { value: 'graph', label: 'Graph' },
  { value: 'table', label: 'Table' },
  { value: 'rough-work', label: 'Rough work' },
  { value: 'other', label: 'Other' },
];

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileDropzone({ files, onChange, label, hint, withTags = false }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const addFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const newEntries: UploadedAnswerFile[] = Array.from(fileList).map((file) => ({
      id: crypto.randomUUID(),
      file,
      tag: 'other' as UploadedFileTag,
    }));
    onChange([...files, ...newEntries]);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const removeFile = (id: string) => onChange(files.filter((f) => f.id !== id));

  const updateTag = (id: string, tag: UploadedFileTag) => {
    onChange(files.map((f) => (f.id === id ? { ...f, tag } : f)));
  };

  return (
    <div className={styles.wrap}>
      {label && <label className={styles.label}>{label}</label>}

      <div
        className={classNames(styles.dropzone, isDragging && styles.dragging)}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <Icon name="upload" size={24} />
        <p>
          Drag & drop files, or <label className={styles.browse}>browse
            <input
              type="file"
              accept="application/pdf,image/*"
              multiple
              hidden
              onChange={(e) => addFiles(e.target.files)}
            />
          </label>
        </p>
        {hint && <span className={styles.hint}>{hint}</span>}
      </div>

      {files.length > 0 && (
        <ul className={styles.fileList}>
          {files.map((entry) => (
            <li key={entry.id} className={styles.fileRow}>
              <span className={styles.fileIcon}><Icon name="content" size={15} /></span>
              <div className={styles.fileInfo}>
                <span className={styles.fileName}>{entry.file.name}</span>
                <span className={styles.fileSize}>{formatFileSize(entry.file.size)}</span>
              </div>
              {withTags && (
                <div className={styles.tagSelect}>
                  <Select
                    options={TAG_OPTIONS}
                    value={entry.tag}
                    onChange={(e) => updateTag(entry.id, e.target.value as UploadedFileTag)}
                  />
                </div>
              )}
              <button type="button" className={styles.removeBtn} onClick={() => removeFile(entry.id)} aria-label={`Remove ${entry.file.name}`}>
                <Icon name="close" size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
