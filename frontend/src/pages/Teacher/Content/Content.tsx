import { useState } from 'react';
import { PageHeader, Card, Button, Badge, Icon, Table, Modal, Input, Select } from '@/components/ui';
import type { TableColumn } from '@/components/ui';
import { chapters } from '@/data/chapters';
import styles from './Content.module.scss';

interface ContentRow {
  id: string;
  chapter: string;
  topics: number;
  status: 'Published' | 'Draft';
}

export function Content() {
  const [showModal, setShowModal] = useState(false);
  const rows: ContentRow[] = chapters.map((c, i) => ({
    id: c.id,
    chapter: `Chapter ${c.number}: ${c.title}`,
    topics: c.topicsCount,
    status: i < 3 ? 'Published' : 'Draft',
  }));

  const columns: TableColumn<ContentRow>[] = [
    { key: 'chapter', header: 'Chapter' },
    { key: 'topics', header: 'Topics', width: '100px' },
    {
      key: 'status',
      header: 'Status',
      width: '140px',
      render: (row) => <Badge tone={row.status === 'Published' ? 'success' : 'neutral'}>{row.status}</Badge>,
    },
    {
      key: 'actions',
      header: '',
      width: '100px',
      render: () => <Button size="sm" variant="ghost">Edit</Button>,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Content Management"
        subtitle="Manage chapter-wise topics, practice questions, and notes."
        actions={<Button icon="plus" onClick={() => setShowModal(true)}>Add content</Button>}
      />

      <Card padding="sm">
        <Table columns={columns} data={rows} rowKey={(r) => r.id} />
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Add new content"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={() => setShowModal(false)}>Save content</Button>
          </>
        }
      >
        <div className={styles.form}>
          <Select
            label="Chapter"
            options={chapters.map((c) => ({ value: c.id, label: `Ch. ${c.number}: ${c.title}` }))}
          />
          <Input label="Topic title" placeholder="e.g. Inverse of a matrix using adjoint" />
          <Select
            label="Content type"
            options={[
              { value: 'topic', label: 'Topic / lesson' },
              { value: 'practice', label: 'Practice questions' },
              { value: 'notes', label: 'Notes & formulas' },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
}
