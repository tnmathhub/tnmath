import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import styles from './Layout.module.scss';

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.shell}>
      <Header onToggleSidebar={() => setSidebarOpen((s) => !s)} />
      <div className={styles.body}>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className={styles.main}>
          <div className={`${styles.content} fade-in-up`}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
