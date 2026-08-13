import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/ui';
import styles from './Auth.module.scss';

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className={styles.page}>
      <div className={`${styles.card} fade-in-up`}>
        <Link to="/" className={styles.brand}>
          <span className={styles.brandMark}><Icon name="sigma" size={18} /></span>
          <span>TN Maths 12</span>
        </Link>
        <h1>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        {children}
      </div>
      <div className={styles.side}>
        <blockquote>
          "Chapter-wise practice, model exams, and answer-sheet correction — all in one place for
          Tamil Nadu Class 12 Maths."
        </blockquote>
        <div className={styles.sideStats}>
          <div><strong>12</strong><span>Chapters</span></div>
          <div><strong>3</strong><span>Roles</span></div>
          <div><strong>500+</strong><span>Questions</span></div>
        </div>
      </div>
    </div>
  );
}
