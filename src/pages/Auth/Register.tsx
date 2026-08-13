import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Icon } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import type { UserRole } from '@/types';
import { classNames } from '@/utils/helpers';
import { AuthLayout } from './AuthLayout';
import styles from './Auth.module.scss';

// School Admin registration is disabled for now (student + teacher only).
// To bring it back: add the admin card here, restore the schoolName field
// below, and add 'admin' back to Login's ROLE_OPTIONS in Login.tsx.
const ROLE_CARDS: { role: UserRole; title: string; desc: string; icon: 'book' | 'correction' }[] = [
  { role: 'student', title: 'Student', desc: 'Chapter-wise learning, model exams and answer uploads.', icon: 'book' },
  { role: 'teacher', title: 'Teacher', desc: 'Content management, correction and class tracking.', icon: 'correction' },
];

export function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>('student');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [school, setSchool] = useState('');
  const [district, setDistrict] = useState('');
  const [qualification, setQualification] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(name, email, role, {
        username,
        schoolName: school || undefined,
        district: district || undefined,
        qualification: role === 'teacher' ? qualification || undefined : undefined,
        phone: phone || undefined,
      });
      setIsLoading(false);
      navigate(`/${role}/dashboard`);
    }, 500);
  };

  return (
    <AuthLayout title="Create your account" subtitle="Choose your role to get a dashboard built for you.">
      <div className={styles.roleGrid}>
        {ROLE_CARDS.map((card) => (
          <button
            key={card.role}
            type="button"
            className={classNames(styles.roleCard, role === card.role && styles.roleCardActive)}
            onClick={() => setRole(card.role)}
          >
            <Icon name={card.icon} size={20} />
            <span className={styles.roleTitle}>{card.title}</span>
            <span className={styles.roleDesc}>{card.desc}</span>
          </button>
        ))}
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="Full name"
          placeholder="e.g. Priya Ramesh"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Username"
          placeholder="e.g. priya_ramesh"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <div className={styles.fieldsRow}>
          <Input
            label="Phone number"
            type="tel"
            placeholder="98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            label="District"
            placeholder="e.g. Chennai"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
        </div>
        <Input
          label="School"
          placeholder="e.g. Govt Hr Sec School, Chennai"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
        {role === 'teacher' && (
          <Input
            label="Qualification"
            placeholder="e.g. M.Sc., B.Ed."
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
          />
        )}
        <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
          Create {role} account
        </Button>
      </form>
      <p className={styles.switchText}>
        Already have an account? <Link to="/login" className={styles.link}>Log in</Link>
      </p>
    </AuthLayout>
  );
}
