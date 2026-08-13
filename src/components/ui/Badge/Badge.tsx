import type { ReactNode } from 'react';
import { classNames } from '@/utils/helpers';
import styles from './Badge.module.scss';

type Tone = 'success' | 'warning' | 'error' | 'info' | 'primary' | 'neutral';

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  dot?: boolean;
}

export function Badge({ children, tone = 'neutral', dot = false }: BadgeProps) {
  return (
    <span className={classNames(styles.badge, styles[tone])}>
      {dot && <span className={styles.dot} />}
      {children}
    </span>
  );
}
