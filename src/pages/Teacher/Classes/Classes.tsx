import { PageHeader, Card, Table, Button, Badge } from '@/components/ui';
import type { TableColumn } from '@/components/ui';

interface ClassRow {
  id: string;
  name: string;
  section: string;
  students: number;
  avgProgress: string;
}

const rows: ClassRow[] = [
  { id: 'c-1', name: 'Class 12', section: 'A', students: 42, avgProgress: '68%' },
  { id: 'c-2', name: 'Class 12', section: 'B', students: 38, avgProgress: '54%' },
  { id: 'c-3', name: 'Class 12', section: 'C (Tuition batch)', students: 25, avgProgress: '71%' },
];

export function Classes() {
  const columns: TableColumn<ClassRow>[] = [
    { key: 'name', header: 'Class' },
    { key: 'section', header: 'Section' },
    { key: 'students', header: 'Students', width: '120px' },
    {
      key: 'avgProgress',
      header: 'Avg. Progress',
      width: '150px',
      render: (row) => <Badge tone="primary">{row.avgProgress}</Badge>,
    },
    { key: 'actions', header: '', width: '110px', render: () => <Button size="sm" variant="ghost">Manage</Button> },
  ];

  return (
    <div>
      <PageHeader
        title="Classes"
        subtitle="Manage your sections, add students, and view class-wide progress."
        actions={<Button icon="plus">Add class</Button>}
      />
      <Card padding="sm">
        <Table columns={columns} data={rows} rowKey={(r) => r.id} />
      </Card>
    </div>
  );
}
