import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Input } from '../../components/ui/Input/Input';
import { Button } from '../../components/ui/Button/Button';
import { useAuth } from '../../context/AuthContext';
import { NetworkError } from '../../lib/api';
import styles from '../Login/Login.module.css';

// Passwordless login for parent/student accounts — see docs/PRD.md's
// account model and RequireAuth's `allow` prop. Two steps: request a code
// (sent over WhatsApp to the phone the account is registered under), then
// enter it. Provisioning happens automatically once a parent's WhatsApp
// onboarding completes (core/views.py's _provision_family_accounts) —
// there is no separate signup here.

export const ParentLogin = () => {
  const [step, setStep] = useState('phone'); // phone | code
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { requestOtp, verifyOtp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRequestCode = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await requestOtp({ phone });
      setStep('code');
    } catch (err) {
      setError(
        err instanceof NetworkError ? err.message : err.message || 'Could not send a code. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await verifyOtp({ phone, code });
      const redirectTo = location.state?.from?.pathname || '/parent/home';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(
        err instanceof NetworkError ? err.message : err.message || 'That code is incorrect or has expired.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <main className={styles.mainContent}>
        <div className={styles.brandHeader}>
          <h1 className="text-display-md text-primary">TutorDesk</h1>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className="text-title-md text-ink-900">Parent &amp; student login</h2>
            <p className={styles.subtitle}>
              {step === 'phone'
                ? "We'll text a login code to your WhatsApp number."
                : `Enter the code sent to ${phone}.`}
            </p>
          </div>

          {step === 'phone' ? (
            <form onSubmit={handleRequestCode} className={styles.form} noValidate>
              <Input
                id="phone"
                type="tel"
                label="WhatsApp number"
                placeholder="e.g., +234 801 234 5678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                disabled={isSubmitting}
              />

              {error && (
                <p role="alert" className={styles.formError}>
                  {error}
                </p>
              )}

              <div className={styles.submitContainer}>
                <Button type="submit" fullWidth disabled={isSubmitting}>
                  {isSubmitting ? 'Sending…' : 'Send code'}
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode} className={styles.form} noValidate>
              <Input
                id="code"
                type="text"
                inputMode="numeric"
                label="6-digit code"
                placeholder="123456"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                disabled={isSubmitting}
                actionLink={
                  <button
                    type="button"
                    className={styles.actionLink}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
                    onClick={() => { setStep('phone'); setCode(''); setError(''); }}
                  >
                    Use a different number
                  </button>
                }
              />

              {error && (
                <p role="alert" className={styles.formError}>
                  {error}
                </p>
              )}

              <div className={styles.submitContainer}>
                <Button type="submit" fullWidth disabled={isSubmitting}>
                  {isSubmitting ? 'Verifying…' : 'Log in'}
                </Button>
              </div>
            </form>
          )}

          <div className={styles.footer}>
            <p className={styles.footerText}>
              Tutor?{' '}
              <Link to="/login" className={styles.footerLink}>
                Log in with email
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
