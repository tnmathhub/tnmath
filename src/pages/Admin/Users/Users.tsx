import { useState } from 'react';
import { PageHeader, Card, Table, Badge, Button, Tabs } from '@/components/ui';
import type { TableColumn } from '@/components/ui';

interface UserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
}

const ALL_USERS: UserRow[] = [
  { id: 'u-1', name: 'Priya Ramesh', email: 'priya@example.com', role: 'Student', status: 'Active' },
  { id: 'u-2', name: 'Arun Kumar', email: 'arun@example.com', role: 'Student', status: 'Active' },
  { id: 'u-3', name: 'Kalyani M', email: 'kalyani@example.com', role: 'Teacher', status: 'Active' },
  { id: 'u-4', name: 'Suresh Babu', email: 'suresh@example.com', role: 'Teacher', status: 'Inactive' },
  { id: 'u-5', name: 'Divya Shree', email: 'divya@example.com', role: 'Student', status: 'Active' },
];

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'Student', label: 'Students' },
  { key: 'Teacher', label: 'Teachers' },
];

export function Users() {
  const [tab, setTab] = useState('all');
  const rows = tab === 'all' ? ALL_USERS : ALL_USERS.filter((u) => u.role === tab);

  const columns: TableColumn<UserRow>[] = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role', width: '120px' },
    {
      key: 'status',
      header: 'Status',
      width: '120px',
      render: (row) => <Badge tone={row.status === 'Active' ? 'success' : 'error'}>{row.status}</Badge>,
    },
    { key: 'actions', header: '', width: '100px', render: () => <Button size="sm" variant="ghost">Manage</Button> },
  ];

  return (
    <div>
      <PageHeader
        title="Users"
        subtitle="Manage student and teacher accounts across your school."
        actions={<Button icon="plus">Invite user</Button>}
      />
      <div style={{ marginBottom: '1.5rem' }}>
        <Tabs tabs={TABS} active={tab} onChange={setTab} />
      </div>
      <Card padding="sm">
        <Table columns={columns} data={rows} rowKey={(r) => r.id} />
      </Card>
    </div>
  );
}
