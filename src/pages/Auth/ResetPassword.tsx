import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Input, Icon } from '@/components/ui';
import { AuthLayout } from './AuthLayout';
import styles from './Auth.module.scss';

export function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setIsLoading(true);
    // Frontend-only demo: real integration would POST to API.auth.resetPassword with `token`.
    setTimeout(() => {
      setIsLoading(false);
      setDone(true);
      setTimeout(() => navigate('/login'), 1800);
    }, 600);
  };

  if (done) {
    return (
      <AuthLayout title="Password reset" subtitle="You can now log in with your new password.">
        <div className={styles.successBox}>
          <span className={styles.successIcon}><Icon name="check" size={20} /></span>
          <p>Your password has been updated. Redirecting you to log in…</p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Set a new password" subtitle="Choose a strong password you haven't used before.">
      <form className={styles.form} onSubmit={handleSubmit}>
        {!token && (
          <p className={styles.hintBox}>
            This page is normally reached via the reset link emailed to you. For this demo you can
            still set a new password directly.
          </p>
        )}
        <Input
          label="New password"
          type="password"
          placeholder="••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error && error.includes('8 characters') ? error : undefined}
        />
        <Input
          label="Confirm new password"
          type="password"
          placeholder="••••••••"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={error && error.includes('match') ? error : undefined}
        />
        <Button type="submit" fullWidth size="lg" isLoading={isLoading}>Reset password</Button>
      </form>
      <p className={styles.switchText}>
        <Link to="/login" className={styles.link}>Back to log in</Link>
      </p>
    </AuthLayout>
  );
}
