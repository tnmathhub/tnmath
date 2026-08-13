import type { HTMLAttributes, ReactNode } from 'react';
import { classNames } from '@/utils/helpers';
import styles from './Card.module.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverable?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  as?: 'div' | 'article' | 'section';
}

export function Card({ children, hoverable = false, padding = 'md', className, ...rest }: CardProps) {
  return (
    <div
      className={classNames(styles.card, hoverable && styles.hoverable, styles[padding], className)}
      {...rest}
    >
      {children}
    </div>
  );
}
