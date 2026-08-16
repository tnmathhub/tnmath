import { Link } from 'react-router-dom';
import styles from './PublicFooter.module.scss';

export function PublicFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerInner} container`}>
        <span>© 2026 TN Maths 12. Built for Tamil Nadu Class 12 students.</span>
        <div className={styles.footerLinks}>
          <Link to="/about">About</Link>
          <Link to="/career">Career</Link>
          <Link to="/ai-solver">AI Solver</Link>
          <Link to="/login">Log in</Link>
          <Link to="/register">Sign up</Link>
        </div>
      </div>
    </footer>
  );
}
