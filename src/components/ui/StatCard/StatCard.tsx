import type { IconName } from '@/types';
import { Icon } from '../Icon/Icon';
import { Card } from '../Card/Card';
import { classNames } from '@/utils/helpers';
import styles from './StatCard.module.scss';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: IconName;
  delta?: string;
  trend?: 'up' | 'down' | 'flat';
}

export function StatCard({ label, value, icon, delta, trend }: StatCardProps) {
  return (
    <Card className={styles.stat} padding="md">
      <div className={styles.iconWrap}>
        <Icon name={icon} size={20} />
      </div>
      <div className={styles.text}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
        {delta && (
          <span className={classNames(styles.delta, trend === 'down' && styles.down)}>
            {delta}
          </span>
        )}
      </div>
    </Card>
  );
}
