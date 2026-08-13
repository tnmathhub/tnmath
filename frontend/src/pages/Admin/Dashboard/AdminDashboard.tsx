import { Link } from 'react-router-dom';
import { PageHeader, StatCard, Card, Button, Badge } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import { adminOverviewStats } from '@/data/reports';
import { plans } from '@/data/plans';
import styles from './AdminDashboard.module.scss';

export function AdminDashboard() {
  const { user } = useAuth();
  const schoolPlan = plans.find((p) => p.role === 'admin');

  return (
    <div>
      <PageHeader
        title={user?.schoolName ? user.schoolName : 'School Dashboard'}
        subtitle="An overview of students, teachers, and exam activity across your school."
        actions={<Link to="/admin/reports"><Button icon="report">View full reports</Button></Link>}
      />

      <div className={styles.statGrid}>
        {adminOverviewStats.map((stat) => (
          <StatCard key={stat.id} label={stat.label} value={stat.value} icon="dashboard" delta={stat.delta} trend={stat.trend} />
        ))}
      </div>

      <div className={styles.twoCol}>
        <Card>
          <h3 className={styles.cardTitle}>Current subscription</h3>
          <div className={styles.planRow}>
            <div>
              <span className={styles.planName}>{schoolPlan?.name}</span>
              <Badge tone="success">Active</Badge>
            </div>
            <Link to="/admin/subscriptions"><Button variant="outline" size="sm">Manage plan</Button></Link>
          </div>
          <ul className={styles.planFeatures}>
            {schoolPlan?.features.map((f) => <li key={f}>{f}</li>)}
          </ul>
        </Card>

        <Card>
          <h3 className={styles.cardTitle}>Quick links</h3>
          <div className={styles.linkGrid}>
            <Link to="/admin/users" className={styles.linkCard}>Manage users</Link>
            <Link to="/admin/access-control" className={styles.linkCard}>Access control</Link>
            <Link to="/admin/reports" className={styles.linkCard}>School reports</Link>
            <Link to="/admin/subscriptions" className={styles.linkCard}>Billing & plans</Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
