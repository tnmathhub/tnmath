import { Link, useLocation } from 'react-router-dom';
import { Icon, Button } from '@/components/ui';
import { classNames } from '@/utils/helpers';
import styles from './PublicNav.module.scss';

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Practice', to: '/#features' },
  { label: 'Mock Test', to: '/#how-it-works' },
  { label: 'AI Solver', to: '/ai-solver' },
  { label: 'Teachers', to: '/#teachers' },
  { label: 'Career', to: '/career' },
  { label: 'About', to: '/about' },
];

export function PublicNav() {
  const { pathname } = useLocation();

  return (
    <header className={styles.nav}>
      <div className={`${styles.navInner} container`}>
        <Link to="/" className={styles.brand}>
          <span className={styles.brandMark}><Icon name="sigma" size={18} /></span>
          <span>TN Maths 12</span>
        </Link>
        <nav className={styles.navLinks}>
          {LINKS.map((link) =>
            link.to.includes('#') ? (
              <a
                key={link.label}
                href={link.to}
                className={classNames(pathname === link.to && styles.active)}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                className={classNames(pathname === link.to && styles.active)}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
        <div className={styles.navActions}>
          <Link to="/login"><Button variant="ghost" size="sm">Log in</Button></Link>
          <Link to="/register"><Button variant="primary" size="sm">Get started</Button></Link>
        </div>
      </div>
    </header>
  );
}
