import { forwardRef } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { Icon } from '../Icon/Icon';
import styles from './Select.module.scss';

interface Option { value: string; label: string; }

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, id, ...rest }, ref) => {
    const selectId = id ?? rest.name;
    return (
      <div className={styles.field}>
        {label && <label htmlFor={selectId} className={styles.label}>{label}</label>}
        <div className={styles.wrapper}>
          <select ref={ref} id={selectId} className={styles.select} {...rest}>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <Icon name="chevron" size={16} className={styles.chevron} />
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';
