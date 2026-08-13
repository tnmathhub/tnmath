import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Select } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import type { UserRole } from '@/types';
import { AuthLayout } from './AuthLayout';
import styles from './Auth.module.scss';

// School Admin login is disabled for now (student + teacher only).
// To bring it back: add { value: 'admin', label: 'School Admin' } here.
const ROLE_OPTIONS = [
  { value: 'student', label: 'Student' },
  { value: 'teacher', label: 'Teacher' },
];

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Frontend-only demo: simulate an auth call and route by role.
    setTimeout(() => {
      const name = email.split('@')[0] || 'Student';
      login(name.charAt(0).toUpperCase() + name.slice(1), email, role);
      setIsLoading(false);
      navigate(`/${role}/dashboard`);
    }, 500);
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to continue your Maths practice.">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Select
          label="Log in as"
          options={ROLE_OPTIONS}
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
        />
        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={styles.rowBetween}>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" /> Remember me
          </label>
          <Link to="/forgot-password" className={styles.link}>Forgot password?</Link>
        </div>
        <Button type="submit" fullWidth size="lg" isLoading={isLoading}>Log in</Button>
      </form>
      <p className={styles.switchText}>
        Don't have an account? <Link to="/register" className={styles.link}>Sign up</Link>
      </p>
    </AuthLayout>
  );
}
