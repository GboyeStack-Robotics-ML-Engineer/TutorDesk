import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../components/ui/Input/Input';
import { Button } from '../../components/ui/Button/Button';
import { api, NetworkError } from '../../lib/api';
import styles from './ForgotPassword.module.css';

// Tutor-only — parents/students use passwordless WhatsApp OTP instead
// (see ../ParentLogin). Always shows the same success message whether or
// not the email matched an account (the backend responds identically
// either way), so this can't be used to check who has an account.
export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await api.auth.requestPasswordReset({ email });
      setSent(true);
    } catch (err) {
      setError(
        err instanceof NetworkError
          ? err.message
          : err.message || 'Could not send a reset link. Please try again.'
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

        {/* Forgot Password Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className="text-title-lg text-on-surface mb-2">Reset Password</h2>
            <p className={styles.subtitle}>
              Enter the email address on your tutor account, and we'll send you a link to reset your password.
            </p>
          </div>

          {sent ? (
            <p role="status" className="font-body text-body text-ink-700">
              If an account exists for that email, a reset link is on its way — check your inbox.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <Input
                id="contact_info"
                type="email"
                label="Email"
                placeholder="e.g. name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {error && (
                <p role="alert" className={styles.formError}>
                  {error}
                </p>
              )}

              <div className={styles.submitContainer}>
                <Button type="submit" fullWidth disabled={isSubmitting}>
                  {isSubmitting ? 'Sending…' : 'Send reset link'}
                </Button>
              </div>
            </form>
          )}

          {/* Secondary Action */}
          <div className={styles.footer}>
            <Link to="/login" className={styles.backLink}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
              Back to Login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
