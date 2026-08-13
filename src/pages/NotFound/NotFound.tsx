import { Link } from 'react-router-dom';
import { Button, Icon } from '@/components/ui';
import styles from './NotFound.module.scss';

export function NotFound() {
  return (
    <div className={styles.wrap}>
      <span className={styles.iconWrap}><Icon name="close" size={28} /></span>
      <h1>404 — Page not found</h1>
      <p>The page you're looking for doesn't exist or may have been moved.</p>
      <Link to="/"><Button icon="chevron">Back to home</Button></Link>
    </div>
  );
}
