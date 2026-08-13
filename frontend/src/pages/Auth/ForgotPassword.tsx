import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Icon } from '@/components/ui';
import { AuthLayout } from './AuthLayout';
import styles from './Auth.module.scss';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Frontend-only demo: real integration would POST to API.auth.forgotPassword.
    setTimeout(() => {
      setIsLoading(false);
      setSent(true);
    }, 600);
  };

  if (sent) {
    return (
      <AuthLayout title="Check your email" subtitle="We've sent password reset instructions.">
        <div className={styles.successBox}>
          <span className={styles.successIcon}><Icon name="check" size={20} /></span>
          <p>
            If an account exists for <strong>{email}</strong>, you'll receive an email with a
            link to reset your password within a few minutes.
          </p>
        </div>
        <p className={styles.switchText}>
          Didn't get it? <button type="button" className={styles.linkButton} onClick={() => setSent(false)}>Try again</button>
        </p>
        <p className={styles.switchText}>
          <Link to="/login" className={styles.link}>Back to log in</Link>
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Forgot your password?" subtitle="Enter your email and we'll send you a reset link.">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" fullWidth size="lg" isLoading={isLoading}>Send reset link</Button>
      </form>
      <p className={styles.switchText}>
        Remembered your password? <Link to="/login" className={styles.link}>Log in</Link>
      </p>
    </AuthLayout>
  );
}
