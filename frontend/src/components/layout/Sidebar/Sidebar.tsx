import { NavLink } from 'react-router-dom';
import { Icon } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from '@/hooks/useTranslation';
import { NAV_ITEMS, ROLE_LABEL, APP_FULL_NAME } from '@/utils/constants';
import { classNames } from '@/utils/helpers';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useAuth();
  const { t } = useTranslation();
  if (!user) return null;

  const items = NAV_ITEMS[user.role];

  return (
    <>
      {isOpen && <div className={styles.backdrop} onClick={onClose} />}
      <aside className={classNames(styles.sidebar, isOpen && styles.open)}>
        <nav className={styles.nav}>
          {items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) => classNames(styles.navItem, isActive && styles.active)}
            >
              <Icon name={item.icon} size={19} />
              <span>{item.labelKey ? t(item.labelKey) : item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.footer}>
          <div className={styles.roleBadge}>{ROLE_LABEL[user.role]} access</div>
          <p className={styles.tagline}>{APP_FULL_NAME}</p>
        </div>
      </aside>
    </>
  );
}
