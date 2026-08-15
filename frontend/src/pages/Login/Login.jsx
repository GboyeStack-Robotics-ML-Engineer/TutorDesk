import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input/Input';
import { Button } from '../../components/ui/Button/Button';
import styles from './Login.module.css';

export const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/portal/view/setup-checklist-home-variant');
  };

  return (
    <div className={styles.pageContainer}>
      <main className={styles.mainContent}>
        {/* Brand Header */}
        <div className={styles.brandHeader}>
          <img src="/logo.png" alt="TutorDesk" className="mx-auto mb-2" style={{ height: '48px', objectFit: 'contain' }} />
          <h1 className="text-display-md text-primary">TutorDesk</h1>
        </div>

        {/* Login Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className="text-title-md text-ink-900">Welcome back</h2>
            <p className={styles.subtitle}>Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Email/Phone Field */}
            <Input
              id="identifier"
              label="Email or Phone number"
              placeholder="e.g., tutor@example.com"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />

            {/* Password Field */}
            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              actionLink={
                <Link to="/forgot-password" className={styles.actionLink}>
                  Forgot password?
                </Link>
              }
            />

            {/* Submit Button */}
            <div className={styles.submitContainer}>
              <Button type="submit" fullWidth>
                Log in
              </Button>
            </div>
          </form>

          {/* Secondary Action */}
          <div className={styles.footer}>
            <p className={styles.footerText}>
              Don't have an account?{' '}
              <Link to="/signup" className={styles.footerLink}>
                Create account
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
