import { PageHeader, Card, Badge, Icon } from '@/components/ui';
import styles from './AccessControl.module.scss';

const PERMISSIONS = [
  { role: 'Student', items: ['View chapters', 'Attempt exams', 'Upload answer sheets', 'View own results'] },
  { role: 'Teacher', items: ['Manage content', 'Correct answer sheets', 'Manage classes', 'View class reports'] },
  { role: 'School Admin', items: ['Manage all users', 'Full billing access', 'School-wide reports', 'Access control settings'] },
];

export function AccessControl() {
  return (
    <div>
      <PageHeader title="Access Control" subtitle="Review what each role can see and do across the platform." />
      <div className={styles.grid}>
        {PERMISSIONS.map((group) => (
          <Card key={group.role}>
            <div className={styles.header}>
              <h3>{group.role}</h3>
              <Badge tone="primary">{group.items.length} permissions</Badge>
            </div>
            <ul className={styles.list}>
              {group.items.map((item) => (
                <li key={item}><Icon name="check" size={14} />{item}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
