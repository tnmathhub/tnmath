import { useState } from 'react';
import { PageHeader, Card, Badge, Button, Icon, Modal } from '@/components/ui';
import { plans } from '@/data/plans';
import { formatCurrencyINR, formatDate } from '@/utils/helpers';
import styles from './Subscriptions.module.scss';

function addDays(date: Date, days: number): string {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next.toISOString();
}

export function Subscriptions() {
  const schoolPlan = plans.find((p) => p.role === 'admin')!;
  const [renewalDate, setRenewalDate] = useState(addDays(new Date(), 365));
  const [showRenew, setShowRenew] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const confirmRenew = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setRenewalDate(addDays(new Date(), 365));
      setIsProcessing(false);
      setShowRenew(false);
    }, 700);
  };

  return (
    <div>
      <PageHeader title="Subscriptions" subtitle="Manage your school's licensing plan and billing history." />

      <div className={styles.grid}>
        <Card className={styles.planCard}>
          <div className={styles.planHeader}>
            <h3>{schoolPlan.name}</h3>
            <Badge tone="success">Active</Badge>
          </div>
          <div className={styles.price}>
            {formatCurrencyINR(schoolPlan.price)}<span>/year</span>
          </div>
          <div className={styles.renewalNote}>
            <Icon name="clock" size={14} /> Renews on {formatDate(renewalDate)}
          </div>
          <ul className={styles.features}>
            {schoolPlan.features.map((f) => (
              <li key={f}><Icon name="check" size={14} />{f}</li>
            ))}
          </ul>
          <div className={styles.actions}>
            <Button variant="outline" icon="clock" onClick={() => setShowRenew(true)}>Renew license</Button>
            <Button variant="primary" onClick={() => setShowUpgrade(true)}>Upgrade plan</Button>
          </div>
        </Card>

        <Card>
          <h3 className={styles.title}>Billing history</h3>
          <div className={styles.invoiceRow}>
            <span>Annual School License — 2026</span>
            <Badge tone="success">Paid</Badge>
          </div>
          <div className={styles.invoiceRow}>
            <span>Annual School License — 2025</span>
            <Badge tone="success">Paid</Badge>
          </div>
        </Card>
      </div>

      <Modal
        isOpen={showRenew}
        onClose={() => setShowRenew(false)}
        title="Renew school license"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowRenew(false)}>Cancel</Button>
            <Button onClick={confirmRenew} isLoading={isProcessing}>Confirm renewal</Button>
          </>
        }
      >
        <p>
          You're renewing the {schoolPlan.name} for another year at {formatCurrencyINR(schoolPlan.price)}/year.
          Your new renewal date will be set to one year from today.
        </p>
      </Modal>

      <Modal
        isOpen={showUpgrade}
        onClose={() => setShowUpgrade(false)}
        title="Upgrade plan"
        footer={<Button variant="ghost" onClick={() => setShowUpgrade(false)}>Close</Button>}
      >
        <p>
          The School Plan already includes unlimited students and teachers, full access control,
          and priority support. Reach out to our team for custom multi-campus pricing.
        </p>
      </Modal>
    </div>
  );
}
