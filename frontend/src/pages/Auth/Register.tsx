import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Select, Icon } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import type { UserRole } from '@/types';
import { classNames } from '@/utils/helpers';
import { API } from '@/utils/apiUrls';
import { AuthLayout } from './AuthLayout';
import styles from './Auth.module.scss';

// School Admin registration is disabled for now (student + teacher only).
// To bring it back: add the admin card here, restore the schoolName field
// below, and add 'admin' back to Login's ROLE_OPTIONS in Login.tsx.
const ROLE_CARDS: { role: UserRole; title: string; desc: string; icon: 'book' | 'correction' }[] = [
  { role: 'student', title: 'Student', desc: 'Chapter-wise learning, model exams and answer uploads.', icon: 'book' },
  { role: 'teacher', title: 'Teacher', desc: 'Content management, correction and class tracking.', icon: 'correction' },
];

const MEDIUM_OPTIONS = [
  { value: 'ENGLISH', label: 'English' },
  { value: 'TAMIL', label: 'Tamil' },
];

// Django REST validation errors usually come back as either
// { "detail": "..." } or { "field_name": ["message", ...], ... }.
// Flatten either shape into one readable string.
async function parseApiError(res: Response): Promise<string> {
  try {
    const data = await res.json();
    if (typeof data?.detail === 'string') return data.detail;
    const messages = Object.entries(data)
      .map(([field, value]) => {
        const text = Array.isArray(value) ? value.join(' ') : String(value);
        return field === 'non_field_errors' ? text : `${field}: ${text}`;
      })
      .filter(Boolean);
    if (messages.length) return messages.join(' ');
  } catch {
    // fall through
  }
  return `Registration failed (${res.status}). Please try again.`;
}

export function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>('student');

  // Shared account fields (Django User model)
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Student profile fields
  const [studentFullname, setStudentFullname] = useState('');
  const [school, setSchool] = useState('');
  const [district, setDistrict] = useState('');
  const [medium, setMedium] = useState<'ENGLISH' | 'TAMIL'>('ENGLISH');
  const [parentMobile, setParentMobile] = useState('');

  // Teacher profile fields
  const [teacherFullname, setTeacherFullname] = useState('');
  const [qualification, setQualification] = useState('');
  const [workingSchool, setWorkingSchool] = useState('');
  const [mobile, setMobile] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const fullname = role === 'student' ? studentFullname : teacherFullname;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError('');
    setIsLoading(true);

    const endpoint = role === 'student' ? API.hub.registerStudent : API.hub.registerTeacher;
    const payload =
      role === 'student'
        ? {
            username,
            email,
            password,
            fullname: studentFullname,
            school,
            district,
            medium,
            parent_mobile: parentMobile,
          }
        : {
            username,
            email,
            password,
            fullname: teacherFullname,
            qualification,
            working_school: workingSchool,
            mobile,
          };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        setFormError(await parseApiError(res));
        setIsLoading(false);
        return;
      }

      if (role === 'student') {
        login(fullname, email, role, {
          username,
          schoolName: school,
          district,
          medium,
          parentMobile,
        });
      } else {
        login(fullname, email, role, {
          username,
          qualification,
          workingSchool,
          phone: mobile,
        });
      }
      navigate(`/${role}/dashboard`);
    } catch {
      setFormError('Could not reach the server. Please check your connection and try again.');
      setIsLoading(false);
    }
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
        {formError && <div className={styles.formError}><Icon name="close" size={14} />{formError}</div>}
        {/* Account fields — shared by Django's User model */}
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

        {role === 'student' ? (
          <>
            <Input
              label="Full name"
              placeholder="e.g. Priya Ramesh"
              required
              value={studentFullname}
              onChange={(e) => setStudentFullname(e.target.value)}
            />
            <Input
              label="School"
              placeholder="e.g. Govt Hr Sec School, Chennai"
              required
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            />
            <div className={styles.fieldsRow}>
              <Input
                label="District"
                placeholder="e.g. Chennai"
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
              <Select
                label="Medium"
                required
                value={medium}
                onChange={(e) => setMedium(e.target.value as 'ENGLISH' | 'TAMIL')}
                options={MEDIUM_OPTIONS}
              />
            </div>
            <Input
              label="Parent's mobile number"
              type="tel"
              placeholder="98765 43210"
              required
              value={parentMobile}
              onChange={(e) => setParentMobile(e.target.value)}
            />
          </>
        ) : (
          <>
            <Input
              label="Full name"
              placeholder="e.g. Arun Kumar"
              required
              value={teacherFullname}
              onChange={(e) => setTeacherFullname(e.target.value)}
            />
            <Input
              label="Qualification"
              placeholder="e.g. M.Sc., B.Ed."
              required
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
            />
            <Input
              label="Working school"
              placeholder="e.g. Govt Hr Sec School, Chennai"
              required
              value={workingSchool}
              onChange={(e) => setWorkingSchool(e.target.value)}
            />
            <Input
              label="Mobile number"
              type="tel"
              placeholder="98765 43210"
              required
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </>
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
