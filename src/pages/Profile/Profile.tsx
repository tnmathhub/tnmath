import { useState } from 'react';
import type { FormEvent } from 'react';
import { PageHeader, Card, Input, Button, Badge, Tabs } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import { ROLE_LABEL } from '@/utils/constants';
import styles from './Profile.module.scss';

const TABS = [
  { key: 'details', label: 'Profile details' },
  { key: 'security', label: 'Password & security' },
];

export function Profile() {
  const { user, updateProfile } = useAuth();
  const [tab, setTab] = useState('details');

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [schoolName, setSchoolName] = useState(user?.schoolName ?? '');
  const [savedMessage, setSavedMessage] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSaved, setPasswordSaved] = useState(false);

  if (!user) return null;

  const handleSaveDetails = (e: FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, schoolName: schoolName || undefined });
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2500);
  };

  const handleChangePassword = (e: FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }
    setPasswordError('');
    // Frontend-only demo: real integration would POST to API.auth.changePassword.
    setPasswordSaved(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSaved(false), 2500);
  };

  return (
    <div>
      <PageHeader title="Profile" subtitle="Manage your personal details and account security." />

      <div className={styles.layout}>
        <Card className={styles.summaryCard}>
          <span className={styles.avatar}>{user.avatarInitial}</span>
          <h3>{user.name}</h3>
          <span className={styles.email}>{user.email}</span>
          <Badge tone="primary">{ROLE_LABEL[user.role]}</Badge>
          {user.schoolName && <span className={styles.school}>{user.schoolName}</span>}
        </Card>

        <div className={styles.main}>
          <div className={styles.tabsWrap}>
            <Tabs tabs={TABS} active={tab} onChange={setTab} />
          </div>

          {tab === 'details' && (
            <Card>
              <form className={styles.form} onSubmit={handleSaveDetails}>
                <Input label="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
                <Input label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                {user.role === 'admin' && (
                  <Input
                    label="School / institution name"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="e.g. St. Xavier's Higher Secondary School"
                  />
                )}
                <div className={styles.formFooter}>
                  {savedMessage && <span className={styles.savedNote}>Profile updated.</span>}
                  <Button type="submit">Save changes</Button>
                </div>
              </form>
            </Card>
          )}

          {tab === 'security' && (
            <Card>
              <form className={styles.form} onSubmit={handleChangePassword}>
                <Input
                  label="Current password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <Input
                  label="New password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  error={passwordError.includes('8 characters') ? passwordError : undefined}
                />
                <Input
                  label="Confirm new password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={passwordError.includes('match') ? passwordError : undefined}
                />
                <div className={styles.formFooter}>
                  {passwordSaved && <span className={styles.savedNote}>Password updated.</span>}
                  <Button type="submit">Update password</Button>
                </div>
              </form>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
