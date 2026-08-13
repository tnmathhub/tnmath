import styles from './Loader.module.scss';

interface LoaderProps {
  label?: string;
  fullPage?: boolean;
}

export function Loader({ label = 'Loading…', fullPage = false }: LoaderProps) {
  return (
    <div className={fullPage ? styles.fullPage : styles.inline}>
      <span className={styles.ring} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </div>
  );
}
