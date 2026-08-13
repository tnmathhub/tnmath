import { useState } from 'react';
import { PageHeader, Card, Button, Badge, Icon, Modal } from '@/components/ui';
import { plans } from '@/data/plans';
import { formatCurrencyINR, formatDate } from '@/utils/helpers';
import styles from './Subscription.module.scss';

function addDays(date: Date, days: number): string {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next.toISOString();
}

export function Subscription() {
  const studentPlans = plans.filter((p) => p.role === 'student');

  const [currentPlanId, setCurrentPlanId] = useState('p-student-free');
  const [renewalDate, setRenewalDate] = useState<string | null>(null);
  const [modalPlanId, setModalPlanId] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState<'renew' | 'upgrade'>('upgrade');
  const [isProcessing, setIsProcessing] = useState(false);

  const currentPlan = studentPlans.find((p) => p.id === currentPlanId);
  const modalPlan = studentPlans.find((p) => p.id === modalPlanId);

  const openUpgrade = (planId: string) => {
    setModalPlanId(planId);
    setModalMode('upgrade');
  };

  const openRenew = () => {
    setModalPlanId(currentPlanId);
    setModalMode('renew');
  };

  const closeModal = () => setModalPlanId(null);

  const confirmAction = () => {
    if (!modalPlanId) return;
    setIsProcessing(true);
    // Frontend-only demo: simulate a billing call, then update local state.
    // Real integration would POST to API.billing.upgrade / API.billing.renew.
    setTimeout(() => {
      setCurrentPlanId(modalPlanId);
      setRenewalDate(addDays(new Date(), 30));
      setIsProcessing(false);
      setModalPlanId(null);
    }, 700);
  };

  return (
    <div>
      <PageHeader title="Subscription" subtitle="Manage your plan and unlock premium chapters and correction credits." />

      <div className={styles.grid}>
        {studentPlans.map((plan) => {
          const isCurrent = plan.id === currentPlanId;
          const isFree = plan.price === 0;

          return (
            <Card key={plan.id} className={`${styles.planCard} ${plan.highlighted ? styles.highlighted : ''}`}>
              <div className={styles.planHeader}>
                <h3>{plan.name}</h3>
                {isCurrent && <Badge tone="info">Current plan</Badge>}
                {plan.highlighted && !isCurrent && <Badge tone="primary">Recommended</Badge>}
              </div>
              <div className={styles.price}>
                {plan.price === 0 ? 'Free' : formatCurrencyINR(plan.price)}
                {plan.price > 0 && <span>/month</span>}
              </div>
              <ul className={styles.features}>
                {plan.features.map((f) => (
                  <li key={f}><Icon name="check" size={14} />{f}</li>
                ))}
              </ul>

              {isCurrent && !isFree && (
                <Button fullWidth variant="outline" icon="clock" onClick={openRenew}>Renew plan</Button>
              )}
              {isCurrent && isFree && (
                <Button fullWidth variant="outline" disabled>Current plan</Button>
              )}
              {!isCurrent && (
                <Button fullWidth variant="primary" onClick={() => openUpgrade(plan.id)}>
                  {plan.price > (currentPlan?.price ?? 0) ? 'Upgrade to this plan' : 'Switch to this plan'}
                </Button>
              )}
            </Card>
          );
        })}
      </div>

      <Card className={styles.billingCard}>
        <div className={styles.billingHeader}>
          <h3>Billing details</h3>
          {currentPlan && currentPlan.price > 0 && (
            <Button size="sm" variant="ghost" icon="clock" onClick={openRenew}>Renew now</Button>
          )}
        </div>
        <div className={styles.billingRow}>
          <span>Plan</span>
          <strong>{currentPlan?.name ?? '—'}</strong>
        </div>
        <div className={styles.billingRow}>
          <span>Renewal date</span>
          <strong>{renewalDate ? formatDate(renewalDate) : '—'}</strong>
        </div>
        <div className={styles.billingRow}>
          <span>Payment method</span>
          <strong>Not added</strong>
        </div>
      </Card>

      <Modal
        isOpen={Boolean(modalPlan)}
        onClose={closeModal}
        title={modalMode === 'renew' ? 'Renew your plan' : 'Confirm plan change'}
        footer={
          <>
            <Button variant="ghost" onClick={closeModal}>Cancel</Button>
            <Button onClick={confirmAction} isLoading={isProcessing}>
              {modalMode === 'renew' ? 'Confirm renewal' : 'Confirm switch'}
            </Button>
          </>
        }
      >
        {modalPlan && (
          <div className={styles.modalBody}>
            <p>
              {modalMode === 'renew'
                ? `You're renewing ${modalPlan.name} for another month at ${formatCurrencyINR(modalPlan.price)}/month.`
                : `You're switching to ${modalPlan.name} at ${modalPlan.price === 0 ? 'Free' : `${formatCurrencyINR(modalPlan.price)}/month`}.`}
            </p>
            <ul className={styles.modalFeatures}>
              {modalPlan.features.map((f) => (
                <li key={f}><Icon name="check" size={14} />{f}</li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </div>
  );
}
