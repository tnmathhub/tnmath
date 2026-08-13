import { useNavigate, Link } from 'react-router-dom';
import { Icon } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { ROLE_LABEL, APP_NAME } from '@/utils/constants';
import styles from './Header.module.scss';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const { user, logout } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onToggleSidebar} aria-label="Toggle menu">
          <Icon name="menu" size={20} />
        </button>
        <div className={styles.brand}>
          <span className={styles.brandMark}>
            <Icon name="sigma" size={18} />
          </span>
          <span className={styles.brandName}>{APP_NAME}</span>
        </div>
      </div>

      <div className={styles.right}>
        <button
          className={styles.langToggle}
          onClick={toggleLanguage}
          aria-label="Switch language"
          title={language === 'en' ? 'தமிழில் பார்க்க' : 'View in English'}
        >
          <span className={language === 'en' ? styles.langActive : undefined}>EN</span>
          <span className={styles.langDivider}>/</span>
          <span className={language === 'ta' ? styles.langActive : undefined}>தமிழ்</span>
        </button>
        <button className={styles.iconBtn} aria-label="Search">
          <Icon name="search" size={18} />
        </button>
        <button className={styles.iconBtn} aria-label="Notifications">
          <Icon name="bell" size={18} />
          <span className={styles.dot} />
        </button>
        <div className={styles.divider} />
        {user && (
          <Link to="/profile" className={styles.profile}>
            <span className={styles.avatar}>{user.avatarInitial}</span>
            <div className={styles.profileText}>
              <span className={styles.name}>{user.name}</span>
              <span className={styles.role}>{ROLE_LABEL[user.role]}</span>
            </div>
          </Link>
        )}
        <button className={styles.iconBtn} aria-label="Log out" onClick={handleLogout}>
          <Icon name="logout" size={18} />
        </button>
      </div>
    </header>
  );
}
