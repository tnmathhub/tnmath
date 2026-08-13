import { useState } from 'react';
import { PageHeader, Card, Badge, Button, Icon, Modal } from '@/components/ui';
import { plans } from '@/data/plans';
import { formatCurrencyINR, formatDate } from '@/utils/helpers';
import styles from './TeacherSubscription.module.scss';

function addDays(date: Date, days: number): string {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next.toISOString();
}

export function TeacherSubscription() {
  const teacherPlan = plans.find((p) => p.role === 'teacher')!;
  const [renewalDate, setRenewalDate] = useState(addDays(new Date(), 30));
  const [showRenew, setShowRenew] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const confirmRenew = () => {
    setIsProcessing(true);
    // Frontend-only demo: real integration would POST to API.billing.renew.
    setTimeout(() => {
      setRenewalDate(addDays(new Date(), 30));
      setIsProcessing(false);
      setShowRenew(false);
    }, 700);
  };

  return (
    <div>
      <PageHeader title="Subscription" subtitle="Manage your Teacher Plan — correction tools and class management." />

      <div className={styles.grid}>
        <Card className={styles.planCard}>
          <div className={styles.planHeader}>
            <h3>{teacherPlan.name}</h3>
            <Badge tone="success">Active</Badge>
          </div>
          <div className={styles.price}>
            {formatCurrencyINR(teacherPlan.price)}<span>/month</span>
          </div>
          <div className={styles.renewalNote}>
            <Icon name="clock" size={14} /> Renews on {formatDate(renewalDate)}
          </div>
          <ul className={styles.features}>
            {teacherPlan.features.map((f) => (
              <li key={f}><Icon name="check" size={14} />{f}</li>
            ))}
          </ul>
          <Button variant="outline" icon="clock" onClick={() => setShowRenew(true)}>Renew plan</Button>
        </Card>

        <Card>
          <h3 className={styles.title}>Billing details</h3>
          <div className={styles.row}><span>Plan</span><strong>{teacherPlan.name}</strong></div>
          <div className={styles.row}><span>Renewal date</span><strong>{formatDate(renewalDate)}</strong></div>
          <div className={styles.row}><span>Payment method</span><strong>Not added</strong></div>
          <p className={styles.note}>
            Need access for your whole school instead of just your own account? Ask your school
            admin to move you onto the School Plan, which covers unlimited teachers.
          </p>
        </Card>
      </div>

      <Modal
        isOpen={showRenew}
        onClose={() => setShowRenew(false)}
        title="Renew Teacher Plan"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowRenew(false)}>Cancel</Button>
            <Button onClick={confirmRenew} isLoading={isProcessing}>Confirm renewal</Button>
          </>
        }
      >
        <p>
          You're renewing the {teacherPlan.name} for another month at {formatCurrencyINR(teacherPlan.price)}/month.
        </p>
      </Modal>
    </div>
  );
}
