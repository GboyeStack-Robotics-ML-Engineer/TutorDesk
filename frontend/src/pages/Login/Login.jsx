import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Input } from '../../components/ui/Input/Input';
import { Button } from '../../components/ui/Button/Button';
import { useAuth } from '../../context/AuthContext';
import { NetworkError } from '../../lib/api';
import styles from './Login.module.css';

export const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await login({ identifier, password });
      const redirectTo = location.state?.from?.pathname || '/portal/view/setup-checklist-home-variant';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(
        err instanceof NetworkError
          ? err.message
          : err.message || 'Could not sign in. Check your details and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <main className={styles.mainContent}>
        {/* Brand Header */}
        <div className={styles.brandHeader}>
          <h1 className="text-display-md text-primary">TutorDesk</h1>
        </div>

        {/* Login Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className="text-title-md text-ink-900">Welcome back</h2>
            <p className={styles.subtitle}>Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {location.state?.passwordReset && (
              <p role="status" className={styles.formError} style={{ color: 'var(--success-solid)', backgroundColor: 'var(--success-tint)' }}>
                Password reset — sign in with your new password.
              </p>
            )}
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

            {error && (
              <p role="alert" className={styles.formError}>
                {error}
              </p>
            )}

            {/* Submit Button */}
            <div className={styles.submitContainer}>
              <Button type="submit" fullWidth disabled={isSubmitting}>
                {isSubmitting ? 'Signing in…' : 'Log in'}
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
            <p className={styles.footerText}>
              Parent or student?{' '}
              <Link to="/login/parent" className={styles.footerLink}>
                Log in with WhatsApp
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
